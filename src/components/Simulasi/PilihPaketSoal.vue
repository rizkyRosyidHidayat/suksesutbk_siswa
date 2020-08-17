<template>
  <div class="mb-4">
    <ValidationProvider name="paket_soal" rules="required" v-slot="{ errors }">
      <Option 
        v-model="id_paket_soal"
        :items="dataPaketSoal"
        :item="{
          text: 'nama',
          value: 'id',
        }"
        :selected-value.sync="namaPaketSoal"
        placeholder="Pilih Paket Soal"></Option>
      <p class="field-message">{{ errors[0] }}</p>              
    </ValidationProvider>
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

import Option from '@/components/Option'
export default {
  components: {
    Option
  },
  data: () => ({
    id_paket_soal: '',
    namaPaketSoal: ''
  }),
  watch: {
    id_paket_soal(val) {
      this.$emit('update:id_paket_soal', val)
    }
  },
  computed: {
    ...mapState('dataSimulasi', ['dataPaketSoal']),
  }
}
</script>

<style>

</style>