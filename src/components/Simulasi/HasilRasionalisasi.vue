<template>
  <div class="card mt-16">
    <div class="card-body pb-8">
      <div class="grid grid-cols-10 gap-4">
        <div class="col-span-3 text-center">
          <span>NILAI UTBK ANDA</span>
          <h1 class="text-6xl font-bold text-yellow-500 -mt-4">
            700.89
          </h1>
        </div>
        <div class="col-span-3">
          <ul>
            <li>Perguruan Tinggi</li>
            <li>Program Studi</li>
            <li>Kelompok Uji</li>
          </ul>
        </div>
        <div class="col-span-4">
          <ul>
            <li>Universitas Amikom</li>
            <li>Informatika</li>
            <li>SAINTEK</li>
          </ul>
        </div>
      </div>
      <!--  -->
      <div class="mt-8">
        <h1 class="text-lg font-bold text-gray-700">
          Rekomendasi Prodi
        </h1>
        <table class="table-fixed w-1/2 mt-4">
          <tbody>
            <tr class="odd:bg-gray-200">
              <td class="w-4/5">Penalaran Umum</td>
              <td class="w-1/5 text-right font-bold">900</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
      <div class="mt-16">
        <p class="text-center gap-4text-lg font-bold text-gray-700">
          Program Studi INFORMATIKA di UNIVERSITAS AMIKOM, Memiliki
        </p>
        <div class="w-2/3 grid grid-cols-3 gap-4 mx-auto mt-8">
          <div class="text-center">
            <span>Daya Tampung</span>
            <h1 class="text-3xl font-bold text-gray-700">56</h1>
          </div>
          <div class="text-center">
            <span>Peminat</span>
            <h1 class="text-3xl font-bold text-gray-700">56</h1>
          </div>
          <div class="text-center">
            <span>Indeks Ketetapan</span>
            <h1 class="text-3xl font-bold text-gray-700">0.07%</h1>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="mt-8 peringkat">
        <p class="text-xl font-bold text-gray-700 mb-3">
          Peringkatmu
        </p>
        <div>
          <span class="dot"></span> Peringkat 1 dari 1, yang memilih <b>kelompok uji</b> yang sama
        </div>
        <div>
          <span class="dot"></span> Peringkat 1 dari 1, yang memilih <b>kelompok uji dan PTN</b> yang sama
        </div>
        <div>
          <span class="dot"></span> Peringkat 1 dari 1, yang memilih <b>kelompok uji, PTN, dan program studi</b> yang sama
        </div>
      </div>
      <!--  -->
      <div class="mt-16 text-center">
        <b>Status Pilihan</b>
        <div>
          <h1 class="text-6xl font-bold text-green-500">LULUS</h1>
          <p>Selamat kamu dinyatakan lulus dalam simulasi tes UTBK</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
  @apply w-4 h-4 rounded-full bg-yellow-500 mr-3 inline-block;
}
</style>