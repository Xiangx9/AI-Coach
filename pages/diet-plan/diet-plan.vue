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
      <button class="btn" :loading="saving" @click="generate">生成并保存饮食计划</button>
    </view>

    <view class="grid">
      <view class="card"><view class="muted">热量</view><view class="metric">{{ diet.calories }} kcal</view></view>
      <view class="card"><view class="muted">蛋白质</view><view class="metric">{{ diet.protein }} g</view></view>
      <view class="card"><view class="muted">碳水</view><view class="metric">{{ diet.carbs }} g</view></view>
      <view class="card"><view class="muted">脂肪</view><view class="metric">{{ diet.fat }} g</view></view>
    </view>

    <view class="card">
      <view class="title">饮食推荐</view>
      <view v-if="saveStatus" class="subtitle">保存状态：{{ saveStatus }}</view>
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
import { loadLatestDietPlan, saveDietPlan } from '@/common/database.js'
export default {
  data() {
    return {
      goals,
      form: { goal: 'fat_loss', height: 175, weight: 70, age: 25, gender: 'male' },
      diet: estimateDiet({ goal: 'fat_loss', height: 175, weight: 70, age: 25, gender: 'male' }),
      saving: false,
      saveStatus: '',
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
  async onLoad() {
    const saved = await loadLatestDietPlan()
    if (saved) {
      this.form = { ...this.form, goal: saved.goal || this.form.goal, height: saved.height || this.form.height, weight: saved.weight || this.form.weight }
      this.diet = { calories: saved.calories, protein: saved.protein, carbs: saved.carbs, fat: saved.fat }
      this.meals = [
        { name: '早餐', tag: '高蛋白', foods: saved.breakfast?.length ? saved.breakfast : this.meals[0].foods },
        { name: '午餐', tag: '训练日', foods: saved.lunch?.length ? saved.lunch : this.meals[1].foods },
        { name: '晚餐', tag: '轻负担', foods: saved.dinner?.length ? saved.dinner : this.meals[2].foods }
      ]
      this.saveStatus = '已加载最近一次饮食计划'
    }
  },
  methods: {
    async generate() {
      this.saving = true
      this.diet = estimateDiet(this.form)
      const saved = await saveDietPlan({ form: this.form, diet: this.diet, meals: this.meals })
      this.saveStatus = saved.ok ? '饮食计划已写入 diet_plan 数据库' : '云端写入失败，已本地缓存饮食计划'
      this.saving = false
    }
  }
}
</script>
