import {TinyEmitter} from "tiny-emitter";

export const TIMER_EVENTS = {
    START: 'Timer::start',
    STOP: 'Timer::stop',
    TICK: 'Timer::tick'
}

export function createTimer(interval) {
    return new Timer(interval);
}

class Timer extends TinyEmitter {
    constructor(interval) {
        super();
        this._interval = interval;
        this._running = false;
    }

    start(onTick) {
        this._onTick = onTick;
        this._expected = performance.now() + this._interval;
        this._running = true;
        this.emit(TIMER_EVENTS.START);
        setTimeout(this.tick.bind(this), this._interval);
    }

    stop() {
        this._running = false;
        clearTimeout(this._timeout);
        this.emit(TIMER_EVENTS.STOP);
    }

    tick() {
        const diff = performance.now() - this._expected;
        this._onTick(this._expected);
        this._expected += this._interval;
        if (this._running) {
            this._timeout = setTimeout(this.tick.bind(this), this._interval - diff);
            this.emit(TIMER_EVENTS.TICK)
        } else {
            this.stop();
        }
    }
}
