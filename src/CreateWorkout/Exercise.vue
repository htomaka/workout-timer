<template>
  <div>
    <form @change="handleChanged()" class="grid">
      <div class="field">
        <label class="sr-only" for="activity">activity</label>
        <select v-model="model.activity" id="activity">
          <option value="getReady">Get ready</option>
          <option value="warmup">Warmup</option>
          <option value="rest">Rest</option>
          <option value="work">Work</option>
          <option value="cooldown">Cool down</option>
        </select>
      </div>
      <div class="time-picker">
        <div class="field">
          <label class="sr-only" for="minutes">minutes</label>
          <input
              type="number"
              id="minutes"
              placeholder="00"
              min="0"
              v-model="model.duration.minutes"
          />
        </div>
        <span class="time-separator">:</span>
        <div class="field">
          <label class="sr-only" for="seconds">seconds</label>
          <input
              type="number"
              id="seconds"
              placeholder="00"
              min="0"
              v-model="model.duration.seconds"
          />
        </div>
      </div>
    </form>
    <button @click="handleRemoved()" class="button--link">Remove step</button>
  </div>
</template>

<script>

export default {
  name: "Exercise",
  props: {
    data: Object,
    workout: Object
  },
  computed: {
    model() {
      return {...this.data};
    },
  },
  methods: {
    handleRemoved(exercise) {
      this.workout.removeExercise(exercise);
    },
    handleChanged(exercise){
      this.workout.updateExercise(exercise);
    }
  },
};
</script>

<style scoped>

.time-picker {
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1rem 1fr;
  grid-gap: var(--spacing / 2);
  align-items: center;
}

.time-picker input {
  max-width: 100%;
}

.time-separator {
  display: block;
  justify-self: center;
}

</style>
