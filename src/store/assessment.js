import { 
  getDataAssessment, 
  getDetailAssessment, 
  getDataPeringkat,
  getDataPembahasan,
  postDataScoreAll
} from "@/config/assessment";
import store from './index'
import router from '@/router/index'

const dataAssessment = {
  namespaced: true,
  state: {
    dataAssessment: [],
    detailAssessment: [],
    dataPeringkat: [],
    dataNilaiAkhir: {},
    loading: false,
    lastPage: 0
  },
  mutations: {
    updateDataAssessment(state, payload) {
      state.dataAssessment = payload
    },
    updateDataPeringkat(state, payload) {
      let index = 0
      if (payload.length == 0) {
        state.dataPeringkat = payload
      } else {
        for (const key in payload) {
          state.dataPeringkat[index] = payload[key];   
          index++             
        }
      }
    },
    updateDetailAssessment(state, payload) {
      state.detailAssessment = payload
    },
    updateLoading(state, payload) {
      state.loading = payload
    },
    updateLastPage(state, payload) {
      state.lastPage = payload
    },
    updateDataNilaiAkhir(state, payload) {
      state.dataNilaiAkhir = payload
    }
  },
  actions: {
    updateDataPeringkat(context, payload) {
      context.commit('updateDataPeringkat', payload)      
    },
    getDataAssessment(context, payload) {
      store.dispatch('updateLoading', true)            
      getDataAssessment(payload)
        .then(res => {
          if (res.status == 200) {            
            const data = res.data
            context.commit('updateDataAssessment', data)
            context.dispatch('getDetailAssessment', {
              id_peserta: payload,
              id_ujian: data[0].id_ujian
            })
            // get data score
            postDataScoreAll({id_ujian: data[0].id_ujian})
              .then(res => context.commit('updateDataNilaiAkhir', res.data))
            // digunakan untuk menampilkan data pembahasan
            window.localStorage.setItem('id_ujian', data[0].id_ujian)       
          } else {
            store.dispatch('updateLoading', false)
          }
        })
        .catch(() => store.dispatch('updateLoading', false))
    },
    getDetailAssessment(context, payload) {
      store.dispatch('updateLoading', true)            
      getDetailAssessment(payload)
        .then(res => {
          if (res.status == 200) {
            context.commit('updateDetailAssessment', res.data.data)
            store.dispatch('updateLoading', false)            
          } else {
            store.dispatch('updateLoading', false)
          }
        })
        .catch(() => store.dispatch('updateLoading', false))
    },
    getDataPeringkat(context, payload) {
      context.commit('updateLoading', true)            
      getDataPeringkat(payload)
        .then(res => {
          if (res.status == 200) {
            context.dispatch('updateDataPeringkat', res.data.data)
            context.commit('updateLastPage', res.data.last_page)
            context.commit('updateLoading', false)            
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    },
    getDataPembahasan(context, payload) {
      context.commit('updateLoading', true)            
      getDataPembahasan(payload)
        .then(res => {
          if (res.status == 200) {
            // context.commit('updateDataPembahasan', res.data.data)
            window.localStorage.setItem('pembahasan_soal', JSON.stringify({
              submateri: payload.submateri,
              soal: res.data.data
            }))
            context.commit('updateLoading', false)  
            router.push({ name: 'review-soal' })
            // window.location.href = '/review-soal'          
          } else {
            context.commit('updateLoading', false)
          }
        })
        .catch(() => context.commit('updateLoading', false))
    }
  }
}

export default dataAssessment