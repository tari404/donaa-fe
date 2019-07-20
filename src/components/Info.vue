<template>
  <div class="projects">
    <ul>
      <li v-for="p in projects" :key="p.id">
        <div @click="toDetail(p.id)">详细了解</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Info',
  data () {
    return {
      projects: []
    }
  },
  created () {
    this.getProjects().then(projects => {
      this.projects = projects
    })
  },
  methods: {
    ...mapMutations(['selectProject']),
    ...mapActions(['getProjects', 'donation']),
    toDetail (id) {
      this.selectProject(id)
      this.$router.push('detail')
    },
    toDonation (id, value) {
      this.donation({ id, value, hash: '0x7fb210d89587ecf000127f159fb09bb424dfcf61ddd83d8effc1b95fbfcd94fe' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.projects
  padding 100px 40px 60px
  ul
    margin auto
    max-width 900px
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
