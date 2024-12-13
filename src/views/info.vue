<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="card bg-white rounded space-y-6 p-6 h-full relative overflow-hidden">
      <div class="card-body">
        <el-form :model="form" label-width="auto" style="max-width: 600px;margin: 0 auto;">
          <el-form-item label="用户账号">
            <el-input v-model="form.name" disabled />
          </el-form-item>
          <el-form-item label="VIP类型">
            <div class="relative w-full">
              <el-input v-model="form.vip" disabled />
              <span class="absolute right-4 top-2 text-3.5 leading-5 text-blue-800 cursor-pointer">购买会员/升级会员</span>
            </div>

          </el-form-item>
          <el-form-item label="VIP到期时间">
            <el-input v-model="form.time" disabled />
          </el-form-item>
        </el-form>
      </div>

    </div>
  </main>

</template>

<script setup>
import { ref, reactive } from 'vue'


// do not use same name with ref
const form = reactive({
  name: '1503562240',
  vip: '个人版（798元/年）',
  time: '2024/12/02 18:17:09（剩余120天）'
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<style lang="scss" scoped></style>