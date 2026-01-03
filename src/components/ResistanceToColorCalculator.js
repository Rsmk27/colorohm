export class ResistanceToColorCalculator {
    constructor(container, calculator, onUpdate) {
        this.container = container;
        this.calculator = calculator;
        this.onUpdate = onUpdate;
        this.preferredBandCount = 4;
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </span>
                    Resistance to Color Code
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
                        <div class="control-group">
                            <label class="control-label">
                                Resistance Value <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="resistance-input" 
                                class="select-input" 
                                placeholder="e.g., 4.7, 100, 10000"
                                step="any"
                                min="0"
                            >
                            <p style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Enter the resistance value</p>
                        </div>
                        
                        <div class="control-group">
                            <label class="control-label">Unit</label>
                            <div style="position: relative;">
                                <select id="unit-select" class="select-input">
                                    <option value="1">Ohms (Ω)</option>
                                    <option value="1000">Kiloohms (kΩ)</option>
                                    <option value="1000000">Megaohms (MΩ)</option>
                                    <option value="1000000000">Gigaohms (GΩ)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label class="control-label">Preferred Tolerance</label>
                        <div style="position: relative;">
                            <select id="tolerance-select" class="select-input">
                                <option value="20">±20% (No band)</option>
                                <option value="10">±10% (Silver)</option>
                                <option value="5" selected>±5% (Gold)</option>
                                <option value="2">±2% (Red)</option>
                                <option value="1">±1% (Brown)</option>
                                <option value="0.5">±0.5% (Green)</option>
                                <option value="0.25">±0.25% (Blue)</option>
                                <option value="0.1">±0.1% (Violet)</option>
                                <option value="0.05">±0.05% (Grey)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="control-group">
                        <label class="control-label">Preferred Band Count</label>
                        <div style="display: flex; gap: 0.75rem;">
                            <button data-bands="4" class="band-preference-btn active" style="flex: 1; padding: 0.625rem 1rem; border-radius: 4px; border: 1px solid var(--color-border); background: var(--color-bg-main); color: var(--color-text-secondary); cursor: pointer; transition: all 0.2s;">4-Band</button>
                            <button data-bands="5" class="band-preference-btn" style="flex: 1; padding: 0.625rem 1rem; border-radius: 4px; border: 1px solid var(--color-border); background: var(--color-bg-main); color: var(--color-text-secondary); cursor: pointer; transition: all 0.2s;">5-Band</button>
                        </div>
                        <style>
                            .band-preference-btn:hover {
                                border-color: var(--color-primary);
                                color: var(--color-text-main);
                            }
                            .band-preference-btn.active {
                                background: var(--color-primary);
                                color: #000;
                                border-color: var(--color-primary);
                                font-weight: 600;
                            }
                        </style>
                    </div>
                    
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="predict-btn" class="btn-primary">
                            Find Color Code
                        </button>
                    </div>
                    
                    <div id="prediction-results" class="hidden" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="background: rgba(0, 255, 0, 0.05); border: 1px solid rgba(0, 255, 0, 0.2); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: #4ade80; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Recommended Color Code:
                            </h4>
                            <div id="primary-result"></div>
                        </div>
                        
                        <div id="alternative-results" class="hidden" style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: var(--color-primary); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                Alternative Options:
                            </h4>
                            <div id="alternatives-content" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
                        </div>
                        
                        <div id="accuracy-warning" class="hidden" style="background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 8px; padding: 1rem;">
                            <h4 style="font-weight: 600; color: #facc15; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                                <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                Accuracy Note:
                            </h4>
                            <p id="warning-content" style="font-size: 0.9rem; color: #fef08a; opacity: 0.9;"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateBandPreferenceButtons();
    }

    bindEvents() {
        const resistanceInput = this.container.querySelector('#resistance-input');
        const unitSelect = this.container.querySelector('#unit-select');
        const toleranceSelect = this.container.querySelector('#tolerance-select');
        const predictBtn = this.container.querySelector('#predict-btn');

        // Real-time calculation on input
        [resistanceInput, unitSelect, toleranceSelect].forEach(element => {
            element.addEventListener('input', () => this.calculate());
            element.addEventListener('change', () => this.calculate());
        });

        // Band preference buttons
        this.container.querySelectorAll('.band-preference-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.preferredBandCount = parseInt(e.target.dataset.bands);
                this.updateBandPreferenceButtons();
                this.calculate();
            });
        });

        // Predict button
        predictBtn.addEventListener('click', () => {
            this.calculate();
            this.showDetailedResults();
        });

        // Enter key support
        resistanceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
                this.showDetailedResults();
            }
        });
    }

    calculate() {
        const resistanceInput = this.container.querySelector('#resistance-input');
        const unitSelect = this.container.querySelector('#unit-select');
        const toleranceSelect = this.container.querySelector('#tolerance-select');

        const inputValue = parseFloat(resistanceInput.value);
        const unit = parseFloat(unitSelect.value);
        const tolerance = parseFloat(toleranceSelect.value);

        if (isNaN(inputValue) || inputValue <= 0) {
            this.hideResults();
            this.onUpdate({
                formattedValue: '0 Ω',
                details: 'Enter valid resistance',
                colors: ['black', 'black', 'black', 'brown']
            });
            return;
        }

        const resistanceOhms = inputValue * unit;

        try {
            // Updated method name (predictColors) and argument order (resistance, tolerance, preferredBandCount)
            const result = this.calculator.predictColors(resistanceOhms, tolerance, this.preferredBandCount);

            if (result.success) {
                this.showBasicResult(result);
                this.onUpdate({
                    formattedValue: result.formattedValue,
                    details: `${result.bandCount}-band resistor code`,
                    colors: result.colors,
                    calculation: result
                });
            } else {
                this.showError(result.error);
                this.onUpdate({
                    formattedValue: 'Error',
                    details: result.error,
                    colors: ['black', 'black', 'black', 'brown']
                });
            }
        } catch (e) {
            console.error(e);
            this.showError('Calculation error');
        }
    }

    updateBandPreferenceButtons() {
        this.container.querySelectorAll('.band-preference-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.bands) === this.preferredBandCount;
            btn.classList.toggle('active', isActive);
        });
    }

    showBasicResult(result) {
        const resultsContainer = this.container.querySelector('#prediction-results');
        const primaryResult = this.container.querySelector('#primary-result');

        if (resultsContainer && primaryResult) {
            primaryResult.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="display: flex; gap: 4px; padding: 0.5rem; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid var(--color-border);">
                        ${result.colors.map(color => `
                            <div style="width: 20px; height: 32px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background-color: ${this.calculator.getColorValue(color)};" 
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p style="font-weight: 700; color: var(--color-text-main); font-size: 1.1rem;">${result.formattedValue}</p>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary);">${result.bandCount}-band resistor</p>
                    </div>
                </div>
            `;

            resultsContainer.classList.remove('hidden');
            resultsContainer.classList.add('slide-up');
        }
    }

    showDetailedResults() {
        const resistanceInput = this.container.querySelector('#resistance-input');
        const unitSelect = this.container.querySelector('#unit-select');
        const toleranceSelect = this.container.querySelector('#tolerance-select');

        const inputValue = parseFloat(resistanceInput.value);
        const unit = parseFloat(unitSelect.value);
        const tolerance = parseFloat(toleranceSelect.value);

        if (isNaN(inputValue) || inputValue <= 0) return;

        const resistanceOhms = inputValue * unit;
        const allResults = this.calculator.findAllPossibleColors(resistanceOhms, tolerance);

        this.showAlternatives(allResults);
        this.showAccuracyWarning(allResults, resistanceOhms);
    }

    showAlternatives(results) {
        const alternativesContainer = this.container.querySelector('#alternative-results');
        const alternativesContent = this.container.querySelector('#alternatives-content');

        if (!alternativesContainer || !alternativesContent || results.length <= 1) {
            alternativesContainer?.classList.add('hidden');
            return;
        }

        const alternatives = results.slice(1, 4); // Show up to 3 alternatives

        alternativesContent.innerHTML = alternatives.map(result => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: rgba(255,255,255,0.03); border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="display: flex; gap: 2px;">
                        ${result.colors.map(color => `
                            <div style="width: 12px; height: 16px; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1); background-color: ${this.calculator.getColorValue(color)};" 
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p style="font-size: 0.9rem; font-weight: 500; color: var(--color-text-main);">${result.formattedValue}</p>
                        <p style="font-size: 0.75rem; color: var(--color-text-muted);">${result.bandCount}-band</p>
                    </div>
                </div>
                <div style="text-align: right;">
                    <p style="font-size: 0.75rem; color: var(--color-text-muted);">Accuracy: <span style="color: var(--color-primary);">${result.accuracy}%</span></p>
                </div>
            </div>
        `).join('');

        alternativesContainer.classList.remove('hidden');
    }

    showAccuracyWarning(results, targetValue) {
        const warningContainer = this.container.querySelector('#accuracy-warning');
        const warningContent = this.container.querySelector('#warning-content');

        if (!warningContainer || !warningContent || !results.length) {
            warningContainer?.classList.add('hidden');
            return;
        }

        const bestResult = results[0];
        const accuracyPercentage = ((Math.abs(bestResult.calculatedValue - targetValue) / targetValue) * 100);

        if (accuracyPercentage > 1) {
            warningContent.textContent = `The closest standard resistor value differs by ${accuracyPercentage.toFixed(2)}% from your target value. Consider using a precision resistor or adjusting your circuit design.`;
            warningContainer.classList.remove('hidden');
        } else {
            warningContainer.classList.add('hidden');
        }
    }

    showError(error) {
        const resultsContainer = this.container.querySelector('#prediction-results');
        const primaryResult = this.container.querySelector('#primary-result');

        if (resultsContainer && primaryResult) {
            primaryResult.innerHTML = `
                <div style="color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                    <p style="font-weight: 600; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Cannot determine color code
                    </p>
                    <p style="font-size: 0.9rem; opacity: 0.9;">${error || 'This value cannot be represented with standard resistor colors.'}</p>
                </div>
            `;

            resultsContainer.classList.remove('hidden');
        }
    }

    hideResults() {
        const resultsContainer = this.container.querySelector('#prediction-results');
        resultsContainer?.classList.add('hidden');
    }
}