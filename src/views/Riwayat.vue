<template>
  <div class="riwayat overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 container">
      <p class="text-white font-bold text-4xl tracking-widest mb-16">
        Riwayat Transaksi
      </p>
      <div v-if="$store.getters.getLoading" class="animate-pulse h-4 w-full bg-gray-400 rounded"></div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">        
        <div class="md:col-span-1">
          <div class="card">
            <div class="px-4 mt-2">
              Status Transaksi
            </div>
            <ul class="my-2 menu-riwayat">
              <li 
                v-for="(item, i) in menu" :key="i"
                @click="selected=item">
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>
        <div class="md:col-span-2">
          <div class="card">
            <div class="card-body bg-orange-400 text-white font-bold text-lg">{{ selected.text }}</div>
            <ul class="my-2 divide-y">
              <li v-if="filterData.length == 0">Data tidak tersedia</li>
              <li v-else v-for="(item, i) in filterData" :key="i">
                <Invoice :item="item"/>
              </li>
            </ul>
          </div>
        </div>
      </div>      
    </div>
    <Footer/>
  </div>
</template>

<script>
import { postDataRiwayat } from "@/config/payment";
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import Invoice from '@/components/Riwayat/Invoice'

export default {
  components: {
    Invoice,
    Footer,
    FixedNavbar
  },
  data: () => ({
    data: [],
    filterData: [],
    menu: [{
      text: 'Menunggu Pembayaran',
      status: 0
    },{
      text: 'Transaksi Berhasil',
      status: 1
    }],
    selected: {
      text: 'Menunggu Pembayaran',
      status: 0
    }
  }),
  created() {
    this.$store.dispatch('updateLoading', true)
    postDataRiwayat({
      peserta_id: JSON.parse(window.localStorage.getItem('dataPeserta')).id
    })
      .then(res => {
        if (res.status == 200) {
          this.data = res.data.data      
        }
        this.$store.dispatch('updateLoading', false)
      })
      .catch(() => {
        this.$store.dispatch('updateLoading', false)
      })
  },
  watch: {
    data(val) {
      this.filterData = val.filter(x => x.status == this.selected.status)
    },
    selected(val) {
      this.filterData = this.data.filter(x => x.status == val.status)
    }
  }
}
</script>

<style scoped>
.riwayat{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
li{
  @apply px-4 py-2 duration-100;
}
li:hover{
  @apply bg-gray-300;
}
.menu-riwayat li{
  @apply font-bold text-gray-700 cursor-pointer;
}
</style>