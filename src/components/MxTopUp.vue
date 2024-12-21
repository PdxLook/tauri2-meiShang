<template>
  <div class="mx-top-up">
    <el-dialog v-model="dialogTopUpModal" width="640" :before-close="topUpModalClose" align-center
      :close-on-click-modal="false" :show-close="showClose">
      <div class="">
        <div class="vip-bg p-6">
          <p class="font-sans-500 text-4.5 text-black-900 leading-7">{{ balanceData?.user_info?.mobile }}，欢迎加入每商矩阵系统</p>
          <p class="text-3 leading-4.5 text-black-800 mt-2">赠送活动已开启，多充多送</p>
        </div>
        <div class="p-6 pb-0">
          <div class="">
            <div class="flex-items-center justify-between text-3 leading-4.5 text-black-700">
              <span>商豆兑换比例：1元兑换{{ balanceData?.ratio_list }}商豆</span>
              <span class="cursor-pointer" @click="openDialogDetails({ code: 'balance_rule' })">了解商豆使用规则</span>
            </div>
            <ul class="top-up grid grid-cols-3 gap-5 mt-5 text-black-600 text-3.5 leading-5">
              <li class="top-up-items p-6 px-10 cursor-pointer" v-for="items in balanceData?.recharge_list"
                :key="items?.recharge_id" :class="{ active: topUpId === items?.recharge_id }"
                @click="clickItems(items)">
                <div class="top-up-items-tips absolute text-3 text-white" v-if="items?.send_balance > 0">送{{
                  items?.send_balance }}商豆</div>
                <span class="top-up-items-icon iconfont icon-dui1-2 absolute text-primary-800"></span>
                <p class="text-4.5 font-sans-500 text-black-800 leading-7 mb-2">{{ items?.balance }}商豆</p>
                <p>售价：{{ items?.amount }}元</p>
              </li>

              <!-- 自定义充值金额 -->
              <li class="top-up-items p-6  cursor-pointer flex-center" :class="{ active: topUpId === null }"
                @click="topUpId = null">
                <span class="top-up-items-icon iconfont icon-dui1-2 absolute text-primary-800"></span>
                <div>
                  <p class="text-4.5 font-sans-500 text-black-800 leading-7 mb-2">自定义充值金额</p>
                  <p>1元兑换{{ balanceData?.ratio_list }}商豆</p>
                </div>
              </li>
            </ul>
            <!-- 自定义充值金额 -->
            <div class="mt-5" v-if="topUpId === null">
              <div class="relative">
                <el-input v-model="amount" size="large" placeholder="请输入自定义充值金额" suffix-icon="元" />
                <span class="absolute right-2 top-2">元</span>
              </div>
            </div>
          </div>
          <div class="mt-8">
            <div class="text-4 leading-6 font-sans-500 text-black-800">支付方式</div>
            <div class="mt-4 flex-items-center">
              <el-radio-group v-model="pay_type">
                <el-radio value="2" size="large"><i class="mr-1 iconfont icon-weixinzhifu text-#14B680"></i><span
                    class="text-black-800">微信支付</span></el-radio>
                <el-radio value="1" size="large"><i class="mr-1 iconfont icon-zhifubao text-#3370FF"></i><span
                    class="text-black-800">支付宝</span></el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="border-b border-black-300 mt-6"></div>
        </div>
      </div>
      <template #footer>
        <div class="p-6 dialog-footer flex-center">
          <div class="bg-primary-800 text-white rounded w-50 h-10 flex-center hover:text-white cursor-pointer"
            @click="Xthrottle(createOrder, 1000)">
            立即支付
          </div>
        </div>
      </template>
    </el-dialog>
    <MxDialogDetails ref="dialogDetailsRef" />
    <el-dialog v-model="dialogPayModal" width="400" :before-close="payModalClose" align-center
      :close-on-click-modal="false">
      <div class="p-5 text-4.5 font-sans-500 text-black-800">
        {{ payData?.pay_type === 2 ? '微信支付' : '支付宝支付' }}
      </div>
      <div class="flex-center flex-col p-5 py-10 border-t border-black-300">
        <qrcode-vue :value="payData?.qrcode" :size="160" level="H" />
        <p class="text-3.5 text-black-800 mt-8">请扫码支付(￥{{ payData?.amount }})</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { pullBalance, pullPay } from '@/request/modules/vip.js';
