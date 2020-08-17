<template>
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-4">
      <div class="text-center text-6xl font-bold text-yellow-400">
        500.34
      </div>
      <div class="text-md text-center capitalize">total perolehan nilai tes potensi skolastik (TPS)</div>
    </div>
    <div class="col-span-8">
      <table class="table-auto w-full">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left">Submateri Uji</th>
            <th>B</th>
            <th>S</th>
            <th>K</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">Penalaran Umum</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>500.54</td>
          </tr>
          <tr>
            <td class="text-left">Penalaran Umum</td>
            <td>20</td>
            <td>10</td>
            <td>5</td>
            <td>500.54</td>
          </tr>
        </tbody>
      </table>
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
</style>