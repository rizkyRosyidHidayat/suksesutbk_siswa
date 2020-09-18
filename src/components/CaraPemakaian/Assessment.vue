<template>
  <div class="card-body">
    <ol>
      <li v-for="(item, i) in list" :key="i">
        <div class="flex">
          <div>
            <button class="btn-icon number">
              {{ i+1 }}
            </button>
          </div>
          <div class="ml-4">
            <img v-for="img in item.img" :key="img" :src="require('@/assets/img/pemakaian/assessment/'+img)" alt="cara pemakaian" />
            <p class="mt-3">{{ item.text }}</p>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data: () => ({
    list: [{
      img: ['paket_tryout.png', 'statistik.png'],
      text: `Untuk melihat assessment report ada dua cara yaitu, 
      yang pertama menekan tombol 'CEK HASIL' pada paket tryout yang sudah selesai dikerjakan. 
      Kedua dengan menekan tombol 'Result' pada salah satu paket soal yang ada di bagian STATISTIK PROGRESS`
    },{
      img: ['pilih_paketsoal.png'],
      text: `Data assessment report akan otomatis muncul sesuai dengan paket soal 1,
      tapi jika ingin melihat paket soal yang lain, silahkan pilih paket soal yang tersedia.`
    },{
      img: ['tab.png'],
      text: `Silahkan pilih menu yang tersedia untuk melihat data assessment report yang lain.`
    }]
  })
}
</script>

<style scoped>
  .number{
    width: 32px;
    height: 32px;
    @apply bg-teal-500 text-white flex items-center justify-center;
  }
  li{
    @apply mb-4;
  }
</style>