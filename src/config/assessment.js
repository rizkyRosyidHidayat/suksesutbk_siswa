import http from './http'

export function getDataPeringkat(data) {
	if (data.id_paket_soal === undefined) {
		return http.get('cari/peringkat?nama='+data.nama+'&kelompok='+data.kelompok+'&id_ptn='+data.id_ptn+'&id_prodi='+data.id_prodi+'&page='+data.page)
	} else {
		return http.get('cari/peringkat?nama='+data.nama+'&kelompok='+data.kelompok+'&id_ptn='+data.id_ptn+'&id_prodi='+data.id_prodi+'&id_paket_soal='+data.id_paket_soal+'&page='+data.page)
	}
}