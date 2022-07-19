<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          v-model="v$.name.$model"
          id="description"
          type="text"
          :class="{
            invalid: v$.name.$error,
          }"
        />
        <label for="description">Имя</label>
        <span v-if="v$.name.$error" class="helper-text invalid"
          >Введите имя</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  metaInfo: {
    title: 'Profile',
    meta: [],
  },
  data() {
    return {
      name: '',
      isRuLocale: true,
    };
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-Ru' : 'en-US',
        });
      } catch (e) {}
    },
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-Ru';
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  validations() {
    return {
      name: { required },
    };
  },
  computed: {
    ...mapGetters(['info']),
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
