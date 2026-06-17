import { describe, it, expect } from 'vitest';
import { ResistorCalculator } from './ResistorCalculator.js';

describe('ResistorCalculator', () => {
    describe('calculateFromColors', () => {
        const calculator = new ResistorCalculator();

        it('should correctly calculate a standard 4-band resistor', () => {
            // Brown (1), Black (0), Red (x100), Gold (±5%) -> 1000Ω ±5%
            const result = calculator.calculateFromColors(['brown', 'black', 'red', 'gold'], 4);

            expect(result).toMatchObject({
                value: 1000,
                formattedValue: '1.00 kΩ ±5%',
                details: '4-band resistor',
                tolerance: 5,
                tempco: null,
                calculation: '10 × 100 = 1000Ω'
            });
        });

        it('should trigger the catch block and return error object for malformed input', () => {
            // By passing an object that throws an error when accessed,
            // we can trigger the catch block in calculateFromColors
            const malformedColors = new Proxy([], {
                get(target, prop) {
                    if (prop === 'length') return 4;
                    // Throw when trying to access array elements like colors[0]
                    throw new Error('Triggered error');
                }
            });

            const result = calculator.calculateFromColors(malformedColors, 4);

            expect(result).toMatchObject({
                value: 0,
                formattedValue: 'Error',
                details: 'Invalid color combination',
                tolerance: 20,
                tempco: null,
                calculation: 'Error in calculation'
            });
        });

        it('should trigger the catch block and return error object for null input', () => {
            const result = calculator.calculateFromColors(null, 4);

            expect(result).toMatchObject({
                value: 0,
                formattedValue: 'Error',
                details: 'Invalid color combination',
                tolerance: 20,
                tempco: null,
                calculation: 'Error in calculation'
            });
        });
    });
});
