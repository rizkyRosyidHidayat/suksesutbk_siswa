import { getDataDashboard, getDataPaketSoal } from '@/config/dashboard'
import { postDataRiwayat } from "@/config/payment";
import store from './index'

var dataDashboard = {
	namespaced: true,
	state: {
		dataProgressPaket: [],
		dataPaket: [
			{ name: 'FREE', status: 0, img: '1@3x.png' },
			{ name: 'SUKSES-1', status: 0, img: '3@3x.png' },
			{ name: 'SUKSES-2', status: 0, img: '2@3x.png' },
			{ name: 'SUKSES-3', status: 0, img: '4@3x.png' }
		],		
		cekPengerjaanPaketSoal (subpaket) {
      /**
       * Mengecek nilai complete pada setiap materi uji
       * yang ada di paket soal apakah bernilai true semua atau tidak
       */
      const result = subpaket
        .paket_soal
        .map((soal) => {
          return soal.materi_uji.findIndex(materi => materi.completed == false)
        })
				.findIndex(materi => materi == -1)
      /**
       * Jika hasil pengecekan tersebut tidak ada yang bernilai false
       * maka pengerjaan paket soal sudah selesai
       */
      if (result > -1) {
        return 'selesai'
      } else {
        return 'belum'
      }
		},
		dataBonusFasilitas: [],
		dataPeringkat: [],
		dataPaketSoal: [],
		dataSubpaket: [],
		modalBayar: false,
		cekPaketBerbayar(payload) {
			/**
			 * Mengecek paket yang berbayar apakah sudah lunas atau belum
			 */
			const paket = payload
				.filter(paket => paket.nama_paket !== 'FREE')
				.findIndex(paket => paket.status == true)
			/**
			 * Hasil true jika paket yang berstatus true ditemukan
			 */
			if (paket != -1) {
				return true
			} else {
				return false				
			}	
		}
	},
	mutations: {
		updateDataBonusFasilitas (state, payload) {
			state.dataBonusFasilitas = payload
		},
		updateDataPaketSoal (state, payload) {
			state.dataPaketSoal = payload
		},
		updateDataPaket (state, payload) {
			/**
			* Menentukan status setiap paket berdasarkan nama
			* paket yang ada di data dashboard
			*/
			state.dataPaket.map(data => {
				return payload.paket.map((paket) => {
					const namaPaket = paket.nama_paket==data.name?true:false
					if (namaPaket && paket.status === true && paket.is_activated === true && paket.is_paid === true) {						
						/**
							* Jika hasil cek pengerjaan paket soal selesai 
							* maka status 4 (cek hasil) jika tidak maka
							* status 1 (mulai)
							*/
						const hasilCek = state.cekPengerjaanPaketSoal(
							payload.progress_tryout.detail.filter(detail => detail.id == paket.id_paket)[0].subpaket
						)
						if (hasilCek == 'selesai') {
							data.status = 4                
						} else {
							data.status = 1                                
							data.id = paket.subpaket.id
						}
					} else if (namaPaket && paket.status === false && paket.is_activated === true && paket.is_paid === false) {
						data.status = 2
					} else if (namaPaket && paket.status === false && paket.is_activated === false && paket.is_paid === true) {
						data.status = 3
					}
					return data
				}).flat()
			})			
		},
		updateDataProgressPaket (state, payload) {
			/**
			 * Membuat data tabel statistik progress
			 * setiap materi uji pada paket soal
			 */
			state.dataProgressPaket = payload
			.detail
			.map(subpaket => {
				return subpaket
				.subpaket
				.paket_soal.map((paket) => {
					return {
						id_paket_soal: paket.id,
						nama: paket.nama,
						materi_uji: paket.materi_uji.sort((a, b) => a.id - b.id)
					}          
				})
			}).flat()		
		},
		updateDataSubpaket(state, payload) {
			state.dataSubpaket = payload.map(paket => paket.subpaket)
		},
		updateModalBayar(state, payload) {
			state.modalBayar = payload
		}
	},
	getters: {
		getModalBayar: state => state.modalBayar
	},
	actions: {
		getDataDashboard (context, payload) {
      store.dispatch('updateLoading', true)
      getDataDashboard (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataPaket', res.data)
						context.commit('updateDataProgressPaket', res.data.progress_tryout)
						context.commit('updateDataBonusFasilitas', res.data.bonus_fasilitas)
						context.commit('updateDataSubpaket', res.data.paket)

						if (window.sessionStorage.getItem('modalBayar') == 1) {
							postDataRiwayat({
								peserta_id: payload
							})
								.then(res => {
									if (res.status == 200) {
										const menunggu = res.data.data.filter(x => x.status == 0)
										if (menunggu.length > 0) {
											context.commit('updateModalBayar', true)
											/**
											 * Reset nilai modal bayar supaya 
											 * setiap masuk ke halaman home tidak mengeluarkan modal
											 */
											window.sessionStorage.setItem('modalBayar', 0)
										}
									}
								})							
						}
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
						context.commit('updateDataPaketSoal', res.data)
            store.dispatch('updateLoading', false)
					} else {
            store.dispatch('updateLoading', false)
          }
				})
				.catch(() => {
          store.dispatch('updateLoading', false)
				})
		},
		getCekPaketBerbayar(context, payload) {
			return getDataDashboard(payload)
		}
	}
}

export default dataDashboard