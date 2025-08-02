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
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-6">Resistance to Color Code</h3>
                
                <div class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Resistance Value <span class="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="resistance-input" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 focus-ring" 
                                placeholder="e.g., 4.7, 100, 10000"
                                step="any"
                                min="0"
                            >
                            <p class="text-xs text-gray-500 mt-1">Enter the resistance value</p>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                            <select id="unit-select" class="custom-select w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white focus-ring">
                                <option value="1">Ohms (Ω)</option>
                                <option value="1000">Kiloohms (kΩ)</option>
                                <option value="1000000">Megaohms (MΩ)</option>
                                <option value="1000000000">Gigaohms (GΩ)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Tolerance</label>
                        <select id="tolerance-select" class="custom-select w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white focus-ring">
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
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Band Count</label>
                        <div class="flex gap-2">
                            <button data-bands="4" class="band-preference-btn active px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">4-Band</button>
                            <button data-bands="5" class="band-preference-btn px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">5-Band</button>
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t">
                        <button id="predict-btn" class="w-full bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2">
                            Find Color Code
                        </button>
                    </div>
                    
                    <div id="prediction-results" class="hidden space-y-4">
                        <div class="bg-green-50 rounded-xl p-4">
                            <h4 class="font-semibold text-green-800 mb-2">Recommended Color Code:</h4>
                            <div id="primary-result" class="space-y-2"></div>
                        </div>
                        
                        <div id="alternative-results" class="hidden bg-blue-50 rounded-xl p-4">
                            <h4 class="font-semibold text-blue-800 mb-2">Alternative Options:</h4>
                            <div id="alternatives-content" class="space-y-2"></div>
                        </div>
                        
                        <div id="accuracy-warning" class="hidden bg-yellow-50 rounded-xl p-4">
                            <h4 class="font-semibold text-yellow-800 mb-2">⚠️ Accuracy Note:</h4>
                            <p class="text-yellow-700 text-sm" id="warning-content"></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
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
                btn.classList.add('bg-primary-500', 'text-white', 'border-primary-500');
                btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-300');
            } else {
                btn.classList.remove('bg-primary-500', 'text-white', 'border-primary-500');
                btn.classList.add('bg-white', 'text-gray-700', 'border-gray-300');
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
                <div class="flex items-center space-x-3">
                    <div class="flex space-x-1">
                        ${result.colors.map(color => `
                            <div class="w-6 h-6 rounded border-2 border-gray-300" 
                                 style="background-color: ${this.calculator.getColorValue(color)}"
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p class="font-semibold text-gray-800">${result.formattedValue}</p>
                        <p class="text-sm text-gray-600">${result.bandCount}-band resistor</p>
                    </div>
                </div>
            `;
            
            resultsContainer.classList.remove('hidden');
            resultsContainer.classList.add('fade-in');
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
            <div class="flex items-center justify-between p-3 bg-white rounded-lg border">
                <div class="flex items-center space-x-3">
                    <div class="flex space-x-1">
                        ${result.colors.map(color => `
                            <div class="w-4 h-4 rounded border border-gray-300" 
                                 style="background-color: ${this.calculator.getColorValue(color)}"
                                 title="${color}"></div>
                        `).join('')}
                    </div>
                    <div>
                        <p class="text-sm font-medium">${result.formattedValue}</p>
                        <p class="text-xs text-gray-500">${result.bandCount}-band</p>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-xs text-gray-500">Accuracy: ${result.accuracy}%</p>
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
                <div class="text-red-600">
                    <p class="font-semibold">Cannot determine color code</p>
                    <p class="text-sm">${error || 'This value cannot be represented with standard resistor colors.'}</p>
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