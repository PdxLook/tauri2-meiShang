<template>
  <div class="keyword-Edit " v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="编辑文章" :close-on-click-modal="false" align-center
      :before-close="modalClose">
      <div class="p-4 h-full">
        <el-form :model="queryForm" label-width="auto" :rules="rules" ref="ruleFormRef" class="space-y-8">

          <el-form-item label="文章标题" prop="title">
            <el-input v-model="queryForm.title" size="large" placeholder="请设置文章标题" />
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="queryForm.author" size="large" placeholder="请设置文章标题" />
          </el-form-item>
          <el-form-item label="内容详情" prop="content">
            <el-input v-model="queryForm.content" size="large" type="textarea" placeholder="文章内容"
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

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
const dialogVisible = ref(false)
const ruleFormRef = ref()
const rules = reactive({
  title: [
    {
      required: true,
      message: '请设置文章标题',
      trigger: 'blur',
    },
  ],
})
const queryForm = ref({
  title: '',
})

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

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