<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Details</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="Data Viewer" name="viewer">
        <chart :options="options" autoresize :height="800" style="filter: sepia(1)"></chart>
      </el-tab-pane>
      <el-tab-pane label="Donate Source" name="source">
        <el-table
          :data="compressDonations"
          empty-text="contains no records"
          border
          style="width: 100%">
          <el-table-column
            prop="from"
            label="From"
            width="280">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            width="120">
          </el-table-column>
          <el-table-column
            prop="txHash"
            label="Transaction Hash"
            width="280">
          </el-table-column>
          <el-table-column
            prop="hash"
            label="Info Hash"
            >
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="Allocation" name="allocation">
        <el-table
          :data="compressWithdraws"
          empty-text="contains no records"
          border
          style="width: 100%">
          <el-table-column
            prop="to"
            label="To"
            width="280">
          </el-table-column>
          <el-table-column
            prop="value"
            label="Value"
            width="120">
          </el-table-column>
          <el-table-column
            prop="txHash"
            label="Transaction Hash"
            width="280">
          </el-table-column>
          <el-table-column
            prop="hash"
            label="Info Hash"
            width="300"
            >
          </el-table-column>
          <el-table-column
            prop="supplier"
            label="Project Submission Request"
            >
            <a target="_blank" href="/intro.pdf">PDF</a>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

function substr(str) {
  return str.substr(0, 30) + '...'
}

const suppliers = {
  // hash address => name
}

export default {
  name: 'Detail',
  data () {
    return {
      activeName: 'viewer',
      chart: null,
      donations: [],
      withdraws: []
    }
  },
  computed: {
    ...mapState(['focusProject']),
    compressDonations () {
      return this.donations.map(v => {
        return {
          value: v.value,
          from: substr(v.from),
          hash: substr(v.hash),
          txHash: substr(v.txHash)
        }
      })
    },
    compressWithdraws () {
      return this.withdraws.map(v => {
        return {
          value: v.value,
          to: substr(v.to),
          hash: substr(v.hash),
          txHash: substr(v.txHash),
          supplier: suppliers[v.to] ? suppliers[v.to] : 'Unknown'
        }
      })
    },
    dataset () {
      const nodes = [{name: 'Cash Pool'}]
      const links = []
      let index = 1
      this.donations.forEach(v => {
        const name = `${index++}-${v.from.substr(0, 10)}...`
        if (!nodes.find(i => i.name === name)) {
          nodes.push({name: name})
        }
        links.push({source: name, target: 'Cash Pool', value: v.value})
      })
      // for (let i = 0; i < 12; i++) {
      //   const addr = '0x' + parseInt(Math.random() * 100000000).toString(16).substr(0, 10)+ '...'
      //   nodes.push({name: addr})
      //   links.push({source: addr, target: 'Cash Pool', value: (Math.pow(Math.random(), 2) * 10).toFixed(2) + 2})
      // }
      this.withdraws.forEach(v => {
        const name = `${index++}-${v.to.substr(0, 10)}...`
        if (!nodes.find(i => i.name === name)) {
          nodes.push({name: name})
        }
        links.push({source: 'Cash Pool', target: name, value: v.value})
      })
      // for (let i = 0; i < 2; i++) {
      //   const addr = '0x' + parseInt(Math.random() * 100000000).toString(16).substr(0, 10)+ '...'
      //   nodes.push({name: addr})
      //   links.push({target: addr, source: 'Cash Pool', value: (Math.random() * 10).toFixed(2) + 1})
      // }
      return { nodes, links }
    },
    options () {
      const self = this
      // console.log(self.dataset)
      return {
        title: {
              text: 'Diagram'
          },
          tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'sankey',
              data: self.dataset.nodes,
              links: self.dataset.links,
              focusNodeAdjacency: true,
              levels: [{
                    depth: 0,
                    itemStyle: {
                        color: '#fbb4ae'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                }, {
                    depth: 1,
                    itemStyle: {
                        color: '#b3cde3'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                }, {
                    depth: 2,
                    itemStyle: {
                        color: '#ccebc5'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                }, {
                    depth: 3,
                    itemStyle: {
                        color: '#decbe4'
                    },
                    lineStyle: {
                        color: 'source',
                        opacity: 0.6
                    }
                }],
                lineStyle: {
                    normal: {
                        curveness: 0.5
                    }
                }
            }
          ]
      }
    }
  },
  watch: {
    focusProject () {
      this.update()
    }
  },
  created () {
    this.update()
  },
  methods: {
    ...mapActions(['getEvent']),
    update () {
      if (this.focusProject < 0) {
        return
      }
      this.donations = []
      this.withdraws = []
      this.getEvent(this.focusProject).then(({ donations, withdraws }) => {
        this.donations = donations
        this.withdraws = withdraws
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail
  padding 100px 40px 60px

.clearfix:before,
.clearfix:after
  display table
  content ""

.clearfix:after
  clear both

.box-card
  width 80vw
  margin auto
  margin-top 6vh

.echarts
  width 100%
  height 60vh
</style>
