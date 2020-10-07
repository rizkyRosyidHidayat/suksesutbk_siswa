<template>
  <div class="flex content-between h-screen flex-wrap bg-white">
    <Navbar 
      :submateri="submateri"
      class="w-full flex-shrink-0"/>
    <div class="w-full flex-shrink-0 body">
      <div class="container">
        <h1 class="font-bold mb-4">Soal Nomor {{ number+1 }}</h1>
        <div class="break-words show-soal" v-html="soal[number].pertanyaan"></div>
        <div class="max-w-full sm:max-w-sm mt-6">
          <div 
            v-for="item in soal[number].jawaban" :key="item.huruf"
            class="mb-4">
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
        <!--  -->
        <h1 class="font-bold my-4">Kunci Jawaban {{ kunciJawaban(soal[number].jawaban) }}</h1>
        <div class="break-words show-soal" v-html="soal[number].pembahasan"></div>
      </div>
    </div>
    <PageNumber 
      :soal="soal" 
      :number.sync="number"
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
    number: 0
  }),
  methods: {
    jawabanTerpilih(huruf) {
      /**
       * Menentukan jawaban yang terpilih
       * berdasarkan data selected 
       * atau data yang ada di local storage
       */
      if (this.soal[this.number].jawaban_peserta == huruf) {
        return true
      } else {
        return false
      }      
    },
    kunciJawaban(jawaban) {
      return jawaban.filter(data => data.kunci)[0].huruf
    }
  },
  created() {
    this.soal = JSON.parse(localStorage.pembahasan_soal).soal
    this.submateri = JSON.parse(localStorage.pembahasan_soal).submateri
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