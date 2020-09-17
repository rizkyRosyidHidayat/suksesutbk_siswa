<template>
  <div class="card-body">
    <ol>
      <li v-for="(item, i) in list" :key="item.img">
        <div class="flex">
          <div>
            <button class="btn-icon number">
              {{ i+1 }}
            </button>
          </div>
          <div class="ml-4">
            <img v-if="item.img!==null" :src="require('@/assets/img/pemakaian/pengerjaan_soal/'+item.img)" alt="cara pemakaian" />
            <p class="mt-3">{{ item.text }}</p>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [{
      img: 'paket_tryout.png',
      text: `Silahkan pilih paket tryout yang ingin dikerjakan, 
      dengan cara menekan tombol 'MULAI'.`
    },{
      img: 'pilih_paketsoal.png',
      text: `Pilih paket soal yang tersedia, paket soal akan muncul sesuai kelompok uji yang dipilih.`
    },{
      img: 'pilih_ptn.png',
      text: `Silahkan memilih perguruan tinggi negeri yang diinginkan, kemudian memilih program studi
      yang tersedia didalam perguruan tinggi tersebut. Ulangi proses tersebut sebanyak 2 kali.`
    },{
      img: 'materi_uji.png',
      text: `Tekan tombol 'MULAI' pada materi uji yang tersedia. Tunggu sebentar
      dan secara otomatis masuk ke halaman pengerjaan soal.`
    },{
      img: null,
      text: `Pada halaman ini, silahkan mengerjakan soal dengan jawaban sebenar-benarnya.
      Proses pengerjaan soal selesai ketika waktu habis atau menekan tombol 'SELESAI'.`
    },{
      img: 'skor.png',
      text: `Selamat kamu bisa melihat hasil ujian setelah selesai simulasi ujian. 
      Setelah itu tekan tombol 'Assessment report' untuk melihat hasil detailnya.`
    }]
  })
}
</script>

<style scoped>
  .number{
    width: 32px;
    height: 32px;
    @apply bg-teal-500 text-white flex items-center justify-center;
  }
  li{
    @apply mb-4;
  }
</style>