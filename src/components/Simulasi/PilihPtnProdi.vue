<template>
  <div>
    <div class="mb-4">
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
      <ValidationProvider name="prodi" rules="required" v-slot="{ errors }">
        <Autocomplete 
          v-model="prodi"
          :items="dataProdi" 
          :item="{
            text: 'prodi',
            value: 'kode_prodi',
          }"
          :loading="loading"
          :return-object="true"
          :selected-value.sync="nama_prodi"
          placeholder="Pilih Prodi"
          position="top">
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
    prodi: ''
  }),
  computed: {
    ...mapState('dataSimulasi', ['dataPtn', 'dataPaketSoal', 'dataKelompokUji']),
    ...mapState('dataPtn', ['loading' , 'dataProdi']),
  },
  watch: {
    nama_ptn: function (val) {
      this.$store.commit('dataPtn/updateLoading', true)
      this.$store.commit('dataSimulasi/updateNamaPtnTerpilih', val)
      this.$store.dispatch('dataPtn/getDataProdi', {
        kelompok: this.dataKelompokUji,
        ptn: val
      })       
    },
    prodi(val) {
      this.$emit('update:pilihan_ptn', {
        id_ptn: val.kode_ptn,
        id_prodi: val.kode_prodi
      })
    }
  },
}
</script>