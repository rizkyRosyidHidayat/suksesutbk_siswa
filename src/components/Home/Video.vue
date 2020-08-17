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
                <!-- <p>{{ item.kategori }}</p> -->
                <div @click="link=item.link;visible=true" class="flex items-center cursor-pointer">
                  <img src="@/assets/icons/play_circle.svg" alt="icon" width="50">
                  <div class="ml-3 hover:underline">{{ item.title }}</div>
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
      <Modal :visible="visible">
        <template v-slot:activator></template>
        <template v-slot:content>
          <div class="card max-w-full sm:max-w-md mx-4 sm:mx-auto bg-transparent shadow-none">
            <div class="flex justify-end mb-4">
              <div @click="visible=false" class="btn-icon">
                <img src="@/assets/icons/close.svg" alt="icons" width="25px">
              </div>
            </div>
              <iframe width="100%" height="315" :src="link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </template>
      </Modal>
    </div>
</template>
 
<script>
import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },
  data () {
    return {
      visible: false,
      link: '',
      videos: [
        {
          video: '',
          img: `vid-1.jpg`,
          title: `Protokol Covid19 untuk UTBK 2020`,
          desc: `
          UTBK 2020 di tengah wabah pandemi Covid19, dilaksanakan dengan protokol khusus`,
          link: 'https://www.youtube.com/embed/-BIu2ghBRjg'
        },
        {
          video: '',
          img: `vid-2.jpg`,
          title: `Sosialisasi UTBK-SBMPTN 2020`,
          desc: `
          Sosialisasi Pelaksanaan UTBK-SBMPTN 2020 dalam kondisi pandemi covid-19 [20 Mei 2020]`,
          link: 'https://www.youtube.com/embed/h5woG-mCPu4'
        },
        {
          video: '',
          img: `vid-3.jpg`,
          title: `Konferensi Pers Pelaksanaan UTBK 2020.`,
          desc: `
          Konferensi Pers Daring tentang Pelaksanaan UTBK pada Kondisi Normal Baru (New Normal)`,
          link: 'https://www.youtube.com/embed/P1aLwSwwEUQ'
        },
        {
          video: '',
          img: `vid-4.jpg`,
          title: `Konferensi Pers Pelaksanaan UTBK 2020 Tahap-1.`,
          desc: `
          Konferensi Pers Daring tentang Pelaksanaan UTBK Tahap-1`,
          link: 'https://www.youtube.com/embed/4SwDHmhZsj0'
        },
        {
          video: '',
          img: `vid-5.jpg`,
          title: `Tips Lolos UTBK SBMPTN`,
          desc: `
          Ngobrol Pendidikan : Tips Lolos UTBK PTN Bersama Wakil Ketua II LTMPT Prof.DR. Sutrisna Wibawa`,
          link: 'https://www.youtube.com/embed/Djd4ZBza-QQ'
        },
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
  box-shadow: 0px -80px 100px rgba(0,0,0,0.5) inset;
  bottom: 0px;
}
.dot{
  @apply w-5 h-5 rounded-full bg-gray-400 inline-block mx-1 cursor-pointer transition duration-100;
}
.dot:hover{
  @apply bg-orange-500;
}
</style>