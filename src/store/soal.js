import { 
  postDataUjian,
  getDataSoal,
  postDataJawaban,
  postFinishUjian
} from "@/config/soal";
import store from './index'
import router from '@/router/index'

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
            window.localStorage.setItem('info_ujian', JSON.stringify(info_ujian))
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
                  router.push({ name: 'pengerjaan-soal', params: {id: payload.materiuji_id} })                  
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
    },
    postDataJawaban(context, payload) {
      store.dispatch('updateLoading', true)
      const info_ujian = JSON.parse(window.localStorage.getItem('info_ujian'))

			const dataJawaban = new FormData()
			dataJawaban.append("ujian_id", info_ujian.id)
			dataJawaban.append("detail_id", info_ujian.detail_id)
			dataJawaban.append("submisi", JSON.stringify(payload))
      postDataJawaban(dataJawaban)   
        .then(res => {
          if (res.status == 201) {
            window.localStorage.setItem('skor_soal', JSON.stringify(res.data.data))            
            window.localStorage.removeItem('soal')
            window.localStorage.removeItem('dataDurasi')
            window.localStorage.removeItem('dataJawaban') 
            store.dispatch('updateNotif', {
              status: true,
              visible: false,
              msg: ''
            })
            store.dispatch('updateLoading', false)
            router.push({ name: 'skor-soal' })
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
    },
    postFinishUjian() {
      store.dispatch('updateLoading', true)
      const info_ujian = JSON.parse(window.localStorage.getItem('info_ujian'))

			const dataJawaban = new FormData()
			dataJawaban.append("ujian_id", info_ujian.id)
			dataJawaban.append("detail_id", info_ujian.detail_id)
      postFinishUjian(dataJawaban)   
        .then(res => {
          if (res.status == 200) {
            store.dispatch('updateNotif', {
              status: true,
              visible: false,
              msg: ''
            })
            store.dispatch('updateLoading', false)
            window.localStorage.removeItem('soal')
            window.localStorage.removeItem('dataDurasi')
            window.localStorage.removeItem('dataJawaban') 
            router.push({ name: 'assessment' })
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