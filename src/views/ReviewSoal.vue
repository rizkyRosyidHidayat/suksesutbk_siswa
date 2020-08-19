<template>
  <div class="flex content-between h-screen flex-wrap">
    <Navbar 
      :soal="soal" 
      :submateri.sync="submateri"
      :data-jawaban="dataJawaban"
      class="w-full flex-shrink-0"/>
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
import Navbar from '@/components/ReviewSoal/Navbar'
import PageNumber from '@/components/ReviewSoal/PageNumber'

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
  height: calc(100vh - 207px);
  overflow-x: hidden;
  overflow-y: auto;
  @apply py-8;
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