<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span> {{ getCurrency(cur) }} {{ cur }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    };
  },
  computed: {
    //   меняем основную валюту на рубли
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
      );
    },
  },
  methods: {
    // конвертируем рубли в валюту
    getCurrency(currency) {
      console.log(this.base);
      return Math.floor(this.base * this.rates[currency]);
    },
    currencyFilter(value, currency = 'RUB') {
      const formatConfig = {
        style: 'currency',
        currency,
      };
      console.log(formatConfig);
      const numberFormatter = new Intl.NumberFormat('ru-RU', formatConfig);
      console.log(numberFormatter);
      return numberFormatter.format(value);
    },
  },
};
</script>
