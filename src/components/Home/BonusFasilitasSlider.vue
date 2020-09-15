<template>
  <div class="-mx-3 pt-6">
    <div v-if="dataBonusFasilitas.length == 0" class="w-full rounded py-3 mx-3 bg-blue-500 text-white text-center">
      Data belum tersedia
    </div>
    <carousel 
      v-else
      :scrollPerPage="true" 
      :perPageCustom="[[300, 1], [768, 2], [1024, 3]]"
      paginationActiveColor="#ed8936"
      :paginationSize="20">
      <slide :key="item.id" v-for="item in dataBonusFasilitas" class="px-3">
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
      </slide>
    </carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Carousel, Slide } from 'vue-carousel';

export default {
  components: {
    Carousel,
    Slide
  },
  computed: {
    ...mapState('dataDashboard', ['dataBonusFasilitas'])
  }
}
</script>

<style scoped>
.card-body{
  background-color: rgba(0,0,0,0.5);
  @apply absolute w-full text-white text-xl flex items-end;
  bottom: 0px;
}
</style>