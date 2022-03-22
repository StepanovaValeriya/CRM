<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>
    <Loader v-if="loading"></Loader>

    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          v-model.number="v$.amount.$model"
          :class="{ invalid: v$.amount.$error }"
          id="amount"
          type="number"
        />
        <label for="amount">Сумма</label>
        <span v-if="v$.amount.$error" class="helper-text invalid"
          >Минимальная величина {{ v$.amount.minValue.$params.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          v-model="v$.description.$model"
          :class="{ invalid: v$.description.$error }"
          id="description"
          type="text"
        />
        <label for="description">Описание</label>
        <span v-if="v$.description.$error" class="helper-text invalid"
          >Введите описание</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { mapGetters } from 'vuex';
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'record',
  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: 'outcome',
      amount: 1,
      description: '',
    };
  },
  validations() {
    return {
      description: { required },
      amount: { minValue: minValue(1) },
    };
  },
  async mounted() {
    // кладем в select все категории, которые есть уже
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
    // по умолчанию ставим в селекте зазвание первой ктегории при загрузке страницы
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  computed: {
    // доступ к getter info
    ...mapGetters(['info']),
    // проверка, можно ли создавать новую запись
    canCreateRecord() {
      // если радиокнопка доход, возвращаем true и делаем новую запись
      if (this.type === 'income') {
        return true;
      }
      // если расход, то на счету bill должно быть достаточно денег
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON(),
          });
          // вычисляем новое значение счета, в зависимости от  дохода или расхода
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          // обновляем счет в бд
          await this.$store.dispatch('updateInfo', { bill });
          this.$message('Запись успешно создана');
          this.v$.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
};
</script>
