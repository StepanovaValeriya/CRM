import firebase from 'firebase/app';

export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        // получаем id польз-я
        const uid = await dispatch('getUid');
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        // получаем records из бд
        const records =
          (
            await firebase.database().ref(`/users/${uid}/records`).once('value')
          ).val() || {};

        //
        return Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecordsById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        // получаем records из бд
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once('value')
          ).val() || {};

        //
        return { ...record, id };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
