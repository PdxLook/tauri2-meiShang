// src/utils/login.js
import { ref, watch } from 'vue'
import { pullToKen } from '@/request/modules/user.js'
import { isEmpty } from '@/utils/MxTool.js'
import { ElMessage } from 'element-plus'

// 存储 Token
const token = ref(JSON.parse(localStorage.getItem('h5-token') || '{}'))

// 获取 Token 方法
const getToken = async (query, router) => {
  try {
    const getRes = await pullToKen(query)
    if (!getRes?.status) {
      ElMessage.error('获取 Token 失败')
      return
    }

    // 删除 URL 中的临时参数
    const { uid, key, time, code, ...updatedQuery } = router.currentRoute.value.query
    router.replace({
      path: router.currentRoute.value.path,
      query: updatedQuery,
    })

    token.value = getRes?.data
    localStorage.setItem('h5-token', JSON.stringify(getRes?.data))
  } catch (error) {
    console.error('获取 Token 出错:', error)
    ElMessage.error('系统异常，请稍后重试')
  }
}

// 检查并更新 Token
const isUpToken = async (verification, router) => {
  if (isEmpty(token.value)) {
    await getToken(verification, router)
  }
}

// 封装登录逻辑，包括监听路由变化和初始化
const setupLogin = (route, router) => {
  const verification = { ...route.query }

  // 初始化检查 Token
  isUpToken(verification, router)

  // 监听路由变化并更新 Token
  watch(
    () => route.query,
    (newQuery) => {
      if (!isEmpty(newQuery?.uid)) {
        getToken(newQuery, router)
      }
    },
  )
}

// 导出方法和 Token
export { getToken, isUpToken, setupLogin, token as useToken }
