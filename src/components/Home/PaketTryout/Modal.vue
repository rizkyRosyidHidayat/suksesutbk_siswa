<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="mulai" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm inline-block">
        <span>MULAI</span>
      </div>
    </template>
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-md overflow-visible mx-4 sm:mx-auto">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="text-xl font-bold text-gray-800">Pilih Paket Soal dan PTN</div>
            <div @click="visible=false" class="btn-icon">
              <img src="@/assets/icons/close.svg" alt="icons" width="25px">
            </div>
          </div>
        </div>
        <div class="bg-white card-body rounded-br rounded-bl">
          <Form/>      
        </div>
      </div>
    </template>                        
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
import Form from './Form'
export default {
  data: () => ({
    visible: false,
  }),
  components: {
    Form,
    Modal
  },
  methods: {
    mulai() {
      const peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
      if (peserta.sekolah.tahun_kelulusan === null) {
        this.$router.push({name: 'biodata'})
      } else {
        this.visible = true
      }
    }
  }
}
</script>