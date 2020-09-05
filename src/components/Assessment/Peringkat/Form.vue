<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit" class="mt-4 mb-8 grid grid-cols-1 md:grid-cols-10 gap-4">
      <PilihKelompokUji :kelompok.sync="data.kelompok" />
      <PilihPtnProdi 
        :id_ptn.sync="data.id_ptn" 
        :id_prodi.sync="data.id_prodi" 
        :kelompok-uji="data.kelompok" />
      <button :disabled="invalid" class="btn-primary py-1 md:col-span-1">
        Cari
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapState } from "vuex";
import PilihKelompokUji from './PilihKelompokUji'
import PilihPtnProdi from './PilihPtnProdi'

export default {
  props: ['page', 'visible'],
  components: {
    PilihPtnProdi,
    PilihKelompokUji
  },
  data: () => ({
    data: {
      kelompok: '',
      id_ptn: 0,
      id_prodi: 0
    },
    userPremium: null
  }),
  computed: {
    ...mapState('dataDashboard', ['cekPaketBerbayar']),
    ...mapState('dataAssessment', ['loading'])
  },
  watch: {
    'data.kelompok': function (val) {
      this.$store.dispatch('dataPtn/getDataPtn', val)
    },
    page(val) {
      this.data.id_paket_soal = localStorage.id_paket_soal    
      this.data.page = val   
      this.$store.dispatch('dataAssessment/getDataPeringkat', this.data)
    },
    userPremium(val) {
      if (val) {
        this.data.id_paket_soal = localStorage.id_paket_soal    
        this.data.page = this.page    
        this.$store.dispatch('dataAssessment/getDataPeringkat', this.data) 
      } else if (val == false) {
        this.$emit('update:visible', true)
      }
      this.$store.commit('dataAssessment/updateLoading', false)
    },
    loading(val) {
      if (!val) {
        this.userPremium = null
      }
    }
  },
  methods: {
    onSubmit() {      
      this.$store.commit('dataAssessment/updateLoading', true)
      const peserta = JSON.parse(localStorage.dataPeserta)
      this.$store.dispatch('dataDashboard/getCekPaketBerbayar', peserta.id)
        .then(res => {
          if (res.status == 200) {
            this.userPremium = this.cekPaketBerbayar(res.data.paket)
          }
        })
        .catch(() => this.$store.commit('dataAssessment/updateLoading', false))
    }
  }
}
</script>