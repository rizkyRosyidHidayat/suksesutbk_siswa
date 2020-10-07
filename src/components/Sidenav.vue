<template>
  <div>
    <div class="screen" :class="{active: active}" @click="$emit('update:active', false)"></div>
    <section 
      class="sidenav"
      :class="{active: active}">
      <div class="flex justify-between py-4 px-6">
        <!-- <svg @click="$emit('update:active', false)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="#14AAA7"/>
        </svg> -->
        <img src="@/assets/img/logo.png" alt="logo" class="h-10" @click="$router.push({ name: 'home' })" />
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M16 17H7v-6.5C7 8 9 6 11.5 6S16 8 16 10.5m2 5.5v-5.5c0-3.07-2.14-5.64-5-6.32V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5v.68c-2.87.68-5 3.25-5 6.32V16l-2 2v1h17v-1m-8.5 4a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2z" fill="#14AAA7"/>
        </svg>
      </div>
      <ul>
        <li
          v-for="item in nav" :key="item.text"
          @click="$router.push({ name: item.link })">
          {{ item.text }}
        </li>
        <li>
          <div @click="logout" class="btn-primary bg-red-500 inline-block font-normal hover:bg-red-600">
            Logout
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props: ['nav', 'active', 'full'],
  methods: {
    logout() {
        window.localStorage.clear()        
        this.$router.replace({ name: 'auth', params: { form: 'login' } })      
    }
  },
  computed: {
    route() {
      return this.$route.name
    }
  },
  watch: {
    route() {
      this.$emit('update:active', false)
    }
  }
}
</script>

<style scoped>
.screen{
  height: 100vh;
  display: none;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  @apply w-full duration-500 fixed;
}
.screen.active{
  display: block;
  opacity: 1;
}
.sidenav{
  height: 100vh;
  bottom: 0;
  transform: translateX(-100%);
  width: 80%;
  @apply bg-white fixed z-50 duration-300;
}
.sidenav.active{
  transform: translateX(0);
}
li{
  padding: 0 24px;
  @apply py-2 text-lg text-gray-700 font-bold capitalize cursor-pointer;
}
</style>