<template>
  <div class="detail">
    <p>Detail</p>
    <p>pHash: {{focusProject}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Detail',
  data () {
    return {
      txLogs: null
    }
  },
  computed: {
    ...mapState(['focusProject'])
  },
  watch: {
    focusProject (id) {
      this.getEvent(id).then(data => {this.txLogs = data})
    }
  },
  methods: {
    ...mapActions(['getEvent'])
  }
}
</script>

<style lang="stylus" scoped>
.detail
  padding 100px 40px 60px
</style>
