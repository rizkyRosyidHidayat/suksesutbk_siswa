<template>
  <div>
    <nav>
      <img src="@/assets/img/logo_white.png" alt="logo" class="h-10">
    </nav>
    <section>
      <div class="w-full sm:w-1/2 card">
        <div class="card-body">
          <h1 class="text-2xl font-bold text-gray-700 text-center">Selamat Skor Ujian Kamu adalah</h1>
          <div class="mt-8 grid grid-cols-2 items-center">
            <div class="text-center text-6xl font-bold text-yellow-500">
              500.34
            </div>
            <div>
              <ul>
                <li class="flex items-center">
                  <img src="@/assets/icons/clock.svg" alt="icons" class="w-6">
                  <span class="ml-3">4 Menit jumlah durasi</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/check_circle.svg" alt="icons" class="w-6">
                  <span class="ml-3">4 Jumlah soal benar</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/close_circle.svg" alt="icons" class="w-6">
                  <span class="ml-3">4 Jumlah soal salah</span>
                </li>
                <li class="flex items-center">
                  <img src="@/assets/icons/circle_outline.svg" alt="icons" class="w-6">
                  <span class="ml-3">4 Jumlah soal kosong</span>
                </li>
              </ul>
            </div>
          </div>
          <center>
            <div class="btn-primary inline-block my-4">
              Lihat Assessment
            </div>
          </center>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
nav{
  background: rgb(255,103,103);
  background: linear-gradient(124deg, rgba(255,103,103,1) 12%, rgba(252,176,69,1) 100%);
  @apply text-white px-6 py-2 flex justify-center;
}
section{
  height: calc(100vh - 56px);
  @apply flex items-center justify-center;
}
li{ @apply mb-4; }
</style>