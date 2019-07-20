<template>
  <div class="detail">
    <p>Detail</p>
    <p>pHash: {{focusProject}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Detail',
  computed: {
    ...mapState(['focusProject'])
  }
}
</script>

<style lang="stylus" scoped>
.detail
  padding 80px 40px
</style>
