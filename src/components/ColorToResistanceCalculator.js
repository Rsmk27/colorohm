export class ColorToResistanceCalculator {
    constructor(container, calculator, onUpdate) {
        this.container = container;
        this.calculator = calculator;
        this.onUpdate = onUpdate;
        this.bandCount = 4;
        this.selectedColors = {};
    }

    init() {
        this.render();
        this.bindEvents();
        this.calculate();
    }

    setBandCount(count) {
        this.bandCount = count;
        this.render();
        this.bindEvents();
        this.calculate();
    }

    render() {
        this.container.innerHTML = `
            <div class="glass-card p-6 fade-in">
                <h3 class="text-xl font-bold text-gray-800 mb-6 font-display">Color Code to Resistance</h3>
                
                <div class="space-y-6">
                    ${this.renderBandSelectors()}
                    
                    <div class="pt-4 border-t border-gray-200">
                        <button id="calculate-btn" class="btn-primary w-full py-3 px-6 text-base">
                            <svg class="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                            Calculate Resistance
                        </button>
                    </div>
                    
                    <div id="calculation-steps" class="hidden info-card bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                        <h4 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <svg class="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                            </svg>
                            Calculation Steps:
                        </h4>
                        <div id="steps-content" class="text-sm text-gray-600 space-y-2"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBandSelectors() {
        const bands = this.getBandConfiguration();
        
        return bands.map((band, index) => `
            <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <span class="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs">${index + 1}</span>
                    ${band.label}
                    ${band.required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                <select 
                    id="band-${index}" 
                    class="custom-select w-full focus-ring"
                    ${band.required ? 'required' : ''}
                >
                    ${this.renderColorOptions(band.type, index)}
                </select>
                <p class="text-xs text-gray-500 flex items-center gap-1">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    ${band.description}
                </p>
            </div>
        `).join('');
    }

    getBandConfiguration() {
        const configs = {
            3: [
                { label: 'First Digit', type: 'digit', required: true, description: 'First significant digit (1-9)' },
                { label: 'Second Digit', type: 'digit', required: true, description: 'Second significant digit (0-9)' },
                { label: 'Multiplier', type: 'multiplier', required: true, description: 'Number of zeros to add' }
            ],
            4: [
                { label: 'First Digit', type: 'digit', required: true, description: 'First significant digit (1-9)' },
                { label: 'Second Digit', type: 'digit', required: true, description: 'Second significant digit (0-9)' },
                { label: 'Multiplier', type: 'multiplier', required: true, description: 'Number of zeros to add' },
                { label: 'Tolerance', type: 'tolerance', required: true, description: 'Precision of the resistor value' }
            ],
            5: [
                { label: 'First Digit', type: 'digit', required: true, description: 'First significant digit (1-9)' },
                { label: 'Second Digit', type: 'digit', required: true, description: 'Second significant digit (0-9)' },
                { label: 'Third Digit', type: 'digit', required: true, description: 'Third significant digit (0-9)' },
                { label: 'Multiplier', type: 'multiplier', required: true, description: 'Number of zeros to add' },
                { label: 'Tolerance', type: 'tolerance', required: true, description: 'Precision of the resistor value' }
            ],
            6: [
                { label: 'First Digit', type: 'digit', required: true, description: 'First significant digit (1-9)' },
                { label: 'Second Digit', type: 'digit', required: true, description: 'Second significant digit (0-9)' },
                { label: 'Third Digit', type: 'digit', required: true, description: 'Third significant digit (0-9)' },
                { label: 'Multiplier', type: 'multiplier', required: true, description: 'Number of zeros to add' },
                { label: 'Tolerance', type: 'tolerance', required: true, description: 'Precision of the resistor value' },
                { label: 'Temperature Coefficient', type: 'tempco', required: false, description: 'Temperature stability (optional)' }
            ]
        };
        
        return configs[this.bandCount] || configs[4];
    }

    renderColorOptions(type, bandIndex) {
        const colors = this.calculator.getColorsForType(type);
        let options = '';
        
        // Add default option
        if (type === 'tempco') {
            options += '<option value="">Not specified</option>';
        } else {
            options += '<option value="">Select color...</option>';
        }
        
        colors.forEach(color => {
            const colorData = this.calculator.getColorData(color);
            const value = colorData[type];
            const selected = this.selectedColors[bandIndex] === color ? 'selected' : '';
            
            let displayText = color.charAt(0).toUpperCase() + color.slice(1);
            
            if (type === 'digit') {
                displayText += ` (${value})`;
            } else if (type === 'multiplier') {
                displayText += ` (×${this.formatMultiplier(value)})`;
            } else if (type === 'tolerance') {
                displayText += ` (±${value}%)`;
            } else if (type === 'tempco') {
                displayText += ` (${value} ppm/°C)`;
            }
            
            options += `<option value="${color}" ${selected} data-color="${this.calculator.getColorValue(color)}">${displayText}</option>`;
        });
        
        return options;
    }

    formatMultiplier(value) {
        if (value >= 1000000000) return `${value / 1000000000}G`;
        if (value >= 1000000) return `${value / 1000000}M`;
        if (value >= 1000) return `${value / 1000}k`;
        if (value < 1) return value.toString();
        return value.toString();
    }

    bindEvents() {
        // Band selection events
        for (let i = 0; i < this.bandCount; i++) {
            const select = this.container.querySelector(`#band-${i}`);
            if (select) {
                select.addEventListener('change', (e) => {
                    this.selectedColors[i] = e.target.value;
                    this.calculate();
                });
            }
        }

        // Calculate button
        const calculateBtn = this.container.querySelector('#calculate-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculate();
                this.showCalculationSteps();
            });
        }
    }

    calculate() {
        const colors = [];
        let isValid = true;
        
        // Collect selected colors
        for (let i = 0; i < this.bandCount; i++) {
            const select = this.container.querySelector(`#band-${i}`);
            if (select && select.value) {
                colors[i] = select.value;
            } else if (i < this.bandCount - 1 || this.bandCount !== 6) {
                // Required band is missing (except temp coefficient in 6-band)
                isValid = false;
            }
        }

        if (!isValid) {
            this.onUpdate({
                formattedValue: '0 Ω',
                details: 'Select all required colors',
                colors: ['black', 'black', 'black', 'brown']
            });
            return;
        }

        // Calculate resistance
        const result = this.calculator.calculateFromColors(colors, this.bandCount);
        
        // Update display
        this.onUpdate({
            formattedValue: result.formattedValue,
            details: result.details,
            colors: colors,
            calculation: result
        });
    }

    showCalculationSteps() {
        const stepsContainer = this.container.querySelector('#calculation-steps');
        const stepsContent = this.container.querySelector('#steps-content');
        
        if (!stepsContainer || !stepsContent) return;

        const colors = [];
        for (let i = 0; i < this.bandCount; i++) {
            const select = this.container.querySelector(`#band-${i}`);
            if (select && select.value) {
                colors[i] = select.value;
            }
        }

        const steps = this.calculator.getCalculationSteps(colors, this.bandCount);
        
        stepsContent.innerHTML = steps.map(step => `
            <div class="flex justify-between">
                <span>${step.description}</span>
                <span class="font-mono">${step.value}</span>
            </div>
        `).join('');
        
        stepsContainer.classList.remove('hidden');
        stepsContainer.classList.add('slide-up');
    }
}