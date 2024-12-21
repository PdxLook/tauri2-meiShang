<route lang="yaml">
  meta:
    layout: login
</route>

<template>
  <div class="bg-black-200 w-[100vw] h-[100vh] login flex flex-col relative p-16 box-border">
    <div class="tool w-full h-12 flex-items-center text-#333 absolute left-0 top-0  pl-5" id="Tool">
      <div class="flex-items-center ml-auto region no-drag">
        <div class="cursor-pointer w-12 h-12 flex-center hover:bg-black-200" @click="toolClick('minimize')"><i
            class="iconfont icon-zuixiaohua" aria-hidden="true"></i></div>
        <div class="cursor-pointer w-12 h-12 flex-center hover:bg-primary-800 group" @click="toolClick('close')"><i
            class="iconfont icon-cuowu-xian group-hover:text-white" aria-hidden="true"></i></div>
      </div>
    </div>
    <div class="flex flex-1 ">
      <div class="flex-1">
        <div class="logo flex mb-12">
          <img class="w-30 object-cover" src="@/assets/images/logo.png" alt="logo" />
        </div>
        <p class="text-8 leading-12 font-600">公众号矩阵管理运营系统</p>
        <p class="text-4.5 leading-7 mt-6">AICG内容创作 · 多账号统一管理 · 海量文章模板</p>
        <a class="text-3.5 leading-6 cursor-pointer mt-8 inline-block no-drag" href="https://www.18899.cn/"
          target="_blank">
          了解更多<i class="iconfont icon-sanjiao-you"></i></a>
      </div>
      <!-- 登录 -->
      <div class="bg-white p-6 rounded w-[340px] h-[472px] login-box" v-if="loginType === 'login'">
        <p class="text-7 leading-10.5 font-600 text-black-800">欢迎登录</p>
        <p class="text-3.5 leading-6 text-black-800 mt-2">获取精准流量，让转化率更高</p>
        <div class="mt-7">
          <el-form ref="ruleFormRef" :rules="rules" style="max-width: 600px" :model="ruleForm"
            class="demo-ruleForm space-y-5">
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone" type="text" size="large" maxlength="11" placeholder="请输入手机号"
                autocomplete="off" />
            </el-form-item>
            <el-form-item prop="pass">
              <div class="w-full relative">
                <el-input v-model="ruleForm.pass" type="password" size="large" placeholder="请输入密码" autocomplete="off" />
                <div class="text-3.5 leading-5 text-black-800 absolute right-4 top-center cursor-pointer"
                  @click="typeClick('reset')">忘记密码</div>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)" size="large" style="width: 100%;">
                立即登录
              </el-button>
            </el-form-item>
            <div class="flex-center text-3.5 leading-5 text-black-600 mt-5.5"><span @click="typeClick('register')"
                class="text-black-800 cursor-pointer">注册新账号</span></div>
            <el-form-item prop="agreement" style="margin-bottom: 0;">
              <div class="flex-items-center space-x-2 text-3.5  text-black-600 mt-17">
                <el-checkbox v-model="ruleForm.agreement" label="阅读并接受 " size="large" />
                <a href="javascript:;" class="text-black-800" @click="openDialogDetails({ code: 'vip' })">《服务条款》</a>
                和
                <a href="javascript:;" class="text-black-800" @click="openDialogDetails({ code: 'vip' })">《隐私政策》</a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 注册新账号 + 重置密码 -->
      <div class="bg-white p-6 rounded w-[340px] h-[472px] login-box" v-else>
        <p class="text-7 leading-10.5 font-600 text-black-800">{{ loginType === 'register' ? '注册新账号' : '重置密码' }}</p>
        <p class="text-3.5 leading-6 text-black-800 mt-2">获取精准流量，让转化率更高</p>
        <div class="mt-7">
          <el-form ref="ruleFormRef" :rules="rules" style="max-width: 600px" :model="ruleForm"
            class="demo-ruleForm space-y-5">
            <el-form-item prop="phone">
              <el-input v-model="ruleForm.phone" type="text" size="large" maxlength="11" placeholder="请输入手机号"
                autocomplete="off" />
            </el-form-item>
            <el-form-item prop="code">
              <div class="w-full relative">
                <el-input v-model="ruleForm.code" type="text" size="large" placeholder="请输入短信验证码" autocomplete="off" />
                <div class="text-3.5 leading-5 text-black-800 absolute right-4 top-center cursor-pointer"
                  @click="getVerificationCode">{{ msgText }}</div>
              </div>
            </el-form-item>
            <el-form-item prop="pass">
              <div class="w-full relative">
                <el-input v-model="ruleForm.pass" type="password" size="large" placeholder="请输入密码" autocomplete="off" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)" size="large" style="width: 100%;">
                {{ loginType === 'register' ? '立即注册' : '重置密码' }}
              </el-button>
            </el-form-item>
            <div class="flex-center text-3.5 leading-5 text-black-600 mt-5.5">已有账号，<span @click="typeClick('login')"
                class="text-black-800 cursor-pointer">去登录</span> </div>
            <el-form-item prop="agreement" style="margin-bottom: 0;">
              <div class="flex-items-center space-x-2 text-3.5  text-black-600 mt-2">
                <el-checkbox v-model="ruleForm.agreement" label="阅读并接受 " size="large" />
                <a href="javascript:;" class="text-black-800" @click="openDialogDetails({ code: 'vip' })">《服务条款》</a>
                和
                <a href="javascript:;" class="text-black-800" @click="openDialogDetails({ code: 'vip' })">《隐私政策》</a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  <!-- 弹窗详情 -->
  <MxDialogDetails ref="dialogDetailsRef" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { pullToKen } from '@/request/modules/user.js';
