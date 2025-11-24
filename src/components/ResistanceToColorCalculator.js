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
            <div class="glass-card p-6 slide-up border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
                <h3 class="text-xl font-bold text-slate-200 mb-6 font-display flex items-center gap-3">
                    <span class="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                    </span>
                    Resistance to Color Code
                </h3>
                
                <div class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-slate-300">
                                Resistance Value <span class="text-red-400">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="resistance-input" 
                                class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 placeholder-slate-500" 
                                placeholder="e.g., 4.7, 100, 10000"
                                step="any"
                                min="0"
                            >
                            <p class="text-xs text-slate-500">Enter the resistance value</p>
                        </div>
                        
                        <div class="space-y-2">
                            <label class="block text-sm font-semibold text-slate-300">Unit</label>
                            <div class="relative">
                                <select id="unit-select" class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 appearance-none cursor-pointer">
                                    <option value="1">Ohms (Ω)</option>
                                    <option value="1000">Kiloohms (kΩ)</option>
                                    <option value="1000000">Megaohms (MΩ)</option>
                                    <option value="1000000000">Gigaohms (GΩ)</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-slate-300">Preferred Tolerance</label>
                        <div class="relative">
                            <select id="tolerance-select" class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 appearance-none cursor-pointer">
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
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-2">
                        <label class="block text-sm font-semibold text-slate-300">Preferred Band Count</label>
                        <div class="flex gap-3">
                            <button data-bands="4" class="band-preference-btn active flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">4-Band</button>
                            <button data-bands="5" class="band-preference-btn flex-1 py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">5-Band</button>
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t border-slate-700/50">
                        <button id="predict-btn" class="btn-primary w-full py-3 px-6 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300">
                            Find Color Code
                        </button>
                    </div>
                    
                    <div id="prediction-results" class="hidden space-y-4">
                        <div class="bg-green-900/20 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
                            <h4 class="font-semibold text-green-400 mb-3 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Recommended Color Code:
                            </h4>
                            <div id="primary-result" class="space-y-2"></div>
                        </div>
                        
                        <div id="alternative-results" class="hidden bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                            <h4 class="font-semibold text-primary-400 mb-3 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                                Alternative Options:
                            </h4>
                            <div id="alternatives-content" class="space-y-2"></div>
                        </div>
                        
                        <div id="accuracy-warning" class="hidden bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
                            <h4 class="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                Accuracy Note:
                            </h4>
                            <p class="text-yellow-200/80 text-sm leading-relaxed" id="warning-content"></p>
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
            element.addEventListener('input', () => this.predict());
            element.addEventListener('change', () => this.predict());
        });

        // Band preference buttons
        this.container.querySelectorAll('.band-preference-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.preferredBandCount = parseInt(e.target.dataset.bands);
                this.updateBandPreferenceButtons();
                this.predict();
            });
        });

        // Predict button
        predictBtn.addEventListener('click', () => {
            this.predict();
            this.showDetailedResults();
        });

        // Enter key support
        resistanceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.predict();
                this.showDetailedResults();
            }
        });
    }

    updateBandPreferenceButtons() {
        this.container.querySelectorAll('.band-preference-btn').forEach(btn => {
            const isActive = parseInt(btn.dataset.bands) === this.preferredBandCount;
            btn.classList.toggle('active', isActive);

            if (isActive) {
                btn.classList.add('bg-primary-600', 'text-white', 'border-primary-500', 'shadow-lg', 'shadow-primary-500/20');
                btn.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700', 'hover:bg-slate-700');
            } else {
                btn.classList.remove('bg-primary-600', 'text-white', 'border-primary-500', 'shadow-lg', 'shadow-primary-500/20');
                btn.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700', 'hover:bg-slate-700');
            }
        });
    }

    predict() {
        const resistanceInput = this.container.querySelector('#resistance-input');
        const unitSelect = this.container.querySelector('#unit-select');
        const toleranceSelect = this.container.querySelector('#tolerance-select');

        const inputValue = parseFloat(resistanceInput.value);
        const unit = parseFloat(unitSelect.value);
        const tolerance = parseFloat(toleranceSelect.value);

        if (isNaN(inputValue) || inputValue <= 0) {
            this.onUpdate({
                formattedValue: '0 Ω',
                details: 'Enter a valid resistance value',
                colors: ['black', 'black', 'black', 'brown']
            });
            this.hideResults();
            return;
        }

        const resistanceOhms = inputValue * unit;
        const result = this.calculator.predictColors(resistanceOhms, tolerance, this.preferredBandCount);

        if (result.success) {
            this.onUpdate({
                formattedValue: result.formattedValue,
                details: result.details,
                colors: result.colors,
                prediction: result
            });
            this.showBasicResult(result);
        } else {
            this.onUpdate({
                formattedValue: 'Invalid',
                details: result.error || 'Cannot represent with standard colors',
                colors: ['black', 'black', 'black', 'brown']
            });
            this.showError(result.error);
        }
    }

    showBasicResult(result) {
        const resultsContainer = this.container.querySelector('#prediction-results');
        const primaryResult = this.container.querySelector('#primary-result');

        if (resultsContainer && primaryResult) {
            primaryResult.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div class="flex space-x-1 p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        ${result.colors.map(color => `
                            <div class="w-6 h-8 rounded shadow-sm border border-slate-600/30" 
                                 style="background-color: ${this.calculator.getColorValue(color)}"
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p class="font-bold text-slate-200 text-lg">${result.formattedValue}</p>
                        <p class="text-sm text-slate-400">${result.bandCount}-band resistor</p>
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
            <div class="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:bg-slate-800 transition-colors">
                <div class="flex items-center space-x-3">
                    <div class="flex space-x-1">
                        ${result.colors.map(color => `
                            <div class="w-3 h-4 rounded-sm border border-slate-600/30" 
                                 style="background-color: ${this.calculator.getColorValue(color)}"
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p class="text-sm font-medium text-slate-300">${result.formattedValue}</p>
                        <p class="text-xs text-slate-500">${result.bandCount}-band</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xs text-slate-400">Accuracy: <span class="text-primary-400">${result.accuracy}%</span></p>
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
                <div class="text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                    <p class="font-semibold flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Cannot determine color code
                    </p>
                    <p class="text-sm mt-1 opacity-90">${error || 'This value cannot be represented with standard resistor colors.'}</p>
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