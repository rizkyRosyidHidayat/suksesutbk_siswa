<template>
  <Modal :visible="$store.getters['dataDashboard/getModalBayar']">
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-md overflow-visible sm:mx-auto bg-blue-500 text-white">
        <div class="card-body text-right pb-0">
          <div class="btn-icon inline-block" @click="$store.commit('dataDashboard/updateModalBayar', false)">
            <img src="@/assets/icons/close.svg" alt="icons" width="20">
          </div>
        </div>
        <div class="card-body">
          <p class="text-center mb-6 text-lg">
            Segera selesaikan proses transaksi anda sebelum kehabisan waktu
          </p>
          <div @click="$router.push({ name: 'riwayat' })" class="btn-primary bg-white text-blue-500">
            Selesaikan
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