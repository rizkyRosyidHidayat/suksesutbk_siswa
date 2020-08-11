import { getDataDashboard, getDataPaketSoal } from '@/config/dashboard'
import store from './index'

var dataDashboard = {
	namespaced: true,
	state: {
		dataProgressPaket: [],
		dataPaket: [],		
		cekPengerjaanPaketSoal (subpaket) {
      /**
       * Mengecek nilai complete pada setiap materi uji
       * yang ada di paket soal apakah bernilai true semua atau tidak
       */
      const result = subpaket
        .paket_soal
        .map((soal) => {
          return soal.materi_uji.findIndex(materi => materi.complete == false)
        })
        .findIndex(materi => materi == -1)
      /**
       * Jika hasil pengecekan tersebut tidak ada yang bernilai false
       * maka pengerjaan paket soal sudah selesai
       */
      if (result == -1) {
        return 'selesai'
      } else {
        return 'belum'
      }
		},
		dataBonusFasilitas: [],
		dataPeringkat: [],
		dataPaketSoal: []
	},
	mutations: {
		updateDataBonusFasilitas (state, payload) {
			state.dataBonusFasilitas = payload.bonus_fasilitas
		},
		updateDataPaketSoal (state, payload) {
			state.dataPaketSoal = payload
		},
		updateDataPaket (state, payload) {
			/**
       * Data paket
       */
      let paketView = [
        { name: 'FREE', status: 0, img: '1@3x.png' },
        { name: 'SUKSES-1', status: 0, img: '3@3x.png' },
        { name: 'SUKSES-2', status: 0, img: '2@3x.png' },
        { name: 'SUKSES-3', status: 0, img: '4@3x.png' }
			]
			/**
			* Menentukan status setiap paket berdasarkan nama
			* paket yang ada di data dashboard
			*/
			state.dataPaket = payload
			.paket.map(paket => {
				return paketView.map((data) => {
					const namaPaket = paket.nama_paket==data.name?true:false
					if (namaPaket && paket.status === true && paket.is_activated === true && paket.is_paid === true) {						
						window.localStorage.setItem('id_subpaket', paket.subpaket.id)
						/**
							* Jika hasil cek pengerjaan paket soal selesai 
							* maka status 4 (cek hasil) jika tidak maka
							* status 1 (mulai)
							*/
						const hasilCek = state.cekPengerjaanPaketSoal(payload.progress_tryout.detail[0].subpaket)
						if (hasilCek == 'selesai') {
							data.status = 4                
						} else {
							data.status = 1                                
						}
					} else if (namaPaket && paket.status === false && paket.is_activated === false && paket.is_paid === false) {
						data.status = 2
					} else if (namaPaket && paket.status === false && paket.is_activated === false && paket.is_paid === true) {
						data.status = 3
					}
					return data
				})
			}).flat()
		},
		updateDataProgressPaket (state, payload) {
			/**
			 * Membuat data tabel statistik progress
			 * setiap materi uji pada paket soal
			 */
			state.dataProgressPaket = payload			
			.progress_tryout
			.detail[0]
			.subpaket
			.paket_soal.map((paket) => {
				return {
					id_paket_soal: paket.id,
					nama: paket.nama,
					selesai: paket.materi_uji[0].completed
				}          
			})
		}
	},
	actions: {
		getDataDashboard (context, payload) {
      store.dispatch('updateLoading', true)
      getDataDashboard (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataPaket', res.data)
						context.commit('updateDataProgressPaket', res.data)
						context.commit('updateDataBonusFasilitas', res.data)
						context.commit('updateDataPaketSoal', res.data.paket[0].subpaket.paket_soal)
            store.dispatch('updateLoading', false)
					} else {
            store.dispatch('updateLoading', false)
          }
				})
				.catch(() => {
          store.dispatch('updateLoading', false)
				})
		},
		getDataPaketSoal (context, payload) {
      store.dispatch('updateLoading', true)
      getDataPaketSoal (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataPaketSoal', res.data[0])
            store.dispatch('updateLoading', false)
					} else {
            store.dispatch('updateLoading', false)
          }
				})
				.catch(() => {
          store.dispatch('updateLoading', false)
				})
		}
	}
}

export default dataDashboard