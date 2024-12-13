import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { isEmpty } from '@/utils/MxTool.js'
// 定义用户 Store
export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(JSON.parse(localStorage.getItem('h5-token') || '{}'))

  // 计算属性
  const isLoggedIn = computed(() => isEmpty(token.value)) // 是否已登录

  // 方法
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('h5-token', JSON.stringify(newToken)) // 同步存储到 localStorage
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('h5-token') // 清除本地存储
  }

  async function fetchUserInfo() {
    if (!token.value) {
      console.error('未登录，无法获取用户信息')
      return
    }
    try {
      // 模拟请求用户信息
      console.log('Fetching user info...')
    } catch (error) {
      console.error('请求错误', error)
    }
  }

  async function login(username, password) {
    try {
      // 模拟登录请求
      console.log('Logging in with username:', username)
      const simulatedToken = 'exampleToken123' // 模拟返回的 token
      setToken(simulatedToken)
    } catch (error) {
      console.error('登录请求出错', error)
    }
  }

  function logout() {
    clearToken()
  }

  // 返回状态和方法
  return {
    token,
    isLoggedIn,
    setToken,
    clearToken,
    fetchUserInfo,
    login,
    logout,
  }
})
