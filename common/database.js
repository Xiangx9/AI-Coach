const DEMO_USER_ID = 'demo-user'
const PROFILE_CACHE_KEY = 'ai_coach_user_profile'

function now() {
  return Date.now()
}

export function getCurrentUserId() {
  try {
    const info = uniCloud.getCurrentUserInfo && uniCloud.getCurrentUserInfo()
    return info?.uid || DEMO_USER_ID
  } catch (error) {
    return DEMO_USER_ID
  }
}

export function getCachedProfile() {
  return uni.getStorageSync(PROFILE_CACHE_KEY) || null
}

export function cacheProfile(profile) {
  uni.setStorageSync(PROFILE_CACHE_KEY, profile)
}

async function upsertByUserId(collectionName, payload) {
  const db = uniCloud.database()
  const user_id = payload.user_id || getCurrentUserId()
  const collection = db.collection(collectionName)
  const existing = await collection.where({ user_id }).limit(1).get()
  const docs = existing.result?.data || existing.data || []
  if (docs.length) {
    await collection.doc(docs[0]._id).update({ ...payload, user_id, updateTime: now() })
    return docs[0]._id
  }
  const addResult = await collection.add({ ...payload, user_id, createTime: now(), updateTime: now() })
  return addResult.result?.id || addResult.id
}

export async function loadUserProfile() {
  const cached = getCachedProfile()
  try {
    const db = uniCloud.database()
    const user_id = getCurrentUserId()
    const result = await db.collection('users').where({ user_id }).limit(1).get()
    const docs = result.result?.data || result.data || []
    if (docs[0]) {
      cacheProfile(docs[0])
      return docs[0]
    }
  } catch (error) {
    console.warn('loadUserProfile fallback:', error)
  }
  return cached
}

export async function saveUserProfile(profile) {
  const user_id = getCurrentUserId()
  const payload = { ...profile, user_id, vip: Boolean(profile.vip) }
  cacheProfile(payload)
  try {
    const id = await upsertByUserId('users', payload)
    return { ok: true, id }
  } catch (error) {
    console.warn('saveUserProfile fallback:', error)
    return { ok: false, message: error.message, cached: true }
  }
}

export async function saveTrainingPlan({ form, plan, diet, aiAdvice }) {
  const user_id = getCurrentUserId()
  const payload = {
    user_id,
    title: `${form.goal === 'fat_loss' ? '减脂' : '健身'}训练计划`,
    goal: form.goal,
    daysPerWeek: Number(form.daysPerWeek) || 3,
    trainPlace: form.trainPlace,
    plan,
    dietSnapshot: diet,
    aiAdvice,
    createTime: now()
  }
  uni.setStorageSync('ai_coach_latest_training_plan', payload)
  try {
    const result = await uniCloud.database().collection('fitness_plan').add(payload)
    return { ok: true, id: result.result?.id || result.id }
  } catch (error) {
    console.warn('saveTrainingPlan fallback:', error)
    return { ok: false, message: error.message, cached: true }
  }
}

export async function saveDietPlan({ form, diet, meals }) {
  const user_id = getCurrentUserId()
  const payload = {
    user_id,
    goal: form.goal,
    height: Number(form.height),
    weight: Number(form.weight),
    calories: diet.calories,
    protein: diet.protein,
    carbs: diet.carbs,
    fat: diet.fat,
    breakfast: meals.find(item => item.name === '早餐')?.foods || [],
    lunch: meals.find(item => item.name === '午餐')?.foods || [],
    dinner: meals.find(item => item.name === '晚餐')?.foods || [],
    createTime: now()
  }
  uni.setStorageSync('ai_coach_latest_diet_plan', payload)
  try {
    const result = await uniCloud.database().collection('diet_plan').add(payload)
    return { ok: true, id: result.result?.id || result.id }
  } catch (error) {
    console.warn('saveDietPlan fallback:', error)
    return { ok: false, message: error.message, cached: true }
  }
}

export async function loadLatestTrainingPlan() {
  const cached = uni.getStorageSync('ai_coach_latest_training_plan') || null
  try {
    const db = uniCloud.database()
    const user_id = getCurrentUserId()
    const result = await db.collection('fitness_plan').where({ user_id }).orderBy('createTime', 'desc').limit(1).get()
    const docs = result.result?.data || result.data || []
    return docs[0] || cached
  } catch (error) {
    console.warn('loadLatestTrainingPlan fallback:', error)
    return cached
  }
}

export async function loadLatestDietPlan() {
  const cached = uni.getStorageSync('ai_coach_latest_diet_plan') || null
  try {
    const db = uniCloud.database()
    const user_id = getCurrentUserId()
    const result = await db.collection('diet_plan').where({ user_id }).orderBy('createTime', 'desc').limit(1).get()
    const docs = result.result?.data || result.data || []
    return docs[0] || cached
  } catch (error) {
    console.warn('loadLatestDietPlan fallback:', error)
    return cached
  }
}
