import axios from 'axios'
import { MxNotification } from '@/utils/MxTool.js'
const axiosInit = axios.create({
  baseURL: 'http://ms.jiaotian.vip/public',
  timeout: 24000,
  transformRequest: [
    function (data, headers) {
      if (data && typeof data === 'object' && !(data instanceof FormData)) {
        const formData = new FormData()
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            formData.append(key, data[key])
          }
        }
        return formData
      }
      return data
    },
  ],
  // transformResponse: [
  //   function (data) {
  //     return data
  //   },
  // ],
})

// 添加请求拦截器
axiosInit.interceptors.request.use(
  function (config) {
    const verification = JSON.parse(localStorage.getItem('h5-token') || '{}')
    // 检查请求类型
    if (config.method === 'post') {
      if (config.data instanceof FormData) {
        // 如果是 FormData 类型
        Object.entries(verification).forEach(([key, value]) => {
          config.data.append(key, value)
        })
      } else if (typeof config.data === 'object' && config.data !== null) {
        // 如果是 JSON 对象
        config.data = {
          ...config.data,
          ...verification,
        }
      } else {
        // 如果没有 `config.data`
        config.data = verification
      }
    }

    // 接口请求支持通过 query 参数配置 queryString

    // if (config.method === 'get') {
    //   const queryString = new URLSearchParams(verification).toString()
    //   if (config.url.includes('?')) {
    //     config.url += `&${queryString}`
    //   } else {
    //     config.url += `?${queryString}`
    //   }
    // }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

axiosInit.interceptors.response.use(
  async function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if (response.status >= 400) {
      throw new Error(response.statusText)
    }

    if (response.status !== 200) {
      // MxNotification({
      //   title: '温馨提示',
      //   message: response.message,
      //   type: 'error',
      // })
      throw new Error(response.message)
    }

    if (response.data?.code >= 200 && response.data?.code < 300) {
      // 判断数据是否为合法的 JSON 对象
      if (typeof response.data?.data !== 'object') {
        MxNotification({
          title: '温馨提示',
          message: response.data?.msg || '数据格式错误',
          type: 'error',
        })
        return response.data
      }
    }

    return response.data
  },
  function (error) {
    MxNotification({
      title: 'Error',
      message: '请求错误',
      type: 'error',
    })
    return
  },
)

export default axiosInit
