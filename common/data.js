export const goals = [
  { label: '减脂', value: 'fat_loss' },
  { label: '增肌', value: 'muscle_gain' },
  { label: '塑形', value: 'body_shape' },
  { label: '提升体能', value: 'endurance' }
]

export const places = [
  { label: '家庭训练', value: 'home' },
  { label: '健身房训练', value: 'gym' }
]

export const actionLibrary = [
  {
    id: 'push-up', name: '俯卧撑', muscle: '胸部', level: 'beginner', group: '胸', sets: '4×10-12',
    description: '双手略宽于肩，身体保持一条直线，下放至胸部接近地面后推起。',
    tips: ['核心收紧，避免塌腰', '肘部约 45° 打开', '下放吸气，推起呼气'],
    errors: ['塌腰或撅臀', '耸肩', '半程动作']
  },
  {
    id: 'lat-pulldown', name: '高位下拉', muscle: '背部', level: 'beginner', group: '背', sets: '4×10-12',
    description: '坐稳后肩胛下沉，拉杆向锁骨上方移动，感受背阔肌发力。',
    tips: ['不要后仰过多', '先沉肩再拉肘', '还原时控制速度'],
    errors: ['用手臂硬拉', '身体摆动借力', '拉到脖子后方']
  },
  {
    id: 'dumbbell-press', name: '哑铃肩推', muscle: '肩部', level: 'beginner', group: '肩', sets: '3×10',
    description: '坐姿或站姿收紧核心，哑铃从耳侧向上推至手臂接近伸直。',
    tips: ['手腕保持中立', '避免腰椎过伸', '全程控制重量'],
    errors: ['耸肩', '身体后仰', '下放过快']
  },
  {
    id: 'squat', name: '徒手深蹲', muscle: '腿部', level: 'beginner', group: '腿', sets: '4×15',
    description: '双脚与肩同宽，髋部向后坐，下蹲至大腿接近水平后站起。',
    tips: ['膝盖朝脚尖方向', '脚掌三点稳定', '挺胸收腹'],
    errors: ['膝盖内扣', '脚跟离地', '弯腰塌背']
  },
  {
    id: 'plank', name: '平板支撑', muscle: '核心', level: 'beginner', group: '核心', sets: '3×45秒',
    description: '前臂支撑地面，肩、髋、踝保持直线，持续收紧腹部。',
    tips: ['自然呼吸', '骨盆微后倾', '肩膀远离耳朵'],
    errors: ['塌腰', '抬臀过高', '憋气']
  },
  {
    id: 'biceps-curl', name: '哑铃弯举', muscle: '手臂', level: 'beginner', group: '手臂', sets: '3×12',
    description: '上臂贴近身体，肘关节稳定，前臂弯举哑铃并缓慢下放。',
    tips: ['不要甩动身体', '顶峰停顿 1 秒', '下放控制离心'],
    errors: ['借力摆动', '肘部前移', '只做半程']
  }
]

export const equipmentLibrary = [
  {
    id: 'chest-press', name: '坐姿推胸机', targetMuscle: ['胸', '三头', '肩前束'],
    description: '调整座椅使把手与胸中部齐平，肩胛后缩下沉，向前推起后控制还原。',
    tips: ['背部贴紧靠垫', '肘部不要完全锁死', '选择可控重量']
  },
  {
    id: 'lat-pulldown-machine', name: '高位下拉器', targetMuscle: ['背阔肌', '肱二头肌'],
    description: '大腿固定，握距略宽于肩，沉肩后用肘向下带动拉杆。',
    tips: ['拉向锁骨上方', '避免身体大幅后仰', '不要拉到颈后']
  },
  {
    id: 'seated-row', name: '坐姿划船', targetMuscle: ['中背', '背阔肌', '后束'],
    description: '胸椎挺直，肩胛先后缩，再将手柄拉向腹部。',
    tips: ['不要耸肩', '还原时背部保持张力', '避免腰部借力']
  },
  {
    id: 'smith-machine', name: '史密斯机', targetMuscle: ['胸', '腿', '臀'],
    description: '固定轨迹杠铃适合卧推、深蹲和臀推，新手应先确认安全扣位置。',
    tips: ['先空杆熟悉轨迹', '设置保护限位', '不要把关节锁死']
  },
  {
    id: 'cable-machine', name: '龙门架', targetMuscle: ['胸', '背', '肩', '手臂'],
    description: '通过滑轮调节高度，可完成夹胸、下压、面拉、划船等动作。',
    tips: ['身体站稳', '保持绳索张力', '先学单一动作']
  },
  {
    id: 'squat-rack', name: '深蹲架', targetMuscle: ['腿', '臀', '核心'],
    description: '用于杠铃深蹲和硬拉辅助，训练前设置 J 钩与保护杆高度。',
    tips: ['保护杆略低于最低动作点', '保持脊柱中立', '新手建议有人保护']
  }
]

export const quickQuestions = [
  '我想减脂，每周练 4 天怎么安排？',
  '高位下拉怎么做才不会耸肩？',
  '训练后晚餐吃什么更适合增肌？',
  '久坐上班族如何改善体态？'
]
