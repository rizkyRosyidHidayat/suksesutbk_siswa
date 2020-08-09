<template>
  <div>
    <div class="mb-4">
      <label for="">Pilih PTN</label>
      <ValidationProvider name="ptn" rules="required" v-slot="{ errors }">
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
        <p class="field-message">{{ errors[0] }}</p>              
      </ValidationProvider>   
    </div>
    <!--  -->
    <div class="mb-4">
      <label for="">Pilih Prodi</label>
      <ValidationProvider name="prodi" rules="required" v-slot="{ errors }">
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
        <p class="field-message">{{ errors[0] }}</p>              
      </ValidationProvider>   
    </div>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { mapState } from "vuex";
import { getDataProdi } from "@/config/ptn";

extend('required', {
  ...required,
  message: 'Data harus di isi'
});

import Autocomplete from '@/components/Autocomplete'
export default {
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