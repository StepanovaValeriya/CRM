<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"></Loader>

    <div v-else class="row">
      <HomeBill :rates="currency.rates"> </HomeBill>
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      ></HomeCurrency>
    </div>
  </div>
</template>

<script>
import HomeBill from './HomeBill.vue';
import HomeCurrency from './HomeCurrency.vue';
export default {
  name: 'home',
  data() {
    return {
      loading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    console.log(this.currency);
    this.loading = false;
  },
  methods: {
    // кнопка перезагрузки
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    },
  },
  components: { HomeBill, HomeCurrency },
};
</script>
