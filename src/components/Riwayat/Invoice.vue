<template>
  <Modal :visible="visible">
    <template v-slot:activator>
      <div @click="visible=true" class="flex justify-between items-center cursor-pointer">
        <div>
          <div>{{ item.nama_paket }}</div>
          <!-- <div>{{ item.waktu_pesan }}</div> -->
        </div>
        <div class="text-red-500 font-bold">
          {{Intl.NumberFormat('id-ID', { maximumSignificantDigits: 4, style: 'currency', currency: 'IDR' }).format(item.biaya)}}
        </div>                    
      </div>
    </template>
    <template v-slot:content>
      <div class="container md:w-2/3 lg:w-1/2">
        <div class="card grid grid-cols-1 divide-x">
          <div>
            <div class="card-body flex items-center bg-teal-500">              
              <span v-if="item.status == 1" class="font-bold text-white text-lg ml-3">Transaksi Berhasil</span>
              <span v-else class="font-bold text-white text-lg ml-3">Menunggu Pembayaran</span>
              <div @click="visible=false" class="btn-icon ml-auto">
                <img src="@/assets/icons/close.svg" alt="icons" width="20px">
              </div>
            </div>
            <div class="card-body px-0 py-3 divide-y">
              <div class="grid grid-cols-2 px-6 py-3">
                <div>
                  <div>{{ item.nama_paket }}</div>
                  <div class="font-bold text-gray-700">{{ item.order_id }}</div>
                </div>
                <div>
                  <div>Total Pembayaran</div>
                  <div class="font-bold text-orange-500">
                    {{Intl.NumberFormat('id-ID', { maximumSignificantDigits: 4, style: 'currency', currency: 'IDR' }).format(item.biaya)}}
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="grid grid-cols-2 px-6 py-3">
                <div>
                  <div>Metode Pembayaran</div>
                  <div class="font-bold text-gray-700">{{ item.payment_type }}</div>
                </div>
                <div>
                  <div>Batas Waktu Pembayaran</div>
                  <div class="font-bold text-red-500">
                    {{ time.h }} Jam : {{ time.m }} Menit : {{ time.s }} Detik
                  </div>
                </div>
              </div>
              <!--  -->
              <!-- <div class="grid grid-cols-2 px-6 py-3">
                <div>Nomor Pembayaran</div>
                <div>8494886745</div>
              </div> -->
              <!--  -->
              <div class="grid grid-cols-2 px-6 py-3 items-center">
                <div>Selesaikan pembayaran</div>
                <div v-if="item.status == 1">
                  <button class="btn-primary bg-green-500">
                    Transaksi Berhasil
                  </button>
                </div>
                <div v-else>
                  <button v-if="expired" class="btn-primary bg-red-500">
                    Waktu Habis
                  </button>
                  <button v-else @click="pesan(item.snap_token)" class="btn-primary">
                    Bayar Paket
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- <div>
            <div class="card-body">
              <span class="font-bold text-gray-700 text-lg uppercase">Cara Pembayaran</span>
            </div>
            <div class="card-body">
              <ul class="list-decimal list-inside">
                <li>lorem ipsum dolor sit amet</li>
              </ul>
            </div>
          </div> -->
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import moment from 'moment'
import Modal from '@/components/Modal'
export default {
  props: ['item'],
  components: {
    Modal
  },
  data: () => ({
    visible: false,
    actualTime: moment().format('X'),
    time: {
      h: 0,
      m: 0,
      s: 0
    },
    expired: false
  }),
  computed: {
    formatDurasi() {
      /**
       * Mmembuat format durasi ujian supaya bisa dikurangi
       */
      return moment(this.item.batas_waktu).format('X')
    },
  },
  methods: {
    getDiffInSeconds() {
      /**
       * Mengurrangi durasi ujian dengan waktu sekarang
       */
      return this.formatDurasi - this.actualTime
    },
    compute() {
      let duration = moment.duration(this.getDiffInSeconds(), "seconds")
      /**
       * Jika durasi habis maka 
       * muncul modal penringatan waktu habis
       */
      if (duration >= 0) {
        /**
         * Membagi data durasi menjadi
         * 3 bagian hours, minute, and second
         */
        this.time.h = duration.hours() < 10 ? '0'+duration.hours() : duration.hours()
        this.time.m = duration.minutes() < 10 ? '0'+duration.minutes() : duration.minutes()
        this.time.s = duration.seconds() < 10 ? '0'+duration.seconds() : duration.seconds()        
      } else {
        this.expired = true
      }
    },
    addOneSecondToActualTimeEverySecond () {
      const component = this
      component.actualTime = moment().format('X')
      /**
       * Selama berada dihalaman pengerjaan-soal
       * maka setiap detik akan menjalankan
       * 3 function tersebut
       */
      setTimeout(function(){
        component.getDiffInSeconds()
        component.compute()
        component.addOneSecondToActualTimeEverySecond()
      }, 1000);
    },
    pesan(token) {
      window.open('https://app.midtrans.com/snap/v2/vtweb/'+token, '_blank')      
    }  
  },
  mounted () {
    this.compute()
    this.addOneSecondToActualTimeEverySecond()
  },
}
</script>