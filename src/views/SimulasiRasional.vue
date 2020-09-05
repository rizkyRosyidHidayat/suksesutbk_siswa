<template>
  <div class="simulasi overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 px-4 w-full md:w-2/3 block mx-auto">
      <div class="card overflow-visible">
        <div class="card-body">
          <h1 class="text-2xl font-bold text-gray-700">
            Simulasi Rasionalisasi UTBK
          </h1>       
        </div>
        <div class="card-body">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Profil/>
            <div>
              <Form :visible.sync="visible" />
            </div>
          </div>
        </div>        
      </div>
      <!--  -->
      <HasilRasionalisasi v-if="$store.getters['dataSimulasi/getVisible']"/>
    </div>

    <ModalCekPaketBerbayar :visible.sync="visible" />
    <Footer/>
  </div>
</template>

<script>
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import ModalCekPaketBerbayar from'@/components/ModalCekPaketBerbayar'
import Form from'@/components/Simulasi/Form'
import Profil from'@/components/Simulasi/Profil'
import HasilRasionalisasi from'@/components/Simulasi/HasilRasionalisasi'

export default {
  components: {
    HasilRasionalisasi,
    Profil,
    Form,
    ModalCekPaketBerbayar,
    Footer,
    FixedNavbar
  },
  data: () => ({
    isSubmit: false,
    visible: false
  }),
  created() {
    const peserta = JSON.parse(localStorage.dataPeserta)
    this.$store.dispatch('dataSimulasi/getDataHistory', peserta.id)
  }
}
</script>

<style scoped>
.simulasi{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
</style>