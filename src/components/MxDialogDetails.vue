<template>
  <div class="mx-dialog-details" v-if="data">
    <el-dialog v-model="dialogVisible" width="80vw" align-center :before-close="modalClose">
      <div class="p-8">
        <div class="">
          <h4 class="text-5 leading-4.5 text-center font-sans-500">{{ data?.title }}</h4>
          <time class="text-3.5 leading-5 text-black-700 mt-6 block">更新时间：{{
            dayjs.unix(data?.ht_update_time).format('YYYY-MM-DD') }}</time>
        </div>
        <div class="mt-4 text-3.5 leading-5 h-[64vh] overflow-y-auto">
          <div class="" v-html="data?.content"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { pullPage } from '@/request/modules/index.js';
import dayjs from 'dayjs'
const dialogVisible = ref(false)
const data = ref({})


async function getData(query) {
  const getRes = await pullPage(query)
  if (!getRes?.status) return
  data.value = getRes?.data
  dialogVisible.value = true
}

const openModal = (query) => {

  getData({ act: 'detail', ...query })
}

const closeModal = () => {
  dialogVisible.value = false
}

const modalClose = () => {
  closeModal()
}

// 暴露方法
defineExpose({
  openModal,
  closeModal
})


</script>

<style lang="scss" scoped>
.mx-dialog-details {
  --el-color-primary: #EB0013
}
</style>