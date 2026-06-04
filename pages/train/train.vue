<template>
  <view class="container">
    <view class="hero">
      <view class="title">训练模块</view>
      <view class="subtitle">生成计划、查看动作库，并按家庭或健身房场景开始训练。</view>
    </view>
    <view class="grid">
      <view v-for="item in entries" :key="item.title" class="card" @click="go(item.url)">
        <view class="title">{{ item.title }}</view>
        <view class="subtitle">{{ item.desc }}</view>
      </view>
    </view>
    <view class="card">
      <view class="title">我的训练计划</view>
      <view v-for="day in samplePlan" :key="day.weekDay" class="list-item">
        <view class="row"><text>{{ day.weekDay }}</text><text class="pill">{{ day.muscle }}</text></view>
        <view class="subtitle">{{ day.actions.join(' / ') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { buildLocalPlan } from '@/common/api.js'
export default {
  data() {
    return {
      entries: [
        { title: 'AI生成计划', desc: '按目标、天数、场景定制', url: '/pages/plan-generate/plan-generate' },
        { title: '家庭训练', desc: '无器械也能开始', url: '/pages/actions/actions?place=home' },
        { title: '健身房训练', desc: '器械路线与动作建议', url: '/pages/equipment/equipment' },
        { title: '动作库', desc: '胸背肩腿手臂核心', url: '/pages/actions/actions' }
      ],
      samplePlan: buildLocalPlan({ trainPlace: 'home', daysPerWeek: 3 })
    }
  },
  methods: { go(url) { uni.navigateTo({ url }) } }
}
</script>
