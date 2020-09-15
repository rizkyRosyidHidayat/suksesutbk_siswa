<template>
  <div class="card-body">
    <div class="flex">
      <div class="btn-primary py-1 flex rounded-tr-none rounded-br-none items-center z-10">
        Paket Soal
      </div>
      <Option 
        v-model="id_ujian"
        :items="dataAssessment"
        :item="{
          text: 'paket_soal',
          value: 'id_ujian',
        }"
        :selected-value.sync="namaPaketSoal"
        placeholder="Pilih Paket Soal"
        class="flex-1 -ml-2"></Option>
    </div>    
  </div>
</template>

<script>
import { mapState } from "vuex";
import Option from '@/components/Option'

export default {
  components: {
    Option
  },
  data: () => ({
    id_ujian: '',
    namaPaketSoal: ''
  }),
  computed: {
    ...mapState('dataAssessment', ['dataAssessment'])
  },
  watch: {
    dataAssessment(val) {
      this.namaPaketSoal = val[0].paket_soal
      localStorage.id_paket_soal = val[0].id_paket_soal
    },
    id_ujian(val) {
      // digunakan untuk menampilkan data pembahasan
      localStorage.id_ujian = val
      // menyimpan id paket soal
      const data = this.dataAssessment.find(x => x.id_ujian == val)
      localStorage.id_paket_soal = data.id_paket_soal
      
      this.$store.dispatch('dataAssessment/getDetailAssessment', {
        id_peserta: JSON.parse(localStorage.dataPeserta).id,
        id_ujian: val
      })
    }
  }
}
</script>