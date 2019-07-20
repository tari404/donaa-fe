import Vue from 'vue'
import Router from 'vue-router'

import Info from '@/components/Info'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/info',
      name: 'info',
      component: Info
    }
  ]
})
