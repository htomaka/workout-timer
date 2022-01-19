import Vue from "vue";
import App from "./App";
import workoutService from "./plugins/workout-service";

Vue.config.productionTip = false;
Vue.use(workoutService, {});

/* eslint-disable no-new */
new Vue({
  render: (h) => h(App),
}).$mount("#app");
