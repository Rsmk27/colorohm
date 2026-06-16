import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResistorCalculator } from './ResistorCalculator';

describe('ResistorCalculator - predictColors', () => {
    let calculator;

    beforeEach(() => {
        calculator = new ResistorCalculator();
    });

    it('should correctly predict colors for a 4-band resistor (e.g. 1000 ohms, 5%)', () => {
        const result = calculator.predictColors(1000, 5, 4);

        expect(result.success).toBe(true);
        expect(result.bandCount).toBe(4);
        expect(result.colors).toEqual(['brown', 'black', 'red', 'gold']);
    });

    it('should correctly predict colors for a 5-band resistor (e.g. 1000 ohms, 1%)', () => {
        const result = calculator.predictColors(1000, 1, 5);

        expect(result.success).toBe(true);
        expect(result.bandCount).toBe(5);
        expect(result.colors).toEqual(['brown', 'black', 'black', 'brown', 'brown']);
    });

    it('should fall back to the best available configuration if preferred band count is not found', () => {
        // Find a scenario where a 5-band combination exists but 4-band doesn't,
        // or just mock findAllPossibleColors to simulate this specific fallback behavior.

        // Mock findAllPossibleColors to return only a 5-band result.
        const mockResults = [
            {
                bandCount: 5,
                colors: ['red', 'red', 'red', 'black', 'brown'],
                accuracy: '100.00'
            }
        ];
        vi.spyOn(calculator, 'findAllPossibleColors').mockReturnValue(mockResults);

        // Ask for a 4-band preferred count
        const result = calculator.predictColors(222, 1, 4);

        // It should fallback to the 5-band result because no 4-band result is available
        expect(result.success).toBe(true);
        expect(result.bandCount).toBe(5);
        expect(result.colors).toEqual(['red', 'red', 'red', 'black', 'brown']);

        // Restore the spy
        vi.restoreAllMocks();
    });

    it('should return error when no combinations are found', () => {
        vi.spyOn(calculator, 'findAllPossibleColors').mockReturnValue([]);

        const result = calculator.predictColors(1000, 5, 4);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Cannot represent this value with standard resistor colors');

        vi.restoreAllMocks();
    });

    it('should catch and return errors thrown during calculation', () => {
        vi.spyOn(calculator, 'findAllPossibleColors').mockImplementation(() => {
            throw new Error('Test error');
        });

        const result = calculator.predictColors(1000, 5, 4);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Error in calculation: Test error');

        vi.restoreAllMocks();
    });
});
