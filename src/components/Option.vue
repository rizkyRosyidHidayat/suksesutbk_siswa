<template>
  <div class="relative">
    <div @click="visible=true">
      <slot></slot>
    </div>
    <ul v-if="visible" class="option-menu">
      <li 
        @click="data.kelompok_uji=item.value;visible=false"
        v-for="(item, i) in items" :key="i">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['items', 'data'],
  data: () => ({
    visible: false
  }),
  methods: {
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.visible = false;
      }
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

<style>
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