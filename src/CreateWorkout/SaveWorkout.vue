<template>
  <teleport to="body">
    <dialog ref="dialog">
      <form class="grid" ref="form" @submit.prevent="handleSave">
        <div class="field">
          <label for="name">Name</label>
          <input id="name" type="text" v-model="name">
        </div>
        <button>Cancel</button>
        <button type="submit">Confirm</button>
      </form>
    </dialog>
  </teleport>
  <button @click="openDialog">Save</button>
</template>

<script>
export default {
  name: "SaveWorkout",
  inject: ['workoutService'],
  data() {
    return {
      name: ''
    }
  },
  methods: {
    async handleSave() {
      try {
        await this.workoutService.save(this.name);
        this.$refs.dialog.close();
      } catch (err) {
        console.error(err.message);
      }
    },
    openDialog() {
      this.$refs.dialog.showModal();
    },
  }
}
</script>

<style scoped>

</style>
