<template>
  <view class="container">
    <view class="hero">
      <view class="title">AI饮食计划</view>
      <view class="subtitle">根据目标、身高和体重估算热量、蛋白质、碳水、脂肪，并给出三餐推荐。</view>
    </view>

    <view class="card">
      <text class="label">目标</text>
      <picker :range="goalLabels" @change="form.goal = goals[$event.detail.value].value"><view class="picker">{{ goalText }}</view></picker>
      <text class="label">身高（cm）</text><input class="input" type="number" v-model="form.height" />
      <text class="label">体重（kg）</text><input class="input" type="digit" v-model="form.weight" />
      <button class="btn" @click="generate">生成饮食计划</button>
    </view>

    <view class="grid">
      <view class="card"><view class="muted">热量</view><view class="metric">{{ diet.calories }} kcal</view></view>
      <view class="card"><view class="muted">蛋白质</view><view class="metric">{{ diet.protein }} g</view></view>
      <view class="card"><view class="muted">碳水</view><view class="metric">{{ diet.carbs }} g</view></view>
      <view class="card"><view class="muted">脂肪</view><view class="metric">{{ diet.fat }} g</view></view>
    </view>

    <view class="card">
      <view class="title">饮食推荐</view>
      <view v-for="meal in meals" :key="meal.name" class="list-item">
        <view class="row"><text>{{ meal.name }}</text><text class="pill">{{ meal.tag }}</text></view>
        <view class="subtitle">{{ meal.foods.join(' / ') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { goals } from '@/common/data.js'
import { estimateDiet } from '@/common/api.js'
export default {
  data() {
    return {
      goals,
      form: { goal: 'fat_loss', height: 175, weight: 70, age: 25, gender: 'male' },
      diet: estimateDiet({ goal: 'fat_loss', height: 175, weight: 70, age: 25, gender: 'male' }),
      meals: [
        { name: '早餐', tag: '高蛋白', foods: ['鸡蛋', '牛奶', '全麦面包'] },
        { name: '午餐', tag: '训练日', foods: ['鸡胸肉', '米饭', '西兰花'] },
        { name: '晚餐', tag: '轻负担', foods: ['牛肉', '红薯', '青菜'] }
      ]
    }
  },
  computed: {
    goalLabels() { return this.goals.map(i => i.label) },
    goalText() { return this.goals.find(i => i.value === this.form.goal)?.label }
  },
  methods: { generate() { this.diet = estimateDiet(this.form) } }
}
</script>
