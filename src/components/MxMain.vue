<template>
  <div class="table-card bg-white rounded space-y-6 p-6 h-full relative overflow-hidden">
    <div ref="headerRef" class="table-card-header">
      <slot name="header"></slot>
    </div>
    <div ref="bodyRef" class="table-card-body overflow-auto"
      :style="{ height: bodyHeight, paddingBottom: `${footerHeight}px` }">
      <slot name="body"></slot>
    </div>
    <div ref="footerRef" class="table-card-footer absolute bottom-0 left-0 w-full p-6 ">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerRef = ref(null);
const footerRef = ref(null);
const bodyHeight = ref(0);

const calculateBodyHeight = () => {
  const headerHeight = headerRef.value?.offsetHeight || 0;
  const footerHeight = footerRef.value?.offsetHeight || 0;
  const totalHeight = document.querySelector(".table-card").offsetHeight || 0;

  bodyHeight.value = 'calc(100% - ' + (headerHeight + footerHeight + 24) + 'px)';

};

onMounted(() => {
  calculateBodyHeight();
  window.addEventListener("resize", calculateBodyHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateBodyHeight);
});
</script>

<style scoped>
.table-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.table-card-header {
  flex-shrink: 0;
}

.table-card-body {
  flex-grow: 1;
  overflow-y: auto;
}

.table-card-footer {
  flex-shrink: 0;
}
</style>
