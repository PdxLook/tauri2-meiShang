<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="index bg-black-200 " v-if="indexData">
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-12 lg:col-span-4 space-y-4">
        <!-- 实时概览 -->
        <div class="bg-white rounded overflow-hidden p-6">
          <MxCard title="实时概览">
            <template #description>
              <div class="flex-items-center">
                <div class="text-3.5 leading-5 text-black-600 ml-2">更新时间：{{ indexData?.update_date }}</div>
                <!-- <el-tooltip class="box-item" effect="dark" content="文案内容" placement="bottom">
                  <span class="iconfont icon-wen1-2 text-3.5 text-black-600 ml-1"></span>
                </el-tooltip> -->
              </div>
            </template>
            <div class="grid grid-cols-2 divide-x divide-black-200">
              <ul class="col-span-1 grid grid-cols-2 gap-6 pl-10 pr-16">
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">我的公众号</div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.wechat_count) }}
                  </div>
                  <a class="text-3.5 text-blue-900 leading-5" href="/weChat/">新增公众号</a>
                </li>
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">
                    <span>登录失效</span>
                    <el-tooltip class="box-item" effect="dark" content="登录状态已失效的公众号，需要重新登录" placement="bottom">
                      <span class="iconfont icon-wen1-2 text-3.5 text-black-600 ml-1"></span>
                    </el-tooltip>
                  </div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.wechat_expire_count)
                  }}</div>
                  <a class="text-3.5 text-blue-900 leading-5" href="/weChat/">重新登录</a>
                </li>
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">粉丝数</div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.fans_count) }}
                  </div>
                  <div class="text-3.5 text-black-700 leading-5">昨日新增：{{
                    formatNumber(indexData?.total?.yesterday_fans_count) }}
                  </div>
                </li>
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">月浏览量</div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.view_count) }}
                  </div>
                  <div class="text-3.5 text-black-700 leading-5">昨日浏览：{{
                    formatNumber(indexData?.total?.yesterday_view_count) }}
                  </div>
                </li>
              </ul>

              <ul class="col-span-1 grid grid-cols-2 gap-6 pl-16 pr-10">
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">词库管理</div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.words_count) }}
                  </div>
                  <a class="text-3.5 text-blue-900 leading-5" href="/keyword/">新建词库</a>
                </li>
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">
                    <span>我的商豆</span>
                    <el-tooltip class="box-item" effect="dark" content="商豆是用于平台内创作标题和内容的创作消耗的一种虚拟货币" placement="bottom">
                      <span class="iconfont icon-wen1-2 text-3.5 text-black-600 ml-1"></span>
                    </el-tooltip>
                  </div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.user_info?.balance) }}
                  </div>
                  <a class="text-3.5 text-blue-900 leading-5 cursor-pointer" @click="vipMxTopUpOpen">立即充值</a>
                  <MxTopUp ref="vipMxTopUpRef" @close="getData" />
                </li>
                <li class="space-y-2">
                  <div class="text-3.5 text-black-700 leading-5">发布文章数</div>
                  <div class="font-sans-600 text-5 leading-7.5 text-black-800">{{
                    formatNumber(indexData?.total?.publish_count) }}
                  </div>
                  <div class="text-3.5 text-black-700 leading-5 h-5">
                  </div>
                </li>
              </ul>
            </div>
          </MxCard>
        </div>

        <!-- 开通会员 -->
        <div class="open-ship rounded overflow-hidden p-14">
          <div class="text-7 leading-10.5 font-500"><span class="text-primary-800">开通VIP会员</span>，玩转公众号矩阵</div>
          <p class="text-4 leading-6 mt-5 ">AIGC内容创作 / 多账号统一管理 / 海量文章模板 / 专属顾问服务支持</p>
          <div class="flex-items-center mt-6 space-x-6">
            <a class="bg-primary-800 text-white rounded w-24 h-10 flex-center hover:text-white" href="/vip/">立即开通</a>
            <span class="text-3.5 text-black-800">查看VIP权限</span>
          </div>
        </div>

        <!-- 操作流程+商学院 -->
        <div class="bg-white rounded overflow-hidden p-6 space-y-8">
          <!-- 新手操作流程 -->
          <MxCard title="新手操作流程">
            <div class="bg-black-200 rounded-lg p-7.5 px-7.5 2xl:px-25">
              <ul class="flex-center justify-between index-procedure">
                <li class="flex-none bg-black-200" v-for="(stepsItem, stepsKey) in stepsArr" :key="stepsItem">
                  <div class="text-center">
                    <div class="size-14 flex-center border border-black-500 rounded-full mx-auto">
                      <span class="iconfont text-6 text-black-800 " :class="stepsItem.icon"></span>
                    </div>
                    <p class="text-3.5 leading-5 text-black-800 mt-4">{{ stepsKey + 1 }}.{{ stepsItem.title }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </MxCard>
          <!-- 每商学院 -->
          <MxCard title="每商学院" :rightMore="{ text: '更多', link: 'http://www.18899.cn/page/' }">
            <MxEmpty tips="暂无内容" :lists="indexData?.college.list || []">
              <ul class="grid grid-cols-5 gap-6 text-3.5 leading-5 text-black-800">
                <li v-for="items in indexData?.college?.list || []" :key="items?.page_id">
                  <a :href="`http://www.18899.cn/page/${items?.code}.html`" class="block" target="_blank">
                    <img :src="items?.thumb" class="object-cover ratios-252-142 rounded" :alt="items?.title">
                    <p class=" line-clamp-1 mt-3">{{ items?.title }}</p>
                  </a>
                </li>
              </ul>
            </MxEmpty>
          </MxCard>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-1 space-y-4">
        <!-- 系统公告 -->
        <div class="bg-white rounded overflow-hidden p-6">
          <MxCard title="系统公告" :rightMore="{ text: '更多', fun: mxMessagOpen }">
            <MxEmpty tips="暂无公告" :lists="indexData?.notice?.list || []">
              <ul class="text-3 leading-4.5 space-y-3 text-black-800">
                <li v-for="items in indexData?.notice?.list || []" :key="items?.page_id">
                  <a href="javascript:;" class="flex-items-center justify-between"
                    @click="mxMessageDetailsRefOpen(items?.page_id)">
                    <span class="line-clamp-1 pr-6">{{ items?.title }}</span>
                    <time class="flex-none text-black-600">{{ items?.create_date }}</time>
                  </a>
                </li>
              </ul>
            </MxEmpty>
          </MxCard>
        </div>

        <!-- 客服 -->
        <div class="bg-white rounded overflow-hidden p-6">
          <MxCard title="联系客服">
            <MxEmpty tips="暂无相关内容" :lists="[]">
              <ul class="text-3.5 leading-5 divide-y divide-black-200 -my-4">
                <li class="py-4">
                  <div class="flex-items-center justify-between">
                    <div class="flex-1 flex-items-center">
                      <div class="flex-none">
                        <img src="@/assets/images/6389.svg" alt="客服电话" class="size-8 object-cover">
                      </div>
                      <div class="flex-1 ml-3 space-y-1">
                        <p class="text-black-700">客服电话</p>
                        <p class="text-black-800">{{ indexData?.contact?.tel }}</p>
                      </div>
                    </div>
                    <div class="flex-none"></div>
                  </div>
                </li>
                <li class="py-4">
                  <div class="flex-items-center justify-between">
                    <div class="flex-1 flex-items-center">
                      <div class="flex-none">
                        <img src="@/assets/images/6388.svg" alt="客服微信" class="size-8 object-cover">
                      </div>
                      <div class="flex-1 ml-3 space-y-1">
                        <p class="text-black-700">客服微信</p>
                        <p class="text-black-800">{{ indexData?.contact?.wechat }}</p>
                      </div>
                    </div>
                    <div class="flex-none">
                      <el-popover effect="dark" placement="left">
                        <template #reference>
                          <div class="size-10 bg-black-200 flex-center rounded-full cursor-pointer"><span
                              class="iconfont icon-erweima2"></span>
                          </div>
                        </template>
                        <template #default>
                          <div class="size-31">
                            <img :src="indexData?.contact?.wechat_qrcode" class="wh-fluid object-cover" alt="">
                          </div>
                        </template>
                      </el-popover>
                    </div>
                  </div>
                </li>
                <li class="py-4">
                  <div class="flex-items-center justify-between">
                    <div class="flex-1 flex-items-center">
                      <div class="flex-none">
                        <img src="@/assets/images/6387.svg" alt="商务合作" class="size-8 object-cover">
                      </div>
                      <div class="flex-1 ml-3 space-y-1">
                        <p class="text-black-700">商务合作</p>
                        <p class="text-black-800">{{ indexData?.contact?.phone }}</p>
                      </div>
                    </div>
                    <div class="flex-none"></div>
                  </div>
                </li>
              </ul>
            </MxEmpty>
          </MxCard>
        </div>

        <!-- 广告 -->
        <div class="" v-if="indexData?.right_ad_list">
          <ul>
            <li class="cursor-pointer" v-for="items in indexData?.right_ad_list" :key="items?.jump_id"
              @click="openDialogDetails(items)">
              <img :src="items?.image" :alt="items?.title" class="w-full object-cover">
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 公告列表 -->
    <MxMessage ref="mxMessageRef" />
    <!-- 公告详情 -->
    <MxMessageDetails ref="mxMessageDetailsRef" />
    <!-- 详情弹窗 -->
    <MxDialogDetails ref="dialogDetailsRef" />
  </main>

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { pullBalance } from '@/request/modules/vip.js';
import { pullIndex } from '@/request/modules/index.js';
import { isEmpty, formatNumber } from '@/utils/MxTool.js'
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
const dialogDetailsRef = ref(null)
const vipMxTopUpRef = ref(null)
const mxMessageRef = ref(null)
const mxMessageDetailsRef = ref(null)
const indexData = ref()

// 操作流程
const stepsArr = [
  {
    title: '开通VIP会员',
    icon: 'icon-huiyuan2-2',
  },
  {
    title: '添加公众号',
    icon: 'icon-fenxiang-weixin',
  },
  {
    title: '添加词库',
    icon: 'icon-yuedu1-2',
  },
  {
    title: '审核标题/文章',
    icon: 'icon-zhang1-2',
  },
  {
    title: '开始发布文章',
    icon: 'icon-fasong1-2',
  },
]

/**
 * 跳转详情
 * @param items object 跳转参数
 */
function openDialogDetails(items) {
  if (items?.jump_type === '1') {
    dialogDetailsRef.value.openModal({ page_id: items?.jump_id })
  } else {
    ElMessage.error(`未定义的跳转类型:${items?.jump_type}`);
  }
}

const vipMxTopUpOpen = () => {
  getBalance()
}

const mxMessagOpen = () => {
  mxMessageRef.value.openDrawer()
}

const mxMessageDetailsRefOpen = (id) => {
  mxMessageDetailsRef.value.openDrawer(id)
}

async function getBalance() {
  const getRes = await pullBalance()
  if (!getRes?.status) return
  vipMxTopUpRef.value.openModal(getRes?.data)
}

async function getData() {
  const getRes = await pullIndex()
  if (!getRes?.status) return
  indexData.value = getRes?.data
}

watch(() => userStore.isLoggedIn, (newIsLoggedIn) => {
  if (newIsLoggedIn) return
  getData();
});

onMounted(() => {
  document.title = '控制台 - 每商公众号矩阵软件'
  if (userStore.isLoggedIn) return
  getData();
});
</script>

<style lang="scss" scoped>
@use './style' as *;
</style>