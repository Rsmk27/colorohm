import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ResistorCalculator } from '../utils/ResistorCalculator.js';

describe('ResistorCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new ResistorCalculator();
    });

    describe('decodeSMD', () => {
        it('should route to decode3DigitSMD for 3-digit codeType', () => {
            const spy = vi.spyOn(calculator, 'decode3DigitSMD').mockReturnValue({ success: true, mocked: true });
            const result = calculator.decodeSMD('103', '3-digit');
            expect(spy).toHaveBeenCalledWith('103');
            expect(result).toEqual({ success: true, mocked: true });
            spy.mockRestore();
        });

        it('should route to decode4DigitSMD for 4-digit codeType', () => {
            const spy = vi.spyOn(calculator, 'decode4DigitSMD').mockReturnValue({ success: true, mocked: true });
            const result = calculator.decodeSMD('1002', '4-digit');
            expect(spy).toHaveBeenCalledWith('1002');
            expect(result).toEqual({ success: true, mocked: true });
            spy.mockRestore();
        });

        it('should route to decodeEIA96SMD for eia-96 codeType', () => {
            const spy = vi.spyOn(calculator, 'decodeEIA96SMD').mockReturnValue({ success: true, mocked: true });
            const result = calculator.decodeSMD('01A', 'eia-96');
            expect(spy).toHaveBeenCalledWith('01A');
            expect(result).toEqual({ success: true, mocked: true });
            spy.mockRestore();
        });

        it('should return error for unknown code type', () => {
            const result = calculator.decodeSMD('103', 'unknown');
            expect(result).toEqual({ success: false, error: 'Unknown code type' });
        });

        it('should catch exceptions and return invalid format error', () => {
            // Mock a method to throw an error
            const spy = vi.spyOn(calculator, 'decode3DigitSMD').mockImplementation(() => {
                throw new Error('Some unexpected error');
            });
            const result = calculator.decodeSMD('103', '3-digit');
            expect(result).toEqual({ success: false, error: 'Invalid SMD code format' });
            spy.mockRestore();
        });
    });
});
