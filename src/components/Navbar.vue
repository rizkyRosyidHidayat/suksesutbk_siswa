<template>
  <div>
    <nav class="sm:absolute w-full mt-12">
      <div class="container flex justify-between items-center">
        <div class="btn-icon block sm:hidden" @click="active=true">
          <img src="@/assets/icons/menu.svg" alt="icon" width="25px">
        </div>
        <img  @click="$router.push({ name: 'home' })" src="@/assets/img/logo_white.png" alt="logo" class="h-10 hidden sm:block" />
        <img  @click="$router.push({ name: 'home' })" src="@/assets/img/logo.png" alt="logo" class="h-10 sm:hidden" />
        <div class="btn-icon block sm:hidden">
          <img src="@/assets/icons/bell.svg" alt="icon" width="25px">
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
      { text: 'Cara Pemakaian', link: 'cara-pemakaian' },
      { text: 'riwayat transaksi', link: 'riwayat' }
    ],
    active: false
  }),
  components: {
    Sidenav
  },
  methods: {
    logout() {
        window.localStorage.clear()
        this.$router.replace({ name: 'auth', params: { form: 'login' } })      
    }
  }
}
</script>

<style>

</style>