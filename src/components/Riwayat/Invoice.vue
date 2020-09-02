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
      <div class="container">
        <div class="card grid grid-cols-2 divide-x">
          <div>
            <div class="card-body flex items-center bg-teal-500">
              <div @click="visible=false" class="btn-icon">
                <img src="@/assets/icons/close.svg" alt="icons" width="20px">
              </div>
              <span v-if="item.status == 1" class="font-bold text-white text-lg ml-3">Transaksi Berhasil</span>
              <span v-else class="font-bold text-white text-lg ml-3">Menunggu Pembayaran</span>
            </div>
            <div class="card-body px-0 py-3 divide-y">
              <div class="grid grid-cols-2 px-6 py-3">
                <div>
                  <div>{{ item.nama_paket }}</div>
                  <div>0489656596759</div>
                </div>
                <div>
                  <div>Total Pembayaran</div>
                  <div>
                    {{Intl.NumberFormat('id-ID', { maximumSignificantDigits: 4, style: 'currency', currency: 'IDR' }).format(item.biaya)}}
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="grid grid-cols-2 px-6 py-3">
                <div>
                  <div>Metode Pembayaran</div>
                  <div>Transfer</div>
                </div>
                <div>
                  <div>Batas Waktu Pembayaran</div>
                  <div>
                    10 Jam : 10 Menit : 10 Detik
                  </div>
                </div>
              </div>
              <!--  -->
              <div class="grid grid-cols-2 px-6 py-3">
                <div>Nomor Pembayaran</div>
                <div>8494886745</div>
              </div>
            </div>
          </div>
          <div>
            <div class="card-body">
              <span class="font-bold text-gray-700 text-lg uppercase">Cara Pembayaran</span>
            </div>
            <div class="card-body">
              <ul class="list-decimal list-inside">
                <li>lorem ipsum dolor sit amet</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'
export default {
  props: ['item'],
  components: {
    Modal
  },
  data: () => ({
    visible: false
  })
}
</script>

<style>

</style>