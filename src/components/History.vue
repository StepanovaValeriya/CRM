<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>
    <Loader v-if="loader"></Loader>
    <p v-else-if="!records.length" class="center">
      Записей пока нет.
      <router-link to="/record">Добавить новую запись</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"></HistoryTable>
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      >
        ></Paginate
      >
    </section>
  </div>
</template>

<script>
import HistoryTable from './HistoryTable.vue';
import paginationMixin from '../mixins/pagination.mixin.js';
export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      loading: true,
      records: [],
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');
    this.setupPagination(
      this.records.map((record) => {
        return {
          ...record,
          // получаем title категории
          categoryName: categories.find((c) => c.id === record.categoryId)
            .title,
          // тип
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        };
      })
    );

    this.loading = false;
  },
  components: { HistoryTable },
};
</script>
