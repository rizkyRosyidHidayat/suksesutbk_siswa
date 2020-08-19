import http from './http'

export function getDataPeringkat(data) {
	if (data.id_paket_soal === undefined) {
		return http.get('cari/peringkat?nama='+data.nama+'&kelompok='+data.kelompok+'&id_ptn='+data.id_ptn+'&id_prodi='+data.id_prodi+'&page='+data.page)
	} else {
		return http.get('cari/peringkat?nama='+data.nama+'&kelompok='+data.kelompok+'&id_ptn='+data.id_ptn+'&id_prodi='+data.id_prodi+'&id_paket_soal='+data.id_paket_soal+'&page='+data.page)
	}
}

export function getDataAssessment(data) {
	return http.get('peserta/'+data+'/assessment/')
}

export function getDetailAssessment(data) {
	return http.get('peserta/'+data.id_peserta+'/assessment/'+data.id_ujian)
}

export function getDataPembahasan(data) {
	return http.get('ujian/submateri/pembahasan/?id_ujian='+data.id_ujian+'&id_sub='+data.id_sub+'&id_kategori_submateri='+data.id_kategori_submateri)
}