<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="$emit('updateSubmateri', 1)" class="btn-primary rounded-none flex items-center bg-orange-500">
        SELANJUTNYA
        <img src="@/assets/icons/chevron_right.svg" alt="icon" width="30" class="-mr-3">
      </div>
    </template>
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-sm sm:mx-auto bg-yellow-500">
        <div class="card-body flex justify-end">
          <div @click="$emit('update:visible', false)" class="btn-icon">
            <img src="@/assets/icons/close.svg" alt="icons" width="25px">
          </div>
        </div>
        <div class="card-body pt-0">
          <svg class="animate-bounce w-16 h-16 block mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2L1 21z" fill="white"/>
            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
          </svg>
          <p class="text-center text-white">
            Silahkan menjawab soal minimal satu sebelum ke submateri selanjutnya
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  props: ['visible'],
  components: {
    Modal
  }
}
</script>

<style>

</style>