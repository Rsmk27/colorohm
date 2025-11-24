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
            <div class="glass-card p-6 slide-up border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
                <h3 class="text-xl font-bold text-slate-200 mb-6 font-display flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
                        </svg>
                    </span>
                    Color Code to Resistance
                </h3>
                
                <div class="space-y-6">
                    ${this.renderBandSelectors()}
                    
                    <div class="pt-4 border-t border-slate-700/50">
                        <button id="calculate-btn" class="btn-primary w-full py-3 px-6 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300">
                            <span class="flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                                Calculate Resistance
                            </span>
                        </button>
                    </div>
                    
                    <div id="calculation-steps" class="hidden rounded-xl bg-slate-800/50 border border-slate-700/50 p-4 backdrop-blur-sm">
                        <h4 class="font-semibold text-slate-200 mb-3 flex items-center gap-2">
                            <svg class="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                            </svg>
                            Calculation Steps
                        </h4>
                        <div id="steps-content" class="text-sm text-slate-400 space-y-2 font-mono"></div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBandSelectors() {
        const bands = this.getBandConfiguration();

        return bands.map((band, index) => `
            <div class="space-y-2 group">
                <label class="block text-sm font-semibold text-slate-300 flex items-center gap-2 group-hover:text-primary-400 transition-colors">
                    <span class="w-6 h-6 bg-slate-800 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center text-xs group-hover:border-primary-500 group-hover:text-primary-400 transition-all">${index + 1}</span>
                    ${band.label}
                    ${band.required ? '<span class="text-red-400">*</span>' : ''}
                </label>
                <div class="relative">
                    <select 
                        id="band-${index}" 
                        class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 appearance-none cursor-pointer hover:border-slate-600 transition-colors"
                        ${band.required ? 'required' : ''}
                    >
                        ${this.renderColorOptions(band.type, index)}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
                <p class="text-xs text-slate-500 flex items-center gap-1">
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
            <div class="flex justify-between border-b border-slate-700/50 last:border-0 pb-2 last:pb-0">
                <span class="text-slate-400">${step.description}</span>
                <span class="font-mono text-primary-400">${step.value}</span>
            </div>
        `).join('');

        stepsContainer.classList.remove('hidden');
        stepsContainer.classList.add('slide-up');
    }
}