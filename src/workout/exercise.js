import {nullDuration} from "./duration";


class Exercise {
    create(activity, order, durationObj, description) {
        return {activity, order, description, duration: this._normalizeDuration({...nullDuration, ...durationObj})}
    }

    _normalizeDuration(durationObj) {
        return Object.keys(durationObj).reduce((acc, key) => {
            acc[key] = +durationObj[key] || 0;
            return acc;
        }, {})
    }
}

export default new Exercise();


