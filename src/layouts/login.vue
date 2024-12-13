<template>
  <router-view />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'

const appWindow = getCurrentWindow()

// 设置窗口的最小宽度和高度
appWindow.setMinSize(new LogicalSize(600, 500))
appWindow.setSize(new LogicalSize(800, 600))
</script>