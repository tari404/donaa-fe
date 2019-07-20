import Vue from 'vue'
import Vuex from 'vuex'

import moment from 'moment'

import Web3 from 'web3'
import abi from '@/donaa.abi.json'
const w = new Web3(window.ethereum)
const contract = new w.eth.Contract(abi)
contract.address = '0x5479927c4cec1f3cc50a3844248d0d200592a0be'

Vue.use(Vuex)

const defaultData = [
  {
    name: '2018-19 L-Istrina Campaign',
    intro: 'The Malta Community Chest Foundation seeks crypto donation to support its work that providing financial, material and professional support to people experiencing difficulties because of cancer or severe chronic diseases.',
    img: 'https://resource.binance.charity/images/0257601e7b664f1cbe0b62491ee4f7b7_4.jpg',
  },
  {
    name: 'Empower Bududa',
    intro: 'Save the landslide disaster victims in Uganda.',
    img: 'https://resource.binance.charity/images/f28bb7d8c66f42b2be995fdcc9ff819c_cancer.f120d749.jpg',
  }
]

const store = new Vuex.Store({
  state: {
    focusProject: '',
    utils: w.utils
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
          expectedAmount: project.expectedAmount.toString(),
          count: project.count.toNumber(),
          hash: project.hash,
          id: project.id.toNumber(),
          starttime: moment(project.starttime.toNumber() * 1000).format('MMM DD YY'),
          endtime: moment(project.endtime.toNumber() * 1000).format('MMM DD YY'),
          status: project.status,
          _type: project._type,
          name: defaultData[i].name,
          intro: defaultData[i].intro,
          img: defaultData[i].img,
        }
        result.push(data)
      }
      return result
    },
    donation (_, { id, value, hash }) {
      contract.methods.donation(id, hash).send({
        from: window.ethereum.selectedAddress,
        value,
        gas: 200000,
        gasPrice: 1e9
      })
    }
  }
})

export default store
