import Timer from "./domain/timer";
import * as duration from "duration-fns";

export default class Countdown extends Timer {
  constructor(interval, isoDuration) {
    super(interval);
    this._duration = duration.parse(isoDuration);
  }

  start(onTick) {
    console.log(onTick);
    super.start(() => {
      this._duration = duration.subtract(this._duration, { seconds: 1 });
      onTick(this._duration);
      if (this._duration.minutes === 0 && this._duration.seconds === 0) {
        this.stop();
      }
    });
  }

  stop(onStop) {
    super.stop(onStop);
  }
}
