<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            v-model.trim="v$.title.$model"
            :class="{ invalid: v$.title.$error }"
            id="name"
            type="text"
          />
          <label for="name">Название</label>
          <span v-if="v$.title.$error" class="helper-text invalid"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            v-model.number="v$.limit.$model"
            :class="{ invalid: v$.limit.$error }"
            id="limit"
            type="number"
          />
          <label for="limit">Лимит</label>
          <span v-if="v$.limit.$error" class="helper-text invalid"
            >Минимальная величина {{ v$.limit.minValue.$params.min }}</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: '',
      limit: 100,
    };
  },
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        });
        this.title = '';
        this.limit = 100;
        this.v$.$reset();
        this.$message('Категория была создана');
        this.$emit('created', category);
      } catch (e) {}
    },
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
};
</script>
