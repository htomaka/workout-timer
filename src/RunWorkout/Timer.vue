<template>
  <time :datetime="isoDuration">{{countdown}}</time>
</template>

<script>
import {padStart} from "../utils/pad-start";
import * as duration from 'duration-fns';

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
      return `${padStart(this.duration.minutes, 2, '0')}:${padStart(this.duration.seconds, 2, '0')}`
    },
    isoDuration(){
      return this.duration ? duration.toString(this.duration) : 'PT0S';
    }
  }
}
</script>
