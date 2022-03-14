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
      <div class="input-field">
        <input
          v-model.trim="v$.name.$model"
          :class="{ invalid: v$.name.$error }"
          id="name"
          type="text"
        />
        <label for="name">Имя</label>
        <small v-if="v$.name.$error" class="helper-text invalid"
          >Заполните поле Имя</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="v$.agree.$model" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'register',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { checked: (v) => v },
    };
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
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {}
    },
  },
};
</script>
