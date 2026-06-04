<template>
  <view class="container">
    <view class="hero"><view class="title">我的</view><view class="subtitle">个人资料、身体数据、饮食计划、会员中心和设置。</view></view>
    <view class="card row">
      <view><view class="title">健身新手</view><view class="subtitle">目标：减脂 · 家庭训练</view></view><text class="pill">VIP 未开通</text>
    </view>
    <view class="card">
      <view v-for="item in menus" :key="item" class="list-item row"><text>{{ item }}</text><text>›</text></view>
    </view>
  </view>
</template>
<script>
export default { data() { return { menus: ['个人资料', '身体数据', '饮食计划', '我的训练计划', '会员中心', '设置', '关于我们'] } } }
</script>
