<template>
  <div class="biodata overflow-hidden">
    <!-- navbar -->
    <FixedNavbar id="fixedHeader"/>
    <Navbar/>
    <!-- banner -->
    <div class="w-1/2 block mx-auto mb-12">
      <p class="mt-48 text-white font-bold text-4xl tracking-widest">
        Biodata Siswa
      </p>
    </div>
    <!-- form -->
    <section class="w-1/2 block mx-auto mb-24">
      <div class="card overflow-visible">
        <div class="card-body">
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="onSubmit">
              <div class="row items-center">
                <div class="w-full text-2xl font-bold text-gray-700 mb-4 ml-3">
                  Data Pribadi
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Nama Lengkap
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <ValidationProvider name="nama" rules="required" v-slot="{ errors }">
                    <input v-model="data.nama_lengkap" class="text-field" type="text" placeholder="Nama Lengkap">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>   
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  E-mail
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input v-model="data.email" class="text-field" type="text" placeholder="E-mail">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>  
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Nomor Handphone
                </div>
                <div class="px-3 w-1/4 mb-4">
                  <ValidationProvider name="nohp" rules="required|nohp" v-slot="{ errors }">
                    <input v-model="data.nohp" class="text-field" type="text" v-mask="'#############'" placeholder="No. HP (sebagai username)">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>  
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Nomor Whatsapp
                </div>
                <div class="px-3 w-1/4 mb-4">
                  <ValidationProvider name="nohp" rules="required|nohp" v-slot="{ errors }">
                    <input v-model="data.nohp_wa" class="text-field" type="text" v-mask="'#############'" placeholder="No. Whatsapp">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>  
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Facebook
                </div>
                <div class="px-3 w-1/4 mb-4">
                  <ValidationProvider name="fb" rules="required" v-slot="{ errors }">
                    <input v-model="data.sosmed_fb" class="text-field" type="text" placeholder="Facebook">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>  
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Instagram
                </div>
                <div class="px-3 w-1/4 mb-4">
                  <ValidationProvider name="ig" rules="required" v-slot="{ errors }">
                    <input v-model="data.sosmed_ig" class="text-field" type="text" placeholder="Instagram">
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>  
                </div>
                <!--  -->
                <div class="mb-4 h-px w-full bg-gray-400"></div>
                <!--  -->
                <div class="w-full text-2xl font-bold text-gray-700 mb-4 ml-3">
                  Data Asal Sekolah
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Provinsi
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <Autocomplete 
                    v-model="provinsi"
                    :items="dataProv" 
                    :item="{
                      text: 'text',
                      value: 'value',
                    }"
                    :selected-value.sync="provinsi"
                    :loading="loading"
                    placeholder="Pilih Provinsi"
                    position="top">
                  </Autocomplete>
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Kabupaten
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <Autocomplete 
                    v-model="kabupaten"
                    :items="dataKab" 
                    :item="{
                      text: 'text',
                      value: 'value',
                    }"
                    :selected-value.sync="kabupaten"
                    :loading="loading"
                    placeholder="Pilih Kabupaten"
                    position="bottom">
                  </Autocomplete>
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Sekolah
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <ValidationProvider name="sekolah" rules="required" v-slot="{ errors }">
                    <Autocomplete 
                      v-model="data.id_sekolah"
                      :items="dataSekolah" 
                      :item="{
                        text: 'nama',
                        value: 'id',
                      }"
                      :selected-value.sync="sekolah"
                      :loading="loading"
                      placeholder="Pilih Sekolah"
                      position="bottom">
                    </Autocomplete>
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>   
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4">
                  Tahun Kelulusan
                </div>
                <div class="px-3 w-3/4 mb-4">
                  <div class="w-2/6">
                    <ValidationProvider name="tahun_lulus" rules="required" v-slot="{ errors }">
                      <Option 
                        v-model="data.tahun_kelulusan"
                        :items="tahunLulus"
                        :item="{
                          text: 'text',
                          value: 'value',
                        }"
                        :selected-value.sync="tahun_lulus"
                        placeholder="Pilih Tahun"></Option>
                      <p class="field-message">{{ errors[0] }}</p>              
                    </ValidationProvider> 
                  </div> 
                </div>
                <!--  -->
                <div class="px-3 w-1/4 mb-4"></div>
                <div class="px-3 w-3/4 mb-4">
                  <ValidationProvider name="checkbox" :rules="{ required: { allowFalse: false } }" v-slot="{ errors }">
                    <div class="flex">
                      <input type="checkbox" v-model="checkbox" class="mr-3 mt-1"> 
                      <div>
                        Saya menyetujui <a href="#" class="underline text-orange-600">Kebijakan Privasi</a>
                        serta syarat dan <a href="#" class="underline text-orange-600">Ketentuan</a> oleh
                        Tim Edubrand
                      </div>
                    </div>
                    <p class="field-message">{{ errors[0] }}</p>              
                  </ValidationProvider>    
                </div>
              </div>
              <Notif class="mb-4"/>
              <div class="text-right">
                <button :disabled="invalid" type="submit" class="btn-primary">
                  <Spinner>
                    SIMPAN
                  </Spinner>
                </button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FixedNavbar from '@/components/FixedNavbar'
