<template>
  <div class="card-body">
    <AnalisiMateriuji />
    <NilaiCeeb />
    <ReviewSoal />
    <Peringkat />
    <Rekomendasi />
    <Target />
  </div>
</template>

<script>
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
  }
}
</script>

<style>

</style>