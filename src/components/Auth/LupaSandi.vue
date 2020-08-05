<template>
  <ValidationObserver v-slot="{ invalid }">
    <form @submit.prevent="onSubmit">
      <div class="mb-4">
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <input v-model="data.email" class="text-field" type="text" placeholder="E-mail">
          <p class="field-message">{{ errors[0] }}</p>              
        </ValidationProvider>            
      </div>
      <div class="flex justify-between items-center">
        <a 
          @click="$router.push({ name: 'auth', params: {form: 'login'} })"
          href="javascript:void(0)" 
          class="text-gray-600 hover:underline">
          Kembali ke login
        </a>
        <button :disabled="invalid" type="submit" class="btn-primary rounded-full px-6">
          Kirim
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('email', {
  ...email,
  message: 'Data harus berupa e-mail'
})

extend('required', {
  ...required,
  message: 'Data harus di isi'
});
export default {
  data: () => ({
    data: {
      email: ''
    }
  }),
  methods: {
    onSubmit() {
      alert(this.data)
    }
  }
}
</script>