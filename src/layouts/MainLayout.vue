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
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../app/Navbar.vue';
import Sidebar from '../app/Sidebar.vue';
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
  components: { Navbar, Sidebar },
};
</script>
