<template>
  <div class="relative">
    <div @click="visible=true">
      <div class="flex">
        <input
          class="text-field rounded-tr-none rounded-br-none cursor-pointer" 
          type="text"
          :value="selectedValue"
          readonly
          :placeholder="placeholder">
        <div class="text-field-icon border-l-0 rounded-tl-none rounded-bl-none bg-white">
          <img src="@/assets/icons/menu-down.svg" alt="icon" width="25px">
        </div>  
      </div>
    </div>
    <ul v-if="visible" class="option-menu z-10">
      <li 
        @click="selected(data)"
        class="text-gray-800"
        v-for="(data, i) in items" :key="i">
        {{ data[item.text] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'items', 
    'return-object', 
    'placeholder', 
    'item',
    'selected-value'
  ],
  model: {
    prop: 'value',
    event: 'input'
  },
  data: () => ({
    visible: false,
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
      this.$emit('update:selected-value', data[this.item.text])
      this.value = data[this.item.value]
      this.visible = false
    }
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
  @apply absolute w-full py-2 rounded overflow-hidden border shadow bg-white;
  top: 0px;
  left: 0px;  
}
.option-menu li{
  @apply px-3 py-2 transition duration-100 cursor-pointer;
}
.option-menu li:hover{
  @apply bg-gray-200;
}
</style>