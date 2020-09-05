<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <PilihPaketSoal :id_ujian.sync="data.id_ujian" />
      <div class="mb-2 font-xl text-gray-700">Ubah target program studimu</div>
      <PilihPtnProdi :id_ptn.sync="data.id_ptn" :id_prodi.sync="data.id_prodi" />
      <button :disabled="invalid" class="btn-primary mb-4">
        <Spinner>
          Simpan
        </Spinner>
      </button>
      <Notif />
    </form>
  </ValidationObserver>
</template>

<script>
import { mapState } from "vuex";
import PilihPaketSoal from './PilihPaketSoal'
import PilihPtnProdi from './PilihPtnProdi'
import Spinner from '@/components/Spinner'
import Notif from '@/components/Notif'

export default {
  props: ['visible'],
  components: {
    Notif,
    Spinner,
    PilihPtnProdi,
    PilihPaketSoal
  },
  data: () => ({
    data: {
      id_ujian: '',
      id_ptn: '',
      id_prodi: ''
    },
    userPremium: null
  }),
  computed: {
    ...mapState('dataDashboard', ['cekPaketBerbayar'])
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('updateLoading', true)
      const peserta = JSON.parse(localStorage.dataPeserta)
      this.$store.dispatch('dataDashboard/getCekPaketBerbayar', peserta.id)
        .then(res => {
          if (res.status == 200) {
            this.userPremium = this.cekPaketBerbayar(res.data.paket)
          }
        this.$store.dispatch('updateLoading', false)
        })
        .catch(() => this.$store.dispatch('updateLoading', false))
    }
  },
  watch: {
    userPremium(val) {
      if (val) {
        this.$store.dispatch('dataSimulasi/postDataSimulasi', this.data)        
      } else {
        this.$emit('update:visible', true)
      }
    }
  }
}
</script>