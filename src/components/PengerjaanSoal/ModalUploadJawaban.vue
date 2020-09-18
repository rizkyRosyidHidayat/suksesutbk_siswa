<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="uploadJawaban" class="btn-primary rounded-none flex items-center justify-end sm:justify-center text-right bg-green-500 text-xs sm:text-base">
        SELESAI
      </div>
    </template>
    <template v-slot:content>
      <div 
        class="card max-w-full sm:max-w-sm mx-auto"
        :class="color">
        <div class="card-body flex justify-end items-center">
          <div v-show="status==false" @click="visible=false" class="btn-icon">
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
            <center>
              <img src="@/assets/img/logo.png" alt="logo" class="h-16 animate-bounce mb-6">
            </center>
          </div>
          <div v-else>
            <div v-if="!status">
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
  props: ['data-jawaban', 'submateri'],
  components: {
    Modal
  },
  data: () => ({
    visible: false,
    soal: [],
    dataDurasi: [],
    color: 'bg-transparant',
    isEmpty: null
  }),
  computed: {
    status() {
      return this.$store.getters.getNotif.status
    }
  },
  watch: {
    status(val) {
      if (!val) {
        this.color = 'bg-red-500'        
      }
    }
  },
  methods: {    
    uploadJawaban() {
      /**
       * Mengecek data jawaban pada submateri terakhir
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
            return data.map((jawaban, soal) => ({
              id_soal: this.soal[submateri].soal[soal].id,
              pilihan: jawaban
            }))
            .filter(data => data.pilihan !== null && data.pilihan !== undefined)
          })
        this.dataDurasi = JSON.parse(localStorage.dataDurasi)
        const submisi = this.soal.map((submateri, i) => ({
          kategori_id: submateri.id_kategori_submateri,
          durasi_ujian: (submateri.durasi_ujian*60)-this.dataDurasi[i],
          jawaban: dataJawaban[i]
        }))
        this.visible = true  
        this.isEmpty = false   
        console.log(submisi)
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