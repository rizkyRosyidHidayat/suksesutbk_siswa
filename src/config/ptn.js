import http from './http'

export function getDataProdi(data) {	
	return http.get('cari/ptn?kelompok='+data.kelompok+'&nama='+data.ptn)	
}

export function cekPilihanPtn(data) {
	return http.post('ujian/cek-pilihan-ptn', data)
}

export function getDataPtn(data) {
	return http.get('cari/kelompok/ptn?kelompok='+data)
}