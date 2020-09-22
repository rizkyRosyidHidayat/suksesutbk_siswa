<template>
  <div class="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
    <div class="md:col-span-4">
      <div class="text-center text-6xl font-bold text-yellow-400">
				{{parseFloat(data.ceeb.skor).toFixed(2)}}        
      </div>
      <div class="text-md text-center capitalize">total perolehan nilai {{data.materi_uji}}</div>
    </div>
    <div class="md:col-span-8 overflow-auto">
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
          <tr v-for="(val, i) in data.detail" :key="i">
            <td class="text-left">{{ val.submateri }}</td>
            <td>{{ val.benar }}</td>
            <td>{{ val.salah }}</td>
            <td>{{ val.kosong }}</td>
            <td>{{ parseFloat(val.skor).toFixed(2) }}</td>
          </tr>
          <tr>
            <td class="font-bold text-left">Nilai CEEB</td>
            <td class="font-bold">{{ data.ceeb.benar }}</td>
            <td class="font-bold">{{ data.ceeb.salah }}</td>
            <td class="font-bold">{{ data.ceeb.kosong }}</td>
            <td class="font-bold">
              {{ parseFloat(data.ceeb.skor).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
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
</style>