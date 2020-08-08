<template>
    <div>
      <div class="flex flex-no-wrap overflow-hidden -mx-4">
        <div 
          class="w-full sm:w-1/3 flex-none px-4 transition duration-200" 
          :key="item.text" v-for="item in videos"
          :style="{'transform': `translateX(${position}%)`}">
          <div class="card relative" style="max-height: 200px;">
            <img :src="require(`@/assets/img/${item.img}`)" alt="video" class="object-fill">
            <div class="card-body">
              <div>
                <p>{{ item.kategori }}</p>
                <div class="flex items-center">
                  <img src="@/assets/icons/play_circle.svg" alt="icon" width="50">
                  <div class="ml-3">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-8">
        <span
          :key="item" v-for="item in videos.length"
          @click="changeSlide(item)"
          class="dot"
          :class="{'bg-orange-500': item==activeSlide?true:false}"></span>
      </div>
    </div>
</template>
 
<script>
export default {
  data () {
    return {
      videos: [
        { img: 'banner_mobile.png', text: 'Titile 1', link: '', kategori: 'Biologi' },
        { img: 'banner_mobile.png', text: 'Titile 2', link: '', kategori: 'Matematika' },
        { img: 'banner_mobile.png', text: 'Titile 3', link: '', kategori: 'IPA' },
        { img: 'banner_mobile.png', text: 'Titile 4', link: '', kategori: 'IPS' }
      ],
      position: 0,
      activeSlide: 1
    }
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
  @apply absolute w-full text-white text-xl h-full flex items-end;
  box-shadow: 0px -40px 90px rgba(0,0,0,0.5) inset;
  bottom: 0px;
}
.dot{
  @apply w-5 h-5 rounded-full bg-gray-400 inline-block mx-1 cursor-pointer transition duration-100;
}
.dot:hover{
  @apply bg-orange-500;
}
</style>