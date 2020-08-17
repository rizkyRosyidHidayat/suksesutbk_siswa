<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <PilihPaketSoal :id_paket_soal.sync="data.id_paket_soal" />
      <div class="mb-2 font-xl text-gray-700">Ubah target program studimu</div>
      <PilihPtnProdi :pilihan_ptn.sync="data.pilihan_ptn" />
      <button :disabled="invalid" class="btn-primary">
        Simpan
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import PilihPaketSoal from './PilihPaketSoal'
import PilihPtnProdi from './PilihPtnProdi'

export default {
  components: {
    PilihPtnProdi,
    PilihPaketSoal
  },
  data: () => ({
    data: {
      id_paket_soal: '',
      pilihan_ptn: []
    }
  }),
  methods: {
    onSubmit() {      
      localStorage.pilihan_ptn = JSON.stringify(this.data.pilihan_ptn)
      this.$router.push({ name: 'paket-soal'})
    }
  }
}
</script>