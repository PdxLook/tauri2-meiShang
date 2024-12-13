<template>
  <div class="keyword-add " v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="添加词库" :close-on-click-modal="false" align-center
      :before-close="modalClose">
      <div class="p-4 h-full">
        <el-form :model="queryForm" label-width="auto" :rules="rules" ref="ruleFormRef" class="space-y-8">
          <el-form-item label="分组管理" prop="group">
            <el-select v-model="queryForm.group" size="large" placeholder="请选择分组" filterable
              :disabled="queryForm.group">
              <el-option label="请选择分组" value="" />
              <el-option label="分组1" value="1" />
              <el-option label="分组2" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="词库名称" prop="name">
            <el-input v-model="queryForm.name" size="large" placeholder="请设置词库名称" :disabled="queryForm.name" />
          </el-form-item>
          <el-form-item label="关键词列表" prop="key">
            <el-input v-model="queryForm.key" type="textarea" placeholder="请输入关键词，一行一个关键词"
              :autosize="{ minRows: 20, maxRows: 50 }" />
          </el-form-item>

        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>

    <MxTopUp ref="vipMxTopUpRef" @close="getBalance" />
    <MxDialogDetails ref="dialogDetailsRef" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const dialogVisible = ref(false)
const dialogDetailsRef = ref(null)

function getBalance() {
  console.log('更新商豆数')
}

const rules = reactive({
  group: [
    {
      required: true,
      message: '请设置分组名称',
      trigger: 'blur',
    },
  ],
  name: [
    {
      required: true,
      message: '请设置词库名称',
      trigger: 'blur',
    },
  ],
  key: [
    {
      required: true,
      message: '请设置关键词',
      trigger: 'blur',
    },
  ],
})
const queryForm = ref({
  group: '',
  name: '',
  key: ''
})


const openAdd = (row) => {
  dialogVisible.value = true
  if (row !== null) {
    queryForm.value = { ...row }
    console.log(queryForm.value)
  }
}

const closeAdd = () => {
  dialogVisible.value = false
}

const modalClose = () => {
  closeAdd()
}

// 暴露方法
defineExpose({
  openAdd,
  closeAdd
})

</script>

<style lang="scss" scoped></style>