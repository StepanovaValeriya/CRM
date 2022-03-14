import { createStore } from 'vuex';
import auth from './auth';

export default createStore({
  state: {
    // создаем state error, чтобы в дальнейшем передавать через него ошибки
    error: null,
  },

  mutations: {
    // изменяет state error. Принимает два параметра state и сообщение об ошибке error
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    // получаем доступ до ошибки, s=state
    error: (s) => s.error,
  },
  actions: {},
  modules: { auth },
});
