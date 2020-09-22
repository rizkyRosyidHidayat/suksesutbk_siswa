<template>
  <table class="table-auto w-full">
    <thead class="py-2">
      <tr>
        <th>Paket Soal</th>
        <th>TPS</th>
        <th>TKA</th>
        <th>Report</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in dataProgressPaket" :key="i">
        <td>{{ item.nama }}</td>
        <td align="center" v-for="(materiUji) in item.materi_uji" :key="materiUji.nama">
          <img v-if="materiUji.completed" src="@/assets/icons/check_circle.svg" width="25" alt="icons">
          <img v-else src="@/assets/icons/close_circle.svg" width="25" alt="icons">
        </td>
        <td align="center">
          <button :disabled="disable(item.materi_uji)" @click="$router.push({ name: 'assessment' })" class="btn-primary px-2 py-1 my-1">
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
  },
  methods: {
    disable(materi_uji) {
      /**
       * Mengecek apakah masih ada data completed = false
       * jika tidak ditemukan maka bisa melihat assessment report
       */
      const completed = materi_uji.findIndex(x => x.completed == false )
      if (completed == -1) {
        return false
      } else {
        return true
      }
    }
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