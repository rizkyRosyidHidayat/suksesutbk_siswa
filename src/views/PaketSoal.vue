<template>
  <div class="paket-soal overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 px-4 w-full md:w-1/2 block mx-auto">
      <div class="card bg-blue-400 text-white mb-8">
        <div class="card-body">
          <div class="text-lg">
            Untuk bisa melihat Assessment Report kamu harus 
            menyelesaikan semua Tes terlebih dahulu.
          </div>
          <button v-show="visible" @click="lihat" class="btn-primary bg-white text-blue-500 mt-4">
            Lihat Asessment Report
          </button>
        </div>
      </div>
      <div v-for="paketSoal in dataPaketSoal" :key="paketSoal.id_materi_uji" class="card mb-6">
        <div class="card-body flex justify-between items-center bg-orange-300">
          <div class="text-lg font-bold text-gray-700">{{ paketSoal.materi_uji }}</div>
          <ModalDownloadSoal :data="paketSoal" />          
        </div>
        <div class="card-body">
          <div v-if="$store.getters.getLoading" class="animate-pulse h-4 w-full bg-gray-400 rounded mt-4"></div>
          <table v-else class="table-auto w-full divide-y">
            <thead>
              <tr>
                <th>No</th>
                <th>Materi Uji</th>
                <th>Butir Soal</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="(item, i) in paketSoal.submateri" :key="item.nama">
                <td class="text-center">{{ i+1 }}</td>
                <td>{{ item.nama }}</td>
                <td class="text-center">{{ item.butir_soal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import ModalDownloadSoal from '@/components/PaketSoal/ModalDownloadSoal'

export default {
  components: {
    Footer,
    FixedNavbar,
    ModalDownloadSoal
  },
  data: () => ({
    visible: false
  }),
  computed: {
    ...mapState('dataDashboard', ['dataPaketSoal'])
  },
  methods: {
    lihat() {
      /**
       * Mengecek apakah masih ada data completed = 0
       * jika tidak ditemukan maka bisa melihat assessment report
       */
      const completed = this.dataPaketSoal.findIndex(x => x.completed == 0 )
      if (completed == -1) {
        this.visible = true
        this.$router.push({ name: 'assessment' })
      }
    },
  },
  created() {
    this.$store.dispatch('dataDashboard/getDataPaketSoal', {
      id_peserta: JSON.parse(window.localStorage.getItem('dataPeserta')).id,
      id_paket_soal: window.localStorage.getItem('id_paket_soal')
    })
  }  
}
</script>

<style scoped>
.paket-soal{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
th{ @apply pb-2; }
td{ @apply py-2; }
</style>