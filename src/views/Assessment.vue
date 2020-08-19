<template>
  <div class="assessment overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 px-4 w-full md:w-4/5 block mx-auto">
      <div class="card">
        <div class="card-body">
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-700">Assessment Report</h1>
            <div class="btn-primary bg-blue-500">
              Export ke PDF
            </div>
          </div>
        </div>
        <PaketSoal />
        <div v-if="loading" class="block rounded-full h-4 mx-6 bg-gray-500 my-4 animate-pulse"></div>
        <template v-else>
          <PilihanPtn />
          <div class="card-body">
            <div class="grid grid-cols-3 gap-4">
              <div
                v-for="item in tabs" :key="item.text" 
                @click="component=item.value"
                class="btn-primary btn-outline"
                :class="{ 'active': item.value==component?true:false }">
                {{ item.text }}
              </div>
            </div>
          </div>
          <keep-alive>
            <component :is="component"></component>
          </keep-alive>
        </template>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import PaketSoal from'@/components/Assessment/PaketSoal'
import PilihanPtn from'@/components/Assessment/PilihanPtn'
import AnalisisNilai from'@/components/Assessment/AnalisisNilai'
import GrafikNilai from'@/components/Assessment/GrafikNilai'
import Peringkat from'@/components/Assessment/Peringkat'

export default {
  components: {
    Peringkat,
    GrafikNilai,
    AnalisisNilai,
    PilihanPtn,
    PaketSoal,
    Footer,
    FixedNavbar
  }, 
  data: () => ({
    component: 'analisis-nilai',
    tabs: [
      {text: 'Analisis Nilai', value: 'analisis-nilai'},
      {text: 'Grafik Nilai', value: 'grafik-nilai'},
      {text: 'Peringkat', value: 'peringkat'}
    ]
  }),
  computed: {
    loading() {
      return this.$store.getters.getLoading
    }
  },
  created() {
    const peserta = JSON.parse(localStorage.dataPeserta)
    this.$store.dispatch('dataAssessment/getDataAssessment', peserta.id)
  }
}
</script>

<style scoped>
.assessment{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
.btn-outline{
  @apply text-orange-500 border border-orange-500 bg-white;
}
.btn-outline:hover, .btn-outline.active{
  @apply text-white bg-orange-500;
}
</style>