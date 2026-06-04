<template>
  <view class="container">
    <view class="hero">
      <view class="title">会员中心</view>
      <view class="subtitle">免费版适合体验基础计划；会员版解锁无限 AI 问答、AI 动作分析和高级方案。</view>
    </view>

    <view class="grid">
      <view class="card">
        <view class="title">免费版</view>
        <view class="subtitle">每日 3 次 AI 问答</view>
        <view class="subtitle">基础训练计划</view>
      </view>
      <view class="card">
        <view class="title">会员版</view>
        <view class="subtitle">无限 AI 问答</view>
        <view class="subtitle">AI 动作分析 / 专属饮食方案 / 高级训练计划</view>
      </view>
    </view>

    <view class="card">
      <view class="title">开通方案</view>
      <view v-for="plan in plans" :key="plan.type" class="list-item row">
        <view><view>{{ plan.name }}</view><view class="subtitle">{{ plan.desc }}</view></view>
        <button class="btn" @click="buy(plan)">¥{{ plan.price }}</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return { plans: [
      { type: 'month', name: '月会员', price: 29, desc: '适合短期体验' },
      { type: 'quarter', name: '季会员', price: 79, desc: '适合持续训练' },
      { type: 'year', name: '年会员', price: 199, desc: '适合长期进阶' }
    ] }
  },
  methods: { buy(plan) { uni.showToast({ title: `${plan.name}待接入支付` }) } }
}
</script>
