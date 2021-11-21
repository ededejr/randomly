export default class Randomly {
  private store: number[];
	private interval: number;
  private timerId: number;

  constructor(options: Randomly.Options = {}) {
    this.store = new Array(options.storeSize || 20).fill(undefined).map(() => Math.random());
		this.interval = options.interval || 1000;
    this.timerId = this.startTimer();
  }

  /**
   * Get a random number between 0 and 1.
   */
  get() {
    return this.$get();
  }

  /**
   * Compare some conditions to a random value using a predicate.
   * @param predicate A function which accepts a number and returns a boolean.
   * @returns boolean
   */
  compare(predicate: Randomly.ComparePredicate) {
    return predicate(this.$get());
  }

  /**
   * Determine if a random value is less than a given threshold.
   * @param threshold A value between 0 and 1
   * @returns boolean
   */
  lt(threshold: number) {
    return this.$get() < threshold;
  }

  /**
   * Determine if a random value is greater than a given threshold.
   * @param threshold A value between 0 and 1
   * @returns boolean
   */
  gt(threshold: number) {
    return this.$get() > threshold;
  }

  /**
   * Determine if a random value is between a lower and upper bound (exclusive)
   * @param lower A lower bound between 0 and 1
   * @param upper An upper bound between 0 and 1
   * @returns boolean
   */
  between(lower: number, upper: number) {
    const entry = this.$get();
    return entry > lower && entry < upper;
  }

  /**
   * Decide between two given options.
   * @param optionA 
   * @param optionB 
   * @param threshold An optional parameter to increase (or decrease) the odds of a given option
   * @returns optionA or optionB
   */
  decide<A, B>(optionA: A, optionB: B, threshold?: number) {
    const _threshold = threshold || Math.min(Math.max(this.$get(), 0.05), 0.95);
    const decider = this.$get() > _threshold;
    return decider ? optionA: optionB;
  }

  /**
   * Get a random number between 0 and n
   * @param n 
   * @returns number
   */
  sample(n: number) {
    return Math.floor(this.$get() * n)
  }

	/**
	 * Start the internal timer which updates
	 * the store of random numbers.
	 * @returns 
	 */
	startTimer() {
		this.randomizeStore();
		this.stopTimer();
		this.timerId = setTimeout(() => this.startTimer(), this.interval);
		return this.timerId;
	}

	/**
	 * Stop the internal timer which updates 
	 * the store of random numbers.
	 */
	stopTimer() {
		if (this.timerId) {
			clearTimeout(this.timerId);
		}
	}

  /**
   * Randomize the store by generating a new set of random numbers.
   * @returns void
   */
  private randomizeStore() {
    if (!this.store) {
      return;
    }

    this.store = this.store.map(_ => Math.random());
  }

  /**
   * Get a random value from the internal store of values.
   * @returns number
   */
  private $get() {
    return this.store[Math.floor(Math.random() * this.store.length)]
  }
}

export declare namespace Randomly {
  export interface Options {
    storeSize?: number;
		interval?: number;
  }
  
  export type ComparePredicate = (n: number) => boolean
}