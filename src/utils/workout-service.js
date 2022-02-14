import {createWorkout} from '@/workout/workout'

export class WorkoutService {
    constructor(repository) {
        this._repository = repository;
        this._currentWorkout = null;
    }

    get currentWorkout() {
        return this._currentWorkout;
    }

    onChange(fn) {
        this._repository.onChange(fn);
    }

    create() {
        this._currentWorkout = createWorkout({
            name: '',
            exercises: []
        });
    }

    async save(workout) {
        try {
            return this._repository.save(workout)
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
