<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '../utils/messages';

export default {
  computed: {
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
};
</script>
