<template>
  <p style="font-size: 3rem">{{ timer }}</p>
</template>

<script>
export default {
  name: "Timer",
  props: {
    duration: Object,
  },
  computed: {
    timer() {
      if (!this.duration) {
        return `00:00s`
      }
      return `${this.duration.minutes}: ${this.duration.seconds}s`
    }
  }
}
</script>
