<template>
  <div class="card-body">
    <AnalisiMateriuji :data="detailAssessment.analisis_nilai.tabel[0]" />
    <NilaiCeeb :data="detailAssessment.analisis_nilai.tabel[0]" />
    <ReviewSoal :data="detailAssessment.analisis_nilai.analisis_butir_soal[0]" />
    <Peringkat :data="detailAssessment.ptn_pilihan" />
    <Rekomendasi v-for="(item, i) in detailAssessment.rekomendasi_ptn" :key="i" :data="item" />
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
  computed: {
    ...mapState('dataAssessment', ['detailAssessment'])
  }
}
</script>

<style>

</style>