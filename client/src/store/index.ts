import Vue from "vue";
import Vuex from "vuex";
import { createDirectStore } from "direct-vuex";
import movie from "./store-modules/movie";
Vue.use(Vuex);

const { store, moduleActionContext, moduleGetterContext } = createDirectStore({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    movie,
  },
});

export default store;

export { moduleActionContext, moduleGetterContext };

export type AppStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: AppStore;
  }
}
