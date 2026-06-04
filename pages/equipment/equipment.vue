<template>
  <view class="container">
    <view class="hero"><view class="title">健身房器械</view><view class="subtitle">认识常见器械，了解使用方法、锻炼肌群和常见错误。</view></view>
    <view class="card">
      <view v-for="item in equipment" :key="item.id" class="list-item" @click="go(item.id)">
        <view class="row"><text class="title">{{ item.name }}</text><text class="pill">{{ item.targetMuscle[0] }}</text></view>
        <view class="subtitle">{{ item.description }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import { equipmentLibrary } from '@/common/data.js'
export default { data() { return { equipment: equipmentLibrary } }, methods: { go(id) { uni.navigateTo({ url: `/pages/equipment-detail/equipment-detail?id=${id}` }) } } }
</script>
