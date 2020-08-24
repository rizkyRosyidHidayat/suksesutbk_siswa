<template>
  <table class="table-auto w-full">
    <thead class="py-2">
      <tr>
        <th>Paket Soal</th>
        <th>Tes Potensi Skolastik (TPS)</th>
        <th>Report</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in dataProgressPaket" :key="item.nama">
        <td>{{ item.nama }}</td>
        <td>
          <center>
            <img v-if="item.selesai" src="@/assets/icons/check_circle.svg" width="25" alt="icons">
            <img v-else src="@/assets/icons/close_circle.svg" width="25" alt="icons">
          </center>
        </td>
        <td>
          <button :disabled="!item.selesai" @click="$router.push({ name: 'assessment' })" class="btn-primary px-2 py-1">
            Result
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState('dataDashboard', ['dataProgressPaket'])
  }
}
</script>

<style scoped>
th{
  @apply uppercase bg-gray-500 font-semibold;
}
td{
  @apply px-2;
}
tbody{
  @apply border;
}
</style>