import http from './http'

export function getDataDashboard(id) {
	return http.get('peserta/'+id+'/dashboard')
}

export function getDataPaketSoal(data) {
	return http.get('peserta/'+data.id_peserta+'/paket-soal/'+data.id_paket_soal)
}