import {nullDuration} from "./duration";
import * as duration from 'duration-fns'


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

    toJson(activity, order, durationObj, description){
        return {activity, order, duration: duration.toString(durationObj), description};
    }
}

export default new Exercise();


