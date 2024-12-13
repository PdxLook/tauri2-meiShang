import axiosInit from '@/request/index'

export function pullToKen(data) {
  return axiosInit.post('/h5_token.html', data)
}
