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
            <div class="glass-card p-8 fade-in">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 class="text-3xl font-bold font-display bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                        About Resistor Color Codes
                    </h2>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-6">
                        <div class="accent-border pl-4">
                            <h3 class="text-xl font-semibold text-gray-800 mb-4 font-display">How It Works</h3>
                            <p class="text-gray-600 mb-4 leading-relaxed">
                                Resistor color codes use colored bands to indicate the resistance value and tolerance. 
                                Each color represents a specific digit or multiplier, allowing you to determine the 
                                resistance without measuring equipment.
                            </p>
                        </div>
                        
                        <div class="space-y-3">
                            <div class="info-card bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                                <div class="flex items-start gap-3">
                                    <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span class="text-white font-bold text-sm">3</span>
                                    </div>
                                    <div>
                                        <strong class="text-gray-800">3-Band:</strong>
                                        <p class="text-gray-600 text-sm mt-1">Two significant digits + multiplier</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="info-card bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                                <div class="flex items-start gap-3">
                                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span class="text-white font-bold text-sm">4</span>
                                    </div>
                                    <div>
                                        <strong class="text-gray-800">4-Band:</strong>
                                        <p class="text-gray-600 text-sm mt-1">Two significant digits + multiplier + tolerance</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="info-card bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                                <div class="flex items-start gap-3">
                                    <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span class="text-white font-bold text-sm">5</span>
                                    </div>
                                    <div>
                                        <strong class="text-gray-800">5-Band:</strong>
                                        <p class="text-gray-600 text-sm mt-1">Three significant digits + multiplier + tolerance</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="info-card bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                                <div class="flex items-start gap-3">
                                    <div class="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span class="text-white font-bold text-sm">6</span>
                                    </div>
                                    <div>
                                        <strong class="text-gray-800">6-Band:</strong>
                                        <p class="text-gray-600 text-sm mt-1">Three significant digits + multiplier + tolerance + temp coefficient</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="accent-border pl-4 mb-4">
                            <h3 class="text-xl font-semibold text-gray-800 font-display">Color Reference</h3>
                        </div>
                        <div class="grid grid-cols-2 gap-3 text-sm">
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
            <div class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="color-preview" style="background-color: ${color.color}; ${color.name === 'White' ? 'border-color: #ccc;' : ''}"></div>
                <span class="text-gray-700 font-medium">${color.name}</span>
                <span class="text-gray-500 text-xs ml-auto">(${color.value})</span>
            </div>
        `).join('');
    }
}