<template>
  <Modal :visible="visible">
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-md overflow-visible sm:mx-auto bg-yellow-500 text-white">
        <div class="card-body text-right pb-0">
          <div class="btn-icon inline-block" @click="$emit('update:visible', false)">
            <img src="@/assets/icons/close.svg" alt="icons" width="20">
          </div>
        </div>
        <div class="card-body">
          <svg class="animate-bounce w-16 h-16 block mx-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M13 14h-2v-4h2m0 8h-2v-2h2M1 21h22L12 2L1 21z" fill="white"/>
            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
          </svg>
          <p class="text-center mb-6 text-lg">
            Fitur ini hanya tersedia untuk <br> paket berbayar
          </p>
          <div @click="$router.push({ name: 'home' })" class="btn-primary bg-white text-yellow-500">
            Beli Paket
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  props: ['visible'],
  components: {
    Modal
  }
}
</script>

<style>

</style>