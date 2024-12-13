<template>
  <div class="vip-dialog">
    <MxVipModal ref="vipModalRef" :showClose="false" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { pullVip, pullPay } from '@/request/modules/vip.js';
import { isEmpty, Xthrottle } from '@/utils/MxTool.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'

const route = useRoute()
const vipModalRef = ref(null)



async function getData() {
  if (isEmpty(route.query?.id)) return ElMessage.error('参数错误');
  const query = {
    ...route.query,
    act: 'detail',
  }
  const getRes = await pullVip(query)

  if (!getRes?.status) return
  if (vipModalRef.value) {
    vipModalRef.value?.openModal(getRes?.data)
  }
}



onMounted(() => {
  getData();
});

</script>

<style lang="scss" scoped>
.vip-dialog {}

:deep(.el-checkbox) {
  --el-checkbox-checked-text-color: #EB0013;
  --el-checkbox-checked-bg-color: #EB0013;
  --el-checkbox-checked-input-border-color: #EB0013;
  --el-border-radius-small: 999px;

}

:deep(.el-dialog) {
  --el-dialog-padding-primary: 0;
  --el-color-primary: #EB0013;
  border-radius: 4px;
  overflow: hidden;

  .vip-bg {
    background-image: url('@/assets/images/vip-model-bg@2x.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}


.rights-lists {
  &-items {
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 4px;
      height: 4px;
      background: #faacb3;
      border-radius: 50%;
      margin-right: 8px;
      flex: none
    }
  }
}

.form-items {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;


  &-label {
    width: 84px;
    color: #737373;
  }

  &-input {}
}
</style>