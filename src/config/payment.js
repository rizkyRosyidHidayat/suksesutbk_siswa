import http from './http2'

export function postDataPayment(data) {
  return http.post('payment/create-token', data)
}