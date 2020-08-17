<template>
  <div class="grid grid-cols-2 gap-4 mt-8">
    <div class="border rounded p-3">
      <h1 class="font-bold text-gray-700 mb-3">
        Nilai CEEB Materi Uji
      </h1>
      <div class="flex justify-between">
        <div>Tes Potensi Skolastik</div>
        <div><b class="text-yellow-500">500.67</b></div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 border rounded p-3">
      <div class="col-span-4">
        <span>Nilai Akhir (NA)</span>
        <div class="text-4xl font-bold text-yellow-500">
          500.34
        </div>
      </div>
      <div class="col-span-8">
        <ul>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/check_circle.svg" alt="icons" class="w-6">
            <span class="ml-3">4 Jumlah soal benar</span>
          </li>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/close_circle.svg" alt="icons" class="w-6">
            <span class="ml-3">4 Jumlah soal salah</span>
          </li>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/circle_outline.svg" alt="icons" class="w-6">
            <span class="ml-3">4 Jumlah soal kosong</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>