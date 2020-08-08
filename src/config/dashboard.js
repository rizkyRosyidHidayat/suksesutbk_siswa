import http from './http'

export function getDataDashboard(id) {
	return http.get('peserta/'+id+'/dashboard')
}