import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "material-icons/iconfont/material-icons.css";

require("@/assets/css/styles.css");

Vue.use(Vuesax);

Vue.config.productionTip = false;

new Vue({
  router,
  store: store.original,
  render: (h) => h(App),
}).$mount("#app");
