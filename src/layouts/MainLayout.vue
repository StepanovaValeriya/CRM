<template>
  <div class="app-main-layout">
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
</template>

<script>
import Navbar from '../app/Navbar.vue';
import Sidebar from '../app/Sidebar.vue';
export default {
  name: 'main-layout',

  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    sidebarOpen() {
      this.isOpen = !this.isOpen;
    },
  },
  components: { Navbar, Sidebar },
};
</script>
