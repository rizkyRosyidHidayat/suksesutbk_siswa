import http from './http'

export function getDataHistory(data) {
	return http.get('peserta/'+data+'/history-ujian')
}

export function postDataSimulasi(data) {
	return http.post('simulasi-rangking', data)
}