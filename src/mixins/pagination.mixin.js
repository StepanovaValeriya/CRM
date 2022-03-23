// используем lodash, чтобы сгруппировать объекты массива по несколько штук
import _ from 'lodash';

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
    //
    setupPagination(allItems) {
      // chunk-по сколько объектов группировать массив
      this.allItems = _.chunk(allItems, this.pageSize);
      //   кол-во страниц = длина массива
      this.pageCount = _.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
  },
};
