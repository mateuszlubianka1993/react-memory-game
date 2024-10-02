import { formatDate } from '../formaters';

describe('formatDate', () => {
    it('should format date string correctly', () => {
        const input = '2023-10-05';
        const expectedOutput = '5/10/2023';
        expect(formatDate(input)).toBe(expectedOutput);
    });

    it('should handle single digit day and month correctly', () => {
        const input = '2023-01-09';
        const expectedOutput = '9/1/2023';
        expect(formatDate(input)).toBe(expectedOutput);
    });

    it('should handle different date formats', () => {
        const input = '2023-12-25';
        const expectedOutput = '25/12/2023';
        expect(formatDate(input)).toBe(expectedOutput);
    });

    it('should return "Invalid Date" for invalid date strings', () => {
        const input = 'invalid-date';
        const expectedOutput = 'NaN/NaN/NaN';
        expect(formatDate(input)).toBe(expectedOutput);
    });
});
