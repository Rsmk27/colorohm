export class ResistorDisplay {
    constructor(container, calculator) {
        this.container = container;
        this.calculator = calculator;
        this.mode = 'color-to-resistance';
        this.bandCount = 4;
        this.currentColors = ['black', 'black', 'black', 'brown', 'brown'];
        this.animationTimeout = null;
    }

    init() {
        this.render();
    }

    setMode(mode, bandCount) {
        this.mode = mode;
        this.bandCount = bandCount;
        this.render();
    }

    render() {
        const isSMD = this.mode === 'smd-calculator';

        this.container.innerHTML = `
            <div class="glass-card p-6 scale-in border border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
                <h3 class="text-lg font-bold text-slate-200 mb-6 font-display">
                    ${isSMD ? 'SMD Resistor' : `${this.bandCount}-Band Resistor`}
                </h3>
                
                <div class="flex justify-center items-center mb-6 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 shadow-inner">
                    ${isSMD ? this.renderSMDResistor() : this.renderThroughHoleResistor()}
                </div>
                
                <div id="resistance-result" class="result-display text-center mb-4">
                    <p class="text-sm font-medium text-slate-400 mb-2">Calculated Value</p>
                    <p class="text-3xl font-bold bg-gradient-to-r from-primary-400 to-primary-200 bg-clip-text text-transparent" id="result-value">0 Ω ± 5%</p>
                    <p class="text-sm text-slate-500 mt-2" id="result-details">Select values to calculate</p>
                </div>

                <!-- Copy Button -->
                <div class="flex justify-center mb-4">
                    <button id="copy-value-btn" class="copy-btn">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Copy Value</span>
                    </button>
                </div>
                
                ${this.renderAdditionalInfo()}
            </div>
        `;

        // Bind copy button event
        this.bindCopyButton();
    }

    renderThroughHoleResistor() {
        const leadLength = 40;
        const bodyWidth = 200;
        const bodyHeight = 60;
        const bandWidth = 12;
        const bandSpacing = this.calculateBandSpacing();

        return `
            <div class="resistor-container w-full">
                <svg viewBox="0 0 ${bodyWidth + leadLength * 2} ${bodyHeight + 20}" class="resistor-svg w-full h-auto filter drop-shadow-lg max-w-[400px] mx-auto block">
                    <!-- Left lead -->
                    <rect x="0" y="${bodyHeight / 2 - 1.5}" width="${leadLength}" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Right lead -->
                    <rect x="${bodyWidth + leadLength}" y="${bodyHeight / 2 - 1.5}" width="${leadLength}" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Resistor body -->
                    <rect x="${leadLength}" y="10" width="${bodyWidth}" height="${bodyHeight}" 
                          fill="url(#bodyGradient)" rx="8" stroke="#854d0e" stroke-width="1"/>
                    
                    <!-- Resistor bands -->
                    ${this.renderBands(leadLength, bodyWidth, bodyHeight, bandWidth, bandSpacing)}
                    
                    <!-- Gradients -->
                    <defs>
                        <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#94a3b8"/>
                            <stop offset="50%" style="stop-color:#64748b"/>
                            <stop offset="100%" style="stop-color:#94a3b8"/>
                        </linearGradient>
                        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#f7d794"/>
                            <stop offset="20%" style="stop-color:#d4b472"/>
                            <stop offset="80%" style="stop-color:#d4b472"/>
                            <stop offset="100%" style="stop-color:#f7d794"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        `;
    }

    renderSMDResistor() {
        return `
            <div class="smd-resistor bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-center min-w-[140px] min-h-[70px] flex items-center justify-center shadow-xl border border-slate-700">
                <span id="smd-code" class="text-slate-200 font-mono text-2xl font-bold tracking-wider">000</span>
            </div>
        `;
    }

    renderBands(leadLength, bodyWidth, bodyHeight, bandWidth, bandSpacing) {
        let bandsHTML = '';
        const startX = leadLength + 20;

        for (let i = 0; i < this.bandCount; i++) {
            const isToleranceBand = (this.bandCount === 4 && i === 3) ||
                (this.bandCount === 5 && i === 4) ||
                (this.bandCount === 6 && i === 5);
            const isTempCoeffBand = this.bandCount === 6 && i === 5;

            let xPosition;
            if (isToleranceBand) {
                // Position tolerance band towards the right
                xPosition = leadLength + bodyWidth - 30;
            } else if (isTempCoeffBand) {
                // Position temperature coefficient band at the far right
                xPosition = leadLength + bodyWidth - 15;
            } else {
                xPosition = startX + (i * bandSpacing);
            }

            const color = this.currentColors[i] || 'black';
            const colorValue = this.calculator.getColorValue(color);

            bandsHTML += `
                <rect x="${xPosition}" y="15" width="${bandWidth}" height="${bodyHeight - 10}" 
                      fill="${colorValue}" stroke="rgba(0,0,0,0.3)" stroke-width="1" rx="2"
                      class="resistor-band" data-band="${i}"/>
            `;
        }

        return bandsHTML;
    }

    calculateBandSpacing() {
        const availableWidth = 120; // Space available for bands
        return availableWidth / Math.max(this.bandCount - 1, 1);
    }

    updateFromCalculation(result) {
        if (!result) return;

        // Update colors if provided
        if (result.colors) {
            this.currentColors = result.colors;
        }

        // Update the display
        this.updateResult(result);

        // Re-render if needed
        if (this.mode !== 'smd-calculator') {
            this.updateBandColors();
        } else {
            this.updateSMDCode(result.smdCode || '000');
        }

        // Add animation
        this.animateUpdate();
    }

    updateBandColors() {
        const bands = this.container.querySelectorAll('.resistor-band');
        bands.forEach((band, index) => {
            if (index < this.currentColors.length) {
                const color = this.currentColors[index];
                const colorValue = this.calculator.getColorValue(color);
                band.setAttribute('fill', colorValue);
            }
        });
    }

    updateSMDCode(code) {
        const smdCodeElement = this.container.querySelector('#smd-code');
        if (smdCodeElement) {
            smdCodeElement.textContent = code;
        }
    }

    updateResult(result) {
        const resultValue = this.container.querySelector('#result-value');
        const resultDetails = this.container.querySelector('#result-details');

        if (resultValue) {
            resultValue.textContent = result.formattedValue || '0 Ω';
        }

        if (resultDetails) {
            resultDetails.textContent = result.details || 'Calculation complete';
        }
    }

    animateUpdate() {
        // Clear any existing animation
        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout);
        }

        // Add pulse animation
        const resultElement = this.container.querySelector('#resistance-result');
        resultElement.classList.add('pulse-subtle');

        this.animationTimeout = setTimeout(() => {
            resultElement.classList.remove('pulse-subtle');
        }, 1000);
    }

    renderAdditionalInfo() {
        if (this.mode === 'smd-calculator') {
            return `
                <div class="info-card bg-slate-800/50 border border-slate-700/50">
                    <p class="text-sm text-slate-400">
                        <strong class="text-slate-200">SMD Codes:</strong> 3-digit codes where first two digits are significant figures 
                        and the third is the multiplier (number of zeros).
                    </p>
                </div>
            `;
        }

        return `
            <div class="space-y-3 p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50">
                <div class="flex justify-between text-sm items-center">
                    <span class="text-slate-400 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path>
                        </svg>
                        Precision:
                    </span>
                    <span class="font-semibold text-slate-200">${this.bandCount >= 5 ? 'High (3 digits)' : 'Standard (2 digits)'}</span>
                </div>
                <div class="flex justify-between text-sm items-center">
                    <span class="text-slate-400 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Tolerance:
                    </span>
                    <span class="font-semibold text-slate-200">±5% (typical)</span>
                </div>
                ${this.bandCount === 6 ? `
                <div class="flex justify-between text-sm items-center">
                    <span class="text-slate-400 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                        </svg>
                        Temp. Coefficient:
                    </span>
                    <span class="font-semibold text-slate-200">Included</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    bindCopyButton() {
        const copyBtn = document.getElementById('copy-value-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyValue());
        }
    }

    copyValue() {
        const resultValue = this.container.querySelector('#result-value');
        if (resultValue) {
            const text = resultValue.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const copyBtn = document.getElementById('copy-value-btn');
                const originalHTML = copyBtn.innerHTML;

                copyBtn.classList.add('copied');
                copyBtn.innerHTML = `
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Copied!</span>
                `;

                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = originalHTML;
                }, 2000);
            });
        }
    }

    handleResize() {
        // Re-render on resize to adjust SVG dimensions
        this.render();
    }
}