<template>
  <div class="card-body">
    <ol>
      <li v-for="(item, i) in list" :key="item.img">
        <div class="flex">
          <div>
            <button class="btn-icon number">
              {{ i+1 }}
            </button>
          </div>
          <div class="ml-4">
            <img v-if="item.img!==null" :src="require('@/assets/img/pemakaian/'+item.img)" alt="cara pemakaian" />
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
      img: 'target.png',
      text: `Pertama pilih menu peringkat pada halaman assessment report, 
      kemudian silahkan melengkapi form yang tersedia, 
      setelah itu tekan tombol 'CARI'. 
      Tunggu beberapa saat dan data target dan pencapainnya akan muncul.`
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