<template>
  <nav>
    <div>
      <div class="items-center hidden">
        <img src="@/assets/icons/pause.svg" alt="icons" width="30">
        <span class="ml-3">11.45</span>
      </div>
      <h1 class="text-xl font-bold">{{ soal.nama }}</h1>
      <div class="text-sm">{{ soal.soal.length }} Soal | {{ soal.durasi_ujian }} Menit</div>
    </div>
    <img src="@/assets/img/logo_white.png" alt="logo" class="h-10">
    <div class="py-1 px-6 inline-block bg-gray-800 rounded-full text-lg tracking-wider">
      00:24:35
    </div>
  </nav>
</template>

<script>
export default {
  props: ['soal']
}
</script>

<style scoped>
nav{
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
  @apply text-white px-6 py-2 flex items-center justify-between;
}
</style>