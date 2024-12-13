<template>
  <div class="bg-#181818 wh-fluid flex overflow-hidden">
    <LeftMenu />
    <div class="bg-black-200 flex-1 relative h-[100vh] pt-12">
      <Tool />
      <div class="content-box bg-black-200 p-4 pr-0 drawer-content">
        <div class="h-[calc(100vh-80px)] overflow-y-scroll pr-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'
import Tool from '@/components/Tool.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const appWindow = getCurrentWindow();
// import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'
// const appWindow = getCurrentWindow()

// 设置窗口的最小宽度和高度
// appWindow.setMinSize(new LogicalSize(1400, 800))
// appWindow.setSize(new LogicalSize(1400, 800))

const isLogin = () => {
  if (userStore.isLoggedIn) {
    // 创建新窗口
    const newWindow = new WebviewWindow("login", {
      title: "登录",
      url: "/login",
      width: 960,
      height: 600,
      resizable: true,
      center: true,
      decorations: false,
    });

    // 监听窗口创建事件
    newWindow.once("tauri://created", async () => {
      console.log("新窗口已成功创建");
      await appWindow.close()
    });

    // 监听窗口创建失败事件
    newWindow.once("tauri://error", (error) => {
      console.error("新窗口创建失败：", error);
    });
  }
}

onMounted(() => {
  isLogin()
});

</script>

<style lang="scss" scoped>
/* 滚动条的整体样式 */
::-webkit-scrollbar {
  display: none;
}
</style>