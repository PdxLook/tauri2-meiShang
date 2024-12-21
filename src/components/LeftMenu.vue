<template>
  <div class="left-menu bg-#262626 flex flex-col" v-if="currentRoute">
    <div class="logo p-6 flex-center border-b border-white/10" style="-webkit-app-region: drag;">
      <img class="w-30 object-cover" src="@/assets/images/logo.png" alt="logo" />
    </div>

    <ul class="menu text-3.5 leading-5 text-black-600">
      <li class="menu-item"
        :class="{ active: currentRoute === item.url || (currentRoute.startsWith(item.url) && item.url !== '/') }"
        v-for="item, index in menuLists" :key="index">
        <router-link :to="item.url" class="menu-item-a">
          <i class="iconfont" :class="item.icon"></i>
          <span class="ml-2">{{ item.title }}</span>
          <i class="iconfont icon-xiangzuo1 ml-auto text-black-600 text-3.5"></i>
        </router-link>
      </li>
    </ul>

    <div class="mt-auto copyright text-center text-3 text-black-600 p-6">当前版本系统：v{{ tauriVersion }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getVersion } from '@tauri-apps/api/app';

import { getCurrentWindow } from "@tauri-apps/api/window";
getCurrentWindow().listen("my-window-event", ({ event, payload }) => { });

const route = useRoute()
const currentRoute = ref(null)

const menuLists = [
  { name: 'dashboard', title: '控制台', url: '/dashboard', icon: 'icon-shouye1-1' },
  { name: 'group', title: '分组管理', url: '/group/', icon: 'icon-caidan1-1' },
  { name: 'weChat', title: '公众号管理', url: '/weChat', icon: 'icon-shujutongji1-1' },
  { name: 'keyword', title: '词库管理', url: '/keyword', icon: 'icon-yuedu1-1' },
  { name: 'title', title: '标题管理', url: '/title', icon: 'icon-wenzhang-zixun2-1' },
  { name: 'article', title: '文章管理', url: '/article', icon: 'icon-quanbu1-1' },
  { name: 'advertising', title: '广告模版', url: '/advertising', icon: 'icon-kongjian1-1' },
  { name: 'virtual', title: '我的商豆', url: '/virtual', icon: 'icon-jinqian3-1' },
  { name: 'realization', title: '变现中心', url: '/realization', icon: 'icon-kongjian3-1' },
  { name: 'info', title: '账户资料', url: '/info', icon: 'icon-shezhi1-1' },
  { name: 'system', title: '系统设置', url: '/system', icon: 'icon-shezhi2-1' },
];


const tauriVersion = ref('')
async function fetchVersion() {
  const version = await getVersion();
  tauriVersion.value = version;
}
fetchVersion();

watch(route, (newRoute) => {
  currentRoute.value = newRoute.path || '/'; // 确保有默认值
});

onMounted(() => {
  currentRoute.value = route.path || '/'; // 初始化时设置默认值
});
</script>

<style lang="scss" scoped>
.left-menu {
  width: 14vw;
  height: 100vh;
  flex: none;
}

.menu {
  .menu-item {
    &>a {
      padding: 0 24px;
      height: 48px;
      line-height: 48px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        color: #333333 !important;
      }
    }

    &:hover,
    &.active {
      background: #FFFFFF;
      color: #333333 !important;

      .iconfont {
        &:first-child {
          color: #e70013;
        }
      }
    }
  }
}
</style>