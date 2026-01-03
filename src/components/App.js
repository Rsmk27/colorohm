import { Header } from './Header.js';
import { ModeSelector } from './ModeSelector.js';
import { ResistorDisplay } from './ResistorDisplay.js';
import { ColorToResistanceCalculator } from './ColorToResistanceCalculator.js';
import { ResistanceToColorCalculator } from './ResistanceToColorCalculator.js';
import { SMDCalculator } from './SMDCalculator.js';
import { Footer } from './Footer.js';

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
                    
                    <div id="info-section" class="info-section mt-4">
                        ${this.renderInfoSection()}
                    </div>
                </main>
                
                <div id="footer" class="footer-section"></div>
            </div>
        `;

        this.initializeComponents();
    }

    initializeComponents() {
        // Initialize all components
        this.components.header = new Header(
            document.getElementById('header')
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

    renderInfoSection() {
        return `
            <div class="card-glass slide-up">
                <div class="section-header mb-4">
                    <h2 class="text-xl font-bold">About Resistor Color Codes</h2>
                </div>
                
                <div class="info-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div class="info-text">
                        <div style="border-left: 4px solid var(--color-primary); padding-left: 1rem; margin-bottom: 1.5rem;">
                            <h3 style="font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 0.5rem;">How It Works</h3>
                            <p style="color: var(--color-text-secondary); line-height: 1.6;">
                                Resistor color codes use colored bands to indicate the resistance value and tolerance. 
                                Each color represents a specific digit or multiplier, allowing you to determine the 
                                resistance without measuring equipment.
                            </p>
                        </div>
                        
                        <div class="band-info-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
                            <div class="info-item" style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; display: flex; align-items: center; gap: 1rem;">
                                <div style="background: var(--color-primary); width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 0.8rem;">3</div>
                                <div><strong style="color: var(--color-text-main);">3-Band:</strong> <span style="color: var(--color-text-muted);">Digits + Multiplier</span></div>
                            </div>
                            <div class="info-item" style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; display: flex; align-items: center; gap: 1rem;">
                                <div style="background: #4ade80; width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: black; font-weight: bold; font-size: 0.8rem;">4</div>
                                <div><strong style="color: var(--color-text-main);">4-Band:</strong> <span style="color: var(--color-text-muted);">Digits + Multiplier + Tolerance</span></div>
                            </div>
                            <div class="info-item" style="background: rgba(255,255,255,0.03); padding: 0.75rem; border-radius: 6px; display: flex; align-items: center; gap: 1rem;">
                                <div style="background: #a855f7; width: 24px; height: 24px; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.8rem;">5</div>
                                <div><strong style="color: var(--color-text-main);">5-Band:</strong> <span style="color: var(--color-text-muted);">3 Digits + Multiplier + Tolerance</span></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="color-reference">
                        <h3 style="font-size: 1.1rem; color: var(--color-text-main); margin-bottom: 1rem;">Color Reference</h3>
                        <div class="color-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
                            ${this.renderColorReference()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderColorReference() {
        const colors = [
            { name: 'Black', value: '0', color: '#000000' },
            { name: 'Brown', value: '1', color: '#8B4513' },
            { name: 'Red', value: '2', color: '#FF0000' },
            { name: 'Orange', value: '3', color: '#FFA500' },
            { name: 'Yellow', value: '4', color: '#FFFF00' },
            { name: 'Green', value: '5', color: '#008000' },
            { name: 'Blue', value: '6', color: '#0000FF' },
            { name: 'Violet', value: '7', color: '#8A2BE2' },
            { name: 'Grey', value: '8', color: '#808080' },
            { name: 'White', value: '9', color: '#FFFFFF' }
        ];

        return colors.map(color => `
            <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 4px; background: rgba(255,255,255,0.03);">
                <div style="width: 12px; height: 12px; border-radius: 2px; background-color: ${color.color}; border: 1px solid rgba(255,255,255,0.1);"></div>
                <span style="font-size: 0.85rem; color: var(--color-text-secondary);">${color.name}</span>
                <span style="margin-left: auto; font-family: var(--font-mono); font-size: 0.8rem; color: var(--color-text-muted);">${color.value}</span>
            </div>
        `).join('');
    }
}