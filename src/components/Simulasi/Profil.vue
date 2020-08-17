<template>
  <ul>
    <li>
      <img src="@/assets/icons/home.svg" alt="icons" class="w-6">
      <span class="ml-3">{{ data.sekolah.nama }}</span>
    </li>
    <li>
      <img src="@/assets/icons/marker.svg" alt="icons" class="w-6">
      <span class="ml-3">{{ data.sekolah.kabupaten+', '+data.sekolah.provinsi }}</span>
    </li>
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="25px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
        <path d="M12 3L1 9l11 6l9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#2683C6"/>
        <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
      </svg>
      <span class="ml-3">{{ $store.getters['dataSimulasi/getNamaPtnTerpilih'] }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    data: ''
  }),
  created() {
    this.data = JSON.parse(localStorage.dataPeserta)
  }
}
</script>

<style scoped>
li{
  @apply flex items-center mb-6;
}
</style>