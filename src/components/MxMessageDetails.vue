<template>
  <div class="mx-message-details">
    <el-drawer v-model="drawer" direction="rtl" :before-close="drawerClose" size="25%">
      <template #header>
        <h4 class="text-5 leading-7.5 text-black-900">系统公告</h4>
      </template>
      <template #default>
        <div class="border-t border-black-300 pt-5">
          <div class="text-4.5 font-600 ">{{ data?.title }}</div>
          <div class="text-3.5 leading-7 text-black-800 mt-4">
            <div class="" v-html="data?.content"></div>
          </div>
          <div class="text-3.5 leading-5 text-black-600 mt-5">{{ data?.create_date }}</div>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pullPage } from '@/request/modules/index.js';
import { isEmpty } from '@/utils/MxTool.js'
const drawer = ref(false)
const query = ref({
  act: 'detail',
  page_id: null
})

const data = ref()

const openDrawer = (id) => {
  data.value = []
  drawer.value = true
  query.value.page_id = id

  if (isEmpty(query.value.page_id)) return ElMessage.error('参数错误');

  getData()
}

const closeDrawer = () => {
  drawer.value = false
}

const drawerClose = () => {
  closeDrawer()
}

async function getData() {
  const getRes = await pullPage(query.value)
  if (!getRes?.status) return
  data.value = getRes.data
}

// 暴露方法
defineExpose({
  openDrawer,
  closeDrawer
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer) {
  --el-color-primary: #EB0013;

  .el-drawer__header {
    margin-bottom: 20px;
  }

  .el-drawer__body {
    padding-top: 0;
  }
}
</style>