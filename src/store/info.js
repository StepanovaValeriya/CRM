import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    //  не было кэширования в state, когда будет logout и сессии пользователе не пересекались
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    //   обращаемся к бд и подлучаем поле info у конкретного пользователя
    async fetchInfo({ dispatch, commit }) {
      try {
        // получаем id польз-я
        const uid = await dispatch('getUid');
        //   получаем поле info
        const info = (
          await firebase.database().ref(`/users/${uid}/info`).once('value')
        ).val();
        commit('setInfo', info);
      } catch (e) {}
    },
  },
  getters: {
    //   получаем доступ до info о пользователе
    info: (s) => s.info,
  },
};
