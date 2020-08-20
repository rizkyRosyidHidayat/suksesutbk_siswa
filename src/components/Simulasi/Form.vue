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
import PilihPaketSoal from './PilihPaketSoal'
import PilihPtnProdi from './PilihPtnProdi'
import Spinner from '@/components/Spinner'
import Notif from '@/components/Notif'

export default {
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
    }
  }),
  methods: {
    onSubmit() {      
      this.$store.dispatch('dataSimulasi/postDataSimulasi', this.data)
    }
  }
}
</script>