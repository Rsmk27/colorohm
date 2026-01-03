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
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg class="w-5 h-5" style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                        </svg>
                    </span>
                    Color Code to Resistance
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    ${this.renderBandSelectors()}
                    
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="calculate-btn" class="btn-primary">
                            <span style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                Calculate Resistance
                            </span>
                        </button>
                    </div>
                    
                    <div id="calculation-steps" class="hidden" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                            </svg>
                            Calculation Steps
                        </h4>
                        <div id="steps-content" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-text-secondary); display: flex; flex-direction: column; gap: 0.5rem;"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBandSelectors() {
        const bands = this.getBandConfiguration();

        return bands.map((band, index) => `
            <div class="control-group">
                <label class="control-label" style="display: flex; align-items: center; gap: 0.5rem;">
                    <span style="width: 20px; height: 20px; background: var(--color-bg-main); border: 1px solid var(--color-border); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem;">${index + 1}</span>
                    ${band.label}
                    ${band.required ? '<span style="color: #ef4444;">*</span>' : ''}
                </label>
                <div style="position: relative;">
                    <select 
                        id="band-${index}" 
                        class="select-input"
                        ${band.required ? 'required' : ''}
                    >
                        ${this.renderColorOptions(band.type, index)}
                    </select>
                </div>
                <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px; display: flex; align-items: center; gap: 4px;">
                    <svg style="width: 10px; height: 10px;" fill="currentColor" viewBox="0 0 20 20">
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
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.5rem; margin-bottom: 0.5rem; last:border-bottom: 0;">
                <span style="color: var(--color-text-secondary);">${step.description}</span>
                <span style="font-family: var(--font-mono); color: var(--color-primary);">${step.value}</span>
            </div>
        `).join('');

        stepsContainer.classList.remove('hidden');
        stepsContainer.classList.add('slide-up');
    }
}