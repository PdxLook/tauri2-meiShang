<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="table-card bg-white rounded space-y-5 p-5 h-full relative overflow-hidden">
      <div class="table-card-header space-y-5">
        <div class="left-button-group flex gap-2">
          <el-input v-model="keyword" style="width: 200px" placeholder="搜索手机号/公众号/词库" clearable />
          <div class=""><el-button type="primary">搜索</el-button></div>
        </div>
        <div class="left-button-group flex gap-2">
          <div class=""><el-button type="success" size="small" @click="openAdd">新增公众号</el-button></div>
        </div>
      </div>
      <div class="table-card-body">
        <el-table :data="tableData" table-layout="fixed" border height="calc(100vh - 118px - 148px)" size="default"
          style="width: calc(100vw - 15vw - 80px);" ref="tableRef">
          <!-- <el-table-column fixed type="selection" width="42" /> -->
          <el-table-column prop="id" label="ID" sortable="custom" min-width="80" />
          <el-table-column prop="wechatName" label="公众号名称" sortable="custom" min-width="140" />
          <el-table-column prop="group" label="公众号分组" min-width="140" />
          <el-table-column prop="contentStock" label="内容存量" min-width="100" />
          <el-table-column prop="articleCount" label="文章数" min-width="100" />
          <el-table-column prop="followerCount" label="粉丝数" min-width="100" />
          <el-table-column prop="searchVolume" label="搜索量" min-width="100" />
          <el-table-column prop="totalViews" label="总浏览量" min-width="120" />
          <el-table-column prop="loginStatus" label="登录状态" min-width="110" sortable="custom">
            <template #default="scope">
              <el-tag :type="scope.row.loginStatus === 1 ? 'danger' : 'success'" effect="light" round>
                {{ scope.row.loginStatus === 1 ? '异常' : '正常' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="apiStatus" label="API类型" min-width="100">
            <template #default="scope">
              <el-tag :type="scope.row.apiStatus === 1 ? 'info' : 'success'" effect="light" round>
                {{ scope.row.apiStatus === 1 ? '免费' : '付费' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="massSendTime" label="群发时间" min-width="160" />
          <el-table-column property="remark" label="备注" width="200" show-overflow-tooltip />
          <el-table-column fixed="right" label="操作" width="160">
            <template #default="scope">
              <el-button link @click="openAddEdit(scope.row)">编辑</el-button>
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
  </main>

</template>

<script setup>
import { ref } from 'vue'
import { isEmpty } from '@/utils/MxTool.js'
const keyword = ref('')
const renderHeader = ({ column, $index }) => {
  console.log(column.minWidth)
}

const handleSelectionChange = (val) => {
  console.log(val)
}

const selecTable = (row, column, rowIndex) => {
  console.log(row, column, rowIndex)
}

const sortChange = (val) => {
  console.log('sortChange', val)
}

const deleteConfirm = (row = null) => {
  if (isEmpty(row?.id)) return ElMessage.error('ID参数错误')

  ElMessageBox.confirm(`[${row?.wechatName}]：确定要删除该数据吗?`, '温馨提示', {
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
// 模拟数据
const tableData = ref(
  Array.from({ length: 20 }, (_, index) => ({
    wechatName: `公众号${index + 1}`,
    id: index + 1,
    group: `分组${Math.ceil(Math.random() * 5)}`,
    contentStock: Math.floor(Math.random() * 10000), // 随机内容存量
    articleCount: Math.floor(Math.random() * 500), // 随机文章数
    followerCount: Math.floor(Math.random() * 100000), // 随机粉丝数
    searchVolume: Math.floor(Math.random() * 10000), // 随机搜索量
    totalViews: Math.floor(Math.random() * 1000000), // 随机总浏览量
    loginStatus: Math.ceil(Math.random() * 2), // 登录状态
    apiStatus: Math.ceil(Math.random() * 2), // API 状态
    massSendTime: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString(), // 随机群发时间
    remark: `备注信息${index + 1}`, // 随机备注信息
  }))
);
</script>

<style lang="scss" scoped></style>