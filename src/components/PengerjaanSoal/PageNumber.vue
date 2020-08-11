<template>
  <footer>
    <div class="btn-primary rounded-none flex items-center">
      <img src="@/assets/icons/chevron_left.svg" alt="icon" width="30" class="-ml-3">
      SEBELUMNYA
    </div>
    <div class="page-number">
      <div 
        v-for="item in 30" :key="item"
        class="btn-page-number">
        {{ item }}
      </div>
    </div>
    <div class="btn-primary rounded-none flex items-center bg-orange-500">
      SELANJUTNYA
      <img src="@/assets/icons/chevron_right.svg" alt="icon" width="30" class="-mr-3">
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
footer{
  @apply flex overflow-hidden;
}
.page-number{
  @apply flex items-center py-2 flex-1 bg-gray-400 px-2 overflow-auto;
}
.btn-page-number{
  @apply w-8 h-8 mx-2 rounded-full bg-white flex-shrink-0 flex items-center justify-center transition duration-100 cursor-pointer;
}
.btn-page-number:hover{
  @apply bg-blue-500 text-white;
}
::-webkit-scrollbar {
  width: 100%;
  height: 12px;
  @apply bg-gray-500;
}
::-webkit-scrollbar-button {
  @apply hidden;
}
::-webkit-scrollbar-thumb {
  @apply bg-gray-600 rounded-full;
}
</style>