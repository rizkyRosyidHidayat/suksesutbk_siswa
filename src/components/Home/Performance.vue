<template>
  <div class="card mt-16 border overflow-visible">
    <div class="card-body">
      <div class="tabs flex mb-4">
        <a href="javascript:void(0)" class="tab mr-6">
          Performance
        </a>
        <a href="javascript:void(0)" class="tab">
          Progress
        </a>
        <img src="@/assets/img/10@3x.png" alt="statistik" class="ml-auto w-20 h-20 -mt-12">
      </div>
      <div class="grid grid-cols-5 gap-4">
        <div v-for="item in items" :key="item.text">
          <img :src="require(`@/assets/img/${item.img}`)" alt="image">
          <div 
            class="text-center text-sm mt-3"
            :style="{'color': item.color}">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { img: '5@3x.png', text: 'All', color: '#8186C1' },
      { img: '6@3x.png', text: 'Penalaran Umum', color: '#F3766A' },
      { img: '7@3x.png', text: 'Pemahaman Bacaan & Menulis', color: '#F99F41' },
      { img: '8@3x.png', text: 'Pengetahuan, Pemahaman Umum', color: '#2391D0' },
      { img: '9@3x.png', text: 'Pengetahuan Kuantitatif', color: '#6FA644' }
    ]
  })
}
</script>

<style>
.tab{
  @apply text-gray-700 font-bold text-xl pb-2 border-white transition duration-100;
  border-bottom-width: 3px;
}
.tab:focus, .tab:hover{
  @apply text-red-500 border-red-500;
}
</style>