import { isEmpty, isNumber, Xthrottle } from '@/utils/MxTool.js';
import QrcodeVue from 'qrcode.vue';
const dialogDetailsRef = ref(null)
const props = defineProps({
  showClose: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])
const dialogTopUpModal = ref(false)
const dialogPayModal = ref(false)
const topUpId = ref(1)
const amount = ref()
const balanceData = ref()
const pay_type = ref('2')
const orderData = ref({})
const payData = ref({})

let payStatusInterval = null;

function openDialogDetails(obj) {
  dialogDetailsRef.value.openModal(obj)
}

const openModal = (data) => {
  dialogTopUpModal.value = true
  balanceData.value = data
}

const closeModal = () => {
  dialogTopUpModal.value = false
  emit('close')
}

const topUpModalClose = () => {
  closeModal()
}

const payModalClose = () => {
  dialogPayModal.value = false
  clearInterval(payStatusInterval);
}

function clickItems(item) {
  topUpId.value = item?.recharge_id
  amount.value = ''
}

async function createOrder() {

  if (!isEmpty(amount.value) && (!isNumber(amount.value) || amount.value % 1 !== 0 || amount.value < 10)) {
    return ElMessage.error('请输入不低于10的整数作为充值数量');
  }

  if (isEmpty(amount.value) && isEmpty(topUpId.value)) {
    return ElMessage.error('请选择充值金额或自定义充值金额');
  }

  const query = {
    act: 'create_order',
    recharge_id: amount.value > 0 ? '' : topUpId.value,
    pay_type: pay_type.value,
    amount: amount.value
  };


  try {
    // 调用接口创建新订单
    const getRes = await pullBalance(query);

    if (!getRes?.status) return

    orderData.value = getRes?.data;

    getPay(orderData.value)
  } catch (error) {
    console.error('创建订单失败:', error);
  }
};

async function getPay(options) {
  try {
    const getRes = await pullPay({
      ...options
    })

    if (!getRes?.status) return

    payData.value = getRes?.data;

    dialogPayModal.value = true

    // 启动支付轮询
    payStatusInterval = setInterval(() => {
      getPayStatus(options); // 根据订单 ID 轮询支付状态
    }, 2000); // 每 1 秒轮询一次


  } catch (error) {
    console.error('支付获取失败:', error);
  }
}

// 支付回调轮询
async function getPayStatus(options) {
  try {
    const getRes = await pullPay({ act: 'pay_status', ...options }); // 调用支付状态接口

    if (!getRes?.status) return

    if (getRes?.data?.pay_status === 1) {
      clearInterval(payStatusInterval); // 清除轮询
      ElMessage.success('支付成功');
      dialogPayModal.value = false; // 关闭支付窗口

      topUpModalClose()
      return;
    }
    // if (getRes?.pay_status === 0) {
    //   clearInterval(payStatusInterval);
    //   ElMessage.error('支付失败，请重试');
    //   return;
    // }
  } catch (error) {
    console.error('支付状态轮询失败:', error);
    clearInterval(payStatusInterval); // 清除轮询
  }
};

// 暴露方法
defineExpose({
  openModal,
  closeModal
})

</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  --el-dialog-padding-primary: 0;
  --el-color-primary: #EB0013;
  border-radius: 4px;
  overflow: hidden;

  .vip-bg {
    background-image: url('@/assets/images/topUp-model-bg@2x.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
}

.top-up-items {
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  .top-up-items-icon {
    display: none;
  }

  .top-up-items-tips {
    padding: 3px 8px;
    background: #d9d9d9;
    border-radius: 4px 0px 4px 0px;
    left: 0;
    top: 0;
  }

  &.active {
    background: #fff3f4;
    border: 1px solid #f24b59;

    .top-up-items-tips {
      background: linear-gradient(290deg, #f64150 0%, #f08c01 100%);
    }

    .top-up-items-icon {
      display: block;
      right: 8px;
      top: 8px;
    }
  }
}

:deep(.el-input) {
  // --el-border-color: transparent;

  // --el-component-size: 56px;

  .el-input__wrapper {
    //box-shadow: none !important;
  }
}
</style>