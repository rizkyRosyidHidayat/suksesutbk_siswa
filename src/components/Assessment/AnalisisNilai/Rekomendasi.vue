<template>
  <div class="border rounded px-4 py-3 mt-8">
    <h1 class="text-2xl font-bold text-gray-700">
      Rekomendasi Prodi
    </h1>
    <table class="table-auto w-full mt-4">
      <thead class="bg-gray-200">
        <tr>
          <th>No</th>
          <th>Universitas</th>
          <th>Program Studi</th>
          <th>Kelompok Uji</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>90</td>
          <td>9</td>
          <td>8</td>
          <td>Lulus</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-center mt-8">
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