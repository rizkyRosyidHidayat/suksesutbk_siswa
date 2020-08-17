<template>
  <nav>
    <div>
      <div class="items-center hidden">
        <img src="@/assets/icons/pause.svg" alt="icons" width="30">
        <span class="ml-3">11.45</span>
      </div>
      <h1 class="text-xl font-bold">{{ soal.nama }}</h1>
      <div class="text-sm">{{ soal.soal.length }} Soal | {{ soal.durasi_ujian }} Menit</div>
    </div>
    <img src="@/assets/img/logo_white.png" alt="logo" class="h-10 hidden sm:block">
    <Modal :visible="visible">
      <template v-slot:activator>
        <div class="py-1 px-6 inline-block bg-gray-800 rounded-full text-lg tracking-wider">
          {{ time.h }}:{{ time.m }}:{{ time.s }}
        </div>
      </template>
      <template v-slot:content>
        <div class="card sm:max-w-sm sm:mx-auto bg-yellow-500 overflow-visible">
          <div class="card-body">
            <svg class="animate-bounce w-16 h-16 block mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
              <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2L1 21z" fill="white"/>
              <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
            </svg>
            <div v-if="dataSubmateriVisible.length > 0">
              <p class="text-center text-white mb-4">
                Durasi atau waktu untuk mengerjakan submateri ini
                telah HABIS. Silahkan pilih submateri yang lain.
              </p>
              <Option 
                v-model="updateSubmateri"
                :items="dataSubmateriVisible"
                :item="{
                  text: 'text',
                  value: 'value',
                }"
                :selected-value.sync="namaSubmateri"
                placeholder="Pilih Submateri"></Option>
            </div>
            <div v-else>
              <p class="text-center text-white mb-4">
                Durasi atau waktu untuk mengerjakan semua submateri
                telah HABIS. Silahkan mengakhiri ujian.
              </p>
              <center>
                <ModalUploadJawaban 
                  :submateri="submateri"
                  :data-jawaban="dataJawaban" />
              </center>
            </div>
          </div>
        </div>
      </template>
    </Modal>
  </nav>
</template>

<script>
import moment from'moment'
import Modal from '@/components/Modal'
import Option from '@/components/Option'
import ModalUploadJawaban from './ModalUploadJawaban'
export default {
  props: ['soal', 'submateri', 'data-jawaban'],
  components: {
    ModalUploadJawaban,
    Option,
    Modal,
  },
  data: () => ({
    time: {
      h: 0,
      m: 0,
      s: 0
    },
    actualTime: moment().format('X'),
    updateSubmateri: '',
    dataDurasi: [],
    visible: false,
    dataSoal: [],
    namaSubmateri: ''
  }),
  computed: {
    formatDurasi() {
      /**
       * Mmembuat format durasi ujian supaya bisa dikurangi
       */
      const time = moment().add(this.dataDurasi[this.submateri], 'seconds')
      return moment(time).format('X')
    },
    dataSubmateriVisible() {
      /**
       * Menampilkan data submateri yang
       * yang dimana durasinya lebih dari 0
       */
      return this.dataDurasi.map((durasi, i) => {
        if (durasi !== 0) {
          return {
            text: this.dataSoal[i].nama,
            value: i
          }
        }
      })
      .filter(data => data !== undefined)
    }
  },
  watch: {
    updateSubmateri(val) {
      this.$emit('update:submateri', val)
      this.visible = false
    }
  },
  methods: {
    getDiffInSeconds() {
      /**
       * Mengurrangi durasi ujian dengan waktu sekarang
       */
      return this.formatDurasi - this.actualTime
    },
    compute() {
      let duration = moment.duration(this.getDiffInSeconds(), "seconds")
      /**
       * Jika durasi habis maka 
       * muncul modal penringatan waktu habis
       */
      if (duration >= 0) {
        /**
         * Membagi data durasi menjadi
         * 3 bagian hours, minute, and second
         */
        this.time.h = duration.hours() < 10 ? '0'+duration.hours() : duration.hours()
        this.time.m = duration.minutes() < 10 ? '0'+duration.minutes() : duration.minutes()
        this.time.s = duration.seconds() < 10 ? '0'+duration.seconds() : duration.seconds()
        /**
         * Mengupdate data durasi yang ada di local storage
         */        
        this.dataDurasi[this.submateri] = (duration.minutes()*60)+duration.seconds()
        localStorage.dataDurasi = JSON.stringify(this.dataDurasi)
      } else {
        this.visible = true
      }
    },
    addOneSecondToActualTimeEverySecond () {
      const component = this
      component.actualTime = moment().format('X')
      /**
       * Selama berada dihalaman pengerjaan-soal
       * maka setiap detik akan menjalankan
       * 3 function tersebut
       */
      if (this.$route.name === 'pengerjaan-soal') {
        setTimeout(function(){
          component.getDiffInSeconds()
          component.compute()
          component.addOneSecondToActualTimeEverySecond()
        }, 1000);
      }
    },
  },
  mounted () {
    this.dataDurasi = JSON.parse(localStorage.dataDurasi)
    this.dataSoal = JSON.parse(localStorage.soal)
    //----------------//
    this.compute()
    this.addOneSecondToActualTimeEverySecond()
  },
}
</script>

<style scoped>
nav{
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
  @apply text-white px-6 py-2 flex items-center justify-between;
}
</style>