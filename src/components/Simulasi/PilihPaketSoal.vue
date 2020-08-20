<template>
  <div class="mb-4">
    <ValidationProvider name="paket_soal" rules="required" v-slot="{ errors }">
      <Option 
        v-model="id_ujian"
        :items="dataPaketSoal"
        :item="{
          text: 'paket_soal',
          value: 'id_ujian',
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
    id_ujian: '',
    namaPaketSoal: ''
  }),
  watch: {
    id_ujian(val) {
      this.$emit('update:id_ujian', val)
    }
  },
  computed: {
    ...mapState('dataSimulasi', ['dataPaketSoal']),
  }
}
</script>

<style>

</style>