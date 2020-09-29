<template>
  <div>
    <div class="mb-4">
      <label for="">Pilih PTN</label>
      <Autocomplete
        :items="dataPtn" 
        :item="{
          text: 'text',
          value: 'value',
        }"
        :loading="loading"
        :selected-value.sync="nama_ptn"
        placeholder="Pilih PTN"
        position="top">
      </Autocomplete>
    </div>
    <!--  -->
    <div class="mb-4">
      <label for="">Pilih Prodi</label>
      <Autocomplete 
        v-model="prodi"
        :items="data_prodi" 
        :item="{
          text: 'prodi',
          value: 'kode_prodi',
        }"
        :loading="loading"
        :return-object="true"
        :selected-value.sync="nama_prodi"
        placeholder="Pilih Prodi"
        position="bottom">
      </Autocomplete> 
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getDataProdi } from "@/config/ptn";

import Autocomplete from '@/components/Autocomplete'
export default {
  props: ['id_prodi'],
  components: {
    Autocomplete
  },
  data: () => ({
    nama_ptn: '',
    nama_prodi: '',
    data_prodi: [],
    selectedKelompokUji: '',
    prodi: ''
  }),
  computed: {
    ...mapState('dataPtn', ['dataPtn', 'loading', 'dataPilihanPtn']),
    ...mapState('dataDashboard', ['dataPaketSoal']),
  },
  watch: {
    nama_ptn: function (val) {
      this.$store.commit('dataPtn/updateLoading', true)
      getDataProdi({
        kelompok: this.selectedKelompokUji,
        ptn: val
      })
        .then(res => {
          if (res.status == 200) {
            this.data_prodi = res.data
              .filter(x => x.kode_prodi !== this.id_prodi)
            this.$store.commit('dataPtn/updateLoading', false)            
          } else {
            this.$store.commit('dataPtn/updateLoading', false)
          }
        })
        .catch(() => this.$store.commit('dataPtn/updateLoading', false))          
    },
    prodi(val) {
      this.$emit('update:pilihan_ptn', {
        id_ptn: val.kode_ptn,
        id_prodi: val.kode_prodi
      })
    }
  },
  created() {
    /**
     * Menentukan kelompok uji
     * berdasarkan nama paket soal
     */
    const kelompokUji = ['SAINTEK', 'SOSHUM']
    this.selectedKelompokUji = kelompokUji
      .filter((kelompok) => {
        const result = this.dataPaketSoal[0].nama.includes(kelompok)
        if (result) {
          return kelompok
        }
      })[0]
  },
}
</script>