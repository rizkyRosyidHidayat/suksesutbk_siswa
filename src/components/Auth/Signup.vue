<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <ValidationProvider name="nama" rules="required" v-slot="{ errors }">
          <input v-model="data.nama_lengkap" class="text-field" type="text" placeholder="Nama Lengkap">
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>            
      </div>
      <div class="mb-4">
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <input v-model="data.email" class="text-field" type="text" placeholder="E-mail">
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>            
      </div>
      <div class="mb-4">
        <ValidationProvider name="nohp" rules="required|nohp" v-slot="{ errors }">
          <input v-model="data.nohp" class="text-field" type="text" v-mask="'#############'" placeholder="No. HP (sebagai username)">
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>            
      </div>
      <div class="mb-4">
        <ValidationProvider name="password" rules="required" v-slot="{ errors }">
          <div class="flex">
            <input 
              v-model="data.password" 
              class="text-field rounded-tr-none rounded-br-none" 
              :type="showPassword?'text':'password'" 
              placeholder="Kata sandi">
            <div @click="showPassword=!showPassword" class="btn-primary px-2 rounded-tl-none rounded-bl-none">
              <img :src="require(`@/assets/icons/${showPassword?'eye-outline.svg':'eye-off-outline.svg'}`)" alt="icon" width="25px">
            </div>  
          </div>
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>            
      </div>
      <div class="mb-4">
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
      <hr class="mb-4 -mx-6">
      <div class="font-bold text-gray-700 mb-2">Dapatkan Paket FREE dari SUKSESUTBK</div>
      <div class="mb-4">
        <ValidationProvider name="kelompok" rules="required" v-slot="{ errors }">            
          <Option 
            :items="paket" 
            :item="{
              text: 'text',
              value: 'value',
            }"
            :selected-value.sync="kelompok_uji"
            placeholder="Pilih Kelompok Uji"
            v-model="data.kelompok_uji"></Option>
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>   
      </div>
      <Notif class="mb-4"/>
      <button :disabled="invalid" type="submit" class="btn-primary rounded-full w-full">
        <Spinner>DAFTAR</Spinner>
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import {mask} from 'vue-the-mask'

extend('email', {
  ...email,
  message: 'Data harus berupa e-mail'
})
extend('required', {
  ...required,
  message: 'Data harus di isi'
});
extend('nohp', {
  validate: value => {
    return value.length > 10;
  },
  message: 'No Hp harus kurang dari 11'
})
import Option from '@/components/Option'
import Notif from '@/components/Notif'
import Spinner from '@/components/Spinner'

export default {
  directives: {mask},
  data: () => ({
    data: {
      email: '',
      password: '',
      nama_lengkap: '',
      nohp: '',
      kelompok_uji: ''
    },
    showPassword: false,
    checkbox: false,
    paket: [
      { text: 'SOSHUM', value: 'soshum' },
      { text: 'SAINTEK', value: 'saintek' }
    ],
    kelompok_uji: ''
  }),
  components: {
    Spinner,
    Notif,
    Option
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('dataAuth/postDataDaftar', this.data)
    }
  }
}
</script>