import * as duration from "duration-fns";
import Step from "./step"
import {nullDuration} from "./duration";

export default class Workout {
    constructor(timer) {
        this.name = "";
        this._steps = [];
        this._currentStepIndex = 0;
        this._timer = timer;
        this._nextDuration = null;
    }

    start(onTick, onNext) {
        this._currentStepIndex = 0;
        this._nextDuration = this._steps[this._currentStepIndex]['duration'];
        this._timer.start(() => {
            console.log('step', this.getCurrentStepPosition())
            if (this._currentStepIndex < this._steps.length) {
                this._nextDuration = duration.normalize(duration.subtract(this._nextDuration, {seconds: 1}));
                onTick({...this._steps[this._currentStepIndex], duration: this._nextDuration});

                if (this._nextDuration.seconds === 0) {
                    this.playNext();
                    onNext();
                }
            } else {
                this.stop();
            }
        });
    }

    stop() {
        console.log('workout finished');
        this._timer.stop();
    }

    save() {
        throw new Error('not implemented');
    }

    addStep() {
        this._steps = [...this._steps, Step.create('warmup', this.getNextStep(), nullDuration, 'Slow pace')];
    }

    removeStep(step) {
        this._steps = this._steps
            .filter((s) => {
                return s.order !== step.order;
            })
            .map((s, i) => {
                s.order = i + 1;
                return s;
            });
    }

    updateStep(step) {
        this._steps = this._steps.map((s) => {
            if (step.order === s.order) {
                return Step.create(step.activity, step.order, step.duration, step.description);
            }

            return s;
        });
    }

    getNextStep() {
        return this._steps.length + 1;
    }

    getSteps() {
        return this._steps;
    }

    hasSteps() {
        return !!this._steps.length;
    }

    getCurrentStepPosition() {
        return this._steps.length - this._currentStepIndex;
    }

    playNext() {
        console.log('play next');
        this._nextDuration = this._steps[this._currentStepIndex++]['duration'];
    }
}
