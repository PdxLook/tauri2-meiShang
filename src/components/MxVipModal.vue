<template>
  <div class="mx-vip-modal">
    <el-dialog v-model="dialogVipModal" width="640" :before-close="vipModalClose" :close-on-click-modal="false"
      align-center :show-close="showClose">
      <div class="">
        <div class="vip-bg p-6">
          <p class="font-600 text-4.5 text-black-900 leading-7">{{ vipData?.user_info?.mobile }}</p>
          <p class="text-3 leading-4.5 text-black-800 mt-2">欢迎加入每商矩阵系统</p>
          <!-- <p class="text-3 leading-4.5 text-black-800 mt-2">未开通/个人版 到期时间：{{ vipData?.end_date }}</p> -->
        </div>
        <div class="p-6 pb-0">
          <div class="flex space-x-8">
            <div class="flex-none bg-black-200 rounded w-[200px] px-4 py-5">
              <div class="card">
                <div class="text-center font-sans-500 text-3.5 text-black-900 leading-5">
                  <p>{{ vipData?.vip_info?.name }}</p>
                  <p>会员专属权益</p>
                </div>
                <div class="border-t border-black-400 my-5"></div>
                <ul class="text-3 leading-4.5 text-black-800 rights-lists space-y-3">
                  <li class="rights-lists-items" v-for="(rights, index) in vipData?.vip_info?.benefits" :key="index">
                    <span class="">{{ rights?.title }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex-1">
              <ul class="form space-y-9">
                <li class="form-items">
                  <span class="form-items-label">会员类型：</span>
                  <div class="form-items-input">{{ vipData?.vip_info?.name }}</div>
                </li>
                <li class="form-items">
                  <span class="form-items-label">运营公众号：</span>
                  <div class="form-items-input">{{ vipData?.vip_info?.wechat_count }}个</div>
                </li>
                <li class="form-items" v-if="!isEmpty(vipData?.expansion_info)">
                  <span class="form-items-label">扩容公众号：</span>
                  <div class="form-items-input">{{ vipData?.expansion_info?.expansion_num }}个</div>
                  <span data-v-9e99f9f3="" class="text-3 leading-4.5 text-black-600 ml-2 ">扩容费用：{{
                    vipData?.expansion_info?.amount }}元</span>
                </li>
                <li class="form-items">
                  <span class="form-items-label">会员资费：</span>
                  <div class="form-items-input">{{ vipData?.vip_info?.price }}元/{{ vipData?.vip_info?.time_unit
                    }}
                  </div>
                </li>
                <!-- <li class="form-items">
                  <span class="form-items-label">到期时间：</span>
                  <div class="form-items-input">{{ vipData?.end_date }}</div>
                </li> -->
                <li class="form-items" v-if="vipData?.from_agent_code_status !== 'hidden'">
                  <span class="form-items-label">填写邀请码：</span>
                  <div class="form-items-input"><el-input v-model="invitationCode" maxlength="6" minlength="6"
                      placeholder="请输入邀请码" /></div>
                </li>
                <li class="form-items">
                  <span class="form-items-label">支付方式：</span>
                  <div class="form-items-input">
                    <el-radio-group v-model="pay_type">
                      <el-radio value="2" size="large"><i class="mr-1 iconfont icon-weixinzhifu text-#14B680"></i><span
                          class="text-black-800">微信支付</span></el-radio>
                      <el-radio value="1" size="large"><i class="mr-1 iconfont icon-zhifubao text-#3370FF"></i><span
                          class="text-black-800">支付宝</span></el-radio>
                    </el-radio-group>
                  </div>
                </li>
                <li class="form-items !items-baseline">
                  <span class="form-items-label">应付金额：</span>
                  <div class="form-items-input">
                    <div class="text-3 text-primary-800">
                      <span>￥</span>
                      <span class="text-6 leading-9 font-sans-600 mr-1">{{ vipData?.vip_info?.amount }}</span>
                      <span class="ml-1 text-black-600 text-3 line-through"
                        v-if="vipData?.vip_info?.price != vipData?.vip_info?.market_price">原价：￥{{
                          vipData?.vip_info?.market_price
                        }}</span>
                    </div>
                    <div class="text-3 leading-4.5 text-black-700 mt-2" v-if="vipData?.other?.remain?.remain_price > 0">
                      当前个人版VIP剩余{{ vipData?.other?.remain?.remain_day }}天，可抵扣￥{{
                        vipData?.other?.remain?.remain_price }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="border-b border-black-300 mt-6"></div>
        </div>
      </div>
      <template #footer>
        <div class="p-6 dialog-footer flex-items-center">
          <div class="text-3.5 text-black-800 flex-items-center mr-auto"><el-checkbox v-model="agreement"
              text-color="#EB0013" fill="#EB0013" label="购买则表示同意" size="large" />
            <div class="cursor-pointer" @click="openDialogDetails({ code: 'vip' })">《会员服务协议》</div>
          </div>
          <!-- <el-button size="large" @click="dialogVipModal = false">取消</el-button> -->
          <el-button type="primary" color="#EB0013" size="large" @click="Xthrottle(createOrder, 1000)">
            提交订单
          </el-button>
        </div>
      </template>
    </el-dialog>

    <MxDialogDetails ref="dialogDetailsRef" />

    <el-dialog v-model="dialogPayModal" width="400" :before-close="payModalClose" align-center
      :close-on-click-modal="false">
      <div class="p-5 text-4.5 font-600 text-black-800">
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
import { ref, watch } from 'vue'
import { pullVip, pullPay } from '@/request/modules/vip.js';
import { isEmpty, Xthrottle, Xdebounce } from '@/utils/MxTool.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
const props = defineProps({
  showClose: {
    type: Boolean,
    default: true
  }
})


const vipData = ref()

const dialogDetailsRef = ref(null)
const dialogPayModal = ref(false)
const dialogVipModal = ref(false)
const invitationCode = ref()
const agreement = ref()
const pay_type = ref('2')
const orderData = ref({})
const payData = ref({})


watch(invitationCode, () => {
  Xdebounce(getDiscount)
});


function openDialogDetails(obj) {
  dialogDetailsRef.value.openModal(obj)
}

async function getDiscount(isShow = false) {
  const query = {
    act: 'verify_discount_code',
    from_agent_code: invitationCode.value,
    id: vipData.value?.vip_info?.id,
  }

  const getRes = await pullVip(query);

  if (!getRes?.status) return;

  if (getRes?.data?.is_discount == 1 && isShow) {
    ElMessage.success('优惠成功');
  }

  vipData.value.vip_info = { ...vipData.value.vip_info, ...getRes?.data }
}

const openModal = (items) => {
  dialogVipModal.value = true
  vipData.value = items
  invitationCode.value = items?.from_agent_code || ''
}

const closeModal = () => {
  dialogVipModal.value = false
}

const vipModalClose = () => {
  closeModal()

  localStorage.removeItem('h5-order-info')
  localStorage.removeItem('order')
}

const createOrder = async () => {
  clearInterval(payStatusInterval);
  if (isEmpty(agreement.value)) {
    ElMessage.error('请阅读并同意会员服务协议');
    return;
  }

  const oldQuery = JSON.parse(localStorage.getItem('h5-order-info') || '{}');

  const query = {
    act: 'create_order',
    id: vipData.value?.vip_info?.id,
    pay_type: pay_type.value,
    from_agent_code: vipData.value?.from_agent_code
  };

  const oldOrder = JSON.parse(localStorage.getItem('order'))
  // 比对当前订单参数与本地存储的订单参数
  if (JSON.stringify(oldQuery) === JSON.stringify(query) && !isEmpty(oldOrder)) {

    return getPay(oldOrder);
  }

  try {
    // 调用接口创建新订单
    const getRes = await pullVip(query);

    if (!getRes?.status) return

    // 存储新的订单参数到本地
    localStorage.setItem('h5-order-info', JSON.stringify(query));
    localStorage.setItem('order', JSON.stringify(getRes?.data));

    orderData.value = getRes?.data;

    getPay(orderData.value)
  } catch (error) {
    console.error('创建订单失败:', error);
  }
};


let payStatusInterval = null;
const getPay = async (options) => {

  try {
    const getRes = await pullPay({
      ...options
    })

    if (!getRes?.status) return

    payData.value = getRes?.data;

    dialogPayModal.value = true

    const payInfo = JSON.parse(localStorage.getItem('order'))
    // 启动支付轮询
    payStatusInterval = setInterval(() => {
      getPayStatus(payInfo);
    }, 2000);

  } catch (error) {
    console.error('支付状态失败:', error);
  }

}

const payModalClose = () => {
  dialogPayModal.value = false
  clearInterval(payStatusInterval);
}

// 支付回调轮询
const getPayStatus = async (options) => {
  try {
    const getRes = await pullPay({ act: 'pay_status', ...options });
    if (!getRes?.status) return
    if (getRes?.data?.pay_status === 1) {
      clearInterval(payStatusInterval);
      ElMessage.success('支付成功');
      dialogPayModal.value = false;

      payModalClose()
      vipModalClose()
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
.mx-vip-modal {}

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