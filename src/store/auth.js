import { initializeApp } from 'firebase/app';

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await initializeApp.getAuth();
        signInWithEmailAndPassword(email, password);
      } catch (error) {
        throw error;
      }
    },
  },
};
