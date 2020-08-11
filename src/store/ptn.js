import { 
  getDataProdi,
  getDataPtn,
  cekPilihanPtn
} from "@/config/ptn";
import {
  addData,
  getAllData
} from '@/indexedDB'

const dataPtn = {
  namespaced: true,
  state: {
    dataPtn: [],
    dataPilihanPtn: [],
    dataProdi: [],
    loading: false
  },
  mutations: {
    updateDataPtn(state, payload) {
      state.dataPtn = payload
        .map(ptn => {
          return {
            text: ptn.universitas,
            value: ptn.universitas
          }
        })
    },
    updateDataProdi(state, payload) {
      state.dataProdi = payload
    },
    updateDataPilihanPtn(state, payload) {
      state.dataPilihanPtn = payload
    },
    updateLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    getDataProdi(context, payload) {
      context.commit('updateLoading', true)
      getDataProdi(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataProdi', res.data)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    },
    getDataPtn(context, payload) {
      context.commit('updateLoading', true)
      getDataPtn(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataPtn', res.data)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    },
    cekPilihanPtn(context, payload) {
      context.commit('updateLoading', true)
      cekPilihanPtn(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataPilihanPtn', res.data.data)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    },
    addPilihanPtn(context, payload) {
      addData(payload, 'pilihan_ptn', { autoIncrement: true })
    },
    getDataPilihanPtn(context) {
      getAllData('pilihan_ptn').then(res => {
        context.commit('updateDataPilihanPtn', res)
      })
    }
  }
}

export default dataPtn