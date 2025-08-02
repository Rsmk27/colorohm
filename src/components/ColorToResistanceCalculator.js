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
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-6">Color Code to Resistance</h3>
                
                <div class="space-y-6">
                    ${this.renderBandSelectors()}
                    
                    <div class="pt-4 border-t">
                        <button id="calculate-btn" class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                            Calculate Resistance
                        </button>
                    </div>
                    
                    <div id="calculation-steps" class="hidden bg-gray-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-2">Calculation Steps:</h4>
                        <div id="steps-content" class="text-sm text-gray-600 space-y-1"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBandSelectors() {
        const bands = this.getBandConfiguration();
        
        return bands.map((band, index) => `
            <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                    ${band.label}
                    ${band.required ? '<span class="text-red-500">*</span>' : ''}
                </label>
                <select 
                    id="band-${index}" 
                    class="custom-select w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-800 focus-ring"
                    ${band.required ? 'required' : ''}
                >
                    ${this.renderColorOptions(band.type, index)}
                </select>
                <p class="text-xs text-gray-500">${band.description}</p>
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