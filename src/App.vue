<template>
  <div id="app">
    <canvas id="home-bg"/>
    <div class="scroll" :style="{
      'transform': `translateY(${offsetY})`
    }">
      <div class="home">
        <img class="home-logo" src="@/assets/logo.png" alt="">
        <router-link to="/project">
          <div class="home-button">DONATE</div>
        </router-link>
        <div class="ggc">
          <span>Got {{balance}} GGT</span>
        </div>
      </div>
      <div>
        <Info/>
      </div>
      <div>
        <Detail/>
      </div>
    </div>
    <Router/>
  </div>
</template>

<script>
import Info from '@/components/Info'
import Detail from '@/components/Detail'

import Router from '@/components/Router'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      ctx: null,
      focusProject: '',
      balance: ''
    }
  },
  computed: {
    offsetY () {
      switch (this.$route.path) {
        case ('/project'): return '-100vh'
        case ('/detail'): return '-200vh'
        default: return '0'
      }
    }
  },
  methods: {
    ...mapActions(['getBalance'])
  },
  mounted () {
    const canvas = this.$el.querySelector('canvas')
    this.ctx = canvas.getContext('2d')
    this.getBalance().then(balance => {
      this.balance = balance
    })
  },
  components: {
    Info,
    Detail,
    Router
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
ul
  list-style none
  margin 0
  padding 0
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

.scroll
  height 100%
  transition transform 1s
  >div
    width 100%
    height 100%

.ggc
  margin-top 10px
  height 40px
  line-height 40px
  font-size 18px
  color #999
  position relative
  top 10px
</style>
