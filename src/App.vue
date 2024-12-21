<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

const performUpdate = async () => {
  const update = await check();
  if (update) {
    ElMessageBox.alert(`发现更新: 版本 ${update.version}, 更新日志: ${update.body}`, '更新提示', {
      confirmButtonText: '更新',
      callback: async (action) => {
        up(update)
      },
    })
  }
};

async function up(update) {
  await update.downloadAndInstall();
  ElMessage.success('更新成功, 重启中...');
  await relaunch();
};

// 在组件挂载时自动检查更新
onMounted(() => {
  performUpdate();
});
</script>
