export class WorkoutService {
    constructor(repository) {
        this._repository = repository
    }

    save(workout) {
        try {
            this._repository.save(workout)
        } catch (err) {
            console.error(err);
        }
    }

    getAllWorkouts() {

    }

    getOne(id) {
        try {
            this._repository.save(workout)
        } catch (err) {
            console.error(err);
        }
    }
}
