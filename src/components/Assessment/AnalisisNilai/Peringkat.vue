<template>
  <div class="border rounded px-4 py-3 mt-8">
    <h1 class="text-2xl font-bold text-gray-700">
      Peringkat Tryout
    </h1>
    <table class="table-auto w-full mt-4">
      <thead class="bg-gray-200">
        <tr>
          <th class="text-left">Pilihan PTN</th>
          <th class="text-left">Program Studi</th>
          <th>Daya Tampung</th>
          <th>Peringkat Sekolah</th>
          <th>Peringkat Nasional</th>
          <th>Keterangan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.ptn">
          <td>{{ item.nama }}</td>
          <td class="text-left">{{ item.prodi }}</td>
          <td>{{ item.daya_tampung }}</td>
          <td>{{ item.peringkat_ujian.sekolah }}</td>
          <td>{{ item.peringkat_ujian.nasional }}</td>
          <td v-if="item.memenuhi">Memenuhi</td>
          <td v-else>Belum Memenuhi</td>
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