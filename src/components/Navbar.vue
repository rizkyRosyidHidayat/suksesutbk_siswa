<template>
  <div>
    <nav class="sm:absolute w-full mt-12">
      <div class="container flex justify-between items-center">
        <div class="btn-icon block sm:hidden" @click="active=true">
          <img src="@/assets/icons/menu.svg" alt="icon" width="25px">
        </div>
        <img src="@/assets/img/logo_white.png" alt="logo" class="h-10 hidden sm:block" />
        <img src="@/assets/img/logo.png" alt="logo" class="h-10 sm:hidden" />
        <div class="btn-icon block sm:hidden">
          <img src="@/assets/icons/bell.svg" alt="icon" width="25px">
        </div>
        <div class="items-center hidden sm:flex">
          <a 
            v-for="item in nav" :key="item.text"
            :href="item.link"
            class="capitalize ml-5 text-gray-700 font-bold">
            {{ item.text }}
          </a>
          <div @click="logout" class="btn-primary bg-red-500 ml-5 font-normal hover:bg-red-600">
            Logout
          </div>
        </div>
      </div>
    </nav>

    <Sidenav :nav="nav" :active.sync="active" />
  </div>
</template>

<script>
import Sidenav from './Sidenav'
export default {
  data: () => ({
    nav: [
      { text: 'Beranda', link: '' },
      { text: 'Fitur', link: '' },
      { text: 'Cara Pemakaian', link: '' },
      { text: 'riwayat transaksi', link: '' }
    ],
    active: false
  }),
  components: {
    Sidenav
  },
  methods: {
    logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('dataPeserta')
        this.$router.replace({ name: 'auth', params: { form: 'login' } })      
    }
  }
}
</script>

<style>

</style>