<template>
  <view class="container">
    <view class="hero">
      <view class="title">AI体质评估 & 训练计划</view>
      <view class="subtitle">填写基础数据，生成 BMI、训练频率、热量需求和周计划。</view>
    </view>

    <view class="card">
      <text class="label">性别</text>
      <picker :range="genderLabels" @change="form.gender = genders[$event.detail.value].value"><view class="picker">{{ genderText }}</view></picker>
      <text class="label">年龄</text><input class="input" type="number" v-model="form.age" placeholder="例如 25" />
      <text class="label">身高（cm）</text><input class="input" type="number" v-model="form.height" placeholder="例如 175" />
      <text class="label">体重（kg）</text><input class="input" type="digit" v-model="form.weight" placeholder="例如 70" />
      <text class="label">体脂率（可选）</text><input class="input" type="digit" v-model="form.bodyFat" placeholder="例如 18" />
      <text class="label">目标</text>
      <picker :range="goalLabels" @change="form.goal = goals[$event.detail.value].value"><view class="picker">{{ goalText }}</view></picker>
      <text class="label">每周训练天数</text><input class="input" type="number" v-model="form.daysPerWeek" placeholder="3-5" />
      <text class="label">训练环境</text>
      <picker :range="placeLabels" @change="form.trainPlace = places[$event.detail.value].value"><view class="picker">{{ placeText }}</view></picker>
      <button class="btn" :loading="loading" @click="generate">生成计划</button>
    </view>

    <view v-if="plan.length" class="card">
      <view class="title">评估结果</view>
      <view class="grid">
        <view><view class="muted">BMI</view><view class="metric">{{ bmi }}</view></view>
        <view><view class="muted">建议频率</view><view class="metric">{{ form.daysPerWeek }} 天/周</view></view>
      </view>
      <view class="subtitle">体型分析：{{ bodyType }}</view>
      <view class="subtitle">热量 {{ diet.calories }} kcal；蛋白 {{ diet.protein }}g，碳水 {{ diet.carbs }}g，脂肪 {{ diet.fat }}g。</view>
      <view class="divider"></view>
      <view v-for="day in plan" :key="day.weekDay" class="list-item">
        <view class="row"><text>{{ day.weekDay }}</text><text class="pill">{{ day.muscle }}</text></view>
        <view class="subtitle">{{ day.actions.join(' / ') }}</view>
      </view>
      <view v-if="aiAdvice" class="subtitle">AI补充建议：{{ aiAdvice }}</view>
      <view v-if="saveStatus" class="subtitle">保存状态：{{ saveStatus }}</view>
    </view>
  </view>
</template>

<script>
import { goals, places } from '@/common/data.js'
import { buildLocalPlan, calcBMI, callAI, estimateDiet, getBodyType } from '@/common/api.js'
import { saveTrainingPlan, saveUserProfile } from '@/common/database.js'
export default {
  data() {
    return {
      genders: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }], goals, places,
      form: { gender: 'male', age: 25, height: 175, weight: 70, bodyFat: '', goal: 'fat_loss', daysPerWeek: 4, trainPlace: 'home' },
      loading: false, plan: [], diet: {}, aiAdvice: '', saveStatus: ''
    }
  },
  computed: {
    genderLabels() { return this.genders.map(i => i.label) }, goalLabels() { return this.goals.map(i => i.label) }, placeLabels() { return this.places.map(i => i.label) },
    genderText() { return this.genders.find(i => i.value === this.form.gender)?.label },
    goalText() { return this.goals.find(i => i.value === this.form.goal)?.label },
    placeText() { return this.places.find(i => i.value === this.form.trainPlace)?.label },
    bmi() { return calcBMI(this.form.height, this.form.weight) },
    bodyType() { return getBodyType(this.bmi, this.form.bodyFat) }
  },
  methods: {
    async generate() {
      this.loading = true
      this.plan = buildLocalPlan(this.form)
      this.diet = estimateDiet(this.form)
      this.aiAdvice = await callAI([{ role: 'user', content: `请基于以下新手健身数据给出100字内安全建议：${JSON.stringify(this.form)}，BMI ${this.bmi}` }], 'plan')
      await saveUserProfile({ ...this.form, nickname: '健身新手' })
      const saved = await saveTrainingPlan({ form: this.form, plan: this.plan, diet: this.diet, aiAdvice: this.aiAdvice })
      this.saveStatus = saved.ok ? '训练计划已写入 fitness_plan 数据库' : '云端写入失败，已本地缓存训练计划'
      this.loading = false
    }
  }
}
</script>
