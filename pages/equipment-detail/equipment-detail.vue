<template>
  <view class="container">
    <view class="hero"><view class="title">{{ item.name }}</view><view class="subtitle">锻炼肌群：{{ item.targetMuscle.join('、') }}</view></view>
    <view class="card">
      <view class="media">器械图片 / 视频教学占位</view>
      <view class="title">使用教程</view><view class="subtitle">{{ item.description }}</view>
      <view class="divider"></view><view class="title">注意事项</view>
      <view v-for="tip in item.tips" :key="tip" class="list-item">✅ {{ tip }}</view>
      <view class="title">常见错误</view>
      <view v-for="error in item.errors" :key="error" class="list-item">⚠️ {{ error }}</view>
      <button class="btn" @click="askCoach">咨询 AI</button>
    </view>
  </view>
</template>
<script>
import { getEquipment } from '@/common/api.js'
export default { data() { return { item: getEquipment() } }, onLoad(query) { this.item = getEquipment(query.id) }, methods: { askCoach() { uni.navigateTo({ url: `/pages/coach/coach?q=${encodeURIComponent(this.item.name + '怎么用？')}` }) } } }
</script>
<style scoped>
.media { height: 320rpx; border-radius: 24rpx; background: #eef2f7; color: #6b7280; display:flex; align-items:center; justify-content:center; margin-bottom:24rpx; }
</style>
