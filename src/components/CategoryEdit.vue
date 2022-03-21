<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c of categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

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
          Обновить
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
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      select: null,
      title: '',
      limit: 100,
      current: null,
    };
  },
  methods: {
    //
    async submitHandler() {
      // проверка валидации
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      //   запрос к бд, чтобы обновить данные
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit,
        };
        await this.$store.dispatch('updateCategory', categoryData);
        this.$message('Категория успешно обновлена');
        // динамически обновляем select при изменении назавния категории
        this.$emit('updated', categoryData);
      } catch (e) {}
    },
  },
  mounted() {
    //   делаем видимым селект на странице
    this.select = M.FormSelect.init(this.$refs.select);

    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  watch: {
    //   отображаем данные, которые есть в конкретной категории
    current(catId) {
      const { title, limit } = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    },
  },
  created() {
    //   заполняем инпуты название и лимит
    const { id, title, limit } = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  validations() {
    return {
      title: { required },
      limit: { minValue: minValue(100) },
    };
  },
};
</script>
