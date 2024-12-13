<template>
  <div class="keyword-add " v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" title="新增文章" :close-on-click-modal="false" align-center
      :before-close="modalClose">
      <div class="p-4 h-full">
        <el-form :model="queryForm" label-width="auto" :rules="rules" ref="ruleFormRef" class="space-y-8">

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
const ruleFormRef = ref(null)

const rules = reactive({
  group: [
    {
      required: true,
      message: '请选择公众号',
      trigger: 'blur',
    },
  ],
  key: [
    {
      required: true,
      message: '请添加标题',
      trigger: 'blur',
    },
  ],
})
const queryForm = ref({
  group: '',
  status: '1',
  key: ''
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

const openAdd = () => {
  dialogVisible.value = true
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