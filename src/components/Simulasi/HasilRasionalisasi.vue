<template>
  <div class="card mt-16">
    <div class="card-body pb-8">
      <div class="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div class="md:col-span-3 text-center">
          <span>NILAI UTBK ANDA</span>
          <h1 class="text-6xl font-bold text-yellow-500 -mt-4">
            {{ dataSimulasi.nilai_utbk.skor_akhir.toFixed(2) }}
          </h1>
        </div>
        <div class="md:col-span-3 hidden md:block">
          <ul>
            <li>Perguruan Tinggi</li>
            <li>Program Studi</li>
            <li>Kelompok Uji</li>
          </ul>
        </div>
        <div class="md:col-span-4">
          <ul>
            <li>{{ dataSimulasi.ptn.nama }}</li>
            <li>{{ dataSimulasi.ptn.prodi }}</li>
            <li>{{ dataSimulasi.nilai_utbk.kelompok }}</li>
          </ul>
        </div>
      </div>
      <!--  -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div v-for="data in dataSimulasi.analisis" :key="data.id_sub">
          <h1 class="text-lg font-bold text-gray-700">
            {{ data.materi_uji }}
          </h1>
          <table class="table-fixed w-full mt-4">
            <tbody>
              <tr v-for="item in data.submateri" :key="item.submateri" class="odd:bg-gray-200">
                <td class="w-4/5">{{ item.submateri }}</td>
                <td class="w-1/5 text-right font-bold">{{ item.skor.toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!--  -->
      <div class="mt-16">
        <p class="text-center gap-4text-lg font-bold text-gray-700">
          Program Studi {{ dataSimulasi.ptn.prodi }} di {{ dataSimulasi.ptn.nama }}, Memiliki
        </p>
        <div class="w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto mt-8">
          <div class="text-center">
            <span>Daya Tampung</span>
            <h1 class="text-3xl font-bold text-gray-700">{{ dataSimulasi.ptn.stats.daya_tampung }}</h1>
          </div>
          <div class="text-center">
            <span>Peminat</span>
            <h1 class="text-3xl font-bold text-gray-700">{{ dataSimulasi.ptn.stats.peminat }}</h1>
          </div>
          <div class="text-center">
            <span>Indeks Ketetapan</span>
            <h1 class="text-3xl font-bold text-gray-700">{{ dataSimulasi.ptn.stats.indeks_keketatan.value.toFixed(2) }}%</h1>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="mt-8 peringkat">
        <p class="text-xl font-bold text-gray-700 mb-3">
          Peringkatmu
        </p>
        <div>
          <span class="dot"></span> 
          Peringkat 
          {{ dataSimulasi.peringkat.peringkat.kelompok_uji.self }}
          dari {{ dataSimulasi.peringkat.peringkat.kelompok_uji.all }},
          yang memilih 
          kelompok uji
          yang sama
        </div>
        <div>
          <span class="dot"></span> 
          Peringkat 
          {{ dataSimulasi.peringkat.peringkat.ptn.self }}
          dari {{ dataSimulasi.peringkat.peringkat.ptn.all }},
          yang memilih 
          kelompok uji dan PTN
          yang sama
        </div>
        <div>
          <span class="dot"></span> 
          Peringkat 
          {{ dataSimulasi.peringkat.peringkat.ptn_prodi.self }}
          dari {{ dataSimulasi.peringkat.peringkat.ptn_prodi.all }},
          yang memilih 
          kelompok uji, PTN, dan program studi
          yang sama
        </div>
      </div>
      <!--  -->
      <div class="mt-16 text-center">
        <b>Status Pilihan</b>
        <div v-if="dataSimulasi.ptn.memenuhi">
          <h1 class="text-6xl font-bold text-green-500">LULUS</h1>
          <p>Selamat kamu dinyatakan lulus dalam simulasi tes UTBK</p>
        </div>
        <div v-else>
          <h1 class="text-4xl font-bold text-red-500">TIDAK LULUS</h1>
          <p>Ayo berjuang lebih keras untuk bisa masuk PTN</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState('dataSimulasi', ['dataSimulasi'])
  }
}
</script>

<style scoped>
li{
  @apply font-bold mb-2 text-xl text-gray-700;
}
td{
  @apply p-2;
}
.peringkat div{
  @apply flex items-center mb-1;
}
.dot{
  @apply w-4 h-4 rounded-full bg-yellow-500 mr-3 inline-block flex-shrink-0;
}
</style>