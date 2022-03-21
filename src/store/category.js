import firebase from 'firebase/app';

export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        // получаем id польз-я
        const uid = await dispatch('getUid');
        // получаем категорию из бд
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {};

        const cats = [];

        // трансформируме объект categories так, чтобы в него добавился id
        Object.keys(categories).forEach((key) => {
          cats.push({
            title: categories[key].title,
            limit: categories[key].limit,
            id: key,
          });
        });
        return cats;
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        // получаем id польз-я
        const uid = await dispatch('getUid');
        // обращаемся к категории по ее id  с помощью child и обновляем с помощью update
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        // получаем id польз-я
        const uid = await dispatch('getUid');
        // добавляем категорию в бд
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
  },
};
