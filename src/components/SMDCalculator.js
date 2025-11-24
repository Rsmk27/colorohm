export class SMDCalculator {
    constructor(container, calculator, onUpdate) {
        this.container = container;
        this.calculator = calculator;
        this.onUpdate = onUpdate;
        this.codeType = '3-digit';
        this.currentMode = 'code-to-resistance';
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
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                    </span>
                    SMD Resistor Calculator
                </h3>
                
                <div class="space-y-6">
                    <!-- Mode Selection -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-300 mb-3">Calculation Mode</label>
                        <div class="grid grid-cols-2 gap-4">
                            <button id="code-to-resistance" class="mode-btn active group relative p-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                                <div class="relative z-10 text-center">
                                    <div class="text-lg font-semibold mb-1">Code → Resistance</div>
                                    <div class="text-sm text-slate-400">Decode SMD markings</div>
                                </div>
                            </button>
                            <button id="resistance-to-code" class="mode-btn group relative p-4 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 overflow-hidden">
                                <div class="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                                <div class="relative z-10 text-center">
                                    <div class="text-lg font-semibold mb-1">Resistance → Code</div>
                                    <div class="text-sm text-slate-400">Find SMD marking</div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Code Type Selection -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-300 mb-3">SMD Code Type</label>
                        <div class="relative">
                            <select id="code-type-select" class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 appearance-none cursor-pointer">
                                <option value="3-digit">3-Digit Code (e.g., 472)</option>
                                <option value="4-digit">4-Digit Code (e.g., 4702)</option>
                                <option value="eia-96">EIA-96 Code (e.g., 01A)</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Code to Resistance Section -->
                    <div id="code-to-resistance-section" class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-300 mb-2">
                                SMD Code <span class="text-red-400">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="smd-code-input" 
                                class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-lg font-mono text-center rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-3 placeholder-slate-500 uppercase" 
                                placeholder="e.g., 472, 4702, 01A"
                                maxlength="4"
                            >
                            <p class="text-xs text-slate-500 mt-1" id="code-help-text">Enter the code printed on the SMD resistor</p>
                        </div>
                    </div>

                    <!-- Resistance to Code Section -->
                    <div id="resistance-to-code-section" class="hidden space-y-4">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-semibold text-slate-300 mb-2">
                                    Resistance Value <span class="text-red-400">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="smd-resistance-input" 
                                    class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 placeholder-slate-500" 
                                    placeholder="e.g., 4.7, 100, 10000"
                                    step="any"
                                    min="0"
                                >
                            </div>
                            
                            <div>
                                <label class="block text-sm font-semibold text-slate-300 mb-2">Unit</label>
                                <div class="relative">
                                    <select id="smd-unit-select" class="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 appearance-none cursor-pointer">
                                        <option value="1">Ohms (Ω)</option>
                                        <option value="1000">Kiloohms (kΩ)</option>
                                        <option value="1000000">Megaohms (MΩ)</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calculate Button -->
                    <div class="pt-4 border-t border-slate-700/50">
                        <button id="smd-calculate-btn" class="btn-primary w-full py-3 px-6 text-base font-semibold shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300">
                            Calculate
                        </button>
                    </div>

                    <!-- Results Section -->
                    <div id="smd-results" class="hidden bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                        <div id="smd-result-content" class="space-y-2"></div>
                    </div>

                    <!-- SMD Code Reference -->
                    <div class="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                        <h4 class="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                            <svg class="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            SMD Code Reference
                        </h4>
                        <div class="grid md:grid-cols-3 gap-4 text-sm">
                            <div class="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                                <h5 class="font-medium text-primary-400 mb-2">3-Digit Codes</h5>
                                <p class="text-slate-400 text-xs">First two digits are significant figures, third digit is multiplier (number of zeros)</p>
                                <p class="text-slate-500 text-xs mt-2 font-mono">Ex: 472 = 4.7kΩ</p>
                            </div>
                            <div class="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                                <h5 class="font-medium text-primary-400 mb-2">4-Digit Codes</h5>
                                <p class="text-slate-400 text-xs">First three digits are significant figures, fourth digit is multiplier</p>
                                <p class="text-slate-500 text-xs mt-2 font-mono">Ex: 4702 = 47kΩ</p>
                            </div>
                            <div class="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30">
                                <h5 class="font-medium text-primary-400 mb-2">EIA-96 Codes</h5>
                                <p class="text-slate-400 text-xs">Two digits + letter code for high precision resistors (1% tolerance)</p>
                                <p class="text-slate-500 text-xs mt-2 font-mono">Ex: 01A = 100Ω</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.updateButtonStyles();
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
        const codeToResistanceSection = this.container.querySelector('#code-to-resistance-section');
        const resistanceToCodeSection = this.container.querySelector('#resistance-to-code-section');

        if (mode === 'code-to-resistance') {
            codeToResistanceSection.classList.remove('hidden');
            resistanceToCodeSection.classList.add('hidden');
        } else {
            resistanceToCodeSection.classList.remove('hidden');
            codeToResistanceSection.classList.add('hidden');
        }

        this.currentMode = mode;
        this.updateButtonStyles();
        this.calculate();
    }

    updateButtonStyles() {
        const codeToResistanceBtn = this.container.querySelector('#code-to-resistance');
        const resistanceToCodeBtn = this.container.querySelector('#resistance-to-code');

        [codeToResistanceBtn, resistanceToCodeBtn].forEach(btn => {
            const isActive = (btn.id === this.currentMode);
            btn.classList.toggle('active', isActive);

            if (isActive) {
                btn.classList.add('bg-slate-800', 'border-primary-500', 'text-primary-400', 'shadow-lg', 'shadow-primary-500/10');
                btn.classList.remove('border-slate-700', 'text-slate-400', 'hover:border-slate-600');
            } else {
                btn.classList.remove('bg-slate-800', 'border-primary-500', 'text-primary-400', 'shadow-lg', 'shadow-primary-500/10');
                btn.classList.add('border-slate-700', 'text-slate-400', 'hover:border-slate-600');
            }
        });
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
                title: 'Decoded Resistance',
                content: `
                    <div class="text-center">
                        <p class="text-3xl font-bold text-white mb-2 tracking-tight">${result.formattedValue}</p>
                        <p class="text-sm text-slate-400 mb-4">${result.details}</p>
                        <div class="grid grid-cols-3 gap-2 text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                            <div>
                                <span class="block text-slate-600 uppercase tracking-wider text-[10px]">Code</span>
                                <span class="font-mono text-slate-300">${code}</span>
                            </div>
                            <div>
                                <span class="block text-slate-600 uppercase tracking-wider text-[10px]">Type</span>
                                <span class="text-slate-300">${this.codeType}</span>
                            </div>
                            <div>
                                <span class="block text-slate-600 uppercase tracking-wider text-[10px]">Calc</span>
                                <span class="font-mono text-slate-300">${result.calculation}</span>
                            </div>
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
                title: 'Error',
                content: `
                    <div class="flex items-center gap-3 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-sm font-medium">${result.error}</p>
                    </div>
                `
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
                title: 'SMD Code',
                content: `
                    <div class="text-center">
                        <div class="inline-block bg-slate-900 text-white px-8 py-4 rounded-lg font-mono text-3xl font-bold mb-3 shadow-inner border border-slate-700">
                            ${result.code}
                        </div>
                        <p class="text-sm text-slate-400 mb-4">${result.details}</p>
                        <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                            <div>
                                <span class="block text-slate-600 uppercase tracking-wider text-[10px]">Input</span>
                                <span class="font-mono text-slate-300">${this.calculator.formatResistance(resistanceOhms)}</span>
                            </div>
                            <div>
                                <span class="block text-slate-600 uppercase tracking-wider text-[10px]">Actual</span>
                                <span class="font-mono text-slate-300">${result.formattedValue}</span>
                            </div>
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
                title: 'Error',
                content: `
                    <div class="flex items-center gap-3 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p class="text-sm font-medium">${result.error}</p>
                    </div>
                `
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
                <h5 class="font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    ${result.title}
                </h5>
                ${result.content}
            `;

            resultsContainer.classList.remove('hidden');
            resultsContainer.classList.add('slide-up');
        }
    }

    hideResults() {
        const resultsContainer = this.container.querySelector('#smd-results');
        resultsContainer?.classList.add('hidden');
    }
}