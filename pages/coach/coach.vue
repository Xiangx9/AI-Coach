<template>
  <view class="container coach">
    <view class="hero"><view class="title">AI教练</view><view class="subtitle">支持训练咨询、饮食咨询和器械问答，由 UniCloud 云函数代理 FreeToken Router。</view></view>
    <view class="card chat-box">
      <view v-for="(msg, index) in messages" :key="index" :class="['bubble', msg.role]">{{ msg.content }}</view>
    </view>
    <view class="card">
      <view class="row quicks"><text v-for="q in quickQuestions" :key="q" class="pill" @click="send(q)">{{ q }}</text></view>
      <textarea class="textarea" v-model="input" placeholder="例如：高位下拉怎么做？"></textarea>
      <button class="btn" :loading="loading" @click="send(input)">发送</button>
    </view>
  </view>
</template>
<script>
import { quickQuestions } from '@/common/data.js'
import { callAI } from '@/common/api.js'
export default {
  data() { return { quickQuestions, input: '', loading: false, messages: [{ role: 'assistant', content: '你好，我是你的 AI 健身教练。请告诉我你的目标、训练环境和每周可训练天数。' }] } },
  onLoad(query) { if (query.q) this.input = decodeURIComponent(query.q) },
  methods: {
    async send(text) {
      if (!text || this.loading) return
      this.messages.push({ role: 'user', content: text })
      this.input = ''; this.loading = true
      const content = await callAI(this.messages.slice(-8), 'chat')
      this.messages.push({ role: 'assistant', content })
      this.loading = false
    }
  }
}
</script>
<style scoped>
.chat-box { min-height: 520rpx; }
.bubble { max-width: 82%; margin: 16rpx 0; padding: 20rpx; border-radius: 22rpx; line-height: 1.6; font-size: 27rpx; }
.bubble.user { margin-left: auto; background: #10b981; color: white; }
.bubble.assistant { background: #f3f4f6; color: #111827; }
.quicks { flex-wrap: wrap; justify-content: flex-start; margin-bottom: 20rpx; }
</style>
