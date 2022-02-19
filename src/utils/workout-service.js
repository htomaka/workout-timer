import { createWorkout } from '@/workout/workout'

export class WorkoutService {
    constructor(repository) {
        this._repository = repository;
        this._workout = createWorkout();
    }

    getActiveWorkout() {
        return this._workout;
    }

    setActiveWorkout(workoutId) {
        const activeWorkout = this._repository.getOne(workoutId);
        this._workout = activeWorkout;
    }

    onChange(fn) {
        this._repository.onChange(workoutsDTO => {
            return fn(workoutsDTO.map(this._fromJson.bind(this)))
        });
    }

    startWorkout() {
        this._workout.start();
    }

    async save() {
        try {
            return this._repository.save(this._workout)
        } catch (err) {
            console.error(err);
        }
    }

    async getAll() {
        try {
            return this._repository.getAll().map(this._fromJson.bind(this));
        } catch (err) {
            console.error(err);
        }
    }

    async getOne(id) {
        try {
            return this._repository.getOne(id)
        } catch (err) {
            console.error(err);
        }
    }

    _fromJson(workoutDTO) {
        return createWorkout(workoutDTO.uuid, workoutDTO.name, workoutDTO.exercises);
    }
}
