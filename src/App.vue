<template>
  <RouterView />
</template>

<script setup>
import { check } from '@tauri-apps/plugin-updater';
import { relaunch } from '@tauri-apps/plugin-process';

try {
  const update = await check();

  if (update) {
    console.log(
      `发现更新 ${update.version} from ${update.date} with notes ${update.body}`
    );
    let downloaded = 0;
    let contentLength = 0;
    // alternatively we could also call update.download() and update.install() separately
    await update.downloadAndInstall((event) => {
      switch (event.event) {
        case 'Started':
          contentLength = event.data.contentLength;
          console.log(`开始下载 ${event.data.contentLength} 字节`);
          break;
        case 'Progress':
          downloaded += event.data.chunkLength;
          console.log(`下载 ${downloaded} 长度 ${contentLength}`);
          break;
        case 'Finished':
          console.log('下载完成了');
          break;
      }
    });

    console.log('更新安装');
    await relaunch();
  }
} catch (error) {
  console.error('Error during update:', error);
}
</script>