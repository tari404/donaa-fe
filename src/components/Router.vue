<template>
  <div class="points">
    <div @click="jump('/')"></div>
    <div @click="jump('/project')"></div>
    <div @click="jump('/detail')"></div>
  </div>
</template>

<script>
export default {
  name: 'Router',
  methods: {
    jump (path) {
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
      background-color pink
</style>
