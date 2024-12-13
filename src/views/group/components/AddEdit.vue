<template>
  <div class="group-add " v-if="dialogVisible">
    <el-dialog v-model="dialogVisible" :title="dialogTitle" :close-on-click-modal="false" align-center
      :before-close="modalClose">
      <div class="p-4 h-full">
        <el-form :model="queryForm" label-width="auto" :rules="rules" ref="ruleFormRef">
          <el-form-item label="分组名称" prop="groupName">
            <el-input v-model="queryForm.groupName" size="large" placeholder="请设置分组名称" />
            <p class="text-3.5 leading-4.5 text-black-600 mt-2">注：分组是对公众号业务类型进行管理，<span
                class="text-blue-800 cursor-pointer"
                @click="openDialogDetails({ jump_id: 4, jump_type: '1' })">查看教程</span>
            </p>
          </el-form-item>
          <el-form-item label="选择AI模型" prop="aiType">
            <div class="w-full">
              <el-radio-group v-model="queryForm.aiType">
                <el-radio value="1" size="large">免费</el-radio>
                <el-radio value="2" size="large">付费</el-radio>
              </el-radio-group>
            </div>
            <div class="bg-black-300 text-3.5 leading-5 p-4 rounded-lg w-full">
              <p class="text-black-700">AI模型收费标准：10商豆可生成1条内容</p>
              <hr class="my-4">
              <div class="flex-items-center">
                <span class="text-black-800">当前可用商豆：10000</span>
                <span class="ml-4 text-blue-800 cursor-pointer" @click="vipMxTopUpOpen">点击充值</span>
                <span class="ml-auto flex-items-center text-black-600"><el-tooltip class="box-item" effect="dark"
                    content="商豆用于内容创造" placement="bottom">
                    <span class="iconfont icon-wen1-2 text-4 text-black-600 mr-1"></span>
                  </el-tooltip>什么是商豆</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="queryForm.remark" size="large" placeholder="请设置分组备注" />
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
    <MxTopUp ref="vipMxTopUpRef" @close="getData" />
    <MxDialogDetails ref="dialogDetailsRef" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { pullBalance } from '@/request/modules/vip.js';
const vipMxTopUpRef = ref(null)
const dialogDetailsRef = ref(null)
const ruleFormRef = ref()
const dialogVisible = ref(false)
const dialogTitle = ref('添加分组')
function openDialogDetails(items) {
  if (items?.jump_type === '1') {
    dialogDetailsRef.value.openModal({ page_id: items?.jump_id })
  } else {
    console.log('未定义的跳转类型')
  }
}

const vipMxTopUpOpen = () => {
  getBalance()
}

async function getBalance() {
  const getRes = await pullBalance()
  if (!getRes?.status) return
  vipMxTopUpRef.value.openModal(getRes?.data)
}


async function getData(query) {
  // const getRes = await pullPage(query)
  // if (!getRes?.status) return
  // data.value = getRes?.data

  dialogVisible.value = true
}
const rules = reactive({
  groupName: [
    {
      required: true,
      message: '请设置分组名称',
      trigger: 'blur',
    },
  ],
  aiType: [
    {
      required: true,
      message: '请选择AI模型',
      trigger: 'blur',
    },
  ],
})


const queryForm = ref({
  groupName: '',
  aiType: '1',
  remark: ''
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

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const openAddEdit = (row) => {

  if (row === null) {
    dialogTitle.value = '添加分组'
    queryForm.value = {
      groupName: '',
      aiType: '1',
      remark: ''
    }
    dialogVisible.value = true
  } else {
    dialogTitle.value = '编辑分组'
    queryForm.value = { ...queryForm.value, ...row }
    getData(row)
  }


}

const closeAddEdit = () => {
  dialogVisible.value = false
}

const modalClose = () => {
  closeAddEdit()
}

// 暴露方法
defineExpose({
  openAddEdit,
  closeAddEdit
})


</script>

<style lang="scss" scoped></style>