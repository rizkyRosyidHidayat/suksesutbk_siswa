import http from './http'

export function postDataLogin(data) {
	return http.post('login/peserta', data)
}

export function postDataDaftar(data) {
	return http.post('register/peserta', data)
}

export function cekKodeAfiliasi(data) {
	return http.get('cari/kode-afiliasi?kode_afiliasi='+data)
}

export function postCekAkun(data) {
	return http.post('cek-akun', data)
}