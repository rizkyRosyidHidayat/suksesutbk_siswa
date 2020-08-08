<template>
  <div class="relative">
    <div @click="visible=true">
      <div class="flex">
        <input
          class="text-field rounded-tr-none rounded-br-none cursor-pointer" 
          type="text"
          :value="text"
          readonly
          :placeholder="placeholder">
        <div class="text-field-icon border-l-0 rounded-tl-none rounded-bl-none">
          <img src="@/assets/icons/menu-down.svg" alt="icon" width="25px">
        </div>  
      </div>
    </div>
    <div v-if="visible" 
      class="option-menu z-10"
      :class="position">
      <div class="flex px-2 mb-2">
        <input
          class="text-field rounded-tr-none rounded-br-none" 
          type="search"
          autofocus
          v-model="search"
          placeholder="Cari data">
        <div @click="$emit('dataSearching', search)" class="text-field-icon bg-teal-500 border-l-0 rounded-tl-none rounded-bl-none">          
          <img src="@/assets/icons/search.svg" alt="icon" width="25px">          
        </div>  
      </div>
      <ul style="max-height: 200px;overflow: auto;">
        <li v-if="loading">
          <svg
            class="animate-spin text-teal-300 mx-auto" style="width: 24px;height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none">
            <circle class="opacity-50" cx="12px" cy="12px" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </li>
        <li 
          v-else
          @click="selected(data)"
          v-for="(data, i) in items" :key="i">
          {{ data[item.text] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'items', 
    'return-object', 
    'loading', 
    'item',
    'placeholder',
    'position'
  ],
  modal: {
    props: 'value',
    event: 'input'
  },
  data: () => ({
    visible: false,
    search: '',
    text: '',
    value: ''
  }),
  watch: {
    value(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.visible = false;
      }
    },
    selected(data) {
      // if (this.returnObject) {
      //   this.item = data        
      // } else {
      //   this.item = data.value
      // }
      this.text = data[this.item.text]
      this.value = data[this.item.value]
      this.visible = false
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
  },
}
</script>

<style scoped>
.option-menu{
  @apply absolute py-2 w-full rounded overflow-hidden border shadow bg-white;
  left: 0px;  
}
.top{ top: 0px; }
.bottom{ bottom: 0px; }
.option-menu li{
  @apply px-3 py-2 transition duration-100 cursor-pointer;
}
.option-menu li:hover{
  @apply bg-gray-200;
}
</style>