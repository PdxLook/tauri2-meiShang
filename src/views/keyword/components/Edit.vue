<template>
  <div class="keyword-Edit " v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="编辑词库" :close-on-click-modal="false" align-center
      :before-close="modalClose">
      <div class="p-4 h-full">
        <el-form :model="queryForm" label-width="auto" :rules="rules" ref="ruleFormRef" class="space-y-8">

          <el-form-item label="词库名称" prop="name">
            <el-input v-model="queryForm.name" size="large" placeholder="请设置词库名称" />
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

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const dialogVisible = ref(false)
const dialogDetailsRef = ref(null)

const rules = reactive({
  name: [
    {
      required: true,
      message: '请设置词库名称',
      trigger: 'blur',
    },
  ],
})
const queryForm = ref({
  name: '',
})


const openEdit = (row) => {
  dialogVisible.value = true
  if (row !== null) {
    queryForm.value = { ...row }
    console.log(queryForm.value)
  }
}

const closeEdit = () => {
  dialogVisible.value = false
}

const modalClose = () => {
  closeEdit()
}

// 暴露方法
defineExpose({
  openEdit,
  closeEdit
})

</script>

<style lang="scss" scoped></style>