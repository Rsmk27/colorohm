import { describe, it, expect, beforeEach } from 'vitest';
import { ResistorCalculator } from './ResistorCalculator';

describe('ResistorCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new ResistorCalculator();
    });

    describe('formatResistance', () => {
        it('should format values under 1000 properly', () => {
            expect(calculator.formatResistance(100)).toBe('100.00 Ω');
            expect(calculator.formatResistance(47)).toBe('47.00 Ω');
        });

        it('should format kilo-ohm values properly', () => {
            expect(calculator.formatResistance(1000)).toBe('1.00 kΩ');
            expect(calculator.formatResistance(4700)).toBe('4.70 kΩ');
            expect(calculator.formatResistance(10000)).toBe('10.00 kΩ');
        });

        it('should format mega-ohm values properly', () => {
            expect(calculator.formatResistance(1000000)).toBe('1.00 MΩ');
            expect(calculator.formatResistance(4700000)).toBe('4.70 MΩ');
        });

        it('should format giga-ohm values properly', () => {
            expect(calculator.formatResistance(1000000000)).toBe('1.00 GΩ');
        });

        it('should format milli-ohm values properly', () => {
            expect(calculator.formatResistance(0.1)).toBe('100.00 mΩ');
        });
    });

    describe('calculateFromColors', () => {
        it('should calculate 4-band resistor values', () => {
            // Brown, Black, Red, Gold = 1 0 * 100 +/- 5% = 1000 ohms +/- 5%
            const result = calculator.calculateFromColors(['brown', 'black', 'red', 'gold'], 4);
            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(5);
        });

        it('should calculate 5-band resistor values', () => {
            // Brown, Black, Black, Brown, Brown = 1 0 0 * 10 +/- 1% = 1000 ohms +/- 1%
            const result = calculator.calculateFromColors(['brown', 'black', 'black', 'brown', 'brown'], 5);
            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(1);
        });

        it('should calculate 6-band resistor values', () => {
            // Brown, Black, Black, Brown, Brown, Red = 1 0 0 * 10 +/- 1%, 50 ppm/K
            const result = calculator.calculateFromColors(['brown', 'black', 'black', 'brown', 'brown', 'red'], 6);
            expect(result.value).toBe(1000);
            expect(result.tolerance).toBe(1);
            expect(result.tempco).toBe(50);
        });
    });

    describe('decodeSMD', () => {
        it('should decode 3-digit SMD codes', () => {
            const result = calculator.decodeSMD('103', '3-digit');
            expect(result.success).toBe(true);
            expect(result.value).toBe(10000); // 10 * 10^3
        });

        it('should fail for invalid 3-digit SMD codes', () => {
            const result = calculator.decodeSMD('10A', '3-digit');
            expect(result.success).toBe(false);
        });

        it('should decode 4-digit SMD codes', () => {
            const result = calculator.decodeSMD('4702', '4-digit');
            expect(result.success).toBe(true);
            expect(result.value).toBe(47000); // 470 * 10^2
        });

        it('should fail for invalid 4-digit SMD codes', () => {
            const result = calculator.decodeSMD('470', '4-digit');
            expect(result.success).toBe(false);
        });

        it('should decode EIA-96 SMD codes', () => {
            // 01A = 100 * 1 = 100 ohms
            const result = calculator.decodeSMD('01A', 'eia-96');
            expect(result.success).toBe(true);
            expect(result.value).toBe(100);
        });

        it('should fail for invalid EIA-96 SMD codes', () => {
            const result = calculator.decodeSMD('XXA', 'eia-96');
            expect(result.success).toBe(false);
        });
    });

    describe('encodeSMD', () => {
        it('should encode resistance to 3-digit SMD code', () => {
            const result = calculator.encodeSMD(10000, '3-digit'); // 10k
            expect(result.success).toBe(true);
            expect(result.code).toBe('103');
        });

        it('should encode resistance to 4-digit SMD code', () => {
            const result = calculator.encodeSMD(47000, '4-digit'); // 47k
            expect(result.success).toBe(true);
            expect(result.code).toBe('4702');
        });

        it('should encode resistance to EIA-96 SMD code', () => {
            const result = calculator.encodeSMD(100, 'eia-96'); // 100 ohm
            expect(result.success).toBe(true);
            expect(result.code).toBe('01A');
        });

        it('should fail encoding resistance out of bounds or missing codes', () => {
             // Example failing encoding depending on implementations
             // EIA-96 only supports exact matches or close ones depending on algorithm, we just make sure we hit some paths.
             // We can just verify success returns appropriately
             const result = calculator.encodeSMD(1, '3-digit');
             expect(result.success).toBe(false);
             expect(result.error).toBe('Value cannot be represented with 3-digit SMD code');
        });
    });
});
