<template>
  <view class="container">
    <view class="hero"><view class="title">动作库</view><view class="subtitle">按胸、背、肩、腿、手臂、核心分类学习标准动作。</view></view>
    <view class="card">
      <view class="row chips"><text v-for="g in groups" :key="g" :class="['pill', active === g ? 'active' : '']" @click="active = g">{{ g }}</text></view>
      <view v-for="item in filtered" :key="item.id" class="list-item" @click="go(item.id)">
        <view class="row"><text class="title">{{ item.name }}</text><text class="pill">{{ item.level }}</text></view>
        <view class="subtitle">{{ item.description }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { actionLibrary } from '@/common/data.js'
export default {
  data() { return { active: '全部', actions: actionLibrary } },
  computed: {
    groups() { return ['全部', ...new Set(this.actions.map(i => i.group))] },
    filtered() { return this.active === '全部' ? this.actions : this.actions.filter(i => i.group === this.active) }
  },
  methods: { go(id) { uni.navigateTo({ url: `/pages/action-detail/action-detail?id=${id}` }) } }
}
</script>
<style scoped>
.chips { flex-wrap: wrap; justify-content: flex-start; }
.active { background: #10b981; color: #ffffff; }
</style>
