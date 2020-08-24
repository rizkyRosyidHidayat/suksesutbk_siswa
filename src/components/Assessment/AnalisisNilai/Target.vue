<template>
  <div class="border rounded px-4 py-3 mt-8 overflow-auto">
    <h1 class="text-2xl font-bold text-gray-700">
      Target dan Pencapaian
    </h1>
    <table class="table-auto w-full mt-4 -mx-4 md:mx-0">
      <thead class="bg-gray-200">
        <tr>
          <th rowspan="2">Pilihan Ke</th>
          <th class="text-left" rowspan="2">Perguruan Tinggi Negeri</th>
          <th class="text-left" rowspan="2">Program Studi</th>
          <th rowspan="2">Target NA</th>
          <th colspan="2">Pencapaian</th>
          <th rowspan="2">status</th>
        </tr>
        <tr>
          <th>NA</th>
          <th>%</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in data" :key="i">
          <td>{{ item.pilihan }}</td>
          <td class="text-left">{{ item.ptn }}</td>
          <td class="text-left">{{ item.prodi }}</td>
          <td>{{ parseFloat(item.progress.nilai_akhir.target).toFixed(2) }}</td>
          <td>{{ item.progress.nilai_akhir.tercapai }}</td>
          <td>{{ parseFloat(item.progress.nilai_akhir.persentase.value).toFixed(2) }}%</td>
          <td>
            <center>
              <img src="@/assets/icons/check_circle.svg" width="25px" v-if="item.progress.nilai_akhir.persentase.value >= 100" />
              <img src="@/assets/icons/close_circle.svg" width="25px" v-else  />
            </center>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
th{ @apply p-2; }
td{ 
  @apply text-center p-2;
}
table tr:nth-child(even) {
  @apply bg-gray-200;
}
</style>