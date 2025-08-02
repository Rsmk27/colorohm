export class ResistorCalculator {
    constructor() {
        this.colorCodes = {
            'black': { digit: 0, multiplier: 1, tolerance: null, tempco: 250, color: '#000000' },
            'brown': { digit: 1, multiplier: 10, tolerance: 1, tempco: 100, color: '#8B4513' },
            'red': { digit: 2, multiplier: 100, tolerance: 2, tempco: 50, color: '#FF0000' },
            'orange': { digit: 3, multiplier: 1000, tolerance: null, tempco: 15, color: '#FFA500' },
            'yellow': { digit: 4, multiplier: 10000, tolerance: null, tempco: 25, color: '#FFFF00' },
            'green': { digit: 5, multiplier: 100000, tolerance: 0.5, tempco: 20, color: '#008000' },
            'blue': { digit: 6, multiplier: 1000000, tolerance: 0.25, tempco: 10, color: '#0000FF' },
            'violet': { digit: 7, multiplier: 10000000, tolerance: 0.1, tempco: 5, color: '#8A2BE2' },
            'grey': { digit: 8, multiplier: 100000000, tolerance: 0.05, tempco: 1, color: '#808080' },
            'white': { digit: 9, multiplier: 1000000000, tolerance: null, tempco: null, color: '#FFFFFF' },
            'gold': { digit: null, multiplier: 0.1, tolerance: 5, tempco: null, color: '#FFD700' },
            'silver': { digit: null, multiplier: 0.01, tolerance: 10, tempco: null, color: '#C0C0C0' },
            'none': { digit: null, multiplier: null, tolerance: 20, tempco: null, color: '#F5F5F5' }
        };

        // EIA-96 standard values for high precision resistors
        this.eia96Values = {
            '01': 100, '02': 102, '03': 105, '04': 107, '05': 110, '06': 113, '07': 115, '08': 118,
            '09': 121, '10': 124, '11': 127, '12': 130, '13': 133, '14': 137, '15': 140, '16': 143,
            '17': 147, '18': 150, '19': 154, '20': 158, '21': 162, '22': 165, '23': 169, '24': 174,
            '25': 178, '26': 182, '27': 187, '28': 191, '29': 196, '30': 200, '31': 205, '32': 210,
            '33': 215, '34': 221, '35': 226, '36': 232, '37': 237, '38': 243, '39': 249, '40': 255,
            '41': 261, '42': 267, '43': 274, '44': 280, '45': 287, '46': 294, '47': 301, '48': 309,
            '49': 316, '50': 324, '51': 332, '52': 340, '53': 348, '54': 357, '55': 365, '56': 374,
            '57': 383, '58': 392, '59': 402, '60': 412, '61': 422, '62': 432, '63': 442, '64': 453,
            '65': 464, '66': 475, '67': 487, '68': 499, '69': 511, '70': 523, '71': 536, '72': 549,
            '73': 562, '74': 576, '75': 590, '76': 604, '77': 619, '78': 634, '79': 649, '80': 665,
            '81': 681, '82': 698, '83': 715, '84': 732, '85': 750, '86': 768, '87': 787, '88': 806,
            '89': 825, '90': 845, '91': 866, '92': 887, '93': 909, '94': 931, '95': 953, '96': 976
        };

        this.eia96Multipliers = {
            'Z': 0.001, 'Y': 0.01, 'X': 0.1, 'A': 1, 'B': 10, 'C': 100, 'D': 1000,
            'E': 10000, 'F': 100000, 'G': 1000000, 'H': 10000000
        };

        // Standard E-series values
        this.standardValues = {
            E12: [1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2],
            E24: [1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1],
            E96: [1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30, 1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74, 1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.15, 2.21, 2.26, 2.32, 2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09, 3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12, 4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49, 5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32, 7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76]
        };
    }

    // Get color data for a specific color
    getColorData(color) {
        return this.colorCodes[color] || this.colorCodes['black'];
    }

    // Get the hex color value for display
    getColorValue(color) {
        return this.getColorData(color).color;
    }

    // Get colors that can be used for a specific type (digit, multiplier, tolerance, tempco)
    getColorsForType(type) {
        return Object.keys(this.colorCodes).filter(color => 
            this.colorCodes[color][type] !== null && this.colorCodes[color][type] !== undefined
        );
    }

    // Calculate resistance from color bands
    calculateFromColors(colors, bandCount) {
        try {
            let significantDigits = '';
            let multiplier = 1;
            let tolerance = 20;
            let tempco = null;

            // Extract significant digits
            const digitCount = bandCount >= 5 ? 3 : 2;
            for (let i = 0; i < digitCount; i++) {
                if (colors[i] && this.colorCodes[colors[i]]) {
                    const digit = this.colorCodes[colors[i]].digit;
                    if (digit !== null) {
                        significantDigits += digit.toString();
                    }
                }
            }

            // Get multiplier
            const multiplierColor = colors[digitCount];
            if (multiplierColor && this.colorCodes[multiplierColor]) {
                multiplier = this.colorCodes[multiplierColor].multiplier || 1;
            }

            // Get tolerance
            const toleranceColor = colors[digitCount + 1];
            if (toleranceColor && this.colorCodes[toleranceColor]) {
                tolerance = this.colorCodes[toleranceColor].tolerance || 20;
            }

            // Get temperature coefficient (6-band only)
            if (bandCount === 6) {
                const tempcoColor = colors[5];
                if (tempcoColor && this.colorCodes[tempcoColor]) {
                    tempco = this.colorCodes[tempcoColor].tempco;
                }
            }

            const baseValue = parseInt(significantDigits) || 0;
            const resistanceValue = baseValue * multiplier;

            return {
                value: resistanceValue,
                formattedValue: this.formatResistance(resistanceValue) + ` ±${tolerance}%`,
                details: `${bandCount}-band resistor${tempco ? ` (${tempco} ppm/°C)` : ''}`,
                tolerance: tolerance,
                tempco: tempco,
                calculation: `${baseValue} × ${multiplier} = ${resistanceValue}Ω`
            };
        } catch (error) {
            return {
                value: 0,
                formattedValue: 'Error',
                details: 'Invalid color combination',
                tolerance: 20,
                tempco: null,
                calculation: 'Error in calculation'
            };
        }
    }

    // Get calculation steps for educational purposes
    getCalculationSteps(colors, bandCount) {
        const steps = [];
        const digitCount = bandCount >= 5 ? 3 : 2;

        // Step 1: Significant digits
        let significantDigits = '';
        for (let i = 0; i < digitCount; i++) {
            if (colors[i] && this.colorCodes[colors[i]]) {
                const digit = this.colorCodes[colors[i]].digit;
                if (digit !== null) {
                    significantDigits += digit.toString();
                    steps.push({
                        description: `Band ${i + 1} (${colors[i]})`,
                        value: digit.toString()
                    });
                }
            }
        }

        // Step 2: Multiplier
        const multiplierColor = colors[digitCount];
        if (multiplierColor && this.colorCodes[multiplierColor]) {
            const multiplier = this.colorCodes[multiplierColor].multiplier || 1;
            steps.push({
                description: `Multiplier (${multiplierColor})`,
                value: `×${multiplier}`
            });
        }

        // Step 3: Final calculation
        const baseValue = parseInt(significantDigits) || 0;
        const multiplier = this.colorCodes[multiplierColor]?.multiplier || 1;
        const result = baseValue * multiplier;
        
        steps.push({
            description: 'Final Result',
            value: this.formatResistance(result)
        });

        return steps;
    }

    // Predict colors from resistance value
    predictColors(resistanceOhms, tolerance, preferredBandCount = 4) {
        try {
            const results = this.findAllPossibleColors(resistanceOhms, tolerance);
            
            if (results.length === 0) {
                return {
                    success: false,
                    error: 'Cannot represent this value with standard resistor colors'
                };
            }

            // Filter by preferred band count if possible
            const preferredResults = results.filter(r => r.bandCount === preferredBandCount);
            const bestResult = preferredResults.length > 0 ? preferredResults[0] : results[0];

            return {
                success: true,
                ...bestResult
            };
        } catch (error) {
            return {
                success: false,
                error: 'Error in calculation: ' + error.message
            };
        }
    }

    // Find all possible color combinations for a resistance value
    findAllPossibleColors(targetResistance, tolerance) {
        const results = [];
        const multipliers = Object.keys(this.colorCodes)
            .filter(color => this.colorCodes[color].multiplier !== null)
            .map(color => ({
                color: color,
                value: this.colorCodes[color].multiplier
            }))
            .sort((a, b) => b.value - a.value);

        // Try 4-band and 5-band configurations
        for (const bandCount of [4, 5]) {
            const digitCount = bandCount === 5 ? 3 : 2;
            
            for (const mult of multipliers) {
                const significantValue = targetResistance / mult.value;
                
                if (significantValue >= Math.pow(10, digitCount - 1) && 
                    significantValue < Math.pow(10, digitCount)) {
                    
                    const rounded = Math.round(significantValue);
                    const digits = rounded.toString().padStart(digitCount, '0');
                    
                    // Check if all digits can be represented as colors
                    const colors = [];
                    let validCombination = true;
                    
                    for (let i = 0; i < digitCount; i++) {
                        const digit = parseInt(digits[i]);
                        const digitColor = Object.keys(this.colorCodes).find(
                            color => this.colorCodes[color].digit === digit
                        );
                        
                        if (!digitColor) {
                            validCombination = false;
                            break;
                        }
                        colors.push(digitColor);
                    }
                    
                    if (validCombination) {
                        colors.push(mult.color); // Multiplier
                        
                        // Find best tolerance color
                        const toleranceColor = this.findBestToleranceColor(tolerance);
                        colors.push(toleranceColor);
                        
                        const calculatedValue = rounded * mult.value;
                        const accuracy = 100 - (Math.abs(calculatedValue - targetResistance) / targetResistance * 100);
                        
                        results.push({
                            colors: colors,
                            bandCount: bandCount,
                            calculatedValue: calculatedValue,
                            formattedValue: this.formatResistance(calculatedValue) + ` ±${tolerance}%`,
                            details: `${bandCount}-band resistor`,
                            accuracy: accuracy.toFixed(2)
                        });
                    }
                }
            }
        }

        // Sort by accuracy (best first)
        return results.sort((a, b) => parseFloat(b.accuracy) - parseFloat(a.accuracy));
    }

    // Find the best tolerance color for a given tolerance value
    findBestToleranceColor(tolerance) {
        const toleranceColors = Object.keys(this.colorCodes).filter(
            color => this.colorCodes[color].tolerance !== null
        );
        
        let bestColor = 'brown'; // Default to 1%
        let bestDiff = Infinity;
        
        for (const color of toleranceColors) {
            const colorTolerance = this.colorCodes[color].tolerance;
            const diff = Math.abs(colorTolerance - tolerance);
            
            if (diff < bestDiff) {
                bestDiff = diff;
                bestColor = color;
            }
        }
        
        return bestColor;
    }

    // SMD resistor code decoding
    decodeSMD(code, codeType) {
        try {
            switch (codeType) {
                case '3-digit':
                    return this.decode3DigitSMD(code);
                case '4-digit':
                    return this.decode4DigitSMD(code);
                case 'eia-96':
                    return this.decodeEIA96SMD(code);
                default:
                    return { success: false, error: 'Unknown code type' };
            }
        } catch (error) {
            return { success: false, error: 'Invalid SMD code format' };
        }
    }

    decode3DigitSMD(code) {
        if (!/^\d{3}$/.test(code)) {
            return { success: false, error: 'Invalid 3-digit code format' };
        }

        const significantDigits = parseInt(code.substring(0, 2));
        const multiplierDigit = parseInt(code.substring(2, 3));
        const multiplier = Math.pow(10, multiplierDigit);
        const resistance = significantDigits * multiplier;

        return {
            success: true,
            value: resistance,
            formattedValue: this.formatResistance(resistance),
            details: '3-digit SMD code',
            calculation: `${significantDigits} × 10^${multiplierDigit} = ${resistance}Ω`
        };
    }

    decode4DigitSMD(code) {
        if (!/^\d{4}$/.test(code)) {
            return { success: false, error: 'Invalid 4-digit code format' };
        }

        const significantDigits = parseInt(code.substring(0, 3));
        const multiplierDigit = parseInt(code.substring(3, 4));
        const multiplier = Math.pow(10, multiplierDigit);
        const resistance = significantDigits * multiplier;

        return {
            success: true,
            value: resistance,
            formattedValue: this.formatResistance(resistance),
            details: '4-digit SMD code (high precision)',
            calculation: `${significantDigits} × 10^${multiplierDigit} = ${resistance}Ω`
        };
    }

    decodeEIA96SMD(code) {
        if (!/^\d{2}[A-Z]$/.test(code)) {
            return { success: false, error: 'Invalid EIA-96 code format (should be like 01A)' };
        }

        const valueCode = code.substring(0, 2);
        const multiplierCode = code.substring(2, 3);

        if (!this.eia96Values[valueCode]) {
            return { success: false, error: 'Invalid EIA-96 value code' };
        }

        if (!this.eia96Multipliers[multiplierCode]) {
            return { success: false, error: 'Invalid EIA-96 multiplier code' };
        }

        const baseValue = this.eia96Values[valueCode];
        const multiplier = this.eia96Multipliers[multiplierCode];
        const resistance = baseValue * multiplier;

        return {
            success: true,
            value: resistance,
            formattedValue: this.formatResistance(resistance) + ' ±1%',
            details: 'EIA-96 SMD code (1% tolerance)',
            calculation: `${baseValue} × ${multiplier} = ${resistance}Ω`
        };
    }

    // SMD resistor code encoding
    encodeSMD(resistanceOhms, codeType) {
        try {
            switch (codeType) {
                case '3-digit':
                    return this.encode3DigitSMD(resistanceOhms);
                case '4-digit':
                    return this.encode4DigitSMD(resistanceOhms);
                case 'eia-96':
                    return this.encodeEIA96SMD(resistanceOhms);
                default:
                    return { success: false, error: 'Unknown code type' };
            }
        } catch (error) {
            return { success: false, error: 'Cannot encode this resistance value' };
        }
    }

    encode3DigitSMD(resistanceOhms) {
        // Find the best representation with 2 significant digits
        let bestCode = null;
        let bestDiff = Infinity;

        for (let multiplierPower = 0; multiplierPower <= 9; multiplierPower++) {
            const multiplier = Math.pow(10, multiplierPower);
            const significantValue = resistanceOhms / multiplier;

            if (significantValue >= 10 && significantValue < 100) {
                const rounded = Math.round(significantValue);
                const calculatedValue = rounded * multiplier;
                const diff = Math.abs(calculatedValue - resistanceOhms);

                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestCode = {
                        code: rounded.toString() + multiplierPower.toString(),
                        calculatedValue: calculatedValue,
                        multiplierPower: multiplierPower
                    };
                }
            }
        }

        if (!bestCode) {
            return { success: false, error: 'Value cannot be represented with 3-digit SMD code' };
        }

        const accuracy = 100 - (bestDiff / resistanceOhms * 100);

        return {
            success: true,
            code: bestCode.code,
            value: bestCode.calculatedValue,
            formattedValue: this.formatResistance(bestCode.calculatedValue),
            details: '3-digit SMD code',
            accuracy: accuracy.toFixed(2)
        };
    }

    encode4DigitSMD(resistanceOhms) {
        // Find the best representation with 3 significant digits
        let bestCode = null;
        let bestDiff = Infinity;

        for (let multiplierPower = 0; multiplierPower <= 9; multiplierPower++) {
            const multiplier = Math.pow(10, multiplierPower);
            const significantValue = resistanceOhms / multiplier;

            if (significantValue >= 100 && significantValue < 1000) {
                const rounded = Math.round(significantValue);
                const calculatedValue = rounded * multiplier;
                const diff = Math.abs(calculatedValue - resistanceOhms);

                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestCode = {
                        code: rounded.toString() + multiplierPower.toString(),
                        calculatedValue: calculatedValue,
                        multiplierPower: multiplierPower
                    };
                }
            }
        }

        if (!bestCode) {
            return { success: false, error: 'Value cannot be represented with 4-digit SMD code' };
        }

        const accuracy = 100 - (bestDiff / resistanceOhms * 100);

        return {
            success: true,
            code: bestCode.code,
            value: bestCode.calculatedValue,
            formattedValue: this.formatResistance(bestCode.calculatedValue),
            details: '4-digit SMD code (high precision)',
            accuracy: accuracy.toFixed(2)
        };
    }

    encodeEIA96SMD(resistanceOhms) {
        let bestMatch = null;
        let bestDiff = Infinity;

        // Try all EIA-96 combinations
        for (const [valueCode, baseValue] of Object.entries(this.eia96Values)) {
            for (const [multiplierCode, multiplier] of Object.entries(this.eia96Multipliers)) {
                const calculatedValue = baseValue * multiplier;
                const diff = Math.abs(calculatedValue - resistanceOhms);

                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestMatch = {
                        code: valueCode + multiplierCode,
                        calculatedValue: calculatedValue,
                        baseValue: baseValue,
                        multiplier: multiplier
                    };
                }
            }
        }

        if (!bestMatch) {
            return { success: false, error: 'Value cannot be represented with EIA-96 code' };
        }

        const accuracy = 100 - (bestDiff / resistanceOhms * 100);

        return {
            success: true,
            code: bestMatch.code,
            value: bestMatch.calculatedValue,
            formattedValue: this.formatResistance(bestMatch.calculatedValue) + ' ±1%',
            details: 'EIA-96 SMD code (1% tolerance)',
            accuracy: accuracy.toFixed(2)
        };
    }

    // Format resistance value for display
    formatResistance(value) {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(2)} GΩ`;
        } else if (value >= 1000000) {
            return `${(value / 1000000).toFixed(2)} MΩ`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(2)} kΩ`;
        } else if (value >= 1) {
            return `${value.toFixed(2)} Ω`;
        } else {
            return `${(value * 1000).toFixed(2)} mΩ`;
        }
    }
}