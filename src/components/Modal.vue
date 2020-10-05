<template>
  <div>
    <slot name="activator"></slot>
    <div v-if="visible" class="modal z-50">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['visible']
}
</script>

<style scoped>
.modal{
  background-color: rgba(0, 0, 0, 0.5);
  top: 0px;
  left: 0px;
  @apply h-screen w-screen fixed z-20 py-12 overflow-y-auto;
}
</style>