<template>
  <div class="points">
    <div :class="{ 'focus': $route.path == '/' }" @click="jump('/')"></div>
    <div :class="{ 'focus': $route.path == '/project' }" @click="jump('/project')"></div>
    <div :class="{
      'focus': $route.path == '/detail',
      'disable': this.focusProject == -1
    }" @click="jump('/detail')"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Router',
  computed: {
    ...mapState(['focusProject'])
  },
  methods: {
    jump (path) {
      if (path == '/detail' && !this.focusProject) {
        return
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" scoped>
.points
  position fixed
  left 8px
  top 50%
  transform translateY(-50%)
  >div
    width 24px
    height 24px
    position relative
    cursor pointer
    &:before
      content ''
      position absolute
      left 0
      top 0
      margin 8px
      width 8px
      height 8px
      border-radius 4px
      background-color #efb9e5
      transition background-color .4s
  .focus:before
    background-color #a18cd1
  .disable
    cursor default
    &:before
      background-color #ddd
</style>
