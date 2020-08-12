<template>
  <footer>
    <div v-if="submateri>0" class="btn-primary rounded-none flex items-center">
      <img src="@/assets/icons/chevron_left.svg" alt="icon" width="30" class="-ml-3">
      SEBELUMNYA
    </div>
    <div class="page-number">
      <input type="button" 
        v-for="item in soal.length" :key="item"
        class="btn-page-number"
        :class="{'active': isPageEmpty(item-1)}"
        v-shortkey="{left: ['arrowleft'], right: ['arrowright']}"
        @shortkey="changeNumber($event)"
        @click="changeNumberClick(item-1)"
        :value="item">
    </div>
    <div class="btn-primary rounded-none flex items-center bg-orange-500">
      SELANJUTNYA
      <img src="@/assets/icons/chevron_right.svg" alt="icon" width="30" class="-mr-3">
    </div>
  </footer>
</template>

<script>
export default {
  props: ['soal', 'number', 'submateri', 'data-jawaban'],  
  methods: {
    changeNumber(e) {
      let number = this.number
      switch (e.srcKey) {
        case 'left':
          if (number > 0) {
            this.$emit('update:number', number-1)
          }
          break;
        case 'right':
          if (number < this.soal.length) {
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
      if (this.dataJawaban[this.submateri][number] !== undefined && this.dataJawaban[this.submateri][number] !== null && this.dataJawaban[this.submateri][number] !== '') {
        return true
      } else if (this.number == number) {
        return true
      } else {
        return false
      }
    }
  },
}
</script>

<style scoped>
footer{
  @apply flex overflow-hidden;
}
.page-number{
  @apply flex items-center py-2 flex-1 bg-gray-400 px-2 overflow-auto;
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