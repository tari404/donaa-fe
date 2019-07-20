<template>
  <div class="projects">
    <ul>
      <li v-for="p in projects" :key="p.sign">
        <p>{{p.name}}</p>
        <div>捐钱</div>
      </li>
    </ul>
  </div>
</template>

<script>
const testData = [
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
  }
}
</script>

<style lang="stylus" scoped>
.projects
  padding 100px 40px 0
  ul
    margin auto
    max-width 800px
    display grid
    grid-gap 10px
    grid-template-columns repeat(2, 1fr)
  li
    border-radius 5px
    background-color #fff
</style>
