import { createWorkout } from '@/workout/workout'

export class WorkoutService {
    constructor(repository) {
        this._repository = repository;
        this._workout = createWorkout();
    }

    getActiveWorkout() {
        return this._workout;
    }

    onChange(fn) {
        this._repository.onChange(fn);
    }

    startWorkout(){
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
            return this._repository.getAll()
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
}
