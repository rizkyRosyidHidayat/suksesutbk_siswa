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
            <img :src="require('@/assets/img/pemakaian/pesan_paket/'+item.img)" alt="cara pemakaian" />
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
      img: 'lengkapi_profil.png',
      text: `Lengkapi data diri kamu terlebih dahulu, 
      agar dapat melakukan pemesanan paket tryout.`
    },{
      img: 'paket_tryout.png',
      text: `Silahkan pilih paket tryout yang ingin dibeli, 
      tetapi jika ingin mendapatkan semua paket ujian
      maka disarankan mengambil yang paket SUKSES-3.`
    },{
      img: 'paket_ujian.png',
      text: `Paket tryout dibagi berdasarkan kelompok ujinya yaitu SAINTEK dan SOSHUM, 
      silahkan pilih kelompok ujinya sesuai jurusan yang dituju.`
    },{
      img: 'pilih_pembayaran.png',
      text: `Setelah pindah ke halaman pembayaran, kemudian pilih cara pembayaran yang sudah
      tersedia. Selesaikan prosesnya dengan cara mengikuti sesuai ketentuan.
      Untuk menyelesaikan proses pembayaran diberi waktu selama 24 jam.`
    },{
      img: 'menu_riwayat.png',
      text: `Kamu bisa memilih daftar riwayat transaksi yang ingin ditampilkan,
      yaitu daftar riwayat yang statusnya masih menunggu atau sudah berhasil.`
    },{
      img: 'riwayat.png',
      text: `Untuk menyelesaikan pembayaran pilih menunggu pembayaran pada menu,
      kemudian pilih atau klik nama paket yang akan dibayar.
      Setelah itu akan muncul detail data pemesanan.`
    },{
      img: 'detail_riwayat.png',
      text: `Disini terdapat batas waktu pembayarannya, 
      sehingga mohon proses pembayaran diselesaikan sebelum kadaluarsa.
      Klik tombol bayar paket untuk memunculkan tab baru yang berisi intruksi cara pembayarannya.`
    },{
      img: 'intruksi.png',
      text: `Jika belum tahu cara menyelesaikan proses pembayaran, 
      silahkan klik tombol "lihat intruksi" untuk melihat intruksi yang sudah disediakan`
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