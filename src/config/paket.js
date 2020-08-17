import http from './http'

export function getDataPaket() {
	return http.get('paket/list')
}

export function getDetailPaket(id) {
	return http.get('paket/'+id+'/detail')
}