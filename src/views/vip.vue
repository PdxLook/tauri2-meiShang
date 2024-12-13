<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="open-vip bg-white py-20 space-y-20">
    <div class="lg:px-4">
      <div class="text-center">
        <div class="text-8 leading-12 font-600">选择所需VIP版本，开始运营公众号</div>
        <div class="text-4 text-black-800 mt-8">
          <ul class="flex-center space-x-8">
            <li><span class="mr-1 iconfont icon-dui1-2"></span>AICG内容创作</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>多账号统一管理</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>海量文章模板</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>专属顾问服务支持</li>
          </ul>
        </div>
      </div>
      <!-- 会员版本 -->
      <div class="grid lg:grid-cols-3 gap-13 lg:gap-6 mt-20 vip-version">
        <div class="flex-1 bg-white rounded shadow-lg vip-version-item relative"
          v-for="items, index in resData?.vip_list" :key="items?.id">
          <div class="icon-vip-res absolute text-3.5 text-white flex-center pt-[2px] -top-10 -left-2" v-if="index == 1">
            新手推荐
          </div>
          <!-- 价格 -->
          <div class="vip-version-item-gradient text-center p-10 rounded-t">
            <div class="font-600 vip-version-item-color-900 text-6 leading-9">{{ items?.name }}</div>
            <p class="text-3.5 leading-5 vip-version-item-color-900 mt-5">{{ items?.subtitle }}</p>
            <div class="vip-version-item-color-900 mt-5">
              <span>￥</span>
              <span class="text-12 leading-18 font-600 mx-2">{{ items?.market_price }}</span>
              <span>元/{{ items?.time_unit }}</span>
            </div>
            <del class="text-3 text-black-700 leading-4.5 block">原价：{{ items?.guide_price
              }}元/{{ items?.time_unit }}</del>
            <div class="mt-9.5 relative">
              <img class="absolute dw-center" src="@/assets/images/Vector.svg"></img>
              <p class="vip-version-item-color-800">运营管理·{{ items?.wechat_count }}个公众号</p>
            </div>
            <div class="mt-9.5">
              <div
                class="text-4 leading-6 vip-version-item-bg-btn rounded leading-6 py-3 vip-version-item-btn-color white cursor-pointer"
                @click="openVipModal(items?.id)">
                开通{{ items?.name }}</div>
            </div>
          </div>
          <!-- 权益 -->
          <div class="card p-6">
            <div class="card-title">版权权益</div>
            <div class="card-body mt-6">
              <ul class="divide-y divide-black-200 -my-4 text-3.5 leading-4.5 text-black-800">
                <li class="flex-items-center justify-between py-4" v-for="rights, k in items?.benefits" :key="k">
                  <span class="text-black-700 flex-1 pr-6">
                    {{ rights?.title }}
                    <el-tooltip class="box-item" effect="dark" :content="rights?.text" placement="bottom"
                      v-if="rights?.text">
                      <span class="iconfont icon-wen1-2 text-3.5 text-black-600 ml-1"></span>
                    </el-tooltip>
                  </span>
                  <span class="flex-none" v-if="rights?.type === 'text'">{{ rights?.value }}</span>
                  <span class="flex-none" v-else-if="rights?.type === 'switch'">
                    <i class="iconfont icon-dui1-2 text-green-900" v-if="rights?.value === 'on'"></i>
                    <i class="iconfont icon-cuowu1-2 text-primary-800" v-else></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 开通vip弹窗 -->
      <MxVipModal ref="vipModalRef" />
    </div>

    <!-- VIP常见问题 -->
    <div class="lg:px-4">
      <div class="text-8 leading-12 font-600 text-center">VIP常见问题</div>
      <div class="bg-white rounded shadow-lg p-8 mt-10">
        <el-collapse v-model="activeAsk">
          <el-collapse-item :name="index" v-for="items, index in resData?.faq_list " :key="index" class="">
            <template #title>
              <div class="text-4 leading-6 ">
                Q:{{ items?.title }}
              </div>
            </template>
            <div class="text-3.5 text-black-700 mt-4">
              A:{{ items?.content }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { pullVip } from '@/request/modules/vip.js';
import { isEmpty, isNumber } from '@/utils/MxTool.js'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const route = useRoute()
const vipModalRef = ref(null)
const activeAsk = ref([0])
const resData = ref({
  faq_list: [],
  vip_list: [],
})


const getData = async () => {
  const getRes = await pullVip()
  if (!getRes?.status) return
  resData.value = getRes?.data
}

/**
 * 会员版本弹窗
 * @param item 
 */
const openVipModal = async (id) => {
  const getRes = await pullVip({ act: 'detail', id: id })
  if (!getRes?.status) return
  if (vipModalRef.value) {
    vipModalRef.value?.openModal(getRes?.data)
  }
}


watch(() => userStore.isLoggedIn, (newIsLoggedIn) => {
  if (newIsLoggedIn) return
  getData();
});

onMounted(() => {
  if (userStore.isLoggedIn) return
  if (!isEmpty(route.query?.id) && isNumber(route.query?.id)) {
    openVipModal(route.query?.id)
  }
  getData();
});
</script>

<style lang="scss" scoped>
.open-vip {
  min-height: 100vh;
  background-image: url(@/assets/images/open-vip-bg.webp);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top;

  --el-border-color-lighter: transparent;
  --el-collapse-border-color: #F5F6F7;
  --el-collapse-header-height: initial;
}



.icon-vip-res {
  width: 132px;
  height: 46px;
  background-image: url(@/assets/images/vip-rec.svg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.vip-version {
  &-item {
    --bg: linear-gradient(140deg, #fff3f3 0%, #fcd4d4 100%);
    --color-900: #CC0011;
    --color-800: #EB0013;
    --btn: #EB0013;
    --btn-color: #fff;

    &-gradient {

      background: var(--bg);
    }

    &-color-900 {
      color: var(--color-900);
    }

    &-color-800 {
      color: var(--color-800);
    }

    &-bg-btn {
      background: var(--btn);
    }

    &-btn-color {
      color: var(--btn-color);
    }

    &:nth-child(1) {
      --bg: linear-gradient(140deg, #fff3f3 0%, #fcd4d4 100%);
      --color-900: #CC0011;
      --color-800: #EB0013;
      --btn: #EB0013;
    }

    &:nth-child(2) {
      --bg: linear-gradient(139deg, #ffefdb 0%, #ffd7a6 100%);
      --color-900: #936125;
      --color-800: #936125;
      --btn: #333333;
    }

    &:nth-child(3) {
      --bg: linear-gradient(151deg, #373d68 0%, #1f1f38 100%);
      --color-900: #FEE2BF;
      --color-800: #FEE2BF;
      --btn: linear-gradient(99deg, #ffefdb 26%, #ffd7a6 100%);
      --btn-color: #333333;
    }
  }
}

:deep(.el-collapse) {
  margin: -24px 0;

  .el-collapse-item {
    padding: 24px 0;

    &+.el-collapse-item {
      border-top: 1px solid #f5f6f7;
    }

    .el-collapse-item__header {
      height: initial;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>