<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="uploadJawaban" class="btn-primary rounded-none flex items-center bg-green-500">
        SELESAI
      </div>
    </template>
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-sm mx-4 sm:mx-auto bg-teal-500">
        <div class="card-body flex justify-between items-center">
          <div class="text-lg text-white font-bold tracking-wider">Proses Upload Jawaban</div>
          <div @click="visible=false" class="btn-icon">
            <img src="@/assets/icons/close.svg" alt="icons" width="25px">
          </div>
        </div>
        <div class="card-body pt-0">
          <div class="animate-bounce">
            <svg style="-ms-transform: rotate(180deg);-webkit-transform: rotate(180deg);transform: rotate(180deg) !important;" class="w-16 h-16 text-white block mx-auto" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
          <p class="text-center text-white mt-6">
            Sedang proses upload jawaban, mohon tunggu sebentar
          </p>
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
  }),
  methods: {    
    uploadJawaban() {
      const isNotEmpty = this.dataJawaban[this.submateri].filter(jawaban => jawaban !== null && jawaban !== undefined)
      if (isNotEmpty.length) {
        console.log(this.dataJawaban)   
        this.visible = true     
      }
    }
  }
}
</script>

<style>

</style>