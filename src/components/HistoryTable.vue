<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, idx) of records" :key="record.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ record.amount }} {{ 'RUB' }}</td>
        <td>{{ record.date }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span :class="[record.typeClass]" class="white-text badge red">{{
            record.typeText
          }}</span>
        </td>
        <td>
          <button
            v-tooltip="'Посмотреть запись'"
            @click="$router.push('/detail-record/' + record.id)"
            class="btn-small btn"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
};
</script>
