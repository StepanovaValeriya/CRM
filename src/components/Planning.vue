<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill }} {{ 'RUB' }}</h4>
    </div>
    <Loader v-if="loading"></Loader>
    <p v-else-if="!categories.length" class="center">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend }} {{ 'RUB' }} из {{ cat.limit }} {{ 'RUB' }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'planning',
  data() {
    return {
      loading: true,
      categories: [],
    };
  },
  computed: {
    // доступ к getter info
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.categories = categories.map((cat) => {
      const spend = records
        // 1. фильтр по id
        .filter((r) => r.categoryId === cat.id)
        // 2. фильтр по расходу
        .filter((r) => r.type === 'outcome')
        // общая сумма расходов
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      // процент трат по категории
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      // цвет полосы трат
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на ' : 'Осталось '
      }${Math.abs(tooltipValue)}`;

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      };
    });

    this.loading = false;
  },
};
</script>
