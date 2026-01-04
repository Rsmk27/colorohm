import { Header } from './Header.js';
import { ModeSelector } from './ModeSelector.js';
import { ResistorDisplay } from './ResistorDisplay.js';
import { ColorToResistanceCalculator } from './ColorToResistanceCalculator.js';
import { ResistanceToColorCalculator } from './ResistanceToColorCalculator.js';
import { SMDCalculator } from './SMDCalculator.js';
import { Footer } from './Footer.js';
import { Docs } from './Docs.js';
import { About } from './About.js';

export class App {
    constructor(container, calculator) {
        this.container = container;
        this.calculator = calculator;
        this.currentMode = 'color-to-resistance';
        this.currentBandCount = 4;
        this.components = {};
    }

    init() {
        this.render();
        this.bindEvents();
        this.updateDisplay();
    }

    render() {
        this.container.innerHTML = `
            <div class="app-container">
                <div id="header" class="header-section"></div>
                
                <main class="main-content">
                    <!-- Home/Calculator View -->
                    <div id="home-view" class="view-section">
                        <div id="mode-selector" class="mode-selector-section"></div>
                        
                        <div class="calculator-grid">
                            <div class="calculator-panel">
                                <div id="calculator-container" class="calculator-stack">
                                    <div id="color-to-resistance" class="calculator-section"></div>
                                    <div id="resistance-to-color" class="calculator-section hidden"></div>
                                    <div id="smd-calculator" class="calculator-section hidden"></div>
                                </div>
                            </div>
                            
                            <div class="display-panel">
                                <div id="resistor-display" class="resistor-display-wrapper"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Docs View -->
                    <div id="docs-view" class="view-section hidden"></div>

                    <!-- About View -->
                    <div id="about-view" class="view-section hidden"></div>
                </main>
                
                <div id="footer" class="footer-section"></div>
            </div>
        `;

        this.initializeComponents();
    }

    initializeComponents() {
        // Initialize all components
        this.components.header = new Header(
            document.getElementById('header'),
            this.handleNavigation.bind(this)
        );

        this.components.modeSelector = new ModeSelector(
            document.getElementById('mode-selector'),
            this.handleModeChange.bind(this)
        );

        this.components.resistorDisplay = new ResistorDisplay(
            document.getElementById('resistor-display'),
            this.calculator
        );

        this.components.colorToResistance = new ColorToResistanceCalculator(
            document.getElementById('color-to-resistance'),
            this.calculator,
            this.handleCalculationUpdate.bind(this)
        );

        this.components.resistanceToColor = new ResistanceToColorCalculator(
            document.getElementById('resistance-to-color'),
            this.calculator,
            this.handleCalculationUpdate.bind(this)
        );

        this.components.smdCalculator = new SMDCalculator(
            document.getElementById('smd-calculator'),
            this.calculator,
            this.handleCalculationUpdate.bind(this)
        );

        this.components.footer = new Footer(
            document.getElementById('footer')
        );

        this.components.docs = new Docs(
            document.getElementById('docs-view')
        );

        this.components.about = new About(
            document.getElementById('about-view')
        );

        // Initialize all components
        Object.values(this.components).forEach(component => {
            if (component.init) component.init();
        });
    }

    handleModeChange(mode, bandCount = null) {
        this.currentMode = mode;
        if (bandCount) this.currentBandCount = bandCount;

        // Hide all calculator sections
        document.querySelectorAll('.calculator-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the selected calculator
        const targetSection = document.getElementById(mode);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('fade-in');
        }

        // Update resistor display mode
        if (this.components.resistorDisplay) {
            this.components.resistorDisplay.setMode(mode, this.currentBandCount);
        }

        // Propagate band count to ColorToResistanceCalculator
        if (this.components.colorToResistance && typeof this.components.colorToResistance.setBandCount === 'function') {
            this.components.colorToResistance.setBandCount(this.currentBandCount);
        }

        // Update the active calculator
        this.updateDisplay();
    }

    handleCalculationUpdate(result) {
        // Update the resistor display with new calculation results
        this.components.resistorDisplay.updateFromCalculation(result);

        // Add subtle animation to indicate update
        const displayElement = document.getElementById('resistor-display');
        displayElement.classList.add('pulse-subtle');
        setTimeout(() => {
            displayElement.classList.remove('pulse-subtle');
        }, 300);
    }

    updateDisplay() {
        // Map mode strings to component property names
        const componentMap = {
            'color-to-resistance': 'colorToResistance',
            'resistance-to-color': 'resistanceToColor',
            'smd-calculator': 'smdCalculator'
        };

        const componentName = componentMap[this.currentMode];
        const activeCalculator = this.components[componentName];

        if (activeCalculator && activeCalculator.calculate) {
            activeCalculator.calculate();
        }
    }

    bindEvents() {
        // Handle window resize for responsive updates
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.handleModeChange('color-to-resistance');
                        break;
                    case '2':
                        e.preventDefault();
                        this.handleModeChange('resistance-to-color');
                        break;
                    case '3':
                        e.preventDefault();
                        this.handleModeChange('smd-calculator');
                        break;
                }
            }
        });
    }

    handleResize() {
        // Update components that need to respond to resize
        Object.values(this.components).forEach(component => {
            if (component.handleResize) {
                component.handleResize();
            }
        });
    }

    handleNavigation(page) {
        // Hide all views
        ['home-view', 'docs-view', 'about-view'].forEach(viewId => {
            const el = document.getElementById(viewId);
            if (el) el.classList.add('hidden');
        });

        // Show target view
        const targetId = `${page}-view`;
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
            targetEl.classList.remove('hidden');
            // Trigger animation
            targetEl.classList.remove('fade-in');
            void targetEl.offsetWidth; // Trigger reflow
            targetEl.classList.add('fade-in');
        }
    }
}