<template>
  <div id="app">
    <div id="home-bg">
      <div v-for="h in hearts" :key="h.id" :style="{
        'transform': `translateY(${h.y}vh) scale(${h.scale}) rotate(${h.rotate}deg)`,
        'left': h.x + '%',
        'transition-duration': h.time + 'ms',
        'opacity': h.alpha
      }">
        <div></div>
      </div>
    </div>
    <div class="scroll" :style="{
      'transform': `translateY(${offsetY})`
    }">
      <div class="home">
        <img class="home-logo" src="@/assets/logo.png" alt="">
        <router-link to="/project">
          <div class="home-button">DONATE</div>
        </router-link>
        <div class="ggc">
          <span v-if="balance">Got {{balance}} GGT</span>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      ctx: null,
      focusProject: '',
      balance: '',
      bg: null,
      id: 0,
      hearts: []
    }
  },
  computed: {
    ...mapState(['useMetaMask']),
    offsetY () {
      switch (this.$route.path) {
        case ('/project'): return '-100vh'
        case ('/detail'): return '-200vh'
        default: return '0'
      }
    }
  },
  methods: {
    ...mapActions(['getBalance']),
    addHeart () {
      const id = this.id
      const time = Math.random() * 3000 + 2000
      this.hearts.push({
        id,
        x: Math.random() * 120 - 10,
        y: 0,
        scale: Math.random() * .6 + .5,
        rotate: Math.random() * 28 - 14,
        alpha: Math.random() * 0.2 + 0.1,
        time
      }) - 1
      setTimeout(() => {
        const heart = this.hearts.find(i => i.id === id)
        if (!heart) {
          return
        }
        heart.scale = Math.random() * .4 + .8
        heart.rotate = Math.random() * 18 - 9
        heart.alpha = Math.random() * 0.1
        heart.y = 130
      }, 300)
      setTimeout(() => {
        const index = this.hearts.findIndex(i => i.id === id)
        this.hearts.splice(index, 1)
      }, time + 1000)
      this.id++
    }
  },
  mounted () {
    this.bg = this.$el.querySelector('#home-bg')
    setInterval(() => {
      this.addHeart()
    }, 300)
    setTimeout(() => {
      if (!this.useMetaMask) {
        alert('Metamask not detected, only donation information can be queried')
        return
      }
      this.getBalance().then(balance => {
        this.balance = balance
      })
    }, 1000)
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
  min-width 1200px
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
  >div
    position absolute
    top -100px
    transition-timing-function ease-in
    div
      width 100px
      height 100px
      background-color #f14
      transform translate3d(-50%, -50%, 0) rotate(45deg)
      // animation flash 1s infinite alternate
      &:before
        content ''
        position absolute
        width 0
        height 0
        border solid #f14 50px
        left -50%
        top 0
        border-radius 100%
      &:after
        content ''
        position absolute
        width 0
        height 0
        border solid #f14 50px
        left 0
        top -50%
        border-radius 100%

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

@keyframes flash
  from
    box-shadow 0 0 200px 20px red
  to
    box-shadow 0 0 200px 20px #f000
</style>
