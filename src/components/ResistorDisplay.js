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
            <div class="bg-white rounded-2xl shadow-lg p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-6">
                    ${isSMD ? 'SMD Resistor' : `${this.bandCount}-Band Resistor`}
                </h3>
                
                <div class="flex justify-center items-center mb-6">
                    ${isSMD ? this.renderSMDResistor() : this.renderThroughHoleResistor()}
                </div>
                
                <div id="resistance-result" class="text-center bg-gradient-to-r from-primary-50 to-accent-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-gray-600 mb-1">Calculated Value</p>
                    <p class="text-2xl font-bold text-gray-800" id="result-value">0 Ω ± 5%</p>
                    <p class="text-sm text-gray-500 mt-1" id="result-details">Select values to calculate</p>
                </div>
                
                ${this.renderAdditionalInfo()}
            </div>
        `;
    }

    renderThroughHoleResistor() {
        const leadLength = 40;
        const bodyWidth = 200;
        const bodyHeight = 60;
        const bandWidth = 12;
        const bandSpacing = this.calculateBandSpacing();

        return `
            <div class="resistor-container">
                <svg width="${bodyWidth + leadLength * 2}" height="${bodyHeight + 20}" class="resistor-svg">
                    <!-- Left lead -->
                    <rect x="0" y="${bodyHeight/2 - 1.5}" width="${leadLength}" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Right lead -->
                    <rect x="${bodyWidth + leadLength}" y="${bodyHeight/2 - 1.5}" width="${leadLength}" height="3" 
                          fill="url(#leadGradient)" rx="1.5"/>
                    
                    <!-- Resistor body -->
                    <rect x="${leadLength}" y="10" width="${bodyWidth}" height="${bodyHeight}" 
                          fill="url(#bodyGradient)" rx="8" stroke="#c7a468" stroke-width="1"/>
                    
                    <!-- Resistor bands -->
                    ${this.renderBands(leadLength, bodyWidth, bodyHeight, bandWidth, bandSpacing)}
                    
                    <!-- Gradients -->
                    <defs>
                        <linearGradient id="leadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#cccccc"/>
                            <stop offset="50%" style="stop-color:#888888"/>
                            <stop offset="100%" style="stop-color:#cccccc"/>
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
            <div class="smd-resistor bg-gray-800 rounded-lg p-4 text-center min-w-[120px] min-h-[60px] flex items-center justify-center shadow-lg">
                <span id="smd-code" class="text-white font-mono text-lg font-bold">000</span>
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
                <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-800">
                        <strong>SMD Codes:</strong> 3-digit codes where first two digits are significant figures 
                        and the third is the multiplier (number of zeros).
                    </p>
                </div>
            `;
        }

        return `
            <div class="mt-4 space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Precision:</span>
                    <span class="font-medium">${this.bandCount >= 5 ? 'High (3 digits)' : 'Standard (2 digits)'}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tolerance:</span>
                    <span class="font-medium">±5% (typical)</span>
                </div>
                ${this.bandCount === 6 ? `
                <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Temp. Coefficient:</span>
                    <span class="font-medium">Included</span>
                </div>
                ` : ''}
            </div>
        `;
    }

    handleResize() {
        // Re-render on resize to adjust SVG dimensions
        this.render();
    }
}