<route lang="yaml">
  meta:
    layout: default
</route>
<template>
  <main class="open-vip bg-white py-20 space-y-20">
    <div class="">
      <div class="text-center">
        <div class="text-8 leading-12 font-sans-500">选择所需VIP版本，开始运营公众号</div>
        <div class="text-4 text-black-800 mt-8">
          <ul class="flex-center space-x-8">
            <li><span class="mr-1 iconfont icon-dui1-2"></span>AIGC内容创作</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>多账号统一管理</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>海量文章模板</li>
            <li><span class="mr-1 iconfont icon-dui1-2"></span>专属顾问服务支持</li>
          </ul>
        </div>
      </div>
      <!-- 会员版本 -->
      <div class="grid lg:grid-cols-3 gap-13 lg:gap-6 mt-20 vip-version lg:px-4">
        <div class="flex-1 bg-white rounded shadow-lg vip-version-item relative"
          v-for="items, i in vipData?.vip_version" :key="items">
          <div class="icon-vip-res absolute text-3.5 text-white flex-center pt-[2px] -top-10 -left-2"
            v-if="items?.icon_string">
            {{ items?.icon_string }}
          </div>
          <!-- 介绍 -->
          <div class="vip-version-item-gradient text-center p-10 rounded-t">
            <div class="font-sans-500 vip-version-item-color-900 text-6 leading-9">{{ items?.name }}</div>
            <p class="text-3.5 leading-5 vip-version-item-color-900 mt-5">{{ items?.subtitle }}</p>
            <div class="mt-9.5 relative">
              <img class="absolute dw-center" src="@/assets/images/Vector.svg"></img>
              <p class="vip-version-item-color-800">{{ items?.description }}</p>
            </div>
          </div>
          <div class="text-center p-6">
            <!-- 套餐 -->
            <ul class="grid  gap-5 price-package " :class="{ 'grid-cols-2': items?.vip_list.length > 1 }">
              <li class="price-package-items cursor-pointer" v-for="setMeal, index in items?.vip_list" :key="setMeal"
                :class="{ 'col-span-2': index == 2, 'active': setMeal?.is_select === 1 }"
                @click="activeSku(items?.version_id, setMeal?.id, setMeal?.benefits)">
                <div class="rec text-3 leading-4.5 text-white flex-center" v-if="setMeal?.recommend_string">
                  {{ setMeal?.recommend_string }}</div>
                <p class="text-3.5 leading-5 text-black-800">￥<span
                    class="font-600 text-primary-800 text-5 leading-7.5">{{ setMeal?.market_price
                    }}</span>/{{ setMeal?.time_unit }}</p>
                <p class="text-3 leading-4.5 text-black-700 mt-1">平均每号{{ setMeal?.month_average_price }}元/月</p>
              </li>
            </ul>
            <div class="mt-8">
              <!-- 按钮类型 -->
              <div
                class="text-4 leading-6 vip-version-item-bg-btn rounded leading-6 py-3 vip-version-item-btn-color white cursor-pointer"
                @click="openVipModal(items?.setMealId)" v-if="items?.button?.type === 'button'">
                {{ items?.button?.text }}</div>
              <!-- 提示类型 -->
              <div class="text-4 leading-6 border border-black-300 rounded leading-6 py-3 text-black-800 "
                v-if="items?.button?.type === 'tips'">
                {{ items?.button?.text }}</div>
            </div>
          </div>
          <!-- 权益 -->
          <div class="card p-6">
            <div class="card-title text-4 leading-6">版权权益</div>
            <div class="card-body mt-6">
              <ul class="divide-y divide-black-200 -my-4 text-3.5 leading-4.5 text-black-800">
                <li class="flex-items-center justify-between py-4" v-for="rights, k in items?.rights" :key="k">
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
      <div class="text-8 leading-12 font-sans-500 text-center">VIP常见问题</div>
      <div class="bg-white rounded shadow-lg p-8 mt-10">
        <el-collapse v-model="activeAsk">
          <el-collapse-item :name="index" v-for="items, index in vipData?.faq_list " :key="index">
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
const vipData = ref({
  faq_list: [],
  vip_version: [],
})

/**
 * 切换套餐
 * @param vipId number 版本id
 * @param setMealId number 套餐id
 * @param benefits object 权益
 */
function activeSku(vipId, setMealId, benefits) {
  if (Array.isArray(vipData.value.vip_version)) {
    vipData.value.vip_version.forEach(version => {
      if (version.version_id === vipId) {
        Object.assign(version, { rights: benefits, setMealId });
        version.vip_list.forEach(setMeal => {
          setMeal.is_select = setMeal.id === setMealId ? 1 : 0;
        });
      }
    });
  }
}

const fetchVipData = async () => {
  try {
    const getRes = await pullVip();
    if (!getRes?.status) return;

    vipData.value = getRes?.data;
    if (Array.isArray(vipData.value.vip_version)) {
      vipData.value.vip_version.forEach(version => {
        const selectedSetMeal = version.vip_list.find(setMeal => setMeal.is_select === 1);
        if (selectedSetMeal) {
          Object.assign(version, {
            rights: selectedSetMeal.benefits,
            setMealId: selectedSetMeal.id
          });
        }
      });
    }
  } catch (error) {
    ElMessage.error(`获取VIP数据失败`);
  }
};

/**
 * 会员版本弹窗
 * @param id number||string 版本id 
 */
const openVipModal = async (id) => {
  try {
    const getRes = await pullVip({ act: 'detail', id: id });
    if (!getRes?.status) {
      throw new Error(getRes.msg);
    }

    if (vipModalRef.value) {
      vipModalRef.value?.openModal(getRes?.data);
    }
  } catch (error) {
    ElMessage.error(`获取会员版本详情失败`);
  }
}

watch(() => userStore.isLoggedIn, (newIsLoggedIn) => {
  if (newIsLoggedIn) return
  fetchVipData();
});

onMounted(() => {
  if (userStore.isLoggedIn) return
  if (!isEmpty(route.query?.id) && isNumber(route.query?.id)) {
    openVipModal(route.query?.id)
  }
  fetchVipData();
});
</script>

<style lang="scss" scoped>
@use './style' as *;
</style>