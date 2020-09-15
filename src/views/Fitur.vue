<template>
  <div class="fitur overflow-hidden">
    <!-- navbar -->
    <FixedNavbar id="fixedHeader"/>
    <!--  -->
    <section class="container mb-24">
      <p class="mt-32 text-white font-bold text-4xl tracking-widest mb-16">
        Fitur Aplikasi
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        <div v-for="item in fitur" :key="item.title">
          <div class="card">
            <div class="card-body">
              <div>
                <img src="@/assets/img/fitur.svg" alt="fitur" class="w-1/2 mx-auto">
                <h1 class="text-center text-xl font-bold text-gray-700 mt-6">{{ item.title }}</h1>
              </div>              
            </div>
            <div class="card-body">
              <div class="text-center">
                <p class="truncate ...">{{ item.text }}</p>
              </div>
            </div>
            <div class="card-body text-center">
              <Modal :visible="item.visible">
                <template v-slot:activator>
                  <div @click="item.visible=true" class="text-blue-500 underline cursor-pointer">Lihat lebih banyak</div>
                </template>
                <template v-slot:content>
                  <div class="card max-w-full sm:max-w-md sm:mx-auto">
                    <div class="card-body">
                      <div class="flex sm:block">
                        <img src="@/assets/img/fitur.svg" alt="fitur" width="150px" class="mx-auto">
                        <h1 class="text-center text-xl font-bold text-gray-700 mt-6">{{ item.title }}</h1>
                      </div>              
                    </div>
                    <div class="card-body">
                      <div class="text-center">
                        <p>{{ item.text }}</p>
                      </div>
                    </div>
                    <div class="card-body">
                      <button class="btn-primary" @click="item.visible=false">Kembali</button>
                    </div>
                  </div>
                </template>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  -->
    <Footer/>
  </div>
</template>

<script>
import FixedNavbar from '@/components/FixedNavbar'
import Footer from '@/components/Footer'
import Modal from '@/components/Modal'
export default {
  components: {
    Modal,
    Footer,
    FixedNavbar
  },
  data: () => ({
    fitur: [
      {
        title: 'Simulasi Rasionalisasi UTBK',
        text: 'Fitur simulasi rasionalisasi merupakan fitur terbaik yang dapat membantu kamu dalam mengukur kemampuan kamu untuk dapat di terima pada Perguruan Tinggi Negeri yang kamu inginkan. Hanya dengan menggunakan nilai dari hasil test yang telah kamu dapatkan selanjutnya kamu dapat melakukan simulasi rasionalisasi.',
        visible: false,
        // img: 'simulasi.jpeg'
      },
      {
        title: 'Assessment Report',
        text: 'Fitur Assessment Report dengan fitur ini kamu bisa mendapatkan Analisis Perolehan Nilai, Progres dan review pengerjaan soal, Pringkat Tryout, Rekomendasi PTN dan Prodi, Target dan Pencapaian.',
        visible: false,
        // img: 'assessment.jpeg'
      },
      {
        title: 'Rekomendasi PTN & Prodi',
        text: 'Fitur Rekomendasi PTN akan memberikan referensi Perguruan Tinggi Neger yang paling cocok untuk kamu berdasarkan pilihan PTN dan Prodi yang kamu inginkan. Jika kamu memiliki nilai yang terbaik maka kamu akan semakin banyak mendapatkan rekomendasi PTN dan Prodi yang paling cocok untuk kamu.',
        visible: false,
        // img: 'rekomendasi.jpeg'
      },
      {
        title: 'Review & Pembahasan Soal',
        text: 'Fitur Review & Pembahasan Soal dapat membantumu untuk belajar dengan lebih baik lagi. Dilengkapi dengan pembahasan soal yang jelas, sehingga kamu dapat melakukan evaluasi terhadap jawabanmu serta dapat melakukan persiapan lebih matang menuju UTBK 2020.',
        visible: false,
        // img: 'pembahasan.jpeg'
      },
      {
        title: 'Statistik Progress TryOut',
        text: 'Tidak hanya dapat melihat soal saja, kamu juga dapat melihat statistik dan sajian grafis progress setiap TryOut yang kamu ikuti.',
        visible: false,
        // img: 'progress.png'
      },
      {
        title: 'Target & Pencapaian',
        text: 'Fitur Target & Pencapaian ini, akan memberikan statistik pencapaian terhadap target nilai berdasarkan PTN dan Prodi Pilihanmu. Kamu makin percaya diri, dengan mengetahui secara detail ketercapaian target, dan dapat mempersiapkan lebih baik terhadap keunggulan maupun kelemahan yang kami miliki.',
        visible: false,
        // img: 'rekomendasi.jpeg'
      }
    ]
  }),
}
</script>

<style scoped>
.fitur{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
</style>