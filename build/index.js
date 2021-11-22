"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Randomly = /** @class */ (function () {
    function Randomly(options) {
        if (options === void 0) { options = {}; }
        this.store = new Array(options.storeSize || 20).fill(undefined).map(function () { return Math.random(); });
        this.interval = options.interval || 1000;
        this.startTimer();
    }
    /**
     * Get a random number between 0 and 1.
     */
    Randomly.prototype.get = function () {
        return this.$get();
    };
    /**
     * Compare some conditions to a random value using a predicate.
     * @param predicate A function which accepts a number and returns a boolean.
     * @returns boolean
     */
    Randomly.prototype.compare = function (predicate) {
        return predicate(this.$get());
    };
    /**
     * Determine if a random value is less than a given threshold.
     * @param threshold A value between 0 and 1
     * @returns boolean
     */
    Randomly.prototype.lt = function (threshold) {
        return this.$get() < threshold;
    };
    /**
     * Determine if a random value is greater than a given threshold.
     * @param threshold A value between 0 and 1
     * @returns boolean
     */
    Randomly.prototype.gt = function (threshold) {
        return this.$get() > threshold;
    };
    /**
     * Determine if a random value is between a lower and upper bound (exclusive)
     * @param lower A lower bound between 0 and 1
     * @param upper An upper bound between 0 and 1
     * @returns boolean
     */
    Randomly.prototype.between = function (lower, upper) {
        var entry = this.$get();
        return entry > lower && entry < upper;
    };
    /**
     * Decide between two given options.
     * @param optionA
     * @param optionB
     * @param threshold An optional parameter to increase (or decrease) the odds of a given option
     * @returns optionA or optionB
     */
    Randomly.prototype.decide = function (optionA, optionB, threshold) {
        var _threshold = threshold || Math.min(Math.max(this.$get(), 0.05), 0.95);
        var decider = this.$get() > _threshold;
        return decider ? optionA : optionB;
    };
    /**
     * Get a random number between 0 and n
     * @param n
     * @returns number
     */
    Randomly.prototype.sample = function (n) {
        return Math.floor(this.$get() * n);
    };
    /**
       * Start the internal timer which updates
       * the store of random numbers.
       * @returns
       */
    Randomly.prototype.startTimer = function () {
        var _this = this;
        this.randomizeStore();
        this.stopTimer();
        this.timerId = setTimeout(function () { return _this.startTimer(); }, this.interval);
    };
    /**
       * Stop the internal timer which updates
       * the store of random numbers.
       */
    Randomly.prototype.stopTimer = function () {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
    };
    /**
     * Randomize the store by generating a new set of random numbers.
     * @returns void
     */
    Randomly.prototype.randomizeStore = function () {
        if (!this.store) {
            return;
        }
        this.store = this.store.map(function () { return Math.random(); });
    };
    /**
     * Get a random value from the internal store of values.
     * @returns number
     */
    Randomly.prototype.$get = function () {
        return this.store[Math.floor(Math.random() * this.store.length)];
    };
    return Randomly;
}());
exports.default = Randomly;
//# sourceMappingURL=index.js.map