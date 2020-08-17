<template>
    <div :class="{'show-more': showMore}">
      <div class="sm:text-right">
        <button @click="showMore=!showMore" class="btn-primary my-6 sm:mb-6">
          <span v-if="!showMore">Tampilkan lebih banyak</span>
          <span v-else>Tampilkan lebih sedikit</span>
        </button>
      </div>
      <div class="flex flex-no-wrap overflow-hidden -mx-4 row">
        <div v-if="dataBonusFasilitas.length == 0" class="w-full rounded py-3 mx-4 bg-blue-500 text-white text-center">
          Data belum tersedia
        </div>
        <div 
          v-else
          class="w-full sm:w-1/3 flex-none px-4 transition duration-200 col" 
          :key="item.id" v-for="item in dataBonusFasilitas"
          :style="{'transform': `translateX(${position}%)`}">
          <div class="card relative" style="max-height: 200px;">
            <!-- <img :src="item.file_gambar" alt="video" class="object-fill"> -->
            <img :src="item.file_gambar" alt="video" class="object-fill">
            <div class="card-body py-2 px-3 flex items-center justify-between">              
              <div class="mr-3">{{ item.nama_fasilitas }}</div>
              <a v-if="item.has_access" :href="item.file_url" target="_blank" class="btn-icon bg-white">
                <img src="@/assets/icons/download.svg" alt="icon" width="25">
              </a>
              <div v-else class="btn-icon bg-white">
                <img src="@/assets/icons/lock.svg" alt="icon" width="25">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <span
          :key="item" v-for="item in dataBonusFasilitas.length"
          @click="changeSlide(item)"
          class="dot"
          :class="{'bg-orange-500': item==activeSlide?true:false}"></span>
      </div>
    </div>
</template>
 
<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      position: 0,
      activeSlide: 1,
      showMore: false
    }
  },
  computed: {
    ...mapState('dataDashboard', ['dataBonusFasilitas'])
  },
  methods: {
    changeSlide(slide) {
      this.position = 100*(slide-1)*-1 
      this.activeSlide = slide
    }
  }
}
</script>

<style scoped>
.card-body{
  background-color: rgba(0,0,0,0.5);
  @apply absolute w-full text-white text-xl flex items-end;
  bottom: 0px;
}
.dot{
  @apply w-5 h-5 rounded-full bg-gray-400 inline-block mx-1 cursor-pointer transition duration-100;
}
.dot:hover{
  @apply bg-orange-500;
}
.show-more .row{
  flex-wrap: wrap;
}
.show-more .dot{
  display: none;
}
</style>