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
            <div class="min-h-screen flex flex-col">
                <div id="header"></div>
                
                <main class="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                    <div id="mode-selector" class="mb-8"></div>
                    
                    <div class="grid lg:grid-cols-2 gap-8 mb-8">
                        <div class="order-2 lg:order-1">
                            <div id="calculator-container" class="space-y-6">
                                <div id="color-to-resistance" class="calculator-section"></div>
                                <div id="resistance-to-color" class="calculator-section hidden"></div>
                                <div id="smd-calculator" class="calculator-section hidden"></div>
                            </div>
                        </div>
                        
                        <div class="order-1 lg:order-2">
                            <div id="resistor-display" class="sticky top-8"></div>
                        </div>
                    </div>
                    
                    <div id="info-section" class="mt-12">
                        ${this.renderInfoSection()}
                    </div>
                </main>
                
                <div id="footer"></div>
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
        this.components.resistorDisplay.setMode(mode, this.currentBandCount);
        
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
        }, 2000);
    }

    updateDisplay() {
        // Trigger initial calculation based on current mode
        const activeCalculator = this.components[this.currentMode.replace('-', '')];
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
            <div class="bg-white rounded-2xl shadow-lg p-8">
                <h2 class="text-2xl font-bold text-gray-800 mb-6">About Resistor Color Codes</h2>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">How It Works</h3>
                        <p class="text-gray-600 mb-4">
                            Resistor color codes use colored bands to indicate the resistance value and tolerance. 
                            Each color represents a specific digit or multiplier, allowing you to determine the 
                            resistance without measuring equipment.
                        </p>
                        <ul class="text-gray-600 space-y-2">
                            <li>• <strong>3-Band:</strong> Two significant digits + multiplier</li>
                            <li>• <strong>4-Band:</strong> Two significant digits + multiplier + tolerance</li>
                            <li>• <strong>5-Band:</strong> Three significant digits + multiplier + tolerance</li>
                            <li>• <strong>6-Band:</strong> Three significant digits + multiplier + tolerance + temperature coefficient</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-4">Color Reference</h3>
                        <div class="grid grid-cols-2 gap-2 text-sm">
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
            <div class="flex items-center space-x-2">
                <div class="color-preview" style="background-color: ${color.color}; ${color.name === 'White' ? 'border-color: #ccc;' : ''}"></div>
                <span class="text-gray-700">${color.name} (${color.value})</span>
            </div>
        `).join('');
    }
}