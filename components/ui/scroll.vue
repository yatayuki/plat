<template>
  <transition name="fade">
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      large
      right
      color="#777"
      @click="toTop"
      class="mr-3 mb-3"
      >
      <v-icon>fas fa-angle-up</v-icon>
    </v-btn>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      fab: false
    }
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') { return }
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 100
    },
    toTop () {
      this.$vuetify.goTo(0)
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: scale(0);
}
</style>
