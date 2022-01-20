import * as duration from "duration-fns";
import Exercise from "./exercise"
import {nullDuration} from "./duration";

export default class Workout {
    constructor(timer, domainEvents) {
        this.name = "";
        this._exercises = [];
        this._currentExerciseIndex = 0;
        this._timer = timer;
        this._nextDuration = null;
        this._workoutEvents = domainEvents;
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
        this._workoutEvents.$emit('workout::started');
    }

    stop() {
        console.log('workout finished');
        this._timer.stop();
        this._workoutEvents.$emit('workout::stopped');
    }

    save() {
        throw new Error('not implemented');
    }

    addExercise() {
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
        this._workoutEvents.$emit('workout::nextExerciseStarted', this._currentExercise);
        console.log('play next', this._currentExercise.order);
    }

    _updateDuration() {
        this._nextDuration = duration.normalize(duration.subtract(this._nextDuration, {seconds: 1}));
        this._workoutEvents.$emit('clock::tick', {
            ...this._currentExercise,
            duration: this._nextDuration
        });
    }

    _getNextOrder() {
        return this._exercises.length + 1;
    }

    _onTick() {
        if (this._nextDuration.seconds > 0) {
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
}
