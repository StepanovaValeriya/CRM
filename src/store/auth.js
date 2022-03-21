import firebase from 'firebase/app';

export default {
  actions: {
    //   метод для компонента Login, чтобы зарегестрироваться
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    // регестрируем нового пользователя и добавляем данные о нем в базу данных firebase
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name,
        });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    // получаем id пользователя из firebase
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
    // очищаем данные пользователя при выходе
    async logout({ commit }) {
      await firebase.auth().signOut();
      commit('clearInfo');
    },
  },
};
