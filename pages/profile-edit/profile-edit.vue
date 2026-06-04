<template>
  <view class="container">
    <view class="hero">
      <view class="title">编辑个人资料</view>
      <view class="subtitle">完善头像、姓名、性别、身体数据与训练目标，保存后会写入 users 数据库。</view>
    </view>

    <view class="card center">
      <image class="avatar" :src="form.avatar || defaultAvatar" mode="aspectFill"></image>
      <button class="btn secondary" @click="chooseAvatar">更换头像</button>
    </view>

    <view class="card">
      <text class="label">昵称</text><input class="input" v-model="form.nickname" placeholder="例如：健身新手" />
      <text class="label">姓名</text><input class="input" v-model="form.realName" placeholder="例如：张三" />
      <text class="label">性别</text>
      <picker :range="genderLabels" @change="form.gender = genders[$event.detail.value].value"><view class="picker">{{ genderText }}</view></picker>
      <text class="label">年龄</text><input class="input" type="number" v-model="form.age" />
      <text class="label">身高（cm）</text><input class="input" type="number" v-model="form.height" />
      <text class="label">体重（kg）</text><input class="input" type="digit" v-model="form.weight" />
      <text class="label">体脂率（可选）</text><input class="input" type="digit" v-model="form.bodyFat" />
      <text class="label">健身目标</text>
      <picker :range="goalLabels" @change="form.goal = goals[$event.detail.value].value"><view class="picker">{{ goalText }}</view></picker>
      <text class="label">训练环境</text>
      <picker :range="placeLabels" @change="form.trainPlace = places[$event.detail.value].value"><view class="picker">{{ placeText }}</view></picker>
      <button class="btn" :loading="saving" @click="save">保存资料</button>
    </view>
  </view>
</template>

<script>
import { goals, places } from '@/common/data.js'
import { loadUserProfile, saveUserProfile } from '@/common/database.js'

export default {
  data() {
    return {
      defaultAvatar: 'https://env-00jy6faz3aab.normal.cloudstatic.cn/avatar-default.png',
      saving: false,
      genders: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }, { label: '保密', value: 'unknown' }],
      goals,
      places,
      form: {
        nickname: '健身新手', realName: '', avatar: '', gender: 'male', age: 25,
        height: 175, weight: 70, bodyFat: '', goal: 'fat_loss', trainPlace: 'home', vip: false
      }
    }
  },
  computed: {
    genderLabels() { return this.genders.map(item => item.label) },
    goalLabels() { return this.goals.map(item => item.label) },
    placeLabels() { return this.places.map(item => item.label) },
    genderText() { return this.genders.find(item => item.value === this.form.gender)?.label || '男' },
    goalText() { return this.goals.find(item => item.value === this.form.goal)?.label || '减脂' },
    placeText() { return this.places.find(item => item.value === this.form.trainPlace)?.label || '家庭训练' }
  },
  async onLoad() {
    const profile = await loadUserProfile()
    if (profile) this.form = { ...this.form, ...profile }
  },
  methods: {
    chooseAvatar() {
      uni.chooseImage({
        count: 1,
        success: async res => {
          const filePath = res.tempFilePaths[0]
          this.form.avatar = filePath
          try {
            const upload = await uniCloud.uploadFile({ cloudPath: `avatars/${Date.now()}.jpg`, filePath })
            this.form.avatar = upload.fileID
          } catch (error) {
            console.warn('avatar upload fallback:', error)
          }
        }
      })
    },
    async save() {
      this.saving = true
      const result = await saveUserProfile(this.form)
      this.saving = false
      uni.showToast({ title: result.ok ? '资料已保存' : '已本地缓存', icon: result.ok ? 'success' : 'none' })
      if (result.ok) setTimeout(() => uni.navigateBack(), 500)
    }
  }
}
</script>

<style scoped>
.center { display: flex; flex-direction: column; align-items: center; gap: 20rpx; }
.avatar { width: 160rpx; height: 160rpx; border-radius: 80rpx; background: #e5e7eb; }
</style>
