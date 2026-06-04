<template>
  <view class="container">
    <view class="hero"><view class="title">我的</view><view class="subtitle">个人资料、身体数据、饮食计划、会员中心和设置。</view></view>
    <view class="card profile-card">
      <image class="avatar" :src="profile.avatar || defaultAvatar" mode="aspectFill"></image>
      <view class="profile-main">
        <view class="row">
          <view class="title">{{ profile.nickname || '健身新手' }}</view>
          <text class="pill">{{ profile.vip ? 'VIP 已开通' : 'VIP 未开通' }}</text>
        </view>
        <view class="subtitle">姓名：{{ profile.realName || '未填写' }} · 性别：{{ genderText }}</view>
        <view class="subtitle">{{ profile.age || '--' }}岁 · {{ profile.height || '--' }}cm · {{ profile.weight || '--' }}kg</view>
        <view class="subtitle">目标：{{ goalText }} · {{ placeText }}</view>
      </view>
    </view>
    <view class="card">
      <view v-for="item in menus" :key="item.title" class="list-item row" @click="go(item.url)">
        <text>{{ item.title }}</text><text>›</text>
      </view>
    </view>
  </view>
</template>
<script>
import { goals, places } from '@/common/data.js'
import { getCachedProfile, loadUserProfile } from '@/common/database.js'

export default {
  data() {
    return {
      defaultAvatar: 'https://env-00jy6faz3aab.normal.cloudstatic.cn/avatar-default.png',
      profile: getCachedProfile() || { nickname: '健身新手', gender: 'male', goal: 'fat_loss', trainPlace: 'home', vip: false },
      menus: [
        { title: '个人资料', url: '/pages/profile-edit/profile-edit' },
        { title: '身体数据', url: '/pages/body-record/body-record' },
        { title: '饮食计划', url: '/pages/diet-plan/diet-plan' },
        { title: '我的训练计划', url: '/pages/train/train' },
        { title: '会员中心', url: '/pages/vip-center/vip-center' },
        { title: '设置', url: '' },
        { title: '关于我们', url: '' }
      ]
    }
  },
  computed: {
    genderText() { return { male: '男', female: '女', unknown: '保密' }[this.profile.gender] || '未填写' },
    goalText() { return goals.find(item => item.value === this.profile.goal)?.label || '未设置' },
    placeText() { return places.find(item => item.value === this.profile.trainPlace)?.label || '未设置' }
  },
  onShow() { this.refreshProfile() },
  methods: {
    go(url) { if (url) uni.navigateTo({ url }) },
    async refreshProfile() {
      const profile = await loadUserProfile()
      if (profile) this.profile = { ...this.profile, ...profile }
    }
  }
}
</script>
<style scoped>
.profile-card { display: flex; gap: 22rpx; align-items: center; }
.avatar { width: 132rpx; height: 132rpx; border-radius: 66rpx; background: #e5e7eb; flex-shrink: 0; }
.profile-main { flex: 1; min-width: 0; }
</style>
