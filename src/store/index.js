import Vue from 'vue'
import Vuex from 'vuex'

import dataAuth from './auth'

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
    }
  },
  modules: {
    dataAuth: dataAuth
  }
})

export default store