<template>
  <nav>
    <img src="@/assets/img/logo_white.png" alt="logo" class="h-10 hidden sm:block"> 
    <div>
      <h1 class="text-xl font-bold">{{ submateri }}</h1>
      <!-- <div class="text-sm">{{ soal.soal.length }} Soal | {{ soal.durasi_ujian }} Menit</div> -->
    </div>
    <div @click="$router.go(-1)" class="btn-icon">
      <img src="@/assets/icons/close.svg" alt="icons" width="30px">
    </div>   
  </nav>
</template>

<script>
export default {
  props: ['submateri'],
  data: () => ({
    time: {
      h: 0,
      m: 0,
      s: 0
    },
    updateSubmateri: '',
    dataDurasi: [],
    visible: false,
    dataSoal: [],
    namaSubmateri: ''
  }),
}
</script>

<style scoped>
nav{
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
  @apply text-white px-6 py-2 flex items-center justify-between;
}
</style>