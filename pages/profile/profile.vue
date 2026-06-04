<template>
  <view class="container">
    <view class="hero"><view class="title">我的</view><view class="subtitle">个人资料、身体数据、饮食计划、会员中心和设置。</view></view>
    <view class="card row">
      <view><view class="title">健身新手</view><view class="subtitle">目标：减脂 · 家庭训练</view></view><text class="pill">VIP 未开通</text>
    </view>
    <view class="card">
      <view v-for="item in menus" :key="item.title" class="list-item row" @click="go(item.url)">
        <text>{{ item.title }}</text><text>›</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return { menus: [
      { title: '个人资料', url: '' },
      { title: '身体数据', url: '/pages/body-record/body-record' },
      { title: '饮食计划', url: '/pages/diet-plan/diet-plan' },
      { title: '我的训练计划', url: '/pages/train/train' },
      { title: '会员中心', url: '/pages/vip-center/vip-center' },
      { title: '设置', url: '' },
      { title: '关于我们', url: '' }
    ] }
  },
  methods: { go(url) { if (url) uni.navigateTo({ url }) } }
}
</script>
