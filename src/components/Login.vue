<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="v$.email.$model"
          id="email"
          type="text"
          :class="{
            invalid: v$.email.$error,
          }"
        />
        <label for="email">Email</label>
        <small v-if="v$.email.$error" class="helper-text invalid"
          >Неверный адрес эл.почты</small
        >
      </div>
      <div class="input-field">
        <input
          v-model.trim="v$.password.$model"
          id="password"
          type="password"
          :class="{
            invalid: v$.password.$error,
          }"
        />
        <label for="password">Пароль</label>
        <small v-if="v$.password.$error" class="helper-text invalid"
          >Неверный пароль либо поле не было заполнено</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import messages from '../utils/messages';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
    };
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>
