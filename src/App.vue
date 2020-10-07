<template>
  <fullscreen ref="fullscreen" @change="fullscreenChange">
    <div id="app" class="font-sans">
      <router-view/>
    </div>
  </fullscreen>
</template>
<script>
import { mapState } from "vuex";
export default {
  mounted() {
    this.$store.dispatch('updateFullscreenRef', this.$refs['fullscreen'])
  },
  computed: {
    ...mapState(['fullscreen']),
    route() {
      return this.$route.name
    }
  },
  methods: {
    fullscreenChange (fullscreen) {
      this.$store.dispatch('updateFullscreen', fullscreen)
    }
  },
  watch: {
    route() {
      window.scroll({
        top: 0,
        left: 0
      })
    }
  }
}
</script>
<style src="./assets/tailwind.css"></style>