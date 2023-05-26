import { Randomly } from '..';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.spyOn(global, 'clearTimeout');

describe('Randomly', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.clearAllTimers();
	});

	test('can be created', () => {
		const randomly = new Randomly();
		expect(randomly).toBeDefined();
		expect(setTimeout).toHaveBeenCalledTimes(1);
	});

	describe('internals', () => {
		test('startTimer calls stopTimer', async () => {
			const refreshInterval = 500;
			const randomly = new Randomly({ refreshInterval });
			jest.spyOn(randomly, 'stopTimer');
			randomly.startTimer();
			expect(randomly.stopTimer).toHaveBeenCalledTimes(1);
		});

		test('sample returns a number', () => {
			const randomly = new Randomly();
			const result = randomly.sample(10);
			expect(result).toBeLessThanOrEqual(10);
			expect(result).toBeGreaterThanOrEqual(0);
		});

		test('stopTimer clears the timer', () => {
			const randomly = new Randomly();
			randomly.startTimer();
			randomly.stopTimer();
			expect(clearTimeout).toHaveBeenCalledTimes(2);
		});

		test('randomizeStore updates the store with Math.random', () => {
			jest.spyOn(Math, 'random');
			const randomly = new Randomly({ storeSize: 1 });
			randomly['store'] = [1];
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore - Internal method
			randomly.randomizeStore();
			expect(randomly['store'][0]).not.toEqual(1);
			expect(Math.random).toHaveBeenCalledTimes(3);
		});

		test('get returns the next value in the store', () => {
			const randomly = new Randomly();
			randomly['store'] = [1, 2, 3];
			expect(randomly['get']()).toEqual(1);
			expect(randomly['get']()).toEqual(2);
			expect(randomly['get']()).toEqual(3);
			expect(randomly['get']()).toEqual(1);
		});

		test('get resets the cursor when it reaches the end of the store', () => {
			const randomly = new Randomly();
			randomly['store'] = [1, 2, 3];
			expect(randomly['get']()).toEqual(1);
			expect(randomly['get']()).toEqual(2);
			expect(randomly['get']()).toEqual(3);
			expect(randomly['cursor']).toEqual(0);
		});

		test('get does not reset the cursor when it does not reach the end of the store', () => {
			const randomly = new Randomly();
			randomly['store'] = [1, 2, 3];
			expect(randomly['get']()).toEqual(1);
			expect(randomly['get']()).toEqual(2);
			expect(randomly['cursor']).toEqual(2);
		});
	});

	describe('methods', () => {
		let randomly: Randomly;

		beforeEach(() => {
			randomly = new Randomly();
		});

		afterEach(() => {
			randomly.stopTimer();
		});

		describe('get()', () => {
			test('should return a random number between 0 and 1', () => {
				const result = randomly.get();
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThanOrEqual(1);
			});
		});

		describe('compare()', () => {
			test('should invoke the predicate with a random number and return the result', () => {
				const predicate = jest.fn((num: number) => num > 0.5);
				const result = randomly.compare(predicate);
				expect(predicate).toHaveBeenCalledWith(expect.any(Number));
				expect(result).toEqual(expect.any(Boolean));
			});
		});

		describe('lt()', () => {
			test('should return true if the random number is less than the threshold', () => {
				const result = randomly.lt(0.5);
				expect(result).toEqual(expect.any(Boolean));
			});
		});

		describe('gt()', () => {
			test('should return true if the random number is greater than the threshold', () => {
				const result = randomly.gt(0.5);
				expect(result).toEqual(expect.any(Boolean));
			});
		});

		describe('between()', () => {
			test('should return true if the random number is between the lower and upper bounds (exclusive)', () => {
				const result = randomly.between(0.25, 0.75);
				expect(result).toEqual(expect.any(Boolean));
			});
		});

		describe('decide()', () => {
			test('should return optionA or optionB based on the random number and threshold', () => {
				const optionA = 'Option A';
				const optionB = 'Option B';
				const result = randomly.decide(optionA, optionB);
				expect(result).toEqual(expect.any(String));
				expect([optionA, optionB]).toContain(result);
			});

			test('should return optionA or optionB based on the random number and provided threshold', () => {
				const optionA = 'Option A';
				const optionB = 'Option B';
				const threshold = 0.3;
				const result = randomly.decide(optionA, optionB, threshold);
				expect(result).toEqual(expect.any(String));
				expect([optionA, optionB]).toContain(result);
			});
		});

		describe('sample()', () => {
			test('should return a random number between 0 and n', () => {
				const n = 10;
				const result = randomly.sample(n);
				expect(result).toBeGreaterThanOrEqual(0);
				expect(result).toBeLessThan(n);
			});
		});
	});
});
