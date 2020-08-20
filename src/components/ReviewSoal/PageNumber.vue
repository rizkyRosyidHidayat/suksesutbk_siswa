<template>
  <footer>
    <div @click="$emit('update:number', number-1)" v-if="number>0" class="btn-primary rounded-none flex items-center order-2 sm:order-1">
      <img src="@/assets/icons/chevron_left.svg" alt="icon" width="30" class="-ml-3">
      SEBELUMNYA
    </div>
    <div 
      class="page-number order-1 sm:order-2"
      :class="{'xl:justify-center': soal.length<=20?true:false}">
      <input type="button" 
        v-for="item in soal.length" :key="item"
        class="btn-page-number"
        :class="{'active': isPageEmpty(item-1)}"
        v-shortkey="{left: ['arrowleft'], right: ['arrowright']}"
        @shortkey="changeNumber($event)"
        @click="changeNumberClick(item-1)"
        :value="item">
    </div>
    <div @click="$emit('update:number', number+1)" v-if="number<soal.length-1" class="order-3 btn-primary rounded-none flex items-center bg-orange-500">
      SELANJUTNYA
      <img src="@/assets/icons/chevron_right.svg" alt="icon" width="30" class="-mr-3">
    </div>
  </footer>
</template>

<script>
export default {
  props: ['soal', 'number'],
  methods: {
    changeNumber(e) {
      let number = this.number
      switch (e.srcKey) {
        case 'left':
          /**
           * Number akan berubah selama page
           * number lebih dari 0
           */
          if (number > 0) {
            this.$emit('update:number', number-1)
          }
          break;
        case 'right':
          /**
           * Number akan berubah selama page
           * number kurang dari panjang soal
           */
          if (number < this.soal.length-1) {
            this.$emit('update:number', number+1)
          }
          break;
      
        default:
          break;
      }
    },
    changeNumberClick(number) {
      this.$emit('update:number', number)
    },
    isPageEmpty(number) {
      /**
       * Page number aktif ketika data jawaban
       * tidak kosong dan data number sama dengan data number yang aktif
       */
      if (this.soal[number].jawaban_peserta !== undefined && this.soal[number].jawaban_peserta !== null && this.soal[number].jawaban_peserta !== '') {
        return true
      } else if (this.number == number) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style scoped>
footer{
  @apply flex overflow-hidden flex-wrap justify-between;
}
.page-number{
  @apply flex items-center py-2 w-full flex-shrink-0 bg-gray-400 px-2 overflow-auto;
}
@screen sm{
  .page-number{
    @apply flex-1;
  }
}
.btn-page-number{
  @apply w-8 h-8 mx-2 rounded-full bg-white flex-shrink-0 flex items-center justify-center transition duration-100 cursor-pointer;
}
.btn-page-number:hover, .btn-page-number.active{
  @apply bg-blue-500 text-white;
}
.btn-page-number:focus{
  @apply outline-none;
}
::-webkit-scrollbar {
  width: 100%;
  height: 12px;
  @apply bg-gray-500;
}
::-webkit-scrollbar-button {
  @apply hidden;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-600 rounded-full;
}
</style>