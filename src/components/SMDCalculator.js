export class SMDCalculator {
    constructor(container, calculator, onUpdate) {
        this.container = container;
        this.calculator = calculator;
        this.onUpdate = onUpdate;
        this.codeType = '3-digit';
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-6">SMD Resistor Calculator</h3>
                
                <div class="space-y-6">
                    <!-- Mode Selection -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-3">Calculation Mode</label>
                        <div class="grid grid-cols-2 gap-4">
                            <button id="code-to-resistance" class="mode-btn active p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <div class="text-center">
                                    <div class="text-lg font-semibold mb-1">Code → Resistance</div>
                                    <div class="text-sm text-gray-500">Decode SMD markings</div>
                                </div>
                            </button>
                            <button id="resistance-to-code" class="mode-btn p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <div class="text-center">
                                    <div class="text-lg font-semibold mb-1">Resistance → Code</div>
                                    <div class="text-sm text-gray-500">Find SMD marking</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Code Type Selection -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-3">SMD Code Type</label>
                        <select id="code-type-select" class="custom-select w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white focus-ring">
                            <option value="3-digit">3-Digit Code (e.g., 472)</option>
                            <option value="4-digit">4-Digit Code (e.g., 4702)</option>
                            <option value="eia-96">EIA-96 Code (e.g., 01A)</option>
                        </select>
                    </div>

                    <!-- Code to Resistance Section -->
                    <div id="code-to-resistance-section" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                SMD Code <span class="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="smd-code-input" 
                                class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 focus-ring font-mono text-lg text-center" 
                                placeholder="e.g., 472, 4702, 01A"
                                maxlength="4"
                            >
                            <p class="text-xs text-gray-500 mt-1" id="code-help-text">Enter the code printed on the SMD resistor</p>
                        </div>
                    </div>

                    <!-- Resistance to Code Section -->
                    <div id="resistance-to-code-section" class="hidden space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    Resistance Value <span class="text-red-500">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="smd-resistance-input" 
                                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 focus-ring" 
                                    placeholder="e.g., 4.7, 100, 10000"
                                    step="any"
                                    min="0"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                <select id="smd-unit-select" class="custom-select w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white focus-ring">
                                    <option value="1">Ohms (Ω)</option>
                                    <option value="1000">Kiloohms (kΩ)</option>
                                    <option value="1000000">Megaohms (MΩ)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Calculate Button -->
                    <div class="pt-4 border-t">
                        <button id="smd-calculate-btn" class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                            Calculate
                        </button>
                    </div>

                    <!-- Results Section -->
                    <div id="smd-results" class="hidden bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-3">Result:</h4>
                        <div id="smd-result-content" class="space-y-2"></div>
                    </div>

                    <!-- SMD Code Reference -->
                    <div class="bg-gray-50 rounded-xl p-4">
                        <h4 class="font-semibold text-gray-800 mb-3">SMD Code Reference:</h4>
                        <div class="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h5 class="font-medium text-gray-700 mb-2">3-Digit Codes</h5>
                                <p class="text-gray-600">First two digits are significant figures, third digit is multiplier (number of zeros)</p>
                                <p class="text-gray-500 mt-1">Example: 472 = 47 × 10² = 4.7kΩ</p>
                            </div>
                            <div>
                                <h5 class="font-medium text-gray-700 mb-2">4-Digit Codes</h5>
                                <p class="text-gray-600">First three digits are significant figures, fourth digit is multiplier</p>
                                <p class="text-gray-500 mt-1">Example: 4702 = 470 × 10² = 47kΩ</p>
                            </div>
                            <div>
                                <h5 class="font-medium text-gray-700 mb-2">EIA-96 Codes</h5>
                                <p class="text-gray-600">Two digits + letter code for high precision resistors (1% tolerance)</p>
                                <p class="text-gray-500 mt-1">Example: 01A = 100Ω</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Mode buttons
        const codeToResistanceBtn = this.container.querySelector('#code-to-resistance');
        const resistanceToCodeBtn = this.container.querySelector('#resistance-to-code');
        
        codeToResistanceBtn.addEventListener('click', () => this.setMode('code-to-resistance'));
        resistanceToCodeBtn.addEventListener('click', () => this.setMode('resistance-to-code'));

        // Code type selection
        const codeTypeSelect = this.container.querySelector('#code-type-select');
        codeTypeSelect.addEventListener('change', (e) => {
            this.codeType = e.target.value;
            this.updateCodeHelp();
            this.calculate();
        });

        // Input events
        const smdCodeInput = this.container.querySelector('#smd-code-input');
        const smdResistanceInput = this.container.querySelector('#smd-resistance-input');
        const smdUnitSelect = this.container.querySelector('#smd-unit-select');

        smdCodeInput.addEventListener('input', () => this.calculate());
        smdResistanceInput.addEventListener('input', () => this.calculate());
        smdUnitSelect.addEventListener('change', () => this.calculate());

        // Calculate button
        const calculateBtn = this.container.querySelector('#smd-calculate-btn');
        calculateBtn.addEventListener('click', () => this.calculate());

        // Enter key support
        smdCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculate();
        });
        smdResistanceInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.calculate();
        });
    }

    setMode(mode) {
        const codeToResistanceBtn = this.container.querySelector('#code-to-resistance');
        const resistanceToCodeBtn = this.container.querySelector('#resistance-to-code');
        const codeToResistanceSection = this.container.querySelector('#code-to-resistance-section');
        const resistanceToCodeSection = this.container.querySelector('#resistance-to-code-section');

        // Update button states
        if (mode === 'code-to-resistance') {
            codeToResistanceBtn.classList.add('active', 'bg-primary-50', 'border-primary-500', 'text-primary-700');
            codeToResistanceBtn.classList.remove('border-gray-200', 'text-gray-600');
            resistanceToCodeBtn.classList.remove('active', 'bg-primary-50', 'border-primary-500', 'text-primary-700');
            resistanceToCodeBtn.classList.add('border-gray-200', 'text-gray-600');
            
            codeToResistanceSection.classList.remove('hidden');
            resistanceToCodeSection.classList.add('hidden');
        } else {
            resistanceToCodeBtn.classList.add('active', 'bg-primary-50', 'border-primary-500', 'text-primary-700');
            resistanceToCodeBtn.classList.remove('border-gray-200', 'text-gray-600');
            codeToResistanceBtn.classList.remove('active', 'bg-primary-50', 'border-primary-500', 'text-primary-700');
            codeToResistanceBtn.classList.add('border-gray-200', 'text-gray-600');
            
            resistanceToCodeSection.classList.remove('hidden');
            codeToResistanceSection.classList.add('hidden');
        }

        this.currentMode = mode;
        this.calculate();
    }

    updateCodeHelp() {
        const helpText = this.container.querySelector('#code-help-text');
        const codeInput = this.container.querySelector('#smd-code-input');
        
        const helpTexts = {
            '3-digit': 'Enter 3-digit code (e.g., 472 for 4.7kΩ)',
            '4-digit': 'Enter 4-digit code (e.g., 4702 for 47kΩ)',
            'eia-96': 'Enter EIA-96 code (e.g., 01A for 100Ω)'
        };

        const placeholders = {
            '3-digit': '472',
            '4-digit': '4702',
            'eia-96': '01A'
        };

        helpText.textContent = helpTexts[this.codeType];
        codeInput.placeholder = placeholders[this.codeType];
        codeInput.maxLength = this.codeType === 'eia-96' ? 3 : (this.codeType === '4-digit' ? 4 : 3);
    }

    calculate() {
        if (this.currentMode === 'code-to-resistance') {
            this.calculateFromCode();
        } else {
            this.calculateFromResistance();
        }
    }

    calculateFromCode() {
        const codeInput = this.container.querySelector('#smd-code-input');
        const code = codeInput.value.trim().toUpperCase();

        if (!code) {
            this.hideResults();
            this.onUpdate({
                formattedValue: '0 Ω',
                details: 'Enter SMD code',
                smdCode: '000'
            });
            return;
        }

        const result = this.calculator.decodeSMD(code, this.codeType);

        if (result.success) {
            this.showResult({
                title: 'Decoded Resistance:',
                content: `
                    <div class="text-center">
                        <p class="text-2xl font-bold text-gray-800">${result.formattedValue}</p>
                        <p class="text-sm text-gray-600 mt-1">${result.details}</p>
                        <div class="mt-3 p-3 bg-white rounded-lg border">
                            <p class="text-sm"><strong>Code:</strong> ${code}</p>
                            <p class="text-sm"><strong>Type:</strong> ${this.codeType}</p>
                            <p class="text-sm"><strong>Calculation:</strong> ${result.calculation}</p>
                        </div>
                    </div>
                `
            });

            this.onUpdate({
                formattedValue: result.formattedValue,
                details: result.details,
                smdCode: code
            });
        } else {
            this.showResult({
                title: 'Error:',
                content: `<p class="text-red-600">${result.error}</p>`
            });

            this.onUpdate({
                formattedValue: 'Invalid',
                details: result.error,
                smdCode: code
            });
        }
    }

    calculateFromResistance() {
        const resistanceInput = this.container.querySelector('#smd-resistance-input');
        const unitSelect = this.container.querySelector('#smd-unit-select');

        const inputValue = parseFloat(resistanceInput.value);
        const unit = parseFloat(unitSelect.value);

        if (isNaN(inputValue) || inputValue <= 0) {
            this.hideResults();
            this.onUpdate({
                formattedValue: '0 Ω',
                details: 'Enter resistance value',
                smdCode: '000'
            });
            return;
        }

        const resistanceOhms = inputValue * unit;
        const result = this.calculator.encodeSMD(resistanceOhms, this.codeType);

        if (result.success) {
            this.showResult({
                title: 'SMD Code:',
                content: `
                    <div class="text-center">
                        <div class="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-mono text-2xl font-bold mb-3">
                            ${result.code}
                        </div>
                        <p class="text-sm text-gray-600">${result.details}</p>
                        <div class="mt-3 p-3 bg-white rounded-lg border">
                            <p class="text-sm"><strong>Input:</strong> ${this.calculator.formatResistance(resistanceOhms)}</p>
                            <p class="text-sm"><strong>Actual:</strong> ${result.formattedValue}</p>
                            <p class="text-sm"><strong>Type:</strong> ${this.codeType}</p>
                            ${result.accuracy ? `<p class="text-sm"><strong>Accuracy:</strong> ${result.accuracy}%</p>` : ''}
                        </div>
                    </div>
                `
            });

            this.onUpdate({
                formattedValue: result.formattedValue,
                details: result.details,
                smdCode: result.code
            });
        } else {
            this.showResult({
                title: 'Error:',
                content: `<p class="text-red-600">${result.error}</p>`
            });

            this.onUpdate({
                formattedValue: 'Invalid',
                details: result.error,
                smdCode: '000'
            });
        }
    }

    showResult(result) {
        const resultsContainer = this.container.querySelector('#smd-results');
        const resultContent = this.container.querySelector('#smd-result-content');

        if (resultsContainer && resultContent) {
            resultContent.innerHTML = `
                <h5 class="font-semibold text-gray-800 mb-2">${result.title}</h5>
                ${result.content}
            `;
            
            resultsContainer.classList.remove('hidden');
            resultsContainer.classList.add('fade-in');
        }
    }

    hideResults() {
        const resultsContainer = this.container.querySelector('#smd-results');
        resultsContainer?.classList.add('hidden');
    }
}