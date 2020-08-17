<template>
  <div class="card-body">
    <div class="bg-blue-200 rounded p-4">
      <table class="w-full">
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
          <tr>
            <td class="text-left">Universitas AMIKOM</td>
            <td>Informatika</td>
            <td>SAINTEK</td>
            <td>80</td>
            <td>80</td>
            <td>12%</td>
            <td>Memenuhi</td>
          </tr>
          <tr>
            <td class="text-left">Universitas AMIKOM</td>
            <td>Informatika</td>
            <td>SAINTEK</td>
            <td>80</td>
            <td>80</td>
            <td>12%</td>
            <td>Memenuhi</td>
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
</style>