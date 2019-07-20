import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    focusProject: ''
  },
  getters: {
  },
  mutations: {
    selectProject (state, pHash) {
      state.focusProject = pHash
    }
  },
  actions: {
  }
})

export default store
