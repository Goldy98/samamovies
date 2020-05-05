export default {
  namespaced: true,
  state: {
    uno: 1,
  },
  mutations: {
    SET_UNO(state) {
      state.uno = 5;
    },
  },
  actions: {
    calcDuo() {
      console.log("calcDuo");
      return 1 + 5;
    },
  },
  getters: {
    duo() {
      return 2;
    },
  },
};