import Footer from '@/components/Footer'
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import {mask} from 'vue-the-mask'
import { mapState } from "vuex";

extend('nohp', {
  validate: value => {
    return value.length > 10;
  },
  message: 'No Hp harus kurang dari 11'
})
extend('required', {
  ...required,
  message: 'Data harus di isi'
});
extend('email', {
  ...email,
  message: 'Data harus berupa e-mail'
});

import Notif from '@/components/Notif'
import Spinner from '@/components/Spinner'
import Autocomplete from '@/components/Autocomplete'
import Option from '@/components/Option'
export default {
  directives: {mask},
  components: {
    Footer,
    FixedNavbar,
    Navbar,
    Option,
    Autocomplete,
    Spinner,
    Notif
  },
  data: () => ({
    data: {},
    provinsi: '',
    kabupaten: '',
    sekolah: '',
    tahun_lulus: '',
    checkbox: false
  }),
  watch: {
    provinsi(val) {
      this.$store.dispatch('dataBiodata/getDataKab', val)
    },
    kabupaten(val) {
      this.$store.dispatch('dataBiodata/getDataSekolah', {
        kabupaten: val,
        provinsi: this.provinsi
      })
    }
  },
  created() {
    const peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
    this.data.nama_lengkap = peserta.nama
    this.data.nohp = peserta.nohp
    this.data.email = peserta.sosmed.email
    // this.data.avatar = peserta.avatar
    this.data.nohp_wa = peserta.sosmed.whatsapp
    this.data.sosmed_ig = peserta.sosmed.instagram
    this.data.sosmed_fb = peserta.sosmed.facebook
    this.data.tahun_kelulusan = peserta.sekolah.tahun_kelulusan	
    this.tahun_lulus = peserta.sekolah.tahun_kelulusan	
    this.data.id_sekolah = peserta.sekolah.id	
    this.provinsi = peserta.sekolah.provinsi
    this.kabupaten = peserta.sekolah.kabupaten
    this.sekolah = peserta.sekolah.nama
    this.$store.dispatch('dataBiodata/getDataProv')
    // this.$store.dispatch('dataBiodata/getDataKab', peserta.sekolah.provinsi)
    // this.$store.dispatch('dataBiodata/getDataSekolah', {
    //   provinsi: peserta.sekolah.provinsi,
    //   kabupaten: peserta.sekolah.kabupaten
    // })
  },
  computed: {
    ...mapState('dataBiodata', ['dataProv', 'loading', 'dataSekolah', 'dataKab']),
    tahunLulus() {
      const now = new Date().getUTCFullYear()
      return [
        { text: now, value: now },
        { text: now-1, value: now-1 },
        { text: now-2, value: now-2 }
      ]
    }
  },  
  methods: {
    onSubmit() {
      this.$store.dispatch('dataBiodata/postDataBiodata', this.data)
    }
  }
}
</script>

<style scoped>
.biodata{
  background-image: url('../assets/img/banner_mobile.png');
  @apply bg-cover bg-no-repeat bg-fixed;
}
.row{
  @apply flex flex-wrap -mx-3;
}
</style>