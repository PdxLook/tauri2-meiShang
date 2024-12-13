<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="table-card bg-white rounded space-y-5 p-5 h-full relative overflow-hidden">
      <div class="table-card-header space-y-5">
        <div class="left-button-group flex gap-2">
          <el-select v-model="value" placeholder="状态筛选" style="width: 140px">
            <el-option v-for="item in ['全部', '待审核', '已审核', '已退回']" :key="item" :label="item" :value="item" />
          </el-select>
          <el-select v-model="value" placeholder="请选择公众号" style="width: 140px">
            <el-option v-for="item in ['全部', '公众号1', '公众号2', '公众号3']" :key="item" :label="item" :value="item" />
          </el-select>

          <el-input v-model="keyword" style="width: 200px" placeholder="标题/关键词" clearable />
          <div class=""><el-button type="primary">搜索</el-button></div>

          <div class=""><el-button>更新数据</el-button></div>
        </div>
        <div class="left-button-group flex gap-2">
          <div class=""><el-button type="success" size="small" @click="openAdd">新增广告模版</el-button></div>
        </div>
      </div>

      <div class="table-card-body">
        <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 118px - 148px)" size="default"
          style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
          <el-table-column fixed type="selection" width="42" />
          <el-table-column prop="id" label="ID" sortable="custom" min-width="80" />
          <el-table-column prop="date" label="分组" sortable="custom" />
          <el-table-column prop="name" label="词库" min-width="160" />
          <el-table-column prop="name" label="关键词" min-width="160" />
          <el-table-column prop="name" label="公众号" min-width="160" />
          <el-table-column prop="title" label="标题" width="260" show-overflow-tooltip />
          <el-table-column prop="state" label="类型" min-width="120" />
          <el-table-column prop="state" label="状态" min-width="100" />

          <el-table-column property="address" label="时间" width="160" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button link @click="openEdit(scope.row)">编辑</el-button>
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
  </main>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { isEmpty } from '@/utils/MxTool.js'
import Add from './components/Add.vue'
import Edit from './components/Edit.vue'
import { useOperation } from "@/utils/MxOperation.js";
import { pullIndex } from '@/request/modules/index.js';
const tableRef = ref(null)
const AddRef = ref(null)
const EditRef = ref(null)

const openAdd = () => {
  AddRef.value.openAdd()
}

const openEdit = (row = null) => {
  EditRef.value.openEdit(row)
}

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


// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    group: Math.ceil(Math.random() * 2),
    name: `词库名称${index + 1}`,
    title: `标题名称${index + 1}`,
    keyNum: Math.floor(Math.random() * 1000), // 随机关键词数量
    apiStatus: Math.ceil(Math.random() * 2), // 随机模型编号
    updateDate: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() // 随机最近更新时间
  }))
);

watch(() => searchQuery, (newSearchQuery) => {
  dataQuery.value = { ...dataQuery.value, ...newSearchQuery };
  getTableData(dataQuery.value);
});

onMounted(() => {
  getTableData(dataQuery.value);
});

</script>

<style lang="scss" scoped></style>