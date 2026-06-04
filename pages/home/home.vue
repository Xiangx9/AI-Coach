<template>
  <view class="container">
    <view class="hero">
      <view class="title">你好，新手健身者</view>
      <view class="subtitle">AI 将根据你的体质、目标和训练环境，生成可执行的训练与饮食建议。</view>
      <button class="btn" @click="go('/pages/plan-generate/plan-generate')">开始 AI 评估</button>
    </view>

    <view class="grid">
      <view class="card">
        <view class="muted">今日训练</view>
        <view class="metric">45 分钟</view>
        <view class="subtitle">胸部 + 核心，新手强度</view>
      </view>
      <view class="card">
        <view class="muted">饮食目标</view>
        <view class="metric">2200 kcal</view>
        <view class="subtitle">蛋白 150g / 碳水 240g</view>
      </view>
    </view>

    <view class="card">
      <view class="row">
        <view>
          <view class="title">推荐入口</view>
          <view class="subtitle">动作库、器械库和 AI 教练随时可用</view>
        </view>
      </view>
      <view class="divider"></view>
      <view class="grid">
        <button class="btn secondary" @click="go('/pages/actions/actions')">动作库</button>
        <button class="btn secondary" @click="go('/pages/equipment/equipment')">器械指导</button>
        <button class="btn" @click="go('/pages/coach/coach')">问 AI 教练</button>
        <button class="btn" @click="go('/pages/action-analysis/action-analysis')">动作分析</button>
      </view>
    </view>

    <view class="card">
      <view class="title">推荐课程</view>
      <view v-for="item in courses" :key="item" class="list-item row">
        <text>{{ item }}</text><text class="pill">新手</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return { courses: ['家庭 20 分钟燃脂循环', '健身房器械入门路线', '久坐人群肩颈放松'] }
  },
  methods: {
    go(url) { uni.navigateTo({ url }) }
  }
}
</script>
