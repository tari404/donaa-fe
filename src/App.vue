<template>
  <div id="app">
    <canvas id="home-bg"/>
    <transition name="fade-up">
      <div v-if="$route.path == '/'" class="home">
        <img class="home-logo" src="@/assets/logo.png" alt="">
        <router-link to="/info">
          <div class="home-button">我要捐赠</div>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      ctx: null
    }
  },
  mounted () {
    const canvas = this.$el.querySelector('canvas')
    this.ctx = canvas.getContext('2d')
  }
}
</script>

<style lang="stylus">
body
  height 100vh
  overflow hidden
  margin 0
  background-image linear-gradient(to bottom, #fad0c440 0%, #ffd1ff40 100%)
a
  text-decoration none
#app
  height 100%

#home-bg
  position fixed
  z-index -1
  width 100%
  height 100%

.home
  height 100vh
  display flex
  flex-direction column
  justify-content center
  align-items center
.home-logo
  width 300px
  margin-bottom 40px
.home-button
  width 200px
  height 40px
  display flex
  justify-content center
  align-items center
  background-color #a18cd1
  color #fff
  border-radius 5px
  cursor pointer
  transition background-color .4s
  &:hover
    background-color #efb9e5

.fade-up-leave, .fade-up-leave-to
  transform translateY(-100px)
  opacity 0
.fade-up-leave-active, .fade-up-leave-active
  transition transform .8s, opacity .8s
</style>
