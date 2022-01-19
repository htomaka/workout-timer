import Workout from "../domain/workout";
import Timer from "../domain/timer";

export default {
    install(Vue, options) {
        console.log('install')
        const timer = new Timer(1000);
        Vue.prototype.$workoutService = new Workout(timer);
    }
}
