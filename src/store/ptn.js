import { 
  getDataProdi,
  getDataPtn,
  cekPilihanPtn
} from "@/config/ptn";
const dataPtn = {
  namespaced: true,
  state: {
    dataPtn: [],
    dataPilihanPtn: [],
    dataProdi: [],
    loading: false,
    loadingForm: false,
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
    },
    updateLoadingForm(state, payload) {
      state.loadingForm = payload
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
      context.commit('updateLoadingForm', true)
      cekPilihanPtn(payload)
        .then(res => {
          if (res.status == 200) {
            window.localStorage.setItem('pilihan_ptn', JSON.stringify(res.data.data
              .map(ptn => {
                return { 
                  id_ptn: ptn.kode_ptn, 
                  id_prodi: ptn.kode_prodi
                }
              })))
            /**
             * mengupdate data state data pilihan ptn
             * untuk mentrigger function saat pengecekan data tersebut
             */
            context.commit('updateDataPilihanPtn', res.data.data)
            context.commit('updateLoadingForm', false)            
          } else {
            context.commit('updateLoadingForm', false)
          }
        })
        .catch(() => context.commit('updateLoadingForm', false))
    }
  }
}

export default dataPtn