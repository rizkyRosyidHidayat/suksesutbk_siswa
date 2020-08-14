import http2 from './http2'

export function postDataUjian(data) {
	return http2.post('ujian/start', data)
}

export function getDataSoal(data) {
	return http2.get('ujian/soal?idu='+data.id_ujian+'&idm='+data.id_materi_uji)
}

export function postDataJawaban(data) {
	return http2.post('ujian/submit', data)
}