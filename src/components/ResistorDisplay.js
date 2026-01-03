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
            <div class="card-glass scale-in">
                <h3 style="font-size: 1.1rem; font-weight: 600; color: var(--color-text-main); margin-bottom: 1.5rem; text-align: center;">
                    ${isSMD ? 'SMD Resistor' : `${this.bandCount}-Band Resistor`}
                </h3>
                
                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px solid var(--color-border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);">
                    ${isSMD ? this.renderSMDResistor() : this.renderThroughHoleResistor()}
                </div>
                
                <div id="resistance-result" style="text-align: center; margin-bottom: 1rem;">
                    <p style="font-size: 0.85rem; font-weight: 500; color: var(--color-text-secondary); margin-bottom: 0.5rem;">Calculated Value</p>
                    <p style="font-size: 2rem; font-weight: 700; background: linear-gradient(to right, var(--color-primary), #a5f3fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;" id="result-value">0 Ω ± 5%</p>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-top: 0.5rem;" id="result-details">Select values to calculate</p>
                </div>

                <!-- Copy Button -->
                <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
                    <button id="copy-value-btn" style="display: flex; align-items: center; gap: 0.5rem; background: transparent; border: 1px solid var(--color-border); color: var(--color-text-secondary); padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; font-size: 0.9rem;">
                        <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div class="resistor-container" style="width: 100%; max-width: 400px;">
                <svg viewBox="0 0 ${bodyWidth + leadLength * 2} ${bodyHeight + 20}" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
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
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 8px; padding: 1.5rem; text-align: center; min-width: 140px; min-height: 70px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid var(--color-border);">
                <span id="smd-code" style="color: var(--color-text-main); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700; letter-spacing: 0.1em;">000</span>
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
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem;">
                    <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5;">
                        <strong style="color: var(--color-text-main);">SMD Codes:</strong> 3-digit codes where first two digits are significant figures 
                        and the third is the multiplier (number of zeros).
                    </p>
                </div>
            `;
        }

        return `
            <div style="display: flex; flex-direction: column; gap: 0.75rem; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid var(--color-border);">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"></path>
                        </svg>
                        Precision:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">${this.bandCount >= 5 ? 'High (3 digits)' : 'Standard (2 digits)'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                        </svg>
                        Tolerance:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">±5% (typical)</span>
                </div>
                ${this.bandCount === 6 ? `
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
                    <span style="color: var(--color-text-muted); display: flex; align-items: center; gap: 0.5rem;">
                        <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                        </svg>
                        Temp. Coefficient:
                    </span>
                    <span style="font-weight: 600; color: var(--color-text-main);">Included</span>
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
                const originalStyle = copyBtn.getAttribute('style');

                copyBtn.style.borderColor = 'var(--color-primary)';
                copyBtn.style.color = 'var(--color-primary)';
                copyBtn.innerHTML = `
                    <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Copied!</span>
                `;

                setTimeout(() => {
                    copyBtn.setAttribute('style', originalStyle);
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