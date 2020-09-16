<template>
  <div ref="pemakaian" class="pemakaian overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 container">
      <p class="text-white font-bold text-4xl tracking-widest mb-16">
        Cara Pemakaian
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">        
        <div class="md:col-span-1">
          <div class="card">
            <div class="px-4 mt-2">
              Cara Pemakaian
            </div>
            <Option 
              :items="menu" 
              :item="{
                text: 'text',
                value: 'component',
              }"
              :selected-value.sync="selected.text"
              v-model="selected.component"
              class="p-3 block md:hidden"
            ></Option>
            <ul class="my-2 menu-riwayat hidden md:block">
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
            <component :is="selected.component"></component>
          </div>
        </div>
      </div>  
      <!--  -->
      <button v-show="visible" @click="backtoTop" class="btn-icon float bg-red-500 hover:bg-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="32px" style="-ms-transform: rotate(90deg); -webkit-transform: rotate(90deg); transform: rotate(90deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.42z" fill="white"/>
          <rect x="0" y="0" fill="rgba(0, 0, 0, 0)" />
        </svg>
      </button>
    </div>
    <Footer/>
  </div>
</template>

<script>
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import Option from'@/components/Option'
import PesanPaket from '@/components/CaraPemakaian/PesanPaket'

export default {
  components: {
    PesanPaket,
    Option,
    Footer,
    FixedNavbar
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll () {
      if (window.scrollY > 140) {
        this.visible = true
      } else {
        this.visible = false
      }
    },
    backtoTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  },
  data: () => ({
    visible: false,
    menu: [{
      text: 'Pesan Paket',
      component: 'pesan-paket'
    },{
      text: 'Pengerjaan Soal',
      component: 'pengerjaan-soal'
    },{
      text: 'Assessment Report',
      component: 'assessment'
    },{
      text: 'Simulasi Rasionalisasi',
      component: 'simulasi'
    },{
      text: 'Target dan Pencapaian',
      component: 'target'
    },{
      text: 'Pembahasan Soal',
      component: 'pembahasan'
    }],
    selected: {
      text: 'Pesan Paket',
      component: 'pesan-paket'
    }
  })
}
</script>

<style scoped>
.pemakaian{
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
.float{
  position: fixed;
  bottom: 32px;
  right: 32px;
  width: 48px;
  height: 48px;
  @apply shadow;
}
</style>