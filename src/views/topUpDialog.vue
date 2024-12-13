<template>
  <div class="mx-top-up">
    <MxTopUp ref="vipMxTopUpRef" :showClose="false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { pullBalance, pullPay } from '@/request/modules/vip.js';
const vipMxTopUpRef = ref(null)

async function getBalance() {
  const getRes = await pullBalance()
  if (!getRes?.status) return
  vipMxTopUpRef.value.openModal(getRes?.data)
}

onMounted(() => {
  getBalance();
});

</script>
