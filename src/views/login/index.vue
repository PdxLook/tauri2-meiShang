<route lang="yaml">
  meta:
    layout: login
</route>

<template>
  <div class="bg-black-200 w-[100vw] h-[100vh] login flex flex-col relative p-16 box-border">
    <div class="tool w-full h-12 flex-items-center text-#333 absolute left-0 top-0  pl-5" id="Tool">

      <div class="flex-items-center ml-auto region">

        <div class="cursor-pointer w-12 h-12 flex-center hover:bg-black-200" @click="toolClick('minimize')"><i
            class="iconfont icon-zuixiaohua" aria-hidden="true"></i></div>
        <div class="cursor-pointer w-12 h-12 flex-center hover:bg-primary-800 group" @click="toolClick('close')"><i
            class="iconfont icon-cuowu-xian group-hover:text-white" aria-hidden="true"></i></div>
      </div>
    </div>
    <div class="flex px-4 py-8 flex-1">
      <div class="flex-1">
        <p class="text-8 leading-12 font-600">公众号矩阵管理运营系统</p>
        <p class="text-4.5 leading-7 mt-6">AICG内容创作 · 多账号统一管理 · 海量文章模板</p>
        <div class="text-3.5 leading-6 cursor-pointer mt-8">了解更多<i class="iconfont icon-sanjiao-you"></i></div>
      </div>
      <div class="bg-white p-6 rounded w-[340px] login-box">
        <p class="text-7 leading-10.5">欢迎登录</p>
        <p class="text-4 leading-6 text-black-800 mt-2">获取精准流量，让转化率更高</p>
        <div class="mt-7">
          <el-form ref="ruleFormRef" :rules="rules" style="max-width: 600px" :model="ruleForm" label-width="auto"
            class="demo-ruleForm space-y-5">
            <el-form-item prop="name">
              <el-input v-model="ruleForm.name" type="text" size="large" placeholder="请输入手机号" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="pass">
              <div class="w-full relative">
                <el-input v-model="ruleForm.pass" type="password" size="large" placeholder="请输入密码" autocomplete="off" />
                <a href="" class="text-3.5 leading-5 text-black-800 absolute right-4 top-center">忘记密码</a>
              </div>

            </el-form-item>



            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleFormRef)" size="large" style="width: 100%;">
                立即登录
              </el-button>

            </el-form-item>
            <div class="flex-center text-3.5 leading-5 text-black-800 mt-5.5">注册新账号</div>
            <el-form-item prop="agreement" style="margin-bottom: 0;">
              <div class="flex-items-center space-x-2 text-3.5  text-blue-800 mt-10">
                <el-checkbox v-model="ruleForm.agreement" label="阅读并接受 " size="large" />
                <a href="">服务条款</a>
                <a href="">隐私政策</a>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import { pullToKen } from '@/request/modules/user.js';
import { isEmpty } from '@/utils/MxTool.js'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

const appWindow = getCurrentWindow();
const isFullscreen = ref(false);

const ruleFormRef = ref()
const ruleForm = reactive({
  pass: '',
  name: '',
  agreement: ''
})
const rules = reactive({

  pass: [
    {
      type: 'date',
      required: true,
      message: '请填写密码',
      trigger: 'change',
    },
  ],
  name: [
    {
      required: true,
      message: '请填写用户名',
      trigger: 'change',
    },
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


// 监听关闭事件
function isClose() {
  ElMessageBox.confirm(
    '您确定要退出每商吗？',
    '温馨提示',
    {
      confirmButtonText: '关闭',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      userStore.clearToken()
      await appWindow.close();
    })
    .catch(() => {

    })
}

// 处理窗口操作
const toolClick = async (type) => {

  switch (type) {
    case "close":
      isClose();
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

  // 存储token


  // 创建新窗口
  const newWindow = new WebviewWindow("main", {
    title: "每商公众号矩阵软件",
    url: "/dashboard",
    width: 1400,
    height: 800,
    minWidth: 1400,
    minHeight: 800,
    resizable: true,
    center: true,
    decorations: false,
  });

  // 监听窗口创建事件
  newWindow.once("tauri://created", async () => {
    console.log("新窗口已成功创建");
    userStore.setToken(getRes?.data)
    await appWindow.close()
  });

  // 监听窗口创建失败事件
  newWindow.once("tauri://error", (error) => {
    console.error("新窗口创建失败：", error);
  });


}



const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      getToken(verification)


    } else {
      console.log('error submit!')
    }
  })
}

</script>

<style lang="scss" scoped>
.login {
  -webkit-app-region: drag;

  .login-box {
    -webkit-app-region: no-drag;
  }

  background-image: url('@/assets/images/login@2x.webp');
  background-repeat: no-repeat;
  background-size: cover;

  @media screen and (max-width: 1400px) {
    background-image: url('@/assets/images/login.webp');
  }
}
</style>