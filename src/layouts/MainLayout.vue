<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else class="app-main-layout">
      <Navbar @navbar-click="sidebarOpen"></Navbar>

      <Sidebar v-model="isOpen"></Sidebar>

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view></router-view>
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="'Создать новую запись'"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../app/Navbar.vue';
import Sidebar from '../app/Sidebar.vue';
import messages from '../utils/messages';
export default {
  name: 'main-layout',

  data() {
    return {
      isOpen: true,
      loading: true,
    };
  },
  methods: {
    sidebarOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  async mounted() {
    // запрос на получение данных о пользователе
    // если в геттерах пусто, то делаем запрос
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    this.loading = false;
  },
  omputed: {
    error() {
      // получаем доступ до геттеров с ошибками
      return this.$store.getters.error;
    },
  },
  watch: {
    // смотрим какой код ошибки пришел из fb, если такой ошибки нет в файле messagees, то выводим Что-то пошло не так
    error(fbError) {
      this.$error(messages[fbError.code] || 'Что-то пошло не так');
    },
  },
  components: { Navbar, Sidebar },
};
</script>
