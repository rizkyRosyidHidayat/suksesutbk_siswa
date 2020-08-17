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
        <PilihanPtn />
        <div class="card-body">
          <div class="grid grid-cols-3 gap-4">
            <div class="btn-primary btn-outline active">
              ANALISIS NILAI
            </div>
            <div class="btn-primary btn-outline">
              GRAFIK NILAI
            </div>
            <div class="btn-primary btn-outline">
              PERINGKAT
            </div>
          </div>
        </div>
        <component :is="component"></component>
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

export default {
  components: {
    AnalisisNilai,
    PilihanPtn,
    PaketSoal,
    Footer,
    FixedNavbar
  }, 
  data: () => ({
    component: 'analisis-nilai'
  })
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