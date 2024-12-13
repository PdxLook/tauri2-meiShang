<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="tags bg-black-200 h-full">
    <div class="table-card bg-white rounded space-y-6 p-6 h-full relative overflow-hidden ">

      <div class="flex-center flex-col wh-fluid">
        <div class="">1</div>
        <p>该板块内容即将开放，敬请期待</p>
      </div>
    </div>
  </main>

</template>

<script setup>
import { ref } from 'vue'
const keyword = ref('')
const renderHeader = ({ column, $index }) => {
  console.log(column.minWidth)
}

const handleSelectionChange = (val) => {
  console.log(val)
}

const selecTable = (row, column, rowIndex) => {
  console.log(row, column, rowIndex)
}

const sortChange = (val) => {
  console.log('sortChange', val)
}

const handleClick = () => {
  console.log('click')
}

const tableData = [
]
</script>

<style lang="scss" scoped></style>