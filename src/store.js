import Vue from 'vue'
import Vuex from 'vuex'

import Web3 from 'web3'
import abi from '@/donaa.abi.json'
const w = new Web3(window.ethereum)
const contract = new w.eth.Contract(abi)
contract.address = '0xfb2ff6eff865ab0c8a9f260d5e6d556e85dc6cdd'

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
    async getProjects () {
      const count = await contract.methods.totalProject().call()
      const n = count.toNumber()
      const result = []
      for (let i = 0; i < n; i++) {
        const project = await contract.methods.projects(i).call()
        const data = {
          amount: project.amount.toString(),
          expectedAmount: project.amount.toString(),
          hash: project.hash,
          id: project.id.toNumber(),
          starttime: project.starttime.toNumber(),
          endtime: project.endtime.toNumber(),
          status: project.status,
          _type: project._type
        }
        result.push(data)
      }
      return result
    } 
  }
})

export default store
