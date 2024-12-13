<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="table-card bg-white rounded space-y-5 p-5 h-full relative overflow-hidden">
      <div class="table-card-header space-y-5">
        <div class="left-button-group flex gap-2">
          <el-input v-model="keyword" style="width: 200px" placeholder="搜索词库" clearable />
          <div class=""><el-button type="primary">搜索</el-button></div>
        </div>
        <div class="left-button-group flex gap-2">
          <div class=""><el-button type="success" size="small" @click="openAdd">新增词库</el-button></div>
        </div>
      </div>
      <div class="table-card-body">
        <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 118px - 148px)" size="default"
          style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
          <el-table-column fixed type="selection" width="42" />
          <el-table-column prop="group" label="分组名称" sortable="custom" min-width="140" />
          <el-table-column prop="name" label="词库名称" min-width="140" />
          <el-table-column prop="keyNum" label="关键词数量" min-width="100" />
          <el-table-column prop="apiStatus" label="API类型" min-width="100">
            <template #default="scope">
              <el-tag :type="scope.row.apiStatus === 1 ? 'info' : 'success'" effect="light" round>
                {{ scope.row.apiStatus === 1 ? '免费' : '付费' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="updateDate" label="最近更新时间" min-width="160" />
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button link @click="openAdd(scope.row)">追加</el-button>
              <el-button link @click="openEdit(scope.row)">编辑</el-button>
              <el-button link @click="openDrawer(scope.row)">详情</el-button>

              <el-button link @click="deleteConfirm(scope.row?.id, scope.row?.title)">
                删除
              </el-button>

            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-card-footer flex-items-center justify-end">
        <el-pagination size="small" background layout="prev, pager, next" :total="50" />
      </div>

    </div>

    <!-- 新增弹窗 -->
    <Add ref="AddRef" />
    <!-- 编辑弹窗 -->
    <Edit ref="EditRef" />

    <!-- 关键词列表 -->
    <KeyLists ref="KeyListsRef" />


  </main>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { isEmpty } from '@/utils/MxTool.js'
import { useOperation } from "@/utils/MxOperation.js";
import { pullIndex } from '@/request/modules/index.js';
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'
import KeyLists from './components/KeyLists.vue'
const tableRef = ref(null)
const AddRef = ref(null)
const EditRef = ref(null)
const KeyListsRef = ref(null)

const keyword = ref('')

const openAdd = (row = null) => {
  AddRef.value.openAdd(row)
}

const openEdit = (row = null) => {
  EditRef.value.openEdit(row)
}

const openDrawer = () => {
  KeyListsRef.value.openDrawer()
}


// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    group: Math.ceil(Math.random() * 2),
    name: `词库名称${index + 1}`,
    keyNum: Math.floor(Math.random() * 1000), // 随机关键词数量
    apiStatus: Math.ceil(Math.random() * 2), // 随机模型编号
    updateDate: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() // 随机最近更新时间
  }))
);

const pageQuery = ref({
  page: 1,
  limit: 10,
})
const searchQuery = ref({
  keyword: '',
  state: '',
  group: '',
})
const dataQuery = ref({
  apiStatus: '',
  ...pageQuery.value,
  ...searchQuery.value,
})

const funcOptions = {
  check: {
    title: "审核",
    func: 'funcCheck',
    apiUrl: pullIndex,
  },
  reject: {
    title: "退回",
    func: 'funcReject',
    apiUrl: pullIndex,
  },
  delete: {
    title: "删除",
    func: 'funcDelete',
    apiUrl: pullIndex,
  },
  getTableData: {
    title: "获取数据",
    func: 'getTableData',
    apiUrl: pullIndex,
  },
}

const { batchOperation, deleteConfirm, getTableData } = useOperation(tableRef, funcOptions,)

</script>

<style lang="scss" scoped></style>