import { actionLibrary, equipmentLibrary } from './data.js'

const SYSTEM_PROMPT = `你是AI健身指导小程序的专业教练。回答必须适合健身新手，包含安全提醒；如用户有伤病、疼痛、慢性病或孕期情况，建议先咨询医生或线下专业教练。`

function fallbackReply(content) {
  const text = content || ''
  if (text.includes('饮食') || text.includes('吃')) {
    return '饮食建议：优先保证蛋白质（鸡蛋、鱼虾、鸡胸、牛奶、豆制品），每餐搭配主食和蔬菜。减脂期保持轻微热量缺口，增肌期保持小幅热量盈余。'
  }
  if (text.includes('器械') || text.includes('高位下拉')) {
    return '器械指导：先调好座椅和重量，动作全程保持核心收紧，避免借力。高位下拉要先沉肩，再用肘部向下带动拉杆到锁骨上方。'
  }
  return '训练建议：新手建议每周 3-4 次训练，每次 45-60 分钟。先热身 8-10 分钟，再完成复合动作和核心训练，最后拉伸放松。动作过程中如有疼痛请立即停止。'
}

export async function callAI(messages, scene = 'chat') {
  try {
    const result = await uniCloud.callFunction({
      name: 'ai-router',
      data: { scene, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages] }
    })
    return result.result?.content || fallbackReply(messages[messages.length - 1]?.content)
  } catch (error) {
    console.warn('ai-router fallback:', error)
    return fallbackReply(messages[messages.length - 1]?.content)
  }
}

export function calcBMI(height, weight) {
  const h = Number(height) / 100
  const w = Number(weight)
  if (!h || !w) return '--'
  return (w / (h * h)).toFixed(1)
}

export function getBodyType(bmi, bodyFat) {
  const value = Number(bmi)
  const fat = Number(bodyFat)
  if (!value) return '数据不足，建议补充身高体重'
  if (value < 18.5) return '偏瘦体型，建议从力量训练和充足热量摄入开始'
  if (value >= 24) return '体重偏高，建议以低冲击有氧配合力量训练循序减脂'
  if (fat && fat > 22) return 'BMI 正常但体脂偏高，建议提升力量训练比例并控制精制碳水'
  return '基础体型正常，适合按目标进行塑形或增肌训练'
}

export function estimateDiet({ goal, height, weight, age, gender }) {
  const w = Number(weight) || 60
  const h = Number(height) || 170
  const a = Number(age) || 25
  const base = gender === 'female' ? 10 * w + 6.25 * h - 5 * a - 161 : 10 * w + 6.25 * h - 5 * a + 5
  const calories = Math.round((goal === 'fat_loss' ? base * 1.35 - 300 : base * 1.45 + 200) / 10) * 10
  return {
    calories,
    protein: Math.round(w * (goal === 'muscle_gain' ? 2 : 1.7)),
    carbs: Math.round((calories * 0.45) / 4),
    fat: Math.round((calories * 0.25) / 9)
  }
}

export function buildLocalPlan(form) {
  const gym = form.trainPlace === 'gym'
  const days = Math.min(Math.max(Number(form.daysPerWeek) || 3, 2), 6)
  const templates = gym
    ? [
        ['周一', '胸+三头', ['坐姿推胸机 4×10（休息90秒）', '俯卧撑 3×12（休息60秒）', '绳索下压 3×12（休息60秒）']],
        ['周二', '背+二头', ['高位下拉 4×10（休息90秒）', '坐姿划船 4×10（休息90秒）', '哑铃弯举 3×12（休息60秒）']],
        ['周三', '腿臀', ['史密斯深蹲 4×10（休息120秒）', '腿举 3×12（休息90秒）', '平板支撑 3×45秒（休息45秒）']],
        ['周四', '肩+核心', ['哑铃肩推 3×10（休息90秒）', '绳索面拉 3×15（休息60秒）', '卷腹 3×15（休息45秒）']],
        ['周五', '全身燃脂', ['深蹲架深蹲 4×8（休息120秒）', '龙门架划船 3×12（休息90秒）', '椭圆机 20分钟']],
        ['周六', '弱项强化', ['选择薄弱部位动作 4 组', '核心循环 12分钟', '拉伸 10分钟']]
      ]
    : [
        ['周一', '上肢推', ['俯卧撑 4×12（休息60秒）', '跪姿俯卧撑 3×12（休息60秒）', '平板支撑 3×45秒（休息45秒）']],
        ['周二', '下肢', ['徒手深蹲 4×15（休息60秒）', '弓步蹲 3×12/侧（休息60秒）', '臀桥 4×15（休息45秒）']],
        ['周三', '核心', ['平板支撑 4×45秒（休息45秒）', '死虫 3×12/侧（休息45秒）', '登山跑 3×30秒（休息45秒）']],
        ['周四', '上肢拉', ['弹力带划船 4×12', '俯身 YTWL 3×12', '哑铃弯举 3×12']],
        ['周五', '燃脂循环', ['开合跳 4×45秒', '波比退阶 3×10', '深蹲跳 3×10']],
        ['周六', '恢复拉伸', ['动态拉伸 10分钟', '低强度步行 30分钟', '泡沫轴放松']]
      ]
  return templates.slice(0, days).map(([weekDay, muscle, actions]) => ({ weekDay, muscle, actions }))
}

export function getAction(id) {
  return actionLibrary.find(item => item.id === id) || actionLibrary[0]
}

export function getEquipment(id) {
  return equipmentLibrary.find(item => item.id === id) || equipmentLibrary[0]
}
