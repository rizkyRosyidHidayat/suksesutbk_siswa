<template>
  <div class="paket overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 px-4 w-full md:w-2/3 block mx-auto">
      <div class="grid grid-cols-2 gap-8">
        <div
          v-for="(item, i) in dataPaket" :key="item.id_paket" 
          class="card">
          <div class="card-body" :class="color[i]">
            <h1 class="text-xl font-bold text-gray-700 tracking-wider">{{ item.subpaket }}</h1>
          </div>
          <div class="card-body">
            <ul class="divide-y">
              <li v-for="item in 8" :key="item" class="py-2">Lorem ipsum dolor sit amet</li>
            </ul>
          </div>
          <div class="card-body">
            <div class="btn-primary" :class="btncolor[i]">
              PESAN SEKARANG
            </div>
          </div>
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

export default {
  props: ['nama_paket'],
  components: {
    Footer,
    FixedNavbar
  },
  data: () => ({
    isSubmit: false,
    color: ['bg-orange-300', 'bg-blue-300'],
    btncolor: ['bg-orange-500', 'bg-blue-500'],
  }),
  computed: {
    ...mapState('dataPaket', ['dataPaket'])
  },
  created() {   
    this.$store.dispatch('dataPaket/getDataPaket', this.nama_paket)
  }
}
</script>

<style scoped>
.paket{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
</style>