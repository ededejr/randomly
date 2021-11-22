export default class Randomly {
    private store;
    private interval;
    private timerId?;
    constructor(options?: Randomly.Options);
    /**
     * Get a random number between 0 and 1.
     */
    get(): number;
    /**
     * Compare some conditions to a random value using a predicate.
     * @param predicate A function which accepts a number and returns a boolean.
     * @returns boolean
     */
    compare(predicate: Randomly.ComparePredicate): boolean;
    /**
     * Determine if a random value is less than a given threshold.
     * @param threshold A value between 0 and 1
     * @returns boolean
     */
    lt(threshold: number): boolean;
    /**
     * Determine if a random value is greater than a given threshold.
     * @param threshold A value between 0 and 1
     * @returns boolean
     */
    gt(threshold: number): boolean;
    /**
     * Determine if a random value is between a lower and upper bound (exclusive)
     * @param lower A lower bound between 0 and 1
     * @param upper An upper bound between 0 and 1
     * @returns boolean
     */
    between(lower: number, upper: number): boolean;
    /**
     * Decide between two given options.
     * @param optionA
     * @param optionB
     * @param threshold An optional parameter to increase (or decrease) the odds of a given option
     * @returns optionA or optionB
     */
    decide<A, B>(optionA: A, optionB: B, threshold?: number): A | B;
    /**
     * Get a random number between 0 and n
     * @param n
     * @returns number
     */
    sample(n: number): number;
    /**
       * Start the internal timer which updates
       * the store of random numbers.
       * @returns
       */
    startTimer(): void;
    /**
       * Stop the internal timer which updates
       * the store of random numbers.
       */
    stopTimer(): void;
    /**
     * Randomize the store by generating a new set of random numbers.
     * @returns void
     */
    private randomizeStore;
    /**
     * Get a random value from the internal store of values.
     * @returns number
     */
    private $get;
}
export declare namespace Randomly {
    interface Options {
        storeSize?: number;
        interval?: number;
    }
    type ComparePredicate = (n: number) => boolean;
}
//# sourceMappingURL=index.d.ts.map