<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    <div class="border rounded p-3">
      <h1 class="font-bold text-gray-700 mb-3">
        Nilai CEEB Materi Uji
      </h1>
      <div v-for="item in data.tabel" :key="item.materi_uji" class="flex justify-between">
        <div>{{ item.materi_uji }}</div>
        <div><b class="text-yellow-500">{{ item.ceeb.skor.toFixed(2) }}</b></div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 border rounded p-3">
      <div class="md:col-span-4">
        <span>Nilai Akhir (NA)</span>
        <div class="text-4xl font-bold text-yellow-500">
          {{ dataNilaiAkhir[data.ceeb[0].kelompok_uji.toLowerCase()].toFixed(2) }}
        </div>
      </div>
      <div class="md:col-span-8">
        <ul>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/check_circle.svg" alt="icons" class="w-6">
            <span class="ml-3">{{ data.ceeb[0].detail.benar}} Jumlah soal benar</span>
          </li>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/close_circle.svg" alt="icons" class="w-6">
            <span class="ml-3">{{ data.ceeb[0].detail.salah }} Jumlah soal salah</span>
          </li>
          <li class="flex items-center mb-2">
            <img src="@/assets/icons/circle_outline.svg" alt="icons" class="w-6">
            <span class="ml-3">{{ data.ceeb[0].detail.kosong }} Jumlah soal kosong</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ['data'],
  computed: {
    ...mapState('dataAssessment', ['dataNilaiAkhir'])
  }
}
</script>