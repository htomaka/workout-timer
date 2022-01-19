export default class Timer {
    constructor(interval) {
        this._interval = interval;
        this._running = false;
    }

    start(onTick) {
        this._onTick = onTick;
        this._expected = performance.now() + this._interval;
      this._running = true;
        setTimeout(this.tick.bind(this), this._interval);
    }

    stop() {
        this._running = false;
    }

    tick() {
        const diff = performance.now() - this._expected;
        this._onTick(this._expected);
        this._expected += this._interval;
        if (this._running) {
            this._timeout = setTimeout(this.tick.bind(this), this._interval - diff);
        } else {
            clearTimeout(this._timeout);
        }
    }
}
