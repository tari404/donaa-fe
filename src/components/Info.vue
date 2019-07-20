<template>
  <div class="projects">
    <el-row v-for="p in compressProjects" :key="p.row" type="flex" class="row-bg" justify="space-between">
      <el-col v-for="q in p.items" :key="q.id" :span="12">
        <el-card class="box-card grid-content">
        <el-container>
          <el-container>
            <el-aside width="200px">
              <div :style="{backgroundImage: 'url('+q.img+')'}" class="image"></div>
            </el-aside>
            <!-- <el-header class="name">{{q.name}}</el-header> -->
            <el-main style="padding-top: 0">
              <div class="name">{{q.name}}</div>
              <p class="main">{{q.intro}}</p>
            </el-main>
          </el-container>
          <el-footer style="padding: 0">
            <br>
            <el-input
              class="donate-input"
              size="mini"
              placeholder="Donate amount"
              v-model="money[q.id]">
            </el-input>
            <span>&nbsp;&nbsp;</span>
            <el-button plain size="mini" @click="donate(q.id)">DONATE</el-button>
            <el-button plain size="mini" @click="toDetail(q.id)" class="button details">DETAILS</el-button>
          </el-footer>
        </el-container>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

// const testData = [
//   {
//     id: "0x1f9a7f61892ea23128db0469f77262fd5a33a38b",
//     name: "2018-19 L-Istrina Campaign",
//     intro: "The Malta Community Chest Foundation seeks crypto donation to support its work that providing financial, material and professional support to people experiencing difficulties because of cancer or severe chronic diseases, ",
//     img: "https://resource.binance.charity/images/0257601e7b664f1cbe0b62491ee4f7b7_4.jpg",
//     expectedAmount: "500",
//     amount: "300"
//   },
//   {
//     id: "0x1f9a7f61892ea23128db0469f77262fd5a33a38c",
//     name: "2018-19 L-Istrina Campaign",
//     intro: "The Malta Community Chest Foundation seeks crypto donation to support its work that providing financial, material and professional support to people experiencing difficulties because of cancer or severe chronic diseases, ",
//     img: "https://resource.binance.charity/images/0257601e7b664f1cbe0b62491ee4f7b7_4.jpg",
//     expectedAmount: "500",
//     amount: "300"
//   },
//   {
//     id: "0x1f9a7f61892ea23128db0469f77262fd5a33a38d",
//     name: "2018-19 L-Istrina Campaign",
//     intro: "The Malta Community Chest Foundation seeks crypto donation to support its work that providing financial, material and professional support to people experiencing difficulties because of cancer or severe chronic diseases, ",
//     img: "https://resource.binance.charity/images/0257601e7b664f1cbe0b62491ee4f7b7_4.jpg",
//     expectedAmount: "500",
//     amount: "300"
//   }
// ]

export default {
  name: 'Info',
  computed: {
    compressProjects () {
      const compressed = []
      for (let i = 0; i < this.projects.length; i += 2) {
        const item = { row: Math.floor(i / 2), items: [this.projects[i]] }
        if (i+1 < this.projects.length) {
          item.items.push(this.projects[i+1])
        }
        compressed.push(item)
      }
      return compressed
    }
  },
  data () {
    const money = []
    return {
      projects: [],
      money
    }
  },
  watch: {
    projects (val) {
      this.money = []
      val.forEach(v => {
        this.money[v.id] = ''
      })
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
    },
    donate () {
      //todo
    }
  }
}
</script>

<style lang="stylus" scoped>
.projects
  margin-top 36px
  margin-left 20px
  margin-right 20px

.bottom
  margin-top 13px
  line-height 12px

.button
  // padding 0
  float right
.details
  font bold 16px

.image
  width 100%
  height 150px
  border-radius 5px
  background no-repeat
  background-size cover
  display inline-block

.grid-content
  border-radius 5px
  min-height 36px
  margin 24px

.box-card
  padding 6px

.clearfix:before,
.clearfix:after
  display table
  content ""
  
.clearfix:after
    clear both

.main
  font-size 11px
  color #777

.name
  font 16px bolder
  color #333

.donate-input
  width 260px
</style>
