import Vue from 'vue'
import Vuex from 'vuex'

import moment from 'moment'

import Web3 from 'web3'
import abi from '@/donaa.abi.json'
const w = new Web3(window.ethereum)
const contract = new w.eth.Contract(abi)
contract.address = '0x31d70325cd57529b31d3115650ac171f56547b8f'

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
    focusProject: -1,
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
    },
    async getEvent (_, id) {
      const donations = await w.eth.getPastLogs({
        address: contract.address,
        fromBlock: 1,
        topics: [
          '0x716808bfa75876a9b9b37234cab41ac742a2fb9ce1465ae53e8ed24b51c2e30c',
          w.eth.abi.encodeParameter('uint256', id)
        ]
      }).then(logs => {
        return logs.map(l => {
          return {
            from: w.eth.abi.decodeParameter('address', l.topics[3]),
            hash: l.topics[2],
            txHash: l.transactionHash,
            value: Number(Number(w.utils.hexToNumberString(l.data) / 1e18).toFixed(2))||1
          }
        })
      })
      const withdraws = await w.eth.getPastLogs({
        address: contract.address,
        fromBlock: 1,
        topics: [
          '0xf16c342201a034cd999db6062d9cbe8484c40bc34e5c94dbc6d84ba651e3bc19',
          w.eth.abi.encodeParameter('uint256', id)
        ]
      }).then(logs => {
        return logs.map(l => {
          return {
            to: w.eth.abi.decodeParameter('address', l.topics[3]),
            hash: l.topics[2],
            txHash: l.transactionHash,
            value: Number(Number(w.utils.hexToNumberString(l.data) / 1e18).toFixed(4))
          }
        })
      })
      return { donations, withdraws }
    },
    async getBalance () {
      const calldata = w.eth.abi.encodeFunctionCall({
        inputs:[
          {
            name: '_owner',
            type: 'address'
          }
        ],
        name: 'balanceOf',
        type: 'function'
      }, ['0xc8292399969f9038f35402f394A20Cfe73DdA37e'])
      const data = await w.eth.call({
        to: '0x4558345B85332bcBc1bd1c98b20ddC62Eb65f3c2',
        data: calldata
      })
      const number = (w.utils.hexToNumberString(data) / 1e18).toFixed(2)
      return number
    }
  }
})

export default store
