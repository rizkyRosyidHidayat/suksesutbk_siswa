<template>
  <div class="paket overflow-hidden">
    <FixedNavbar/>
    <div class="mt-32 mb-24 px-4 w-full md:w-2/3 block mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div
          v-for="(item, i) in dataPaket" :key="item.id_paket" 
          class="card">
          <div class="card-body" :class="color[i]">
            <h1 class="text-xl font-bold text-gray-700 tracking-wider">{{ item.subpaket }}</h1>
          </div>
          <div class="card-body">
            <ul class="divide-y">
              <li v-for="item in benefit[nama_paket]" :key="item" class="py-2">{{ item }}</li>
            </ul>
          </div>
          <div class="card-body">
            <div @click="pesan(item.id_subpaket)" class="btn-primary" :class="btncolor[i]">
              <Spinner>
                PESAN SEKARANG
              </Spinner>
            </div>
          </div>
        </div>
      </div>
      <Notif/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { postDataPayment } from "@/config/payment";
import midtransClient from 'midtrans-client'
import FixedNavbar from'@/components/FixedNavbar'
import Footer from'@/components/Footer'
import Notif from'@/components/Notif'
import Spinner from'@/components/Spinner'

let snap = new midtransClient.Snap({
  isProduction: false,
  clientKey: 'SB-Mid-client-A0033fXlAFSXlTtL'
})

export default {
  props: ['nama_paket'],
  components: {
    Spinner,
    Notif,
    Footer,
    FixedNavbar
  },
  data: () => ({
    isSubmit: false,
    color: ['bg-orange-300', 'bg-blue-300'],
    btncolor: ['bg-orange-500', 'bg-blue-500'],
    benefit: {
      'SUKSES-1': [
        '2X TryOut',
        'Penilaian sistem IRT',
        'Materi Uji Standar LTMPT',
        'Peringkat Nasional',
        'Rekomendasi PTN/Prodi',
        'Assessment Report Lengkap',
        'Rasionalisasi UTBK 2021',
        'Review & Pembahasan Soal',
        'Target & Pencapaian Nilai',
        'Statistik Progress TryOut',
        'Bank Soal Lengkap'
      ],
      'SUKSES-2': [
        '3X TryOut',
        'Penilaian sistem IRT',
        'Materi Uji Standar LTMPT',
        'Peringkat Nasional',
        'Rekomendasi PTN/Prodi',
        'Assessment Report Lengkap',
        'Rasionalisasi UTBK 2021',
        'Review & Pembahasan Soal',
        'Target & Pencapaian Nilai',
        'Statistik Progress TryOut',
        'Bank Soal Lengkap'
      ],
      'SUKSES-3': [
        '4X TryOut',
        'Penilaian sistem IRT',
        'Materi Uji Standar LTMPT',
        'Peringkat Nasional',
        'Rekomendasi PTN/Prodi',
        'Assessment Report Lengkap',
        'Rasionalisasi UTBK 2021',
        'Review & Pembahasan Soal',
        'Target & Pencapaian Nilai',
        'Statistik Progress TryOut',
        'Bank Soal Lengkap'
      ],
    }
  }),
  computed: {
    ...mapState('dataPaket', ['dataPaket'])
  },
  created() {   
    this.$store.dispatch('dataPaket/getDataPaket', this.nama_paket)
  },
  methods: {
    pesan(item_id) {
      this.$store.dispatch('updateLoading', true)
      postDataPayment({
        user_id: JSON.parse(localStorage.dataPeserta).id,
        item_id: item_id
      })
        .then(res => {

          if (res.status == 200) {
            const data = res.data.payload
            let param = {
              "transaction_details": data.transaction_details,
              "credit_card": true,
              "customer_details": data.customer_details
            }
            snap.createTransaction(param)
              .then(res => {
                if (res.status == 201) {
                  this.$store.dispatch('updateLoading', false)
                  window.open(
                    res.redirect_url,
                    '_blank'
                  )
                } else {
                  this.$store.dispatch('updateNotif', {
                    visible: true,
                    status: false,
                    msg: 'Transaksi gagal'
                  })
                  this.$store.dispatch('updateLoading', false)
                }
              })
              .catch(() => {
                this.$store.dispatch('updateNotif', {
                  visible: true,
                  status: false,
                  msg: 'Transaksi gagal'
                })
                this.$store.dispatch('updateLoading', false)
              })
          } else {
            this.$store.dispatch('updateNotif', {
              visible: true,
              status: false,
              msg: 'Transaksi gagal'
            })
            this.$store.dispatch('updateLoading', false)
          }
        })
        .catch(() => {
          this.$store.dispatch('updateNotif', {
            visible: true,
            status: false,
            msg: 'Transaksi gagal'
          })
          this.$store.dispatch('updateLoading', false)
        })
    }
  }
}
</script>

<style scoped>
.paket{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
</style>