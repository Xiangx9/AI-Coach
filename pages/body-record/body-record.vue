<template>
  <view class="container">
    <view class="hero">
      <view class="title">个人成长记录</view>
      <view class="subtitle">记录体重、体脂和围度变化，查看 BMI、周趋势与月趋势。</view>
    </view>

    <view class="card">
      <view class="title">新增身体数据</view>
      <text class="label">体重（kg）</text><input class="input" type="digit" v-model="form.weight" />
      <text class="label">体脂率（%）</text><input class="input" type="digit" v-model="form.bodyFat" />
      <text class="label">胸围（cm）</text><input class="input" type="digit" v-model="form.chest" />
      <text class="label">腰围（cm）</text><input class="input" type="digit" v-model="form.waist" />
      <text class="label">臂围（cm）</text><input class="input" type="digit" v-model="form.arm" />
      <button class="btn" @click="save">保存记录</button>
    </view>

    <view class="grid">
      <view class="card"><view class="muted">当前 BMI</view><view class="metric">{{ currentBmi }}</view></view>
      <view class="card"><view class="muted">本月体重变化</view><view class="metric">-1.8 kg</view></view>
    </view>

    <view class="card">
      <view class="title">周趋势</view>
      <view v-for="item in weekTrend" :key="item.day" class="list-item row">
        <text>{{ item.day }}</text><text>{{ item.weight }} kg / BMI {{ item.bmi }}</text>
      </view>
      <view class="divider"></view>
      <view class="title">月趋势</view>
      <view class="subtitle">近 30 天体重缓慢下降，腰围减少 2.4 cm；建议保持当前训练频率并保证蛋白摄入。</view>
    </view>
  </view>
</template>

<script>
import { calcBMI } from '@/common/api.js'
export default {
  data() {
    return {
      height: 175,
      form: { weight: 70, bodyFat: 18, chest: 95, waist: 80, arm: 35 },
      weekTrend: [
        { day: '周一', weight: 70.6, bmi: 23.1 },
        { day: '周三', weight: 70.2, bmi: 22.9 },
        { day: '周五', weight: 70.0, bmi: 22.9 }
      ]
    }
  },
  computed: { currentBmi() { return calcBMI(this.height, this.form.weight) } },
  methods: { save() { uni.showToast({ title: '已保存' }) } }
}
</script>
