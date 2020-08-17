import { getDataDashboard } from '@/config/dashboard'
import { getDataPtn } from '@/config/ptn'
import store from './index'

var dataSimulasi = {
	namespaced: true,
	state: {
		dataPaketSoal: [],
		dataPtn: [],
		dataKelompokUji: '',
		namaPtnTerpilih: 'Nama Perguruan Tinggi Nasional'
	},
	mutations: {
		updateDataPaketSoal (state, payload) {
			state.dataPaketSoal = payload
		},
		updateDataKelompokUji (state, payload) {
			state.dataKelompokUji = payload
		},
		updateNamaPtnTerpilih (state, payload) {
			state.namaPtnTerpilih = payload
		},
		updateDataPtn(state, payload) {
			state.dataPtn = payload
			.map(ptn => {
				return {
					text: ptn.universitas,
					value: ptn.universitas
				}
			})
		}
	},
	getters: {
		getNamaPtnTerpilih: state => state.namaPtnTerpilih
	},
	actions: {
		getDataForm (context, payload) {
      store.dispatch('updateLoading', true)
      getDataDashboard (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataPaketSoal', res.data.paket[0].subpaket.paket_soal)
						/**
						 * Menentukan kelompok uji
						 * berdasarkan nama paket soal
						 */
						const dataPaketSoal = res.data.paket[0].subpaket.paket_soal
						const kelompokUji = ['SAINTEK', 'SOSHUM']
						const selectedKelompokUji = kelompokUji
							.filter((kelompok) => {
								const result = dataPaketSoal[0].nama.includes(kelompok)
								if (result) {
									return kelompok
								}
							})[0]
						context.commit('updateDataKelompokUji', selectedKelompokUji)

						getDataPtn(selectedKelompokUji)
							.then(res => {
								if (res.status == 200) {
									context.commit('updateDataPtn', res.data)
									store.dispatch('updateLoading', false)            
								} else {
									store.dispatch('updateLoading', false)
								}
							})
							.catch(() => store.dispatch('updateLoading', false))
					} else {
            store.dispatch('updateLoading', false)
          }
				})
				.catch(() => {
          store.dispatch('updateLoading', false)
				})
		},
	}
}

export default dataSimulasi