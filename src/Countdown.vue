<template>
  <p style="font-size: 3rem">{{ counter }}</p>
</template>

<script>
export default {
  name: "Countdown",
  props: {
    duration: Object,
  },
  computed: {
    counter() {
      if (!this.duration) {
        return `00:00s`
      }
      return `${this.duration.minutes}: ${this.duration.seconds}s`
    }
  }
}
</script>
