<template>
  <div class="card-body">
    <AnalisiMateriuji :data="detailAssessment.analisis_nilai.tabel[0]" />
    <NilaiCeeb :data="detailAssessment.analisis_nilai.tabel[0]" />
    <ReviewSoal :data="detailAssessment.analisis_nilai.analisis_butir_soal[0]" />
    <Peringkat :data="detailAssessment.ptn_pilihan" />
    <template v-if="userPremium">
      <Rekomendasi v-for="(item, i) in detailAssessment.rekomendasi_ptn" :key="i" :data="item" />
    </template>
    <div v-else class="mt-6">
      <div class="block text-center p-3 bg-yellow-500 text-white rounded">
        Fitur <b>REKOMENDASI PRODI</b> hanya tersedia untuk paket berbayar
      </div>
    </div>
    <Target :data="detailAssessment.pencapaian" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnalisiMateriuji from './AnalisisNilai/AnalisisMateriUji'
import NilaiCeeb from './AnalisisNilai/NilaiCeeb'
import ReviewSoal from './AnalisisNilai/ReviewSoal'
import Peringkat from './AnalisisNilai/Peringkat'
import Rekomendasi from './AnalisisNilai/Rekomendasi'
import Target from './AnalisisNilai/Target'

export default {
  components: {
    Target,
    Rekomendasi,
    Peringkat,
    ReviewSoal,
    NilaiCeeb,
    AnalisiMateriuji
  },
  data: () => ({
    userPremium: null
  }),
  computed: {
    ...mapState('dataAssessment', ['detailAssessment']),
    ...mapState('dataDashboard', ['cekPaketBerbayar'])
  },
  created() {
    const peserta = JSON.parse(localStorage.dataPeserta)
    this.$store.dispatch('dataDashboard/getCekPaketBerbayar', peserta.id)
      .then(res => {
        if (res.status == 200) {
          this.userPremium = this.cekPaketBerbayar(res.data.paket)
        }
      })
  }
}
</script>

<style>

</style>