<template>
  <div class="border rounded px-4 py-3 mt-8 overflow-auto">
    <h1 class="text-xl font-bold text-gray-700">
      Rekomendasi Prodi {{ data.origin.prodi }} <br> ({{ data.origin.ptn }})
    </h1>
    <table class="table-auto w-full mt-4 -mx-4 md:mx-0">
      <thead class="bg-gray-200">
        <tr>
          <th>No</th>
          <th>Universitas</th>
          <th>Program Studi</th>
          <th>Kelompok Uji</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data.alternative.length == 0">
          <td colspan="4">
            <div class="rounded p-3 bg-blue-600 text-white -mx-2">
              Untuk saat ini data belum tersedia
            </div>
          </td>
        </tr>
        <tr v-else v-for="(item, i) in data.alternative" :key="item.id_prodi">
          <td>{{ i+1 }}</td>
          <td class="text-left">{{ item.ptn }}</td>
          <td>{{ item.prodi }}</td>
          <td>{{ item.kelompok }}</td>
        </tr>
      </tbody>
    </table>
    <div class="justify-center mt-8 hidden">
      <div class="btn-primary py-1 px-3 btn-outline active mr-3">
        1
      </div>
      <div class="btn-primary py-1 px-3 btn-outline">
        2
      </div>
    </div>
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
.btn-outline{
  @apply text-orange-500 border border-orange-500 bg-white;
}
.btn-outline:hover, .btn-outline.active{
  @apply text-white bg-orange-500;
}
</style>