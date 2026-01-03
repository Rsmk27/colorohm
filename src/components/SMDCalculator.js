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
            <div class="card-glass slide-up">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; background: rgba(0, 212, 255, 0.1); border-radius: 8px; color: var(--color-primary);">
                        <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                        </svg>
                    </span>
                    SMD Resistor Calculator
                </h3>
                
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <!-- Mode Selection -->
                    <div>
                        <label class="control-label" style="margin-bottom: 0.75rem;">Calculation Mode</label>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <button id="code-to-resistance" class="mode-btn active" style="padding: 1rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg-card); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; text-align: center;">
                                <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--color-text-main);">Code → Resistance</div>
                                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Decode SMD markings</div>
                            </button>
                            <button id="resistance-to-code" class="mode-btn" style="padding: 1rem; border-radius: 8px; border: 1px solid var(--color-border); background: var(--color-bg-card); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; text-align: center;">
                                <div style="font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; color: var(--color-text-main);">Resistance → Code</div>
                                <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Find SMD marking</div>
                            </button>
                        </div>
                    </div>

                    <!-- Code Type Selection -->
                    <div>
                        <label class="control-label">SMD Code Type</label>
                        <div style="position: relative;">
                            <select id="code-type-select" class="select-input">
                                <option value="3-digit">3-Digit Code (e.g., 472)</option>
                                <option value="4-digit">4-Digit Code (e.g., 4702)</option>
                                <option value="eia-96">EIA-96 Code (e.g., 01A)</option>
                            </select>
                        </div>
                    </div>

                    <!-- Code to Resistance Section -->
                    <div id="code-to-resistance-section" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div>
                            <label class="control-label">
                                SMD Code <span style="color: #ef4444;">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="smd-code-input" 
                                class="select-input" 
                                style="font-family: var(--font-mono); text-align: center; font-size: 1.25rem; letter-spacing: 0.1em; text-transform: uppercase;"
                                placeholder="e.g., 472, 4702, 01A"
                                maxlength="4"
                            >
                            <p id="code-help-text" style="font-size: 0.75rem; color: var(--color-text-muted); margin-top: 4px;">Enter the code printed on the SMD resistor</p>
                        </div>
                    </div>

                    <!-- Resistance to Code Section -->
                    <div id="resistance-to-code-section" class="hidden" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label class="control-label">
                                    Resistance Value <span style="color: #ef4444;">*</span>
                                </label>
                                <input 
                                    type="number" 
                                    id="smd-resistance-input" 
                                    class="select-input" 
                                    placeholder="e.g., 4.7"
                                    step="any"
                                    min="0"
                                >
                            </div>
                            
                            <div>
                                <label class="control-label">Unit</label>
                                <div style="position: relative;">
                                    <select id="smd-unit-select" class="select-input">
                                        <option value="1">Ohms (Ω)</option>
                                        <option value="1000">Kiloohms (kΩ)</option>
                                        <option value="1000000">Megaohms (MΩ)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Calculate Button -->
                    <div style="padding-top: 1rem; border-top: 1px solid var(--color-border);">
                        <button id="smd-calculate-btn" class="btn-primary">
                            Calculate
                        </button>
                    </div>

                    <!-- Results Section -->
                    <div id="smd-results" class="hidden slide-up" style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <div id="smd-result-content"></div>
                    </div>

                    <!-- SMD Code Reference -->
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                        <h4 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                            <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            SMD Code Reference
                        </h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; font-size: 0.85rem;">
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">3-Digit Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">First two digits are significant figures, third digit is multiplier.</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 472 = 4.7kΩ</p>
                            </div>
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">4-Digit Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">First three digits are significant figures, fourth digit is multiplier.</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 4702 = 47kΩ</p>
                            </div>
                            <div style="padding: 0.75rem; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--color-border);">
                                <h5 style="color: var(--color-primary); font-weight: 500; margin-bottom: 0.5rem;">EIA-96 Codes</h5>
                                <p style="color: var(--color-text-secondary); font-size: 0.75rem;">Two digits + letter code for high precision (1%).</p>
                                <p style="color: var(--color-text-muted); font-size: 0.75rem; margin-top: 0.5rem; font-family: var(--font-mono);">Ex: 01A = 100Ω</p>
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
                btn.style.borderColor = 'var(--color-primary)';
                btn.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                btn.querySelector('div:first-child').style.color = '#fff';
            } else {
                btn.style.borderColor = 'var(--color-border)';
                btn.style.boxShadow = 'none';
                btn.querySelector('div:first-child').style.color = 'var(--color-text-main)';
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

        if (helpText && codeInput) {
            helpText.textContent = helpTexts[this.codeType];
            codeInput.placeholder = placeholders[this.codeType];
            codeInput.maxLength = this.codeType === 'eia-96' ? 3 : (this.codeType === '4-digit' ? 4 : 3);
        }
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
                    <div style="text-align: center;">
                        <p style="font-size: 2rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; letter-spacing: -0.02em;">${result.formattedValue}</p>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem;">${result.details}</p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; font-size: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Code</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${code}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Type</span>
                                <span style="color: var(--color-text-main);">${this.codeType}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Calc</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${result.calculation}</span>
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
                    <div style="display: flex; align-items: center; gap: 0.75rem; color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                        <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p style="font-size: 0.9rem; font-weight: 500;">${result.error}</p>
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
                    <div style="text-align: center;">
                        <div style="display: inline-block; background: #0f172a; color: #fff; padding: 0.75rem 2rem; border-radius: 6px; font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; border: 1px solid var(--color-border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">
                            ${result.code}
                        </div>
                        <p style="font-size: 0.85rem; color: var(--color-text-secondary); margin-bottom: 1rem;">${result.details}</p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.75rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Input</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${this.calculator.formatResistance(resistanceOhms)}</span>
                            </div>
                            <div>
                                <span style="display: block; color: var(--color-text-muted); text-transform: uppercase; font-size: 0.65rem; letter-spacing: 0.05em;">Actual</span>
                                <span style="font-family: var(--font-mono); color: var(--color-text-main);">${result.formattedValue}</span>
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
                    <div style="display: flex; align-items: center; gap: 0.75rem; color: #f87171; background: rgba(248, 113, 113, 0.1); padding: 0.75rem; border-radius: 6px; border: 1px solid rgba(248, 113, 113, 0.2);">
                        <svg style="width: 20px; height: 20px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <p style="font-size: 0.9rem; font-weight: 500;">${result.error}</p>
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
                <h5 style="font-weight: 600; color: var(--color-text-main); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                    <svg style="width: 16px; height: 16px; color: var(--color-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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