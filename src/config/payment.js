import http from './http'
import http2 from './http2'

export function postDataPayment(data) {
  return http2.post('payment/create-token', data)
}

export function postDataRiwayat(data) {
	return http.post('payment', data)
}