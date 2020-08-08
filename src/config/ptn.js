import http from './http'

export function getDataPtn(data) {	
	return http.get('cari/ptn?kelompok='+data.kelompok+'&nama='+data.ptn)	
}