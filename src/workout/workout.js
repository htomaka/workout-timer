import * as duration from "duration-fns";
import Exercise from "./exercise"
import {nullDuration} from "./duration";
import {TinyEmitter} from "tiny-emitter";
import {createTimer} from '@/utils/timer';

export const WORKOUT_EVENTS = {
    STOPPED: 'Workout::stopped',
    STARTED: 'Workout::started',
    TICK: 'Workout::tick',
    NEXT_EXERCISE_STARTED: 'Workout::nextExerciseStarted'
}


export function createWorkout() {
    const timer = createTimer(1000)
    return new Workout(timer);
}

class Workout extends TinyEmitter {
    constructor(timer) {
        super();
        this.name = "";
        this._exercises = [];
        this._currentExerciseIndex = 0;
        this._timer = timer;
        this._nextDuration = null;
    }

    get _currentExercise() {
        return this._exercises[this._currentExerciseIndex]
    }

    get exercises() {
        return this._exercises;
    }

    start() {
        this._currentExerciseIndex = 0;
        this._nextDuration = this._currentExercise.duration;
        this._timer.start(() => this._onTick());
        this.emit(WORKOUT_EVENTS.STARTED);
    }

    stop() {
        console.log('workout finished');
        this._timer.stop();
        this.emit(WORKOUT_EVENTS.STOPPED);
    }

    save() {
        throw new Error('not implemented');
    }

    addExercise() {
        console.log('add exercice')
        this._exercises = [...this._exercises, Exercise.create('warmup', this._getNextOrder(), nullDuration, 'Slow pace')];
    }

    removeExercise(step) {
        this._exercises = this._exercises
            .filter((s) => {
                return s.order !== step.order;
            })
            .map((s, i) => {
                s.order = i + 1;
                return s;
            });
    }

    updateExercise(step) {
        this._exercises = this._exercises.map((s) => {
            if (step.order === s.order) {
                return Exercise.create(step.activity, step.order, step.duration, step.description);
            }

            return s;
        });
    }

    hasExercise() {
        return !!this._exercises.length;
    }

    getRemainingCount() {
        return (this._exercises.length - this._currentExercise.order) + 1;
    }

    _playNext() {
        this._currentExerciseIndex++;
        this._nextDuration = this._currentExercise.duration;
        this.emit(WORKOUT_EVENTS.NEXT_EXERCISE_STARTED, this._currentExercise);
        console.log('play next', this._currentExercise.order);
    }

    _updateDuration() {
        this._nextDuration = duration.normalize(duration.subtract(this._nextDuration, {seconds: 1}));
        this.emit(WORKOUT_EVENTS.TICK, {
            ...this._currentExercise,
            duration: this._nextDuration
        });
    }

    _getNextOrder() {
        return this._exercises.length + 1;
    }

    _onTick() {
        if (this._hasTimeLeft()) {
            this._updateDuration();
        } else if (this._hasNextExercice()) {
            this._playNext();
        } else {
            this.stop();
        }
    }

    _hasNextExercice() {
        return !!this._exercises[this._currentExerciseIndex + 1];
    }

    _hasTimeLeft() {
        return (this._nextDuration.minutes * 60 + this._nextDuration.seconds) > 0;
    }
}
