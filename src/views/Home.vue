<template>
  <div class="home overflow-hidden">
    <img src="@/assets/img/banner.png" alt="banner" class="img-banner sm:w-full">
    <div class="absolute w-full" style="top: 0;letf: 0;">
      <!-- navbar -->
      <FixedNavbar id="fixedHeader"/>
      <Navbar/>
      <!-- banner -->
      <section class="h-screen hidden sm:flex items-center mt-12">
        <div class="container">
          <div class="w-1/3 text-white">
            <p class="text-4xl mb-4">
              <span>Selamat Datang</span> <br>
              <span class="font-bold italic">{{ nama }}</span>
            </p>
            <div>
              Selamat mengikuti TryOut UTBK 2021. Dapatkan Assessment Report, soal-soal
              prediktif, review & pembahasan soal, penilaian IRT System, peringkat nasional,
              rekomendasi PTN/Prodi, statistik & progress TryOut, serta fitur-fitur 
              unggulan lainnya sesuai regulasi UTBK terupdate.
            </div>
          </div>
        </div>
      </section>
      <!--  -->
      <section class="mt-tall sm:mt-10">
        <div class="container">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 items-end">
            <PaketTryout/>
            <div class="hidden sm:block">
              <Profil/>
              <Performance/>
            </div>
          </div>
        </div>
      </section>
      <!--  -->
      <section class="mt-12">
        <div class="container">
          <div class="grid grid-cols-1 sm:grid-cols-10 gap-10">
            <div class="sm:col-span-4 order-2 sm:order-1">
              <div class="text-gray-700 text-2xl font-bold uppercase mb-6">Statistik Progres</div>
              <StatistikProgress/>
            </div>
            <div class="sm:col-span-6 order-1 sm:order-2">
              <Simulasi/>
            </div>
          </div>
        </div>
      </section>
      <!--  -->
      <section class="mt-12">
        <div class="container">
          <div class="text-gray-700 text-2xl font-bold uppercase mb-6">video favorit</div>          
          <Video/>
        </div>
      </section>
      <!--  -->
      <section class="mt-12">
        <div class="container">
          <div class="text-gray-700 text-2xl font-bold uppercase">bonus dan fasilitas</div>
          <BonusFasilitas/>
        </div>
      </section>
      <!--  -->
      <section class="mt-12">
        <div class="container">
          <Peringkat/>
        </div>
      </section>
      <!--  -->
      <section 
        class="mt-12 bg-cover bg-no-repeat free">
        <div class="container">
          <div class="flex items-center" style="height: 400px;">
            <div>
              <h1 class="text-gray-700 text-3xl font-bold">Gratis Demonstari</h1>
              <p class="my-4">
                Coba dan lihat cara kerja simulasi, kemudian <br>
                rasakan manfaatnya secara langsung
              </p>
              <button class="btn-primary bg-orange-500 hover:bg-orange-600">
                Coba Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>
      <!--  -->
      <Footer/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FixedNavbar from '@/components/FixedNavbar'
import PaketTryout from '@/components/Home/PaketTryout'
import Profil from '@/components/Home/Profil'
import Performance from '@/components/Home/Performance'
import StatistikProgress from '@/components/Home/StatistikProgress'
import Simulasi from '@/components/Home/Simulasi'
import Video from '@/components/Home/Video'
import BonusFasilitas from '@/components/Home/BonusFasilitas'
import Peringkat from '@/components/Home/Peringkat'
import Footer from '@/components/Footer'

export default {
  components: {
    Footer,
    Peringkat,
    BonusFasilitas,
    Video,
    Simulasi,
    StatistikProgress,
    Performance,
    Profil,
    PaketTryout,
    FixedNavbar,
    Navbar
  },
  created() {
    var peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
    this.$store.dispatch('dataDashboard/getDataDashboard', peserta.id)
  },
  computed: {
    nama() {
      return JSON.parse(window.localStorage.getItem('dataPeserta')).nama
    }
  }
}
</script>

<style scoped>
.free{
  background-image: url('../assets/img/Fother.png');
}
.mt-tall{
  margin-top: 350px;
}
@media screen and (max-width: 640px) {
  .img-banner{
    max-width: 200%;
    margin-left: -80%;
  }
}
</style>