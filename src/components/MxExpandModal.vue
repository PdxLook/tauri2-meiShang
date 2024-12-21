<template>
  <div class="mx-expand-modal" v-if="expandData">
    <el-dialog v-model="dialogShow" width="640" :before-close="dialogClose" :close-on-click-modal="false" align-center
      :show-close="showClose">
      <div class="">
        <div class="vip-bg p-6">
          <p class="font-sans-500 text-4.5 text-black-900 leading-7">{{ expandData?.user_info?.mobile }},欢迎加入每商矩阵系统</p>
          <p class="text-3 leading-4.5 text-black-800 mt-2">{{ expandData?.vip_info?.name }} 到期时间：{{
            expandData?.vip_info?.end_date }}</p>
        </div>
        <div class="p-6 pb-0">
          <div class="flex space-x-8">
            <div class="flex-none bg-black-200 rounded w-[200px] px-4 py-5">
              <div class="card">
                <div class="text-center font-sans-500 text-3.5 text-black-900 leading-5">
                  <p>{{ expandData?.expansion_info?.name }}</p>
                  <p>会员专属权益</p>
                </div>
                <div class="border-t border-black-400 my-5"></div>
                <ul class="text-3 leading-4.5 text-black-800 rights-lists space-y-3">
                  <li class="rights-lists-items" v-for="(rights, index) in expandData?.expansion_info?.benefits"
                    :key="index">
                    <span class="">{{ rights?.title }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex-1">
              <ul class="form space-y-9">
                <li class="form-items">
                  <span class="form-items-label">会员类型：</span>
                  <div class="form-items-input">{{ expandData?.expansion_info?.name }}</div>
                  <div class="ml-auto text-3.5 leading-5 text-black-600 cursor-pointer"
                    @click="openDialogDetails({ code: 'expansion' })">扩容详细说明</div>
                </li>
                <li class="form-items">
                  <span class="form-items-label">运营公众号：</span>
                  <div class="form-items-input">
                    <el-input-number v-model="wechatCount" :step="5" :min="5" @change="changeWechatCount" step-strictly>
                      <template #suffix>
                        <span>个</span>
                      </template>
                    </el-input-number>
                  </div>
                </li>
                <li class="form-items">
                  <span class="form-items-label">扩容资费：</span>
                  <div class="form-items-input">{{ expandData?.expansion_info?.price }}元/{{
                    expandData?.expansion_info?.time_unit
                  }}
                    <span class="text-3 leading-4.5 text-black-600 ml-2 line-through"
                      v-if="expandData?.expansion_info?.mp_monthly_one_price">平均每号{{
                        expandData?.expansion_info?.mp_monthly_one_price }}元/月</span>
                  </div>
                </li>
                <li class="form-items">
                  <span class="form-items-label">到期时间：</span>
                  <div class="form-items-input">{{ expandData?.vip_info?.end_date }}</div>
                </li>

                <li class="form-items" v-if="expandData?.from_agent_code_status !== 'hidden'">
                  <span class="form-items-label">填写邀请码：</span>
                  <div class="form-items-input"><el-input v-model="invitationCode" maxlength="6" minlength="6"
                      placeholder="请输入邀请码" />
                  </div>
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
                      <span class="text-6 leading-9 font-sans-600 mr-1">{{ expandData?.expansion_info?.amount }}</span>
                      <!-- <span class="ml-1 text-black-600 text-3 line-through"
                        v-if="expandData?.expansion_info?.price != expandData?.expansion_info?.market_price">原价：￥{{
                          expandData?.expansion_info?.market_price
                        }}</span> -->
                    </div>
                    <div class="text-3 leading-4.5 text-black-700 mt-2"
                      v-if="expandData?.expansion_info?.discount_price > 0">
                      优惠金额：{{ expandData?.expansion_info?.discount_price }}
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
          <el-button type="primary" color="#EB0013" size="large" @click="Xthrottle(createOrder, 1000)">
            提交订单
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 单页详情弹窗 -->
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
import { ref, watch } from 'vue'
import { pullPay, pullExpansion } from '@/request/modules/vip.js';
import { isEmpty, Xthrottle, Xdebounce } from '@/utils/MxTool.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import QrcodeVue from 'qrcode.vue'
const emit = defineEmits(['close'])
const props = defineProps({
  showClose: {
    type: Boolean,
    default: true
  }
})
const expandData = ref()
const dialogDetailsRef = ref(null)
const dialogPayModal = ref(false)
const dialogShow = ref(false)
const invitationCode = ref()
const agreement = ref()
const pay_type = ref('2')
const orderData = ref({})
const payData = ref({})
const wechatCount = ref(5)

watch(invitationCode, () => {
  getNewAmount(true)
});

const changeWechatCount = () => {
  getNewAmount()
}

// 获取新金额
async function getNewAmount(isShow = false) {
  const query = {
    act: 'compute_amount',
    num: wechatCount.value,
    from_agent_code: invitationCode.value,
  }

  const getRes = await pullExpansion(query);
  if (!getRes?.status) return ElMessage.error(getRes?.msg);
  if (getRes?.data?.is_discount == 1 && isShow) {
    ElMessage.success('优惠成功');
  }
  expandData.value.expansion_info = { ...expandData.value?.expansion_info, ...getRes?.data }

  // wechatCount.value = Number(getRes?.data?.num) || 5
}

// 打开单页详情弹窗
function openDialogDetails(obj) {
  dialogDetailsRef.value.openModal(obj)
}

// 获取优惠码
async function getExpansion(query) {

  const getRes = await pullExpansion(query);

  if (!getRes?.status) return ElMessage.error(getRes?.msg);

  expandData.value = getRes?.data
  invitationCode.value = getRes?.data?.from_agent_code || ''
  wechatCount.value = getRes?.data?.expansion_info?.num || 5
}

const openModal = () => {
  getExpansion()
  dialogShow.value = true
}

const closeModal = () => {
  dialogShow.value = false
  emit('close')
}

const dialogClose = () => {
  closeModal()
  localStorage.removeItem('expand')
}

const createOrder = async () => {
  clearInterval(payStatusInterval);
  if (isEmpty(agreement.value)) return ElMessage.error('请阅读并同意会员服务协议');

  const query = {
    act: 'create_order',
    num: wechatCount.value,
    pay_type: pay_type.value,
    from_agent_code: invitationCode.value
  };

  try {
    // 调用接口创建新订单
    const getRes = await pullExpansion(query);
    if (!getRes?.status) return ElMessage.error(getRes?.msg);
    localStorage.setItem('expand', JSON.stringify(getRes?.data));
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

    const payInfo = JSON.parse(localStorage.getItem('expand'))
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
      dialogClose()
      return;
    }
  } catch (error) {
    // console.error('支付状态轮询失败:', error);
    clearInterval(payStatusInterval);
  }
};



// 暴露方法
defineExpose({
  openModal,
  closeModal
})

</script>

<style lang="scss" scoped>
:deep(.el-checkbox) {
  --el-checkbox-checked-text-color: #EB0013;
  --el-checkbox-checked-bg-color: #EB0013;
  --el-checkbox-checked-input-border-color: #EB0013;
  --el-border-radius-small: 999px;

}

:deep(.el-dialog) {
  --el-dialog-padding-primary: 0;
  --el-color-primary: #EB0013;
  --el-input-focus-border-color: #D9D9D9;
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
}
</style>