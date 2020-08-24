<template>
  <div class="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
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
    <div>
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
  props: ['kelompok-uji'],
  components: {
    Autocomplete
  },
  data: () => ({
    nama_ptn: '',
    nama_prodi: '',
    prodi: ''
  }),
  computed: {
    ...mapState('dataPtn', ['loading' , 'dataProdi', 'dataPtn']),
  },
  watch: {
    nama_ptn: function (val) {
      this.$store.commit('dataPtn/updateLoading', true)
      this.$store.dispatch('dataPtn/getDataProdi', {
        kelompok: this.kelompokUji,
        ptn: val
      })       
    },
    prodi(val) {
      this.$emit('update:id_ptn', val.kode_ptn)
      this.$emit('update:id_prodi', val.kode_prodi)
    }
  },
}
</script>