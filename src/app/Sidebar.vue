<template>
  <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
    <router-link
      v-for="link in links"
      :key="link.url"
      active-class="active"
      :to="link.url"
      custom
      v-slot="{ href, navigate, isExactActive }"
    >
      <li :class="[isExactActive && 'active']">
        <a
          @click="navigate"
          :href="href"
          class="waves-effect waves-orange pointer"
          >{{ link.title }}</a
        >
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['modelValue'],
  data() {
    return {
      links: [
        { title: 'Счет', url: '/' },
        { title: 'История', url: '/history' },
        { title: 'Планирование', url: '/planning' },
        { title: 'Новая запись', url: '/record' },
        { title: 'Категории', url: '/categories' },
      ],
    };
  },
};
</script>
