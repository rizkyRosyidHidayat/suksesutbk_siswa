import {
	getDataProv,
	getDataKab,
	postDataBiodata,
	getDataSekolah
} from '@/config/biodata'
import store from './index'

var dataBiodata = {
	namespaced: true,
	state: {
		dataProv: [],
		dataKab: [],
		dataBiodata: {},
		loading: false,
		dataSekolah: []
	},
	mutations: {
		updateDataProv (state, payload) {
			state.dataProv = payload.map(prov => {
				return {
					text: prov,
					value: prov
				}
			})
		},
		updateDataKab (state, payload) {
			state.dataKab = payload.map(prov => {
				return {
					text: prov,
					value: prov
				}
			})
		},
		updateDataBiodata (state, payload) {
			state.dataBiodata = payload
		},
		updateDataSekolah (state, payload) {
			state.dataSekolah = payload
		},
		updateLoading (state, payload) {
			state.loading = payload
		}
	},
	actions: {
		getDataProv (context) {
      context.commit('updateLoading', true)
			getDataProv ()
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataProv', res.data.data)
						context.commit('updateLoading', false)
					} else {
            context.commit('updateLoading', false)
          }
				})
				.catch(() => {
					context.commit('updateLoading', false)
				})
		},
		getDataKab (context, payload) {
      context.commit('updateLoading', true)
      getDataKab (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataKab', res.data.data)
						context.commit('updateLoading', false)
					} else {
            context.commit('updateLoading', false)
          }
				})
				.catch(() => {
					context.commit('updateLoading', false)
				})
		},
		getDataSekolah (context, payload) {
      context.commit('updateLoading', true)
			getDataSekolah (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataSekolah', res.data.data)
						context.commit('updateLoading', false)
					} else {
            context.commit('updateLoading', false)
          }
				})
				.catch(() => {
					context.commit('updateLoading', false)
				})
		},
		postDataBiodata (context, payload) {
      store.dispatch('updateLoading', true)
			const peserta = JSON.parse(window.localStorage.getItem('dataPeserta'))
			postDataBiodata (peserta.id, payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataBiodata', res.data.data)
						window.localStorage.setItem('dataPeserta', JSON.stringify(res.data.data))
						store.dispatch('updateLoading', false)
						store.dispatch('updateNotif', {
							visible: true,
							status: true,
							msg: 'Data berhasil disimpan'
						})
						window.history.go(-1)
					} else {
						store.dispatch('updateNotif', {
							visible: true,
							status: false,
							msg: 'Data gagal disimpan'
						})
            store.dispatch('updateLoading', false)
          }
				})
				.catch(() => {
					store.dispatch('updateNotif', {
						visible: true,
						status: false,
						msg: 'Data gagal disimpan'
					})
					store.dispatch('updateLoading', false)
				})
		}
	}
}

export default dataBiodata