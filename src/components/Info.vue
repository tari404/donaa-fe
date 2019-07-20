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
          <el-main style="padding: 0;">
            <hr style="border-bottom: none; opacity: .4;">
            <div class="number-infos">
              <div>
                <span>{{q.starttime}}</span>
                <span>Start</span>
              </div>
              <div>
                <span>{{q.endtime}}</span>
                <span>End</span>
              </div>
              <div>
                <span>{{q.count}}</span>
                <span>Donations</span>
              </div>
              <div>
                <span>{{(q.amount / 1e18).toFixed(2)}}</span>
                <span>Total</span>
              </div>
              <div>
                <span>{{(q.expectedAmount / 1e18).toFixed(2)}}</span>
                <span>Expected Amount</span>
              </div>
            </div>
          </el-main>
          <el-footer style="padding: 0">
            <br>
            <el-input
              class="donate-input"
              size="mini"
              placeholder="Donate amount"
              v-model="money[q.id]">
            </el-input>
            <span>&nbsp;&nbsp;</span>
            <el-button plain size="mini" @click="openModal(q.id)">DONATE</el-button>
            <el-button plain size="mini" @click="toDetail(q.id)" class="button details">DETAILS</el-button>
          </el-footer>
        </el-container>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body="true"
      width="30vw">
      <span>你可以选择留下仅基金会可见的联系邮箱</span>
      <br>
      <el-input
        class="donate-input"
        size="mini"
        placeholder="E-mail"
        v-model="email">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="donate">匿名</el-button>
        <el-button type="primary" @click="donate">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'Info',
  computed: {
    ...mapState(['utils']),
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
      interval: 0,
      dialogVisible: false,
      projects: [],
      money,
      email: ''
    }
  },
  watch: {
    projects (val) {
      while (val.length > this.money.length) {
        this.money.push('')
      }
    }
  },
  created () {
    this.getProjects().then(projects => {
      this.projects = projects
    })
    this.interval = setInterval(async () => {
      const projects = await this.getProjects()
      while(this.projects.pop()) {}
      projects.forEach(v => this.projects.push(v))
    }, 2000)
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
      this.dialogVisible = false
      const id = this.storePID
      const value = this.utils.toWei(this.money[id], 'ether')
      this.toDonation(id, value)
    },
    openModal (id) {
      if (!this.money[id]) {
        return
      }
      this.storePID = id
      this.dialogVisible = true
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
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

.number-infos
  display flex
  justify-content space-between
  span
    font-size 14px
    display block
  span:last-child
    font-size 12px
    color #bbb

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
