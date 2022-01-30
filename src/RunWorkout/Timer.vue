<template>
  <p>{{ countdown }}</p>
</template>

<script>
import {padStart} from "../utils/pad-start";

export default {
  name: "Timer",
  props: {
    duration: Object,
  },
  computed: {
    countdown() {
      if (!this.duration) {
        return `00:00`
      }
      return `${padStart(this.duration.minutes, 2, '0')}: ${padStart(this.duration.seconds, 2, '0')}`
    }
  }
}
</script>
