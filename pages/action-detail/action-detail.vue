<template>
  <view class="container">
    <view class="hero"><view class="title">{{ action.name }}</view><view class="subtitle">{{ action.muscle }} · 推荐 {{ action.sets }}</view></view>
    <view class="card">
      <view class="media">GIF / 视频演示占位</view>
      <view class="title">动作讲解</view><view class="subtitle">{{ action.description }}</view>
      <view class="divider"></view><view class="title">注意事项</view>
      <view v-for="tip in action.tips" :key="tip" class="list-item">✅ {{ tip }}</view>
      <view class="title">常见错误</view>
      <view v-for="error in action.errors" :key="error" class="list-item">⚠️ {{ error }}</view>
      <button class="btn" @click="askCoach">问 AI 教练</button>
    </view>
  </view>
</template>
<script>
import { getAction } from '@/common/api.js'
export default {
  data() { return { action: getAction() } },
  onLoad(query) { this.action = getAction(query.id) },
  methods: { askCoach() { uni.navigateTo({ url: `/pages/coach/coach?q=${encodeURIComponent(this.action.name + '怎么做？')}` }) } }
}
</script>
<style scoped>
.media { height: 320rpx; border-radius: 24rpx; background: #eef2f7; color: #6b7280; display:flex; align-items:center; justify-content:center; margin-bottom:24rpx; }
</style>
