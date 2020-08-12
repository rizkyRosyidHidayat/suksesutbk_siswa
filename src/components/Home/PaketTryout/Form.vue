<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <PilihPaketSoal v-if="!isSelectPtn" :id_paket_soal.sync="data.id_paket_soal" />
      <div v-else>
        <div class="mb-2 font-xl font-bold text-gray-700">Pilihan PTN dan Prodi Pertama</div>
        <PilihPtnProdi :pilihan_ptn.sync="data.pilihan_ptn[0]" />
        <div class="mb-2 font-xl font-bold text-gray-700">Pilihan PTN dan Prodi Kedua</div>
        <PilihPtnProdi :pilihan_ptn.sync="data.pilihan_ptn[1]" />
        <div class="text-right"> 
          <button @click="isSelectPtn=false;data.id_paket_soal=0" class="btn-primary bg-white text-teal-500">
            Kembali
          </button>
          <button :disabled="invalid" class="btn-primary ml-4">
            Simpan
          </button>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapState } from "vuex";
import PilihPaketSoal from './PilihPaketSoal'
import PilihPtnProdi from './PilihPtnProdi'

export default {
  components: {
    PilihPtnProdi,
    PilihPaketSoal
  },
  data: () => ({
    selectedKelompokUji: '',
    data: {
      id_paket_soal: '',
      pilihan_ptn: []
    },
    isSelectPtn: false
  }),
  computed: {
    ...mapState('dataDashboard', ['dataPaketSoal']),
    ...mapState('dataPtn', ['dataPilihanPtn']),
  },
  watch: {
    'data.id_paket_soal': function (val) {
      if (val > 0) {
        window.localStorage.setItem('id_paket_soal', val)
        this.$store.dispatch('dataPtn/cekPilihanPtn', {
          id_paket_soal: val,
          id_peserta: JSON.parse(window.localStorage.getItem('dataPeserta')).id
        })
      }      
    },
    dataPilihanPtn(val) {
      /**
       * Jika pernah memilih ptn maka
       * akan langsung ke halaman paket soal
       * tapi jika belum maka memilih ptn dan prodi
       */
      if (val.length > 0) {
        this.$router.push({ name: 'paket-soal' })
      } else {
        this.isSelectPtn = true
      }
    }
  },
  created() {
    /**
     * Menentukan kelompok uji
     * berdasarkan nama paket soal
     */
    const kelompokUji = ['SAINTEK', 'SOSHUM']
    this.selectedKelompokUji = kelompokUji
      .filter((kelompok) => {
        const result = this.dataPaketSoal[0].nama.includes(kelompok)
        if (result) {
          return kelompok
        }
      })[0]
    this.$store.dispatch('dataPtn/getDataPtn', this.selectedKelompokUji)
  },
  methods: {
    onSubmit() {      
      localStorage.pilihan_ptn = JSON.stringify(this.data.pilihan_ptn)
      this.$router.push({ name: 'paket-soal'})
    }
  }
}
</script>