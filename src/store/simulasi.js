import { getDataPtn } from '@/config/ptn'
import { getDataHistory, postDataSimulasi } from "@/config/simulasi";
import store from './index'

var dataSimulasi = {
	namespaced: true,
	state: {
		dataPaketSoal: [],
		dataPtn: [],
		dataKelompokUji: '',
		namaPtnTerpilih: 'Nama Perguruan Tinggi Nasional',
		dataSimulasi: {},
		visible: false
	},
	mutations: {
		updateDataPaketSoal (state, payload) {
			state.dataPaketSoal = payload
		},
		updateDataKelompokUji (state, payload) {
			state.dataKelompokUji = payload
		},
		updateDataSimulasi (state, payload) {
			state.dataSimulasi = payload
		},
		updateVisible (state, payload) {
			state.visible = payload
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
		getNamaPtnTerpilih: state => state.namaPtnTerpilih,
		getVisible: state => state.visible
	},
	actions: {
		getDataHistory(context, payload) {
      store.dispatch('updateLoading', true)
			getDataHistory(payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataPaketSoal', res.data.data.ujian)						
						context.commit('updateDataKelompokUji', res.data.data.ujian[0].kelompok_ujian)

						getDataPtn(res.data.data.ujian[0].kelompok_ujian)
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
		postDataSimulasi(context, payload) {
      store.dispatch('updateLoading', true)
			postDataSimulasi(payload)
				.then(res => {
					if (res.status == 200) {
						context.commit('updateDataSimulasi', res.data.data)
						store.dispatch('updateLoading', false)
						context.commit('updateVisible', true)       
					} else {
						store.dispatch('updateLoading', false)
						store.dispatch('updateNotif', {
							visible: true,
							status: false,
							msg: 'Proses gagal, mohon dicoba lagi'
						})
					}
				})
				.catch(() => {
					store.dispatch('updateLoading', false)
					store.dispatch('updateNotif', {
						visible: true,
						status: false,
						msg: 'Proses gagal, mohon dicoba lagi'
					})
				})
		}
	}
}

export default dataSimulasi