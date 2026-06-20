import { describe, it, expect, beforeEach } from 'vitest';
import { ResistorCalculator } from './ResistorCalculator.js';

describe('ResistorCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new ResistorCalculator();
    });

    describe('calculateFromColors', () => {
        it('should correctly calculate a 4-band resistor', () => {
            // Brown (1), Black (0), Red (x100), Gold (±5%) = 1000 ohms (1 kΩ)
            const result = calculator.calculateFromColors(['brown', 'black', 'red', 'gold'], 4);

            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(5);
            expect(result.tempco).toBeNull();
            expect(result.formattedValue).toContain('1.00 kΩ');
            expect(result.formattedValue).toContain('±5%');
        });

        it('should correctly calculate a 5-band resistor', () => {
            // Brown (1), Black (0), Black (0), Brown (x10), Brown (±1%) = 1000 ohms (1 kΩ)
            const result = calculator.calculateFromColors(['brown', 'black', 'black', 'brown', 'brown'], 5);

            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(1);
            expect(result.tempco).toBeNull();
            expect(result.formattedValue).toContain('1.00 kΩ');
            expect(result.formattedValue).toContain('±1%');
        });

        it('should correctly calculate a 6-band resistor', () => {
            // Brown (1), Black (0), Black (0), Brown (x10), Brown (±1%), Red (50 ppm) = 1000 ohms (1 kΩ)
            const result = calculator.calculateFromColors(['brown', 'black', 'black', 'brown', 'brown', 'red'], 6);

            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(1);
            expect(result.tempco).toBe(50);
            expect(result.formattedValue).toContain('1.00 kΩ');
            expect(result.formattedValue).toContain('±1%');
            expect(result.details).toContain('50 ppm/°C');
        });

        it('should handle zero value resistor (black band as first digit)', () => {
            // Black (0), Black (0), Black (x1), None (±20%) = 0 ohms
            const result = calculator.calculateFromColors(['black', 'black', 'black', 'none'], 4);

            expect(result.value).toBe(0);
            expect(result.tolerance).toBe(20);
        });

        it('should handle small resistor values (gold/silver multipliers)', () => {
            // Red (2), Red (2), Gold (x0.1), Silver (±10%) = 2.2 ohms
            const result = calculator.calculateFromColors(['red', 'red', 'gold', 'silver'], 4);

            expect(result.value).toBe(2.2);
            expect(result.tolerance).toBe(10);
        });

        it('should handle missing bands gracefully', () => {
            // Only 3 colors provided for a 4-band calculation (missing tolerance)
            const result = calculator.calculateFromColors(['brown', 'black', 'red'], 4);

            // Should default to 20% tolerance
            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(20);
        });

        it('should handle invalid colors by skipping them or defaulting', () => {
            // Invalid color 'pink'
            const result = calculator.calculateFromColors(['brown', 'pink', 'red', 'gold'], 4);

            // Significant digits will be just '1', multiplier red(100) -> 1 * 100 = 100
            expect(result.value).toBe(100);
            expect(result.tolerance).toBe(5);
        });

        it('should return 0 and error details for complete garbage input', () => {
            // This goes to the catch block or yields 0 baseValue
            const result = calculator.calculateFromColors(['invalid', 'colors', 'here'], 4);

            expect(result.value).toBe(0);
        });
    });
});
