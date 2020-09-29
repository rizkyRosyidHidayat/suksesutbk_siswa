<template>
  <div class="bg-white">
    <nav>
      <img src="@/assets/img/logo_white.png" alt="logo" class="h-10">
    </nav>
    <section>
      <div class="w-full sm:w-1/2 card">
        <div class="card-body">
          <h1 class="text-2xl font-bold text-gray-700 text-center">Selamat Skor Ujian Kamu adalah</h1>
          <div class="mt-8 grid grid-cols-1 md:grid-cols-2 items-center">
            <div class="text-center text-6xl font-bold text-yellow-500">
              {{ skor.score.toFixed(2) }}
            </div>
            <div>
              <ul>
                <li class="flex items-center">
                  <img src="@/assets/icons/clock.svg" alt="icons" class="w-6">
                  <span class="ml-3">{{ durasi }} Menit jumlah durasi</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/check_circle.svg" alt="icons" class="w-6">
                  <span class="ml-3">{{ skor.detail.benar }} Jumlah soal benar</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/close_circle.svg" alt="icons" class="w-6">
                  <span class="ml-3">{{ skor.detail.salah }} Jumlah soal salah</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/circle_outline.svg" alt="icons" class="w-6">
                  <span class="ml-3">{{ skor.detail.tidak_dijawab }} Jumlah soal kosong</span>
                </li>
              </ul>
            </div>
          </div>
          <center>
            <div @click="assessment" class="btn-primary inline-block my-4">
              <Spinner>
                <span v-if="done">Lihat Assessment</span>
                <span v-else>Tes Selanjutnya</span>
              </Spinner>
            </div>
          </center>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Spinner from '@/components/Spinner'
export default {
  components: {
    Spinner
  },
  data: () => ({
    skor: '',
    done: false
  }),
  computed: {
    ...mapState('dataDashboard', ['dataPaketSoal']),
    durasi() {
      return parseInt(this.skor.duration.value/60)
    },
  },
  created() {
    this.skor = JSON.parse(localStorage.skor_soal)
    this.$store.dispatch('dataDashboard/getDataPaketSoal', {
      id_peserta: JSON.parse(window.localStorage.getItem('dataPeserta')).id,
      id_paket_soal: window.localStorage.getItem('id_paket_soal')
    })
  },
  methods: {
    assessment() {
      /**
       * Mengecek apakah masih ada data completed = 0
       * jika tidak ditemukan maka bisa melihat assessment report
       */
      const completed = this.dataPaketSoal.findIndex(x => x.completed == 0 )
      if (completed == -1) {
        this.done = true
        this.$store.dispatch('dataSoal/postFinishUjian')          
      } else {
        this.done = false
        this.$router.push({ name: 'paket-soal', params: { id: window.localStorage.getItem('id_paket_soal') } })
      }
    }
  }
}
</script>

<style scoped>
nav{
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
  @apply text-white px-6 py-2 flex justify-center;
}
section{
  height: calc(100vh - 56px);
  @apply flex items-center justify-center;
}
li{ @apply mb-4; }
</style>