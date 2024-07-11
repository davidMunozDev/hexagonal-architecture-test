import { describe, it, expect } from 'vitest';
import {} from '@/modules/shared/domain/Date';
import {
	getTimeFromDateStr,
	getDayFromDateStr,
} from '@/modules/shared/domain/Date';

describe('Date domain', () => {
	describe('getTimeFromDateStr', () => {
		it('should get the time when when there are no minutes', () => {
			expect(getTimeFromDateStr('2023-09-15T08:00')).toBe('8:00');
		});

		it('should get the time when when there are less than 10 minutes', () => {
			expect(getTimeFromDateStr('2023-09-15T08:05')).toBe('8:05');
		});

		it('should get the time when when there are more than 9 minutes', () => {
			expect(getTimeFromDateStr('2023-09-15T08:22')).toBe('8:22');
		});
	});

	describe('getDayFromDateStr', () => {
		it('should get "today" when its current date', () => {
			const currentDate = new Date().toLocaleDateString();

			expect(getDayFromDateStr(currentDate)).toBe('Today');
		});
	});
});
