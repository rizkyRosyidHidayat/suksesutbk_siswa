<template>
  <div class="flex content-between h-screen flex-wrap">
    <Navbar :soal="soal" :submateri.sync="submateri" class="w-full flex-shrink-0"/>
    <div class="w-full flex-shrink-0 body break-all">
      <div class="container">
        <h1 class="font-bold mb-4">Soal Nomor {{ number+1 }}</h1>
        <p v-html="pertanyaan.pertanyaan"></p>
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
                  <div v-html="item.teks"></div>
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
    }
  },
  watch: {
    submateri(val) {
      localStorage.submateri = val
      this.soal = JSON.parse(localStorage.soal)[val]
      this.selected = this.dataJawaban[val][this.number]
    },
    number(newVal, oldVal) {
      /**
       * menentukan index berdasarkan 
       * direction(prev/next) page number
       */    
      if (oldVal > newVal) {
        // jika direction prev
        this.dataJawaban[this.submateri][oldVal] = this.selected
        localStorage.dataJawaban = JSON.stringify(this.dataJawaban)
        this.selected = this.dataJawaban[this.submateri][newVal]        
      } else {
        // jika direction next
        this.dataJawaban[this.submateri][oldVal] = this.selected
        localStorage.dataJawaban = JSON.stringify(this.dataJawaban)
        /**
         * jika data jawaban soal berikutnya kosong
         * maka data selected = ''
         * jika sebaliknya maka 
         * data selected = data jawaban soal berikutnya
         */
        if (this.dataJawaban[this.submateri][newVal] !== '' && this.dataJawaban[this.submateri][newVal] !== null) {
          this.selected = this.dataJawaban[this.submateri][newVal]           
        } else {
          this.selected = ''
        }
      }      
    }
  },
  methods: {
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

<style scoped>
.body{
  height: calc(100vh - 127px);
  overflow-x: hidden;
  overflow-y: auto;
  @apply py-8;
}
.card.active{
  @apply bg-blue-500 text-white border-none;
}
</style>