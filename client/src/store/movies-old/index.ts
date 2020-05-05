import state from "./moviesState";
import mutations from "./moviesMutations";
import getters from "./moviesGetters";
import actions from "./moviesActions";

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
