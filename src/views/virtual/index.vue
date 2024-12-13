<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full space-y-4">
    <div class="bg-white rounded space-y-6 p-6 overflow-hidden">
      <div class="flex-items-center">
        <div class="">
          <p class="text-3.5 leading-5 text-black-700">可用商豆</p>
          <p class="text-5 leading-7.5 font-600 mt-2">200.51</p>
        </div>
        <div class="ml-auto">
          <el-button color="#333333" @click="vipMxTopUpOpen">立即充值</el-button>
        </div>
      </div>
    </div>
    <div class="table-card bg-white rounded space-y-5 p-5 relative overflow-hidden">
      <div class="table-card-header">
        <div class="left-button-group flex gap-2">
          <el-input v-model="keyword" style="width: 200px" placeholder="标题/关键词" clearable />
          <div class=""><el-button type="primary">搜索</el-button></div>
        </div>
      </div>
      <div class="table-card-body">
        <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 84px - 254px)" size="default"
          style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
          <el-table-column fixed type="selection" width="42" />
          <el-table-column prop="id" min-width="40" />
          <el-table-column prop="d_id" label="订单编号" min-width="160" />
          <el-table-column prop="name" label="支付金额" min-width="140" />
          <el-table-column prop="name" label="标题" min-width="140" />
          <el-table-column prop="name" label="购买商豆" min-width="140" />
          <el-table-column prop="name" label="购买时间" min-width="140" />
          <el-table-column prop="state" label="状态" min-width="100" />

        </el-table>
      </div>
      <div class="table-card-footer flex-items-center justify-end">
        <el-pagination size="small" background layout="prev, pager, next" :total="50" />
      </div>

    </div>

    <!-- 商豆充值弹窗 -->
    <MxTopUp ref="vipMxTopUpRef" @close="getData" />
  </main>

</template>

<script setup>
import { ref } from 'vue'
import { pullBalance } from '@/request/modules/vip.js';

const vipMxTopUpRef = ref(null)
const keyword = ref('')

const vipMxTopUpOpen = () => {
  getBalance()
}
async function getBalance() {
  const getRes = await pullBalance()
  if (!getRes?.status) return
  vipMxTopUpRef.value.openModal(getRes?.data)
}

// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    d_id: Math.ceil(Math.random() * 666666),
    name: `词库名称${index + 1}`,
    title: `标题名称${index + 1}`,
    keyNum: Math.floor(Math.random() * 1000), // 随机关键词数量
    apiStatus: Math.ceil(Math.random() * 2), // 随机模型编号
    updateDate: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() // 随机最近更新时间
  }))
);

</script>

<style lang="scss" scoped></style>