import { isEmpty } from '@/utils/MxTool.js'
import { useUserStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
const loginType = ref('login')
const dialogDetailsRef = ref(null)
const userStore = useUserStore();
const appWindow = getCurrentWindow();
const isFullscreen = ref(false);

const ruleFormRef = ref()
const ruleForm = reactive({
  pass: '',
  phone: '',
  code: '',
  agreement: ''
})


function typeClick(type) {
  loginType.value = type
}

function openDialogDetails(obj) {
  dialogDetailsRef.value.openModal(obj)
}

// 表单验证
const rules = reactive({
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'change',
    },
    { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号格式',
      trigger: 'blur',
    }
  ], pass: [
    {
      required: true,
      message: '请填写密码',
      trigger: 'change',
    },
    { min: 6, message: '密码最短为6位数', trigger: 'blur' },
  ], code: [
    {
      required: true,
      message: '请填写验证码',
      trigger: 'change',
    },
    { min: 6, message: '验证码最短为6位数', trigger: 'blur' },
  ], agreement: [
    {
      required: true,
      message: '请勾选并阅读协议',
      trigger: 'change',
    },
  ],
})

const verification = {
  uid: 1,
  key: 150,
  time: 1732953867,
  code: '21e23cb7feec344a38f40f53bdeef068',
}

// 处理窗口操作
const toolClick = async (type) => {
  switch (type) {
    case "close":
      userStore.clearToken()
      await appWindow.close();
      break;
    case "maximize":
      await appWindow.toggleMaximize();
      isFullscreen.value = await appWindow.isMaximized();
      break;
    case "minimize":
      await appWindow.minimize();
      break;
  }
};


const getToken = async (query) => {
  const getRes = await pullToKen(query);

  if (!getRes?.status) return;

  // 创建新窗口
  const newWindow = new WebviewWindow("main", {
    title: "每商公众号矩阵软件",
    url: "/dashboard",
    width: 1600,
    height: 914,
    minWidth: 1600,
    minHeight: 914,
    resizable: true,
    center: true,
    decorations: false,
    // fullscreen: true,
  });

  // 监听窗口创建事件
  newWindow.once("tauri://created", async () => {
    await newWindow.maximize();
    // 存储token
    userStore.setToken(getRes?.data)
    await appWindow.close()
  });

  // 监听窗口创建失败事件
  newWindow.once("tauri://error", (error) => {
    console.error("新窗口创建失败：", error);
  });


}

// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (!valid) return

    console.log(loginType.value)
    getToken(verification)
  })
}


// 获取验证码逻辑
let timer = null;
let msgText = '获取验证码';
const getVerificationCode = async () => {
  const isPhone = await ruleFormRef.value.validateField('phone');
  if (!isPhone) return

  // 发送请求获取验证码
  try {
    const response = await fetch('/api/getVerificationCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: ruleForm.phone }),
    });

    const data = await response.json();

    if (data.success) {
      let seconds = 60;
      timer = setInterval(() => {
        if (seconds > 0) {
          msgText.value = `${seconds}s后重新获取`;
          seconds--;
        } else {
          clearInterval(timer);
          msgText.value = '获取验证码';
        }
      }, 1000);
    } else {
      ElMessage.error('获取验证码失败');
    }
  } catch (error) {
    ElMessage.error('获取验证码失败');
  }
};
</script>

<style lang="scss" scoped>
@use './style' as *;
</style>