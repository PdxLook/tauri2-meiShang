<template>
  <div class="card">
    <div class="card-header">
      <div class="header-left flex-items-center">
        <div class="title font-600">{{ title }}</div>
        <slot name="description"></slot>
      </div>

      <a class="header-more text-3 text-black-700" :href="rightMore?.link" target="_blank" v-if="rightMore?.link">{{
        rightMore?.text }}
        <span class="iconfont icon-xiangzuo1 text-3"></span></a>

      <a class="header-more text-3 text-black-700" @click="rightMore?.fun" v-if="rightMore?.fun">{{ rightMore?.text }}
        <span class="iconfont icon-xiangzuo1 text-3"></span></a>
    </div>
    <div class="card-body mt-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String
  },
  rightMore: {
    type: Object
  }
})
</script>

<style lang="scss" scoped>
.card {
  overflow: hidden;
  width: 100%;
  background-color: #fff;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      // font-weight: bold;
    }

    .header-more {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      cursor: pointer;

      // &:hover {
      //   text-decoration: underline;
      // }
    }
  }

  .card-body {}
}
</style>