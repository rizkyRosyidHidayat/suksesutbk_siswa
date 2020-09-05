<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="mulai" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm inline-block">
        <span>MULAI</span>
      </div>
    </template>
    <template v-slot:content>
      <div class="card max-w-full sm:max-w-md overflow-visible sm:mx-auto">
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
import { mapState } from "vuex";
import Modal from '@/components/Modal'
import Form from './Form'
export default {
  props: ['id'],
  data: () => ({
    visible: false,
  }),
  components: {
    Form,
    Modal
  },
  computed: {
    ...mapState('dataDashboard', ['dataSubpaket'])
  },
  methods: {
    mulai() {
      /**
       * Menyimpan id subpaket ketika klik tombol MULAI
       */
      window.localStorage.setItem('id_subpaket', this.id)
      /**
       * Mengeset data paket soal berdasarkan id subpaket
       */
      this.$store.commit('dataDashboard/updateDataPaketSoal', 
        this.dataSubpaket.filter(sub => sub.id == this.id)[0].paket_soal
      )
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