import Randomly from '..';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');


describe('Randomly', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.clearAllTimers();
	});

	test('can be created', () => {
		const random = new Randomly();
		expect(random).toBeDefined();
		expect(setTimeout).toHaveBeenCalledTimes(1);
	});

	test('startTimer calls stopTimer', async () => {
		const interval = 500;
		const random = new Randomly({ interval });
		jest.spyOn(random, 'stopTimer');
		random.startTimer();
		expect(random.stopTimer).toHaveBeenCalledTimes(1);
	});
});