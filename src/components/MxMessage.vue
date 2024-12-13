<template>
  <div class="mx-message">
    <el-drawer v-model="drawer" direction="rtl" :before-close="drawerClose" size="25%">
      <template #header>
        <h4 class="text-5 leading-7.5 text-black-900">系统公告</h4>
      </template>
      <template #default>
        <div class="border-t border-black-300 pt-5">
          <ul class="text-3 text-black-700 divide-y divide-black-300 -my-5">
            <li class="space-y-3 py-5 cursor-pointer" v-for="items, index in data?.list" :key="index"
              @click="mxMessageDetailsRefOpen(items?.page_id)">
              <h5 class="text-4 leading-6 text-black-900">{{ items?.title }}</h5>
              <p class="leading-4.5">{{ items?.description }}</p>
              <time class="text-black-600 block">{{ items?.create_date }}</time>
            </li>
          </ul>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end">
          <el-pagination size="small" background layout="prev, pager, next" :total="Number(data?.count)"
            :default-page-size="Number(data?.page_size)" :page-size="Number(data?.page_size)"
            @current-change="changePage" class="mt-4" />
        </div>
      </template>
    </el-drawer>

    <MxMessageDetails ref="mxMessageDetailsRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pullPage } from '@/request/modules/index.js';
import { isEmpty } from '@/utils/MxTool.js'
const mxMessageDetailsRef = ref(null)
const drawer = ref(false)
const data = ref({
  count: 0,
  page: 1,
  page_size: 10,
  type: 2,
  list: []
})

const openDrawer = () => {
  drawer.value = true

  getData()
}

const closeDrawer = () => {
  drawer.value = false
}

const drawerClose = () => {
  closeDrawer()
}

async function getData() {
  const getRes = await pullPage(data.value)
  if (!getRes?.status) return
  data.value = { ...getRes?.data, type: 2, }
}

async function changePage(currentPage) {

  data.value.page = currentPage

  getData()
}

const mxMessageDetailsRefOpen = (id) => {
  mxMessageDetailsRef.value.openDrawer(id)
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