import { createStore } from 'vuex';
import auth from './auth';

export default createStore({
  state: {
    counter: 10,
  },
  getters: {
    getCount2(state) {
      return state.counter * 2;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
  },
});
