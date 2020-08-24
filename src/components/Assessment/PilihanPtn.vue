<template>
  <div class="card-body">
    <div class="bg-blue-200 rounded p-4 overflow-auto">
      <table class="table-auto w-full -mx-4 md:mx-0">
        <thead class="bg-white">
          <tr>
            <th class="text-left">Pilihan PTN</th>
            <th>Program STudi</th>
            <th>Kelompok</th>
            <th>Nilai Min</th>
            <th>DT</th>
            <th>IK</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="(item, i) in detailAssessment.ptn_pilihan" :key="i">
            <td class="text-left">{{ item.nama }}</td>
            <td>{{ item.prodi }}</td>
            <td>{{ item.kelompok }}</td>
            <td>{{ item.nilai_min }}</td>
            <td>{{ item.daya_tampung }}</td>
            <td>{{ item.indeks_keketatan.value }}%</td>
            <td v-if="item.memenuhi">Memenuhi</td>
            <td v-else>Belum Memenuhi</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState('dataAssessment', ['detailAssessment'])
  }
}
</script>

<style scoped>
th{ @apply p-2; }
td{ 
  @apply text-center p-2;
}
</style>