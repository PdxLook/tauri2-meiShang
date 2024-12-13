<template>
  <div class="empty">
    <slot v-if="lists"></slot>
    <el-empty :description="tips" v-else />
  </div>
</template>

<script setup>
import { ref, useSlots, watch } from 'vue'

const posts = defineProps({
  tips: {
    type: String,
    default: '暂无相关内容'
  },
  lists: {
    default: [],
    type: Array,
    required: true
  }
})

</script>

<style scoped></style>