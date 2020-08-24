<template>
  <div class="md:col-span-3">
    <ValidationProvider name="paket_soal" rules="required" v-slot="{ errors }">
      <Option 
        v-model="kelompok_uji"
        :items="dataKelompokUji"
        :item="{
          text: 'text',
          value: 'value',
        }"
        :selected-value.sync="namaPaketSoal"
        placeholder="Pilih Kelompok Uji"></Option>
      <p class="field-message">{{ errors[0] }}</p>              
    </ValidationProvider>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

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
    kelompok_uji: '',
    namaPaketSoal: '',
    dataKelompokUji: [
      { text: 'SAINTEK', value: 'SAINTEK' },
      { text: 'SOSHUM', value: 'SOSHUM' },
    ]
  }),
  watch: {
    kelompok_uji(val) {
      this.$emit('update:kelompok', val)
    }
  },
}
</script>

<style>

</style>