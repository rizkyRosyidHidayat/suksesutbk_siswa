<template>
  <div>
    <nav class="fixed w-full bg-white py-3 shadow-lg z-50">
      <div class="container flex justify-between items-center">
        <div class="btn-icon block sm:hidden" @click="active=!active">
          <svg v-if="active" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="#14AAA7"/>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z" fill="#14AAA7"/>
          </svg>
        </div>
        <img src="@/assets/img/logo.png" alt="logo" class="h-10" />
        <div class="btn-icon block sm:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M16 17H7v-6.5C7 8 9 6 11.5 6S16 8 16 10.5m2 5.5v-5.5c0-3.07-2.14-5.64-5-6.32V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1m-8.5 4a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" fill="#14AAA7"/>
          </svg>
        </div>
        <div class="items-center hidden sm:flex">
          <div 
            v-for="item in nav" :key="item.text"
            @click="$router.push({ name: item.link })"
            class="capitalize ml-5 text-gray-700 font-bold cursor-pointer">
            {{ item.text }}
          </div>
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
      { text: 'Beranda', link: 'home' },
      { text: 'Fitur', link: 'fitur' },
      { text: 'Cara Pemakaian', link: '' },
      { text: 'riwayat transaksi', link: 'riwayat' }
    ],
    active: false
  }),
  methods: {
    logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('dataPeserta')
        this.$router.replace({ name: 'auth', params: { form: 'login' } })      
    }
  },
  components: {
    Sidenav
  }
}
</script>

<style>

</style>