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
      <HistoryTable :records="records"></HistoryTable>
      <Paginate></Paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from './HistoryTable.vue';
export default {
  name: 'history',
  data() {
    return {
      loading: true,
      records: [],
      categories: [],
    };
  },
  async mounted() {
    //  this.records = await this.$store.dispatch('fetchRecords');
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetchCategories');
    this.records = records.map((record) => {
      return {
        ...record,
        // получаем title категории
        categoryName: this.categories.find((c) => c.id === record.categoryId)
          .title,
        // тип
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'Доход' : 'Расход',
      };
    });

    this.loading = false;
  },
  components: { HistoryTable },
};
</script>
