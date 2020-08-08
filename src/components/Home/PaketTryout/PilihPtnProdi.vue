<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">  
    <form>
      <div class="mb-4">
        <label for="">Pilih Paket Soal</label>
        <ValidationProvider name="paket_soal" rules="required" v-slot="{ errors }">
          <Option 
            v-model="data.id_paket_soal"
            :items="dataPaketSoal"
            :item="{
              text: 'text',
              value: 'value',
            }"
            placeholder="Pilih Paket Soal"></Option>
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>   
      </div>
      <!--  -->
      <hr class="-mx-6 mb-4">
      <!--  -->
      <p class="text-white rounded block bg-blue-500 py-2 px-4">
        Silahkan pilih Perguruan Tinggi Negeri dan Program Studi 
        yang ke {{ pilihan_ptn_ke+1 }}
      </p>
      <div class="my-4">
        <label for="">Pilih PTN</label>
        <ValidationProvider name="ptn" rules="required" v-slot="{ errors }">
          <Autocomplete 
            v-model="data.pilihan_ptn[pilihan_ptn_ke].id_ptn"
            :items="dataPtn" 
            :item="{
              text: 'text',
              value: 'value',
            }"
            :return-object="true"
            :loading="loading"
            placeholder="Pilih PTN"
            position="top"
            @dataSearching="getDataSearching"
            :key="pilihan_ptn_ke">
          </Autocomplete>
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>   
      </div>
      <!--  -->
      <div class="mb-4">
        <label for="">Pilih Prodi</label>
        <ValidationProvider name="prodi" rules="required" v-slot="{ errors }">
          <Autocomplete 
            v-model="data.pilihan_ptn[pilihan_ptn_ke].id_prodi"
            :items="dataProdi" 
            :item="{
              text: 'prodi',
              value: 'kode_prodi',
            }"
            :return-object="true"
            :loading="loading"
            placeholder="Pilih Prodi"
            position="bottom"
            @dataSearching="getDataSearchingProdi"
            :key="pilihan_ptn_ke+1">
          </Autocomplete>
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>   
      </div>
      <div class="text-right"> 
        <button :disabled="invalid" class="btn-primary">
          Simpan
        </button>
      </div>
    </form>
  </ValidationObserver>  
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
import Option from '@/components/Option'
export default {
  components: {
    Autocomplete,
    Option
  },
  data: () => ({
    data: {
      id_paket_soal: '',
      pilihan_ptn: [
        {
          id_ptn: '',
          id_prodi: ''
        },
        {
          id_ptn: '',
          id_prodi: ''
        }
      ]
    },
    pilihan_ptn_ke: 0
  }),
  computed: {
    ...mapState('dataPtn', ['dataPtn', 'loading', 'dataProdi']),
    ...mapState('dataDashboard', ['dataPaketSoal']),
    watchPtn1() {
      return this.data.pilihan_ptn[0].id_ptn
    },
    watchPtn2() {
      return this.data.pilihan_ptn[1].id_ptn
    },
    watchProdi1() {
      return this.data.pilihan_ptn[0].id_prodi
    },
  },
  watch: {
    watchPtn1: function (val) {
      this.$store.commit('dataPtn/updateDataProdi', this.dataProdi
      .filter(prodi => prodi.kode_ptn == val))
    },
    watchPtn2: function (val) {
      this.$store.commit('dataPtn/updateDataProdi', this.dataProdi
      .filter(prodi => prodi.kode_ptn == val))
    },
    watchProdi1: function () {
      this.pilihan_ptn_ke = 1
      // this.$store.commit('dataPtn/updateDataProdi', [])
      // this.$store.commit('dataPtn/updateDataPtn', [])
    }
  },
  methods: {
    getDataSearching(val) {
      const search = val.toUpperCase()
      this.$store.dispatch('dataPtn/getDataPtn', {
        kelompok: 'SAINTEK',
        ptn: search
      })
    },
    getDataSearchingProdi(val) {
      const search = val.toUpperCase()
      this.$store.commit('dataPtn/updateDataProdi', this.dataProdi
      .filter(prodi => prodi.prodi.includes(search)))
    }
  }
}
</script>