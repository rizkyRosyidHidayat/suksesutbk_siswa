import { 
  getDataPaket,
  getDetailPaket
} from "@/config/paket";
const dataPaket = {
  namespaced: true,
  state: {
    dataPaket: [],
    dataProdi: [],
    loading: false,
  },
  mutations: {
    updateDataPaket(state, payload) {
      state.dataPaket = payload
    },
    updateDataDetailPaket(state, payload) {
      state.dataDetailPaket = payload
    },
    updateLoading(state, payload) {
      state.loading = payload
    },
  },
  actions: {
    getDataPaket(context, payload) {
      context.commit('updateLoading', true)
      getDataPaket()
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataPaket', res.data.data
            .filter(paket => paket.paket_nama == payload))
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    },
    getDetailPaket(context, payload) {
      context.commit('updateLoading', true)
      getDetailPaket(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDataDetailPaket', res.data)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    }
  }
}

export default dataPaket