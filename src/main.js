import {createApp} from 'vue'
import App from './App.vue'
import './utils/db';
import "./assets/main.css"
import {createWorkout} from "@/workout/workout";

const app = createApp(App);
app.provide('workout', createWorkout())
app.mount('#app');
