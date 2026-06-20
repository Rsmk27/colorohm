import { describe, it, expect, beforeEach } from 'vitest';
import { ResistorCalculator } from '../ResistorCalculator.js';

describe('ResistorCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new ResistorCalculator();
    });

    describe('decodeEIA96SMD', () => {
        it('should decode valid EIA-96 codes correctly', () => {
            const result = calculator.decodeEIA96SMD('01A');
            expect(result.success).toBe(true);
            expect(result.value).toBe(100);
            expect(result.formattedValue).toBe('100.00 Ω ±1%');
        });

        it('should return error for invalid format - letters in value part', () => {
            const result = calculator.decodeEIA96SMD('ABX');
            expect(result.success).toBe(false);
            expect(result.error).toBe('Invalid EIA-96 code format (should be like 01A)');
        });

        it('should return error for invalid format - lowercase letter', () => {
            const result = calculator.decodeEIA96SMD('01a');
            expect(result.success).toBe(false);
            expect(result.error).toBe('Invalid EIA-96 code format (should be like 01A)');
        });

        it('should return error for invalid format - wrong length', () => {
            const result = calculator.decodeEIA96SMD('01AB');
            expect(result.success).toBe(false);
            expect(result.error).toBe('Invalid EIA-96 code format (should be like 01A)');
        });

        it('should return error if code is missing/undefined/null', () => {
            expect(calculator.decodeEIA96SMD(undefined).success).toBe(false);
            expect(calculator.decodeEIA96SMD(null).success).toBe(false);
            expect(calculator.decodeEIA96SMD('').success).toBe(false);
        });

        it('should handle non-string input types gracefully', () => {
            expect(calculator.decodeEIA96SMD({}).success).toBe(false);
            expect(calculator.decodeEIA96SMD([]).success).toBe(false);
            expect(calculator.decodeEIA96SMD(123).success).toBe(false);
            expect(calculator.decodeEIA96SMD(true).success).toBe(false);
        });
    });
});
