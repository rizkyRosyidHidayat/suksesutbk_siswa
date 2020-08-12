import { 
  postDataUjian,
  getDataSoal
} from "@/config/soal";
import store from './index'

const dataSoal = {
  namespaced: true,
  state: {
    dataUjian: [],    
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
            const info_ujian = res.data.data
            getDataSoal({
              id_ujian: info_ujian.id,
              id_materi_uji: payload.materiuji_id
            })
              .then(res => {
                if (res.status == 200) {
                  window.localStorage.setItem('soal', JSON.stringify(res.data.submateri))
                  /**
                   * memilih data soal pada array submateri
                   */
                  window.localStorage.setItem('submateri', 0)
                  /**
                   * Membuat penampung data jawaban
                   */
                  window.localStorage.setItem('dataJawaban', JSON.stringify(
                    res.data.submateri.map(() => [])
                  ))
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