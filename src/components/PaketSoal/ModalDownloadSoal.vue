<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="mulai(data)" class="btn-primary px-2 py-1">
        <span v-if="data.completed == 1">Selesai</span>
        <span v-else>Mulai</span>
      </div>
    </template>
    <template v-slot:content>
      <div 
        class="card max-w-full sm:max-w-md mx-auto text-white"
        :class="color">
        <div class="card-body">
          <div class="flex justify-end items-center">
            <div v-show="status==false" @click="visible=false;resetNotif" class="btn-icon">
              <img src="@/assets/icons/close.svg" alt="icons" width="25px">
            </div>
          </div>
        </div>
        <div class="card-body rounded-br rounded-bl text-center pt-0">
          <div v-if="$store.getters.getLoading">
            <center>
              <img src="@/assets/img/edu.png" alt="logo" class="h-16 animate-ping mb-6">
            </center>
          </div>
          <div v-else>
            <div v-if="!status">
              <svg class="block mx-auto animate-bounce" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="64px" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7z" fill="white"/>
                <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <div class="my-4">Maaf proses download soal gagal, mohon periksa koneksi internet anda</div>
              <div @click="mulai(data)" class="btn-primary bg-white text-red-500 inline-block">
                Ulangi Download
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>                        
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  props: ['data'],
  data: () => ({
    visible: false,
    color: 'bg-transparant',
    pilihan_ptn: []
  }),
  computed: {
    status() {
      return this.$store.getters.getNotif.status
    }
  },
  watch: {
    status(val) {
      if (val == false) {
        this.color = 'bg-red-500'        
      } else if (val == null) {
        this.color = 'bg-transparent'
      }
    }
  },
  components: {
    Modal
  },
  methods: {
    resetNotif() {
      this.$store.dispatch('updateNotif', {
        visible: false,
        status: null,
        msg: ''
      })
    },
    mulai(data) {
			if (data.completed == 0) {
        // reset nilai data notif
        this.resetNotif()
        /**
         * Jika pernah mendownload soal
         * maka status true dan bisa langsung
         * mulai ujian
         */
        if (!localStorage.soal) {
          this.visible = true
          this.$store.dispatch('dataSoal/postDataUjian', {
            ptn: this.pilihan_ptn,
            subpaket_id: window.localStorage.getItem('id_subpaket'),
            paketsoal_id: window.localStorage.getItem('id_paket_soal'),
            materiuji_id: data.id_materi_uji
          })          
        } else {
          this.$router.push({ name: 'pengerjaan-soal', params: {id: data.id_materi_uji} })
        }
      }
    }
  },
  created() {
    this.pilihan_ptn = localStorage.pilihan_ptn
  }
}
</script>