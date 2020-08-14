<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="uploadJawaban" class="btn-primary rounded-none flex items-center justify-center bg-green-500">
        SELESAI
      </div>
    </template>
    <template v-slot:content>
      <div 
        class="card max-w-full sm:max-w-sm mx-4 sm:mx-auto"
        :class="color">
        <div class="card-body flex justify-between items-center">
          <div class="text-xl font-bold tracking-wider text-white">Proses Upload Jawaban</div>
          <div @click="visible=false" class="btn-icon">
            <img src="@/assets/icons/close.svg" alt="icons" width="25px">
          </div>
        </div>
        <div v-if="isEmpty" class="card-body pt-0">
          <svg class="animate-bounce w-16 h-16 block mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2L1 21z" fill="white"/>
            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
          </svg>
          <p class="text-center text-white mb-4">
            Silahkan menjawab soal minimal satu sebelum ke upload jawaban
          </p>
          <div @click="visible=false" class="btn-primary bg-white text-teal-500 text-center">Oke</div>
        </div>
        <div v-else class="card-body pt-0 text-white text-center">
          <div v-if="$store.getters.getLoading">
            <div class="animate-bounce">
              <svg style="-ms-transform: rotate(180deg);-webkit-transform: rotate(180deg);transform: rotate(180deg) !important;" class="w-16 h-16 text-white block mx-auto" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
            <p class="mt-6">
              Sedang proses upload jawaban, mohon tunggu sebentar
            </p>
          </div>
          <div v-else>
            <div v-if="status">
              <svg class="block mx-auto animate-bounce" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="64px" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
              </svg>
              <div class="my-4">Proses upload jawaban berhasil, silahkan melihat hasil</div>
              <div @click="$router.push({ name: 'pengerjaan-soal' })" class="btn-primary bg-white text-green-500 inline-block">Lihat Hasil</div>
            </div>
            <div v-else>
              <svg class="block mx-auto animate-bounce" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="64px" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z" fill="white"/>
                <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <div class="my-4">Maaf proses upload jawaban gagal, mohon periksa koneksi internet anda</div>
              <div @click="uploadJawaban" class="btn-primary bg-white text-red-500 inline-block">
                Ulangi Upload
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  props: ['data-jawaban', 'submateri', 'number', 'selected'],
  components: {
    Modal
  },
  data: () => ({
    visible: false,
    soal: [],
    dataDurasi: [],
    color: 'bg-teal-500',
    isEmpty: null
  }),
  computed: {
    status() {
      return this.$store.getters.getNotif.status
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.color = 'bg-green-500'
      } else {
        this.color = 'bg-red-500'        
      }
    }
  },
  methods: {    
    uploadJawaban() {
      /**
       * Menyimpan data jawaban terakhir
       */
      this.dataJawaban[this.submateri][this.number] = this.selected
      localStorage.dataJawaban = JSON.stringify(this.dataJawaban)
      /**
       * Mengecek data jawaban pada submateri
       * apakah kosong atau tidak
       */
      const isNotEmpty = this.dataJawaban[this.submateri].filter(jawaban => jawaban !== null && jawaban !== undefined)
      if (isNotEmpty.length) {        
        /**
         * Membuat data jawaban baru dengan ditambahkan
         * key id soal dan pilihan setiap datanya
         * dengan mengabaikan data jawabna yang kosong
         */
        const dataJawaban = this.dataJawaban
          .map((data, submateri) => {
            const clean = data.filter(data => data !== null)
            return clean.map((jawaban, soal) => ({
              id_soal: this.soal[submateri].soal[soal].id,
              pilihan: jawaban
            }))
          })
        this.dataDurasi = JSON.parse(localStorage.dataDurasi)
        const submisi = this.soal.map((submateri, i) => ({
          kategori_id: submateri.id_kategori_submateri,
          durasi_ujian: this.dataDurasi[i],
          jawaban: dataJawaban[i]
        }))
        this.visible = true  
        this.isEmpty = false   
        this.$store.dispatch('dataSoal/postDataJawaban', submisi)  
      } else {
        this.isEmpty = true
        this.visible = true
      }
    }
  },
  mounted() {
    this.soal = JSON.parse(localStorage.soal)
  }
}
</script>