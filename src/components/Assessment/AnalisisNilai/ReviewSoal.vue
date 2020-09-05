<template>
  <div>
    <ModalCekPaketBerbayar :visible.sync="visible" />
    <h1 class="text-2xl font-bold text-gray-700 mt-8">
      {{ data.materi_uji }}
    </h1>
    <ul class="mt-4">
      <li
        v-for="(val, i) in data.detail" :key="i" 
        class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div class="border rounded p-3 block md:flex items-center justify-between">
          <div  class="mb-4 md:mb-0">
            <h1 class="text-lg font-bold text-gray-700">
              {{val.submateri}}
            </h1>
            <div>
              Dikerjakan dalam waktu kurang lebih 
							{{ waktu(val.durasi_pengerjaan.value) }}
            </div>
          </div>
          <div @click="pembahasan(val)" class="btn-primary px-2 py-1 ml-0 md:ml-4">
            <svg 
              v-if="loading"
              class="animate-spin text-white" style="width: 24px;height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none">
              <circle class="opacity-25" cx="12px" cy="12px" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>Review</span>
          </div>
        </div>
        <div class="mb-4 md:mb-0">
          <div class="mb-2">
            {{val.benar}} benar / {{val.total_soal}} Soal            
          </div>
          <div class="rounded-full bg-blue-200 w-full h-4">
            <div class="rounded-full bg-blue-500 h-4" :style="{'width': progress(val.benar, val.total_soal)+'%'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from "vuex";
import ModalCekPaketBerbayar from '@/components/ModalCekPaketBerbayar'

export default {
  props: ['data'],
  data: () => ({
    visible: false,
    userPremium: null,
    materi_uji: null
  }),
  components: {
    ModalCekPaketBerbayar
  },
  computed: {
    ...mapState('dataAssessment', ['loading']),
    ...mapState('dataDashboard', ['cekPaketBerbayar'])
  },
  methods: {
    waktu (time) {
      var durasi = moment.duration(time, 'seconds')
      return durasi.minutes()+' menit '+durasi.seconds()+' detik'
    },
    progress (benar, total) {
      return (benar*100)/total
    },
    pembahasan(val) {
      this.materi_uji = {
        id_sub: this.data.id_sub,
        id_ujian: localStorage.id_ujian,
        id_kategori_submateri: val.id_kategori_submateri,
        submateri: val.submateri
      }
      this.$store.commit('dataAssessment/updateLoading', true)            
      const peserta = JSON.parse(localStorage.dataPeserta)
      this.$store.dispatch('dataDashboard/getCekPaketBerbayar', peserta.id)
        .then(res => {
          if (res.status == 200) {
            this.userPremium = this.cekPaketBerbayar(res.data.paket)
          }
          this.$store.commit('dataAssessment/updateLoading', false)
        })
        .catch(() => this.$store.commit('dataAssessment/updateLoading', false))
    }
  },
  watch: {
    userPremium(val) {
      if (val) {        
        this.$store.dispatch('dataAssessment/getDataPembahasan', this.materi_uji)    
      } else {
        this.visible = true
      }
    }
  }
}
</script>

<style>

</style>