import { 
	postDataLogin, 
	postDataDaftar,
	postCekAkun
} from '@/config/auth'
import store from './index'

var dataAuth = {
	namespaced: true,
	state: {
		statusCekNomor: null
	},
	mutations: {
		updateStatusCekNomor (state, payload) {
			state.statusCekNomor = payload
		}
	},
	actions: {
		postDataLogin (context, payload) {
      store.dispatch('updateLoading', true)
			postDataLogin (payload)
				.then(res => {
					if (res.data.status === 200) {
						window.localStorage.setItem('dataPeserta', JSON.stringify(res.data.data))
						window.localStorage.setItem('token', res.data.data.token)
						store.dispatch('updateNotif', {
              visible: true,
              status: true,
              msg: 'Login berhasil'
            })
            store.dispatch('updateLoading', false)
						// window.location.href="/peserta"
					} else {
						store.dispatch('updateNotif', {
              visible: true,
              status: false,
              msg: 'Login gagal'
            })
            store.dispatch('updateLoading', false)
					}
				})
				.catch(() => {
					store.dispatch('updateNotif', {
            visible: true,
            status: false,
            msg: 'Login gagal'
          })
          store.dispatch('updateLoading', false)
				})
		},
		postDataDaftar (context, payload) {
      store.dispatch('updateLoading', true)
			var nohp = {
				nohp: payload.nohp
			}
			postCekAkun(nohp)
				.then(res => {
					if (res.status === 200) {
						if (res.data.tersedia) {
							postDataDaftar (payload)
								.then(res => {
									if (res.status === 201) {
										window.localStorage.setItem('dataPeserta', JSON.stringify(res.data.data))
                    window.localStorage.setItem('token', res.data.data.token)
                    store.dispatch('updateNotif', {
                      visible: true,
                      status: true,
                      msg: 'Pendaftaran berhasil'
                    })
                    store.dispatch('updateLoading', false)
										// window.location.href="/peserta"										
									} else {
                    store.dispatch('updateNotif', {
                      visible: true,
                      status: false,
                      msg: 'Pendaftaran gagal'
                    })
                    store.dispatch('updateLoading', false)
									}
								})
								.catch(() => {
                  store.dispatch('updateNotif', {
                    visible: true,
                    status: false,
                    msg: 'Pendaftaran gagal'
                  })
                  store.dispatch('updateLoading', false)
								})
						} else {
							store.dispatch('updateNotif', {
                visible: true,
                status: false,
                msg: 'Nomor HP sudah pernah dipakai'
              })
              store.dispatch('updateLoading', false)
						}
					}
				})
				.catch(() => {
          store.dispatch('updateNotif', {
            visible: true,
            status: false,
            msg: 'Nomor HP sudah pernah dipakai'
          })
          store.dispatch('updateLoading', false)
				})
		}
	}
}

export default dataAuth