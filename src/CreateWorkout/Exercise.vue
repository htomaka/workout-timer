<template>
  <div>
    <form @change="handleChange()" class="grid">
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
    <button @click="handleRemove()"><span class="material-icons">delete</span></button>
  </div>
</template>

<script>

export default {
  name: "Exercise",
  props: {
    data: Object,
  },
  computed: {
    model() {
      return {...this.data};
    },
  },
  methods: {
    handleRemove() {
      this.$emit("removed", this.data);
    },
    handleChange() {
      this.$emit("changed", {...this.model});
    },
  },
};
</script>

<style scoped>

.time-picker {
  display: grid;
  position: relative;
  align-content: center;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-gap: var(--spacing);
}

.time-picker input {
  max-width: 100%;
}

.time-picker .field:first-child:after {
  content: ":";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

</style>
