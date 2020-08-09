import http from './http'

export function getDataProv() {
	return http.get('cari/provinsi')
}

export function getDataKab(data) {
	return http.get('cari/kabupaten/?provinsi='+data)
}

export function getDataSekolah(data) {
	return http.get('cari/sekolah/?provinsi='+data.provinsi+'&kabupaten='+data.kabupaten)
}

export function postDataBiodata(id, data) {
	return http.post('peserta/'+id, data)
}