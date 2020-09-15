<template>
  <div class="-mx-3">
    <carousel 
      :scrollPerPage="true" 
      :perPageCustom="[[300, 1], [768, 2], [1024, 3]]"
      paginationActiveColor="#ed8936"
      :paginationSize="20">
      <slide v-for="item in videos" :key="item.text" class="px-3">
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
      </slide>
    </carousel>
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
import { Carousel, Slide } from 'vue-carousel';
import Modal from '@/components/Modal'
export default {
  components: {
    Modal,
    Carousel,
    Slide
  },
  data: () => ({
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
  })
}
</script>

<style scoped>
.card-body{
  @apply absolute w-full text-white text-xl h-full flex items-end;
  box-shadow: 0px -80px 100px rgba(0,0,0,0.5) inset;
  bottom: 0px;
}
</style>