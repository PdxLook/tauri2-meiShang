import axiosInit from '@/request/index'

export function pullIndex(data) {
  return axiosInit.post('/h5_index.html', data)
}

export function pullPage(data) {
  return axiosInit.post('/h5_page.html', data)
}
