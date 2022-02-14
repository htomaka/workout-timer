import {createApp} from 'vue'
import App from './App.vue'
import workoutsData from './utils/db';
import "./assets/main.css"
import {createWorkout} from "@/workout/workout";
import {WorkoutService} from "@/utils/workout-service";

const app = createApp(App);
app.provide('workout', createWorkout())
app.provide('workoutService', new WorkoutService(workoutsData))
app.mount('#app');
