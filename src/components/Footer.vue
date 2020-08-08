<template>
  <footer class="py-12 bg-gray-800 text-white">
    <div class="container">
      <div class="grid grid-cols-1 sm:grid-cols-10 gap-4">
        <div class="sm:col-span-3">
          <img src="@/assets/img/logo_white.png" alt="logo" class="h-12 mb-12">
          <div class="flex">
            <a 
              v-for="item in sosmed" :key="item.img"
              :href="item.link" 
              class="btn-icon bg-white mr-3"
              target="_blank">
              <img :src="require(`@/assets/icons/${item.img}`)" alt="sosmed" width="25px">
            </a>
          </div>
        </div>
        <div class="sm:col-span-2">
          <h1 class="font-bold mb-4">SITEMAP</h1>
          <ul>
            <li 
              v-for="item in nav" :key="item.text"
              class="text-gray-500 cursor-pointer hover:underline mb-2">
              {{ item.text }}
            </li>
          </ul>
        </div>
        <div class="sm:col-span-2">
          <h1 class="font-bold mb-4">RESOURCE</h1>
          <p class="text-gray-500">
            Lorem ipsum dolor sit amet dito ama
          </p>
        </div>
        <div class="sm:col-span-3">
          <h1 class="font-bold mb-4">BERITA</h1>
          <p class="text-gray-500 mb-6">
            Berlangganan sekarang untuk mendapatkan
            berita dan informasi terbaru dari kami
          </p>       
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <div class="flex">                  
                  <input v-model="data.email" class="text-field rounded-tr-none rounded-br-none" type="text" placeholder="E-mail">
                  <button :disabled="invalid" type="submit" class="btn-primary px-2 rounded-tl-none rounded-bl-none">
                    <Spinner>KIRIM</Spinner>
                  </button>  
                </div>
                <p class="field-message">{{ errors[0] }}</p>              
              </ValidationProvider>
              <Notif class="mb-4"/>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Data harus di isi'
});
extend('email', {
  ...email,
  message: 'Data harus berupa e-mail'
})

import Notif from '@/components/Notif'
import Spinner from '@/components/Spinner'
export default {
  data: () => ({
    sosmed: [
      { img: 'facebook.svg', link: '' },
      { img: 'youtube.svg', link: '' },
      { img: 'twitter.svg', link: '' },
    ],
    nav: [
      { text: 'Beranda', link: '' },
      { text: 'Fitur', link: '' },
      { text: 'Cara Pemakaian', link: '' },
      { text: 'riwayat transaksi', link: '' }
    ],
    data: {
      email: ''
    }
  }),
  components: {
    Spinner,
    Notif
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('dataAuth/postDataLogin', this.data)
    }
  }
}
</script>

<style>

</style>