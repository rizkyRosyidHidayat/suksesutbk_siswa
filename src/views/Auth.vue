<template>
  <div class="login min-h-screen">
    <div class="container">
      <div class="flex justify-between">
        <div class="w-1/2">
          <div class="h-screen flex items-center">
            <div>
              <img src="@/assets/img/edubrand.png" alt="edubrand" class="mb-4">
              <ul>
                <li 
                  v-for="item in brands" :key="item.img"
                  class="flex text-white items-center mb-4">
                  <img 
                    :src="require(`@/assets/img/${item.img}`)" 
                    alt="logo" class="mr-3 h-10">
                  <div>{{ item.text }}</div>
                </li>
              </ul>
            </div>
          </div>          
          <div class="pb-12">
            <img src="@/assets/img/pt.png" alt="pt edubrand" class="h-8">
            <div class="mt-3">&copy; {{ new Date().getFullYear() }}. All Rights Reserved</div>
          </div>
        </div>
        <div style="width: 400px;" class="flex-shrink-0 mb-12">
          <img src="@/assets/img/logo.png" alt="logo" class="w-1/2 mx-auto my-6">
          <div class="card">
            <div class="flex">
              <button 
                v-for="item in tabs" :key="item.text"
                @click="$router.push({ name: 'auth', params: {form: item.value} })"
                class="btn-primary w-1/2 rounded-none py-4"
                :class="{ 'not-active': form==item.value?false:true }">
                {{ item.text }}
              </button>
            </div>
            <div class="card-body">
              <component :is="form"></component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import LupaSandi from '@/components/Auth/LupaSandi'

export default {
  props: ['form'],
  components: {
    LupaSandi,
    Signup,
    Login
  },
  data: () => ({
    tabs: [
      { text: 'DAFTAR', value: 'signup' },
      { text: 'MASUK', value: 'login' }
    ],
    brands: [
      { img: 'brainlogic.png', text: 'Brain Logic' },
      { img: 'bcs.png', text: 'Brain System Campus' },
      { img: 'tbs.png', text: 'Tes Bakat Skolastik' },
      { img: 'aksi.png', text: 'Asessment Kompetensi Siswa' },
      { img: 'p3d.png', text: 'Program Peminatan Peserta Didik' },
      { img: 'bar.png', text: 'Brain Assesment Report' }
    ]
  })
}
</script>

<style scoped>
  .login{
    background-image: url('../assets/img/banner.png');
    @apply bg-top bg-cover bg-no-repeat;
  }
  .btn-primary.not-active{
    @apply bg-gray-400;
  }
  .btn-primary.not-active:hover{
    @apply bg-teal-500;
  }
</style>