<template>
  <div 
    v-if="$store.getters.getNotif.visible"
    class="notif"
    :class="{
      'bg-green-500': $store.getters.getNotif.status, 
      'bg-red-500': !$store.getters.getNotif.status }">
    <div>{{ $store.getters.getNotif.msg }}</div>
    <div 
      @click="close"
      class="btn-icon flex-shrink-0 ml-2">
      <img src="@/assets/icons/close.svg" alt="icon">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    visible() {
      return this.$store.getters.getNotif.visible
    }
  },
  watch: {
    visible() {
      this.autoclose()
    }
  },
  methods: {
    close() {
      this.$store.dispatch('updateNotif', {
        visible: false,
        status: null,
        msg: ''
      })
    },
    autoclose: function () {
      const vm = this
      setTimeout(() => {
        vm.$store.dispatch('updateNotif', {
          visible: false,
          status: null,
          msg: ''
        })
      }, 3000)
    }
  }
}
</script>

<style>
.notif{
  @apply rounded w-full px-3 py-2 text-white flex justify-between items-center;
}
</style>