<template>
  <div class="drawer-right-main" v-if="drawer">
    <el-drawer v-model="drawer" title="词库名称" size="80%">
      <div class="key-lists bg-black-200 h-full">
        <div class="table-card bg-white rounded space-y-5 p-5 h-full relative overflow-hidden">
          <div class="table-card-header space-y-5">
            <div class="left-button-group flex gap-2">
              <el-input v-model="keyword" style="width: 200px" placeholder="搜索关键词" clearable />
              <div class=""><el-button type="primary">搜索</el-button></div>
            </div>
            <div class="left-button-group flex gap-2">
              <div class=""><el-button type="success" size="small" @click="openAdd">新增关键词</el-button></div>
            </div>
          </div>
          <div class="table-card-body">
            <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 118px - 148px)" size="default"
              style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
              <el-table-column fixed type="selection" width="42" />
              <el-table-column prop="id" label="ID" sortable="custom" min-width="60" />
              <el-table-column prop="groupName" label="词库名称" min-width="140" />
              <el-table-column prop="name" label="关键词名称" min-width="140" />
              <el-table-column prop="updateDate" label="最近更新时间" min-width="160" />
              <el-table-column fixed="right" label="操作" width="160">
                <template #default="scope">
                  <el-button link @click="openEdit(scope.row)">编辑</el-button>
                  <el-button link @click="deleteConfirm(scope.row)">
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
      </div>
    </el-drawer>

    <!-- 新增弹窗 -->
    <KeyAdd ref="KeyAddRef" />

    <!-- 编辑弹窗 -->
    <KeyEdit ref="KeyEditRef" />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { isEmpty } from '@/utils/MxTool.js'
import KeyAdd from './KeyAdd.vue'
import KeyEdit from './KeyEdit.vue'

const drawer = ref(false)
const KeyAddRef = ref(null)
const KeyEditRef = ref(null)
const keyword = ref('')
const openAdd = (row = null) => {
  KeyAddRef.value.openAdd(row)
}

const openEdit = (row = null) => {
  KeyEditRef.value.openEdit(row)
}

// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    groupName: `分组${index + 1}`,
    name: `词库名称${index + 1}`,
    keyNum: Math.floor(Math.random() * 1000), // 随机关键词数量
    apiStatus: Math.ceil(Math.random() * 2), // 随机模型编号
    updateDate: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() // 随机最近更新时间
  }))
);

const deleteConfirm = (row = null) => {
  if (isEmpty(row?.id)) return ElMessage.error('ID参数错误')

  ElMessageBox.confirm(`[${row?.name}]：确定要删除该数据吗?`, '温馨提示', {
    // autofocus: false,
    draggable: true,
    type: 'warning',
    cancelButtonText: '取消',
    confirmButtonText: '确定',

  }).then(() => {
    // 模拟删除数据
    ElMessage({
      type: 'success',
      message: 'Delete completed',
    })
  })
    .catch(() => { })
}

const openDrawer = (row) => {
  drawer.value = true
  // if (row !== null) {
  //   queryForm.value = { ...row }
  //   console.log(queryForm.value)
  // }
}

const closeDrawer = () => {
  drawer.value = false
}

const modalClose = () => {
  closeDrawer()
}

// 暴露方法
defineExpose({
  openDrawer,
  closeDrawer
})

</script>

<style lang="scss" scoped></style>