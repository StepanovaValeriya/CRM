import { createStore } from 'vuex';
import auth from './auth';
import info from './info';
import category from './category';
import record from './record';

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
  actions: {
    async fetchCurrency() {
      const key = import.meta.env.VITE_APP_FIXER;
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      );
      return await res.json();
    },
  },
  modules: { auth, info, category, record },
});
