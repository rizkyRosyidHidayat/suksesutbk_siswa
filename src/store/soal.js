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
                   * Jika belum pernah menyimpan data jawaban
                   * maka akan mengeset data jawaban 
                   */
                  const dataJawaban = window.localStorage.getItem('dataJawaban')
                  if (dataJawaban === undefined || dataJawaban === null) {
                    window.localStorage.setItem('dataJawaban', JSON.stringify(
                      res.data.submateri.map(() => [])
                    ))
                  }                  
                  /**
                   * Jika belum pernah menyimpan data Durasi
                   * maka akan mengeset data Durasi 
                   */
                  const dataDurasi = window.localStorage.getItem('dataDurasi')
                  if (dataDurasi === undefined || dataDurasi === null) {
                    window.localStorage.setItem('dataDurasi', JSON.stringify(
                      res.data.submateri.map(data => {
                        return data.durasi_ujian*60
                      })
                    ))
                  }                  
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