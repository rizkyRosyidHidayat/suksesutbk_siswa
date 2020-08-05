<template>
  <div class="flex justify-center">
    <svg 
      v-if="$store.getters.getLoading"
      class="animate-spin text-white" style="width: 24px;height: 24px;" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle class="opacity-25" cx="12px" cy="12px" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot v-else></slot>
  </div>
</template>