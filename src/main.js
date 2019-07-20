import Vue from 'vue'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/sankey'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
