<template>
  <div class="card-body">
    <div class="flex">
      <div class="btn-primary py-1 flex rounded-tr-none rounded-br-none items-center z-10">
        Paket Soal
      </div>
      <Option 
        v-model="id_paket_soal"
        :items="data"
        :item="{
          text: 'nama',
          value: 'id',
        }"
        :selected-value.sync="namaPaketSoal"
        placeholder="Pilih Paket Soal"
        class="flex-1 -ml-2"></Option>
    </div>    
  </div>
</template>

<script>
import Option from '@/components/Option'

export default {
  components: {
    Option
  },
  data: () => ({
    id_paket_soal: '',
    data: [
      { nama: 'soal 1', id: 1 }
    ],
    namaPaketSoal: ''
  })
}
</script>