<template>
  <div class="border rounded px-4 py-3 mt-8">
    <h1 class="text-2xl font-bold text-gray-700">
      Target dan Pencapaian
    </h1>
    <table class="table-auto w-full mt-4">
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
        <tr>
          <td>90</td>
          <td class="text-left">9</td>
          <td class="text-left">8</td>
          <td>Lulus</td>
          <td>9</td>
          <td>8</td>
          <td>Lulus</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {

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