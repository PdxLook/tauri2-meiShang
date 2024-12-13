<template>
  <div class="tool h-12 flex-items-center text-#333 bg-white pl-5" id="Tool" :style="{
    width: routerName === 'login' ? '100vw' : 'calc(100vw - 14vw)',
    left: routerName === 'login' ? '0' : '14vw'
  }">
    <div class="flex-items-center region">
      <template v-if="routerName == 'dashboard'">
        <div class="text-4 text-black-800 leading-6">150*****652</div>
        <div class="bg-primary-700 text-3 leading-5 text-white px-1 flex-center rounded ml-3">个人版</div>
      </template>
      <template v-else>
        <el-breadcrumb separator="/" class="text-4 text-black-800 leading-6">
          <el-breadcrumb-item :to="{ path: items?.path }" v-for="items, index in breadcrumbs" :key="index">{{
            items?.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </template>
    </div>
    <div class="flex-items-center ml-auto region">
      <div class="text-3 leading-5">
        <p>到期时间：2025-06-06</p>
      </div>
      <div class="cursor-pointer w-12 h-12 flex-center ">
        <i class="iconfont icon-xiaoxi1-1"></i>
      </div>
      <div class="cursor-pointer w-12 h-12 flex-center hover:bg-black-200" @click="toolClick('minimize')"><i
          class="iconfont icon-zuixiaohua" aria-hidden="true"></i></div>
      <div class="cursor-pointer w-12 h-12 flex-center hover:bg-black-200" @click="toolClick('maximize')">
        <i class="iconfont icon-suoxiaohua" aria-hidden="true" v-if="isFullscreen"></i>
        <i class="iconfont icon-zuidahua" aria-hidden="true" v-else></i>

      </div>
      <div class="cursor-pointer w-12 h-12 flex-center hover:bg-primary-800 group" @click="toolClick('close')"><i
          class="iconfont icon-cuowu-xian group-hover:text-white" aria-hidden="true"></i></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useUserStore } from '@/stores/user';
import { useRoute } from "vue-router";
const userStore = useUserStore();
const route = useRoute();

const routerName = ref(route.name);
const breadcrumbs = ref([]);

// 定义路由对应的面包屑数据
const breadcrumbList = {
  'dashboard': [{ name: "控制台", path: "/dashboard" }],
  'group': [{ name: "分组管理", path: "/group" }],
  'weChat': [{ name: "公众号管理", path: "/weChat" }],
  'vip': [{ name: "会员", path: "/vip" }],
  'keyword': [{ name: "词库管理", path: "/keyword" }],
  'keyword-keyLists': [
    { name: "词库管理", path: "/keyword" },
    { name: "关键词管理", path: "/keyword/keyLists" },
  ],
  'article': [{ name: "文章管理", path: "/article" }],
  'title': [{ name: "标题管理", path: "/title" }],
  'virtual': [{ name: "我的商豆", path: "/virtual" }],
  'realization': [{ name: "变现中心", path: "/realization" }],
  'advertising': [{ name: "广告模版", path: "/advertising" }],
  'info': [{ name: "账户资料", path: "/info" }],
  'system': [{ name: "系统设置", path: "/system" }],
};

// 根据路由名更新面包屑
const updateBreadcrumbs = (routeName) => {
  breadcrumbs.value = breadcrumbList[routeName] || [];
};

// 监听路由变化
watch(route, (newRoute) => {
  routerName.value = newRoute.name;
  updateBreadcrumbs(newRoute.name);
  console.log(newRoute.name);
});


const appWindow = getCurrentWindow();
const isFullscreen = ref(false);

// 检查窗口是否全屏
const checkFullscreen = async () => {
  isFullscreen.value = await appWindow.isMaximized();
};

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

onMounted(() => {
  checkFullscreen();
  routerName.value = route.name;
  updateBreadcrumbs(route.name);

});
</script>


<style lang="scss" scoped>
.tool {
  position: fixed;

  top: 0;


  .region {
    -webkit-app-region: no-drag;
  }
}

#Tool {
  -webkit-app-region: drag;
  // cursor: move; /* 添加拖动鼠标指针 */
}

.btn-window {
  @apply cursor-pointer w-12 h-8 flex-center hover:bg-black-100;
}
</style>