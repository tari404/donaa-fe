<template>
  <div class="projects">
    <ul>
      <li v-for="p in projects" :key="p.infoHash">
        <p>{{p.name}}</p>
        <div @click="toDetail(p.infoHash)">详细了解</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

const testData = [
  {
    infoHash: "0x1f9a7f61892ea23128db0469f77262fd5a33a38b",
    name: "给我捐钱",
    intro: "无",
    aim: "500",
    now: "300"
  },
  {
    infoHash: "0x1f9a7f61892ea23128db0469f77262fd5a33a38c",
    name: "给我捐钱",
    intro: "无",
    aim: "500",
    now: "300"
  },
  {
    infoHash: "0x1f9a7f61892ea23128db0469f77262fd5a33a38d",
    name: "给我捐钱",
    intro: "无",
    aim: "500",
    now: "300"
  }
]

export default {
  name: 'Info',
  data () {
    return {
      projects: testData
    }
  },
  methods: {
    ...mapMutations(['selectProject']),
    toDetail (hash) {
      this.selectProject(hash)
      this.$router.push('detail')
    }
  }
}
</script>

<style lang="stylus" scoped>
.projects
  padding 100px 40px 60px
  ul
    margin auto
    max-width 800px
    display grid
    grid-gap 20px
    grid-template-columns repeat(2, 1fr)
  li
    border-radius 5px
    background-color #fff
    box-shadow 0px 1px 10px 0px #fed6e360
    cursor pointer
    transition box-shadow .6s
    &:hover
      box-shadow 0px 1px 20px 0px #fed6e3
</style>
