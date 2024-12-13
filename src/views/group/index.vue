<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="table-card bg-white rounded space-y-5 p-5 h-full relative overflow-hidden">
      <div class="table-card-header space-y-5">
        <div class="left-button-group flex gap-2">
          <el-input v-model="searchQuery.keyword" style="width: 240px" placeholder="搜索分组关键词" clearable />
          <div class=""><el-button type="primary" @click="formSearch">搜索</el-button></div>
        </div>
        <div class="left-button-group flex gap-2">
          <div class=""><el-button type="success" size="small" @click="openAddEdit()">新增分组</el-button></div>
        </div>
      </div>
      <div class="table-card-body">
        <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 118px - 148px)" size="default"
          style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
          <el-table-column fixed type="selection" width="42" />
          <el-table-column prop="groupName" label="分组" min-width="140" max-width="200" show-overflow-tooltip />
          <el-table-column prop="libraryCount" label="词库数量" min-width="80" />
          <el-table-column prop="key" label="关键词数量" min-width="100" />
          <el-table-column prop="wechatCount" label="公众号数量" min-width="80" />
          <el-table-column prop="apiType" label="API类型" min-width="80">
            <template #default="scope">
              <el-tag :type="scope.row.apiType === '1' ? 'info' : 'success'" effect="light" round>
                {{ scope.row.apiType === '1' ? '免费' : '付费' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column property="remark" label="备注" width="260" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button link @click="openAddEdit(scope.row)">编辑</el-button>
              <el-button link @click="deleteConfirm(scope.row?.id, scope.row?.groupName)">
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
    <!-- 新增编辑弹窗 -->
    <AddEdit ref="AddEditRef" />
  </main>

</template>

<script setup>
import { ref } from 'vue'
import { isEmpty } from '@/utils/MxTool.js'
import AddEdit from './components/AddEdit.vue'
import { useOperation } from "@/utils/MxOperation.js";
import { pullIndex } from '@/request/modules/index.js';
const tableRef = ref(null)
const AddEditRef = ref(null)

const pageQuery = ref({
  page: 1,
  limit: 10,
})
const searchQuery = ref({
  keyword: '',
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

const { batchOperation, deleteConfirm, getTableData } = useOperation(tableRef, funcOptions, dataQuery.value)

const openAddEdit = (row = null) => {
  AddEditRef.value.openAddEdit(row)
}

function formSearch() {
  // if (isEmpty(searchQuery.value.keyword)) return ElMessage.warning('请输入搜索关键词')
  dataQuery.value = { ...dataQuery.value, ...searchQuery.value };
  getTableData(dataQuery.value);
}



// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    groupName: `分组名称${index + 1}`,
    key: Math.floor(Math.random() * 100),
    libraryCount: Math.floor(Math.random() * 100), // 随机词库数量
    wechatCount: Math.floor(Math.random() * 50), // 随机公众号数量
    apiType: `${Math.ceil(Math.random() * 2)}`, // 随机 API 类型
    remark: `这是备注信息这是备注信息这是备注信息${index + 1}`, // 备注信息
  }))
);
</script>

<style lang="scss" scoped></style>