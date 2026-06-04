<template>
  <view class="container">
    <view class="hero"><view class="title">训练打卡</view><view class="subtitle">记录今日训练、本周统计、本月统计和连续打卡。</view></view>
    <view class="grid">
      <view class="card"><view class="muted">本周</view><view class="metric">{{ weekCount }} 次</view></view>
      <view class="card"><view class="muted">连续</view><view class="metric">{{ streak }} 天</view></view>
    </view>
    <view class="card">
      <view class="title">今日训练</view>
      <view class="subtitle">上肢推 + 核心，预计 45 分钟，消耗约 320 kcal。</view>
      <button class="btn" @click="checkin">完成打卡</button>
    </view>
    <view class="card">
      <view class="title">本月统计</view>
      <view class="subtitle">已完成 {{ monthCount }} 次训练。继续保持，优先保证动作质量和恢复。</view>
    </view>
  </view>
</template>
<script>
export default {
  data() { return { weekCount: 3, monthCount: 12, streak: 5 } },
  methods: { checkin() { this.weekCount += 1; this.monthCount += 1; this.streak += 1; uni.showToast({ title: '打卡成功' }) } }
}
</script>
