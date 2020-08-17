import Vue from 'vue'
import Vuex from 'vuex'

import dataAuth from './auth'
import dataDashboard from './dashboard'
import dataPtn from './ptn'
import dataBiodata from './biodata'
import dataSoal from './soal'
import dataSimulasi from './simulasi'
import dataPaket from './paket'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    notif: {
      visible: false,
      status: null,
      msg: ''
    },
    loading: false
  },
  mutations: {
    updateNotif(state, payload) {
      state.notif.visible = payload.visible
      state.notif.status = payload.status
      state.notif.msg = payload.msg
    },
    updateLoading(state, payload) {
      state.loading = payload
    }
  },
  getters: {
    getNotif: state => state.notif,
    getLoading: state => state.loading,
  },
  actions: {
    updateNotif(context, payload) {
      context.commit('updateNotif', payload)
    },
    updateLoading(context, payload) {
      context.commit('updateLoading', payload)
    },
  },
  modules: {
    dataPaket: dataPaket,
    dataSimulasi: dataSimulasi,
    dataSoal: dataSoal,
    dataBiodata: dataBiodata,
    dataPtn: dataPtn,
    dataDashboard: dataDashboard,
    dataAuth: dataAuth,
  }
})

export default store