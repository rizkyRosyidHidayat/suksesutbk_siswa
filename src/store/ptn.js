import { getDataPtn } from "@/config/ptn";
const dataPtn = {
  namespaced: true,
  state: {
    dataPtn: [],
    dataProdi: [],
    loading: false
  },
  mutations: {
    updateDataPtn(state, payload) {
      /**
       * Distinct data berdasarkan kode ptn
       */
      state.dataPtn = Array
        .from(new Set(payload.map(ptn => ptn.kode_ptn)))
        .map(ptn => {
          return {
            text: payload.find(data => data.kode_ptn === ptn).ptn,
            value: ptn
          }
        })
    },
    updateDataProdi(state, payload) {
      state.dataProdi = payload
    },
    updateLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    getDataPtn(context, payload) {
      context.commit('updateLoading', true)
      getDataPtn(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataPtn', res.data)
            context.commit('updateDataProdi', res.data)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    }
  }
}

export default dataPtn