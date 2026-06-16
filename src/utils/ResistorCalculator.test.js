import { describe, it, expect } from 'vitest';
import { ResistorCalculator } from './ResistorCalculator.js';

describe('ResistorCalculator', () => {
    describe('decode3DigitSMD', () => {
        const calculator = new ResistorCalculator();

        it('should correctly decode valid 3-digit SMD codes', () => {
            const result = calculator.decode3DigitSMD('103');
            expect(result.success).toBe(true);
            expect(result.value).toBe(10000); // 10 * 10^3
            expect(result.formattedValue).toBe('10.00 kΩ');
            expect(result.calculation).toBe('10 × 10^3 = 10000Ω');

            const result2 = calculator.decode3DigitSMD('220');
            expect(result2.success).toBe(true);
            expect(result2.value).toBe(22); // 22 * 10^0
        });

        it('should return error for invalid format', () => {
            // Test non-numeric characters
            const result1 = calculator.decode3DigitSMD('abc');
            expect(result1.success).toBe(false);
            expect(result1.error).toBe('Invalid 3-digit code format');

            // Test less than 3 digits
            const result2 = calculator.decode3DigitSMD('12');
            expect(result2.success).toBe(false);
            expect(result2.error).toBe('Invalid 3-digit code format');

            // Test more than 3 digits
            const result3 = calculator.decode3DigitSMD('1234');
            expect(result3.success).toBe(false);
            expect(result3.error).toBe('Invalid 3-digit code format');

            // Test alpha-numeric (looks like EIA-96)
            const result4 = calculator.decode3DigitSMD('01A');
            expect(result4.success).toBe(false);
            expect(result4.error).toBe('Invalid 3-digit code format');

            // Test with R (some 3-digit formats use R, but this function does not)
            const result5 = calculator.decode3DigitSMD('1R2');
            expect(result5.success).toBe(false);
            expect(result5.error).toBe('Invalid 3-digit code format');

            // Test empty string
            const result6 = calculator.decode3DigitSMD('');
            expect(result6.success).toBe(false);
            expect(result6.error).toBe('Invalid 3-digit code format');
        });
    });
});
