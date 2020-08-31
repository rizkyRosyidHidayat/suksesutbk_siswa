<template>
  <footer>
    <div class="sm:flex w-1/2 sm:w-auto order-2 sm:order-1">
      <div @click="changeSubmateri('left')" v-if="submateri>0 || number>0" class="btn-primary rounded-none flex items-center">
        <img src="@/assets/icons/chevron_left.svg" alt="icon" width="30" class="-ml-3 hidden sm:block">
        SEBELUMNYA
      </div>
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
    <ModalNextSubmateri 
      v-if="dataJawaban.length-1 > submateri || number < soal.length-1"
      class="sm:flex w-1/2 sm:w-auto order-3" 
      :visible.sync="visible"
      @updateSubmateri="updateSubmateri" />
    <ModalUploadJawaban 
      v-else
      class="sm:flex w-1/2 sm:w-auto order-3"
      :submateri="submateri"
      :data-jawaban="dataJawaban" />
  </footer>
</template>

<script>
import ModalNextSubmateri from './ModalNextSubmateri'
import ModalUploadJawaban from './ModalUploadJawaban'
export default {
  props: ['soal', 'number', 'submateri', 'data-jawaban'], 
  components: {
    ModalUploadJawaban,
    ModalNextSubmateri
  },  
  data: () => ({
    visible: false,
  }),
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
      if (this.dataJawaban[this.submateri][number] !== undefined && this.dataJawaban[this.submateri][number] !== null && this.dataJawaban[this.submateri][number] !== '') {
        return true
      } else if (this.number == number) {
        return true
      } else {
        return false
      }
    },
    updateSubmateri(val) {
      /**
       * Menghitung jumlah jawaban dengan mengabaikan
       * data jawaban yang kosong dan undefined
       */
      const isEmpty = this.dataJawaban[this.submateri].filter(jawaban => jawaban !== null && jawaban !== undefined)
      /**
       * Number akan berubah selama page
       * number kurang dari panjang soal
       */
      if (this.number < this.soal.length-1) {
        this.$emit('update:number', this.number+val)         
      } else {
        if( !isEmpty.length) {
           this.visible = true
         } else {
           this.$emit('update:submateri', this.submateri+val)
         }
      }
    },
    changeSubmateri(direction) {
      if (direction == 'left') {
        /**
         * Number akan berubah selama page
         * number lebih dari 0
         */
        if (this.number > 0) {
          this.$emit('update:number', this.number-1)
        } else {
          this.$emit('update:submateri', this.submateri-1)
        }
      }
    }
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