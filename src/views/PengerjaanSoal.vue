<template>
  <div class="flex content-between h-screen flex-wrap">
    <Navbar 
      :soal="soal" 
      :submateri.sync="submateri"
      :data-jawaban="dataJawaban"
      class="w-full flex-shrink-0">
      <button v-show="fullscreen==false" class="btn-icon ml-3 mt-2 sm:mt-0" @click="toggle">
        <img src="@/assets/icons/fullscreen.svg" alt="icon" width="25px"/>
      </button>
    </Navbar>
    <div class="w-full flex-shrink-0 body">
      <div class="container">
        <h1 class="font-bold mb-4">Soal Nomor {{ number+1 }}</h1>
        <div class="show-soal break-words" v-html="pertanyaan.pertanyaan"></div>
        <div class="max-w-full sm:max-w-sm mt-6">
          <div 
            v-for="item in pertanyaan.jawaban" :key="item.huruf"
            class="mb-4">
            <input 
              type="radio" 
              name="jawaban" 
              :id="item.huruf" 
              v-model="selected"
              :value="item.huruf"
              v-shortkey="[item.huruf.toLowerCase()]"
              @shortkey="selectedValue(item.huruf)"
              class="hidden">
            <label :for="item.huruf">
              <div 
                class="card border shadow cursor-pointer transition duration-100"
                :class="{'active': jawabanTerpilih(item.huruf)}">
                <div class="card-body py-2 px-3 flex">
                  <div class="mr-1">{{ item.huruf }}.</div>
                  <div class="break-words show-soal" v-html="item.teks"></div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
    <PageNumber 
      :soal="soal.soal" 
      :number.sync="number" 
      :submateri.sync="submateri"
      :data-jawaban="dataJawaban"
      class="w-full flex-shrink-0" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Navbar from '@/components/PengerjaanSoal/Navbar'
import PageNumber from '@/components/PengerjaanSoal/PageNumber'

export default {
  components: {
    PageNumber,
    Navbar
  },
  data: () => ({
    soal: {},
    submateri: '',
    number: 0,
    selected: '',
    dataJawaban: []
  }),
  created() {
    this.submateri = parseInt(localStorage.submateri)
    this.soal = JSON.parse(localStorage.soal)[this.submateri]
    if (localStorage.dataJawaban) {
      this.dataJawaban = JSON.parse(localStorage.dataJawaban)
      this.selected = this.dataJawaban[this.submateri][this.number]
    }
  },
  computed: {
    pertanyaan() {
      return this.soal.soal[this.number]
    },
    ...mapState(['fullscreen', 'fullscreenRef'])
  },
  watch: {
    submateri(newVal) {
      /**
       * Mengubah data submateri dan soal berdasarkan submateri
       */
      localStorage.submateri = newVal
      this.soal = JSON.parse(localStorage.soal)[newVal]  
      /**
       * mengeset number ke awal
       * dan memberikan nilai selected berdasarkan data jawaban yang tersimpan 
       */      
      this.number = 0
      this.selected = this.dataJawaban[newVal][this.number]
    },
    selected(val) {
      this.dataJawaban[this.submateri][this.number] = val
      localStorage.dataJawaban = JSON.stringify(this.dataJawaban)
    },
    number(newVal) {
      /**
       * jika data jawaban soal berikutnya kosong
       * maka data selected = ''
       * jika sebaliknya maka 
       * data selected = data jawaban soal berikutnya
       */
      if (this.dataJawaban[this.submateri][newVal] !== '' && this.dataJawaban[this.submateri][newVal] !== null) {
        this.selected = this.dataJawaban[this.submateri][newVal]           
      } else {
        this.selected = null
      }     
    }
  },
  methods: {
    toggle () {
      this.fullscreenRef.toggle() // recommended
    },
    fullscreenChange (fullscreen) {
      this.$store.dispatch('updateFullscreen', fullscreen)
    },
    jawabanTerpilih(huruf) {
      /**
       * Menentukan jawaban yang terpilih
       * berdasarkan data selected 
       * atau data yang ada di local storage
       */
      if (this.selected == huruf || this.dataJawaban[this.submateri][this.number] == huruf) {
        return true
      } else {
        return false
      }      
    },
    selectedValue(huruf) {
      this.selected = huruf
    }
  }
}
</script>

<style>
.show-soal img {
  display: inline-block !important;
}
.show-soal table{
  width: 100% !important;
}
</style>

<style scoped>
.body{
  height: calc(100vh - 207px);
  overflow-x: hidden;
  overflow-y: auto;
  @apply py-8 bg-white;
}
@screen sm{
  .body{
    height: calc(100vh - 127px);
  }
}
.card.active{
  @apply bg-blue-500 text-white border-none;
}
</style>