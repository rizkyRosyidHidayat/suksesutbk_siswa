<template>
  <div>
    <h1 class="text-gray-700 text-2xl font-bold mb-6 hidden sm:block">PAKET TRYOUT</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 paket-tryout">
      <div 
        v-for="item in dataPaket" :key="item.name"
        class="card rounded-lg">
        <div class="card-body px-2">
          <div class="flex items-center">
            <img :src="require(`@/assets/img/${item.img}`)" alt="paket tryout" class=" h-16">
            <div class="text-white font-bold text-xl ml-4">
              <h1>UTBK</h1>
              <h2>{{ item.name }}</h2>
            </div>
          </div>
          <div class="mt-2 flex justify-end">
            <div @click="pesan(item.name)" v-if="item.status==0" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm">
              <span>PESAN</span>
            </div>
            <Modal v-else-if="item.status==1"/>
            <div v-else-if="item.status==2" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm">              
              <span>MENUNGGU PEMBAYARAN</span>
            </div>
            <div v-else-if="item.status==3" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm">              
              <span>MENUNGGU AKTIVASI</span>
            </div>
            <div v-else-if="item.status==4" class="btn-primary text-gray-700 bg-white hover:bg-gray-200 text-sm">              
              <span>CEK HASIL</span>
            </div>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import { mapState } from "vuex";
import Modal from '@/components/Home/PaketTryout/Modal'
export default {
  computed: {
    ...mapState('dataDashboard', ['dataPaket'])
  },
  components: {
    Modal,
  },
  methods: {
    pesan(nama) {
      const peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
      if (peserta.sekolah.tahun_kelulusan === null) {
        this.$router.push({name: 'biodata'})
      } else {
        this.$router.push({name: 'pesan-paket', params: { nama_paket: nama }})        
      }
    }
  }
}
</script>

<style>
.paket-tryout .card:nth-child(1){
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
}
.paket-tryout .card:nth-child(2){
  background: rgb(90,78,222);
  background: linear-gradient(124deg, rgba(90,78,222,1) 12%, rgba(144,119,198,1) 100%);
}
.paket-tryout .card:nth-child(3){
  background: rgb(14,127,228);
  background: linear-gradient(124deg, rgba(14,127,228,1) 12%, rgba(123,183,255,1) 100%);
}
.paket-tryout .card:nth-child(4){
  background: rgb(0,199,6);
  background: linear-gradient(124deg, rgba(0,199,6,1) 12%, rgba(50,255,59,1) 100%);
}
</style>