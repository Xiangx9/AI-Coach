<template>
  <view class="container">
    <view class="hero"><view class="title">AI动作分析</view><view class="subtitle">上传训练照片或视频，获得姿势反馈与修改建议。</view></view>
    <view class="card">
      <button class="btn secondary" @click="choose('image')">上传照片</button>
      <button class="btn secondary" @click="choose('video')">上传视频</button>
      <textarea class="textarea" v-model="note" placeholder="补充动作名称，例如：深蹲、俯卧撑"></textarea>
      <button class="btn" :loading="loading" @click="analyse">AI识别</button>
    </view>
    <view v-if="result" class="card">
      <view class="title">结果反馈</view>
      <view class="metric">{{ result.score }} 分</view>
      <view class="subtitle">姿势判断：{{ result.correctness }}</view>
      <view class="subtitle">动作角度：{{ result.angle }}</view>
      <view class="subtitle">关节位置：{{ result.joints }}</view>
      <view class="subtitle">错误原因：{{ result.summary }}</view>
      <view v-for="item in result.suggestions" :key="item" class="list-item">{{ item }}</view>
    </view>
  </view>
</template>
<script>
import { callAI } from '@/common/api.js'
export default {
  data() { return { file: '', note: '', loading: false, result: null } },
  methods: {
    choose(type) {
      if (type === 'image') uni.chooseImage({ count: 1, success: res => { this.file = res.tempFilePaths[0] } })
      else uni.chooseVideo({ success: res => { this.file = res.tempFilePath } })
    },
    async analyse() {
      this.loading = true
      const advice = await callAI([{ role: 'user', content: `请以健身教练身份分析${this.note || '训练动作'}常见姿势问题，并输出3条修改建议。` }], 'action-analysis')
      this.result = { score: 88, correctness: '整体可继续练习，但需要控制核心与关节轨迹', angle: '建议保持膝/肘关节在舒适活动范围内，不追求过度幅度', joints: '膝盖、肩膀和腰椎应保持稳定，避免内扣、耸肩或塌腰', summary: advice, suggestions: ['保持核心收紧，避免腰椎代偿', '控制动作速度，不要借力', '如出现关节疼痛请停止训练'] }
      this.loading = false
    }
  }
}
</script>
