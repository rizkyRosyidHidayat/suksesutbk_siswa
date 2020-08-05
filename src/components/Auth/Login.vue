<template>
  <div>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="onSubmit">
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
        <div class="text-right mb-4">
          <a 
            @click="$router.push({ name: 'auth', params: {form: 'lupa-sandi'} })"
            href="javascript:void(0)" 
            class="text-gray-600 hover:underline">
            Lupa kata sandi ?
          </a>
        </div>
        <Notif class="mb-4"/>
        <button :disabled="invalid" type="submit" class="btn-primary rounded-full w-full">
          <Spinner>MASUK</Spinner>
        </button>
      </form>
    </ValidationObserver>
    <div class="divider-text">
      <span class="divider-line"></span>
      <div class="flex-shrink-0 mx-2 text-gray-600">Atau masuk melalui</div>
      <span class="divider-line"></span>
    </div>
    <a href="#" class="btn-primary block rounded-full bg-blue-800 px-2 mb-3">
      <div class="flex">
        <img src="@/assets/icons/fb.svg" alt="icon" width="28px">
        <div class="text-center w-full">FACEBOOK</div>
      </div>
    </a>
    <a href="#" class="btn-primary block rounded-full bg-blue-500 px-2">
      <div class="flex">
        <img src="@/assets/icons/google.svg" alt="icon" width="28px">
        <div class="text-center w-full">GOOGLE</div>
      </div>
    </a>
  </div>
</template>

<script>
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import {mask} from 'vue-the-mask'

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

import Notif from '@/components/Notif'
import Spinner from '@/components/Spinner'
export default {
  directives: {mask},
  data: () => ({
    data: {
      nohp: '',
      password: ''
    },
    showPassword: false
  }),
  components: {
    Spinner,
    Notif
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('dataAuth/postDataLogin', this.data)
    }
  }
}
</script>

<style scoped>
  .divider-text{
    @apply my-6 flex items-center;
  }
  .divider-line{    
    width: 100%;
    height: 1px;
    @apply bg-gray-600;
  }
</style>