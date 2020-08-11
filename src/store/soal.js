import { 
  postDataUjian,
  getDataSoal
} from "@/config/soal";
import store from './index'

const dataSoal = {
  namespaced: true,
  state: {
    dataUjian: [],
    loading: false
  },
  mutations: {
    updateDataUjian(state, payload) {
      state.dataUjian = payload
    },
  },
  actions: {
    postDataUjian(context, payload) {
      store.dispatch('updateLoading', true)
      postDataUjian(payload)
        .then(res => {
          if (res.status == 201) {
            context.commit('updateDataUjian', res.data.data)
            const info_ujian = res.data.data
            getDataSoal({
              id_ujian: info_ujian.id,
              id_materi_uji: payload.materiuji_id
            })
              .then(res => {
                if (res.status == 200) {
                  store.dispatch('updateNotif', {
                    status: true,
                    visible: false,
                    msg: ''
                  })
                  store.dispatch('updateLoading', false)                  
                } else {
                  store.dispatch('updateNotif', {
                    status: false,
                    visible: false,
                    msg: ''
                  })
                  store.dispatch('updateLoading', false)
                }
              })
              .catch(() => {
                store.dispatch('updateNotif', {
                  status: false,
                  visible: false,
                  msg: ''
                })
                store.dispatch('updateLoading', false)
              })
          } else {
            store.dispatch('updateNotif', {
              status: false,
              visible: false,
              msg: ''
            })
            store.dispatch('updateLoading', false)
          }
        })
        .catch(() => {
          store.dispatch('updateNotif', {
            status: false,
            visible: false,
            msg: ''
          })
          store.dispatch('updateLoading', false)
        })
    }
  }
}

export default dataSoal