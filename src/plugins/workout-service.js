import Workout from "../workout/workout";
import Timer from "../workout/timer";
import eventBus from "../utils/event-bus";

export default {
    install(Vue, options) {
        const timer = new Timer(1000);
        Vue.prototype.$workoutService = new Workout(timer, eventBus);
    }
}
