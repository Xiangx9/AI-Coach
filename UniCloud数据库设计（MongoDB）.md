# UniCloud 数据库设计

## users 用户表

```json
{
  "_id":"",
  "nickname":"",
  "avatar":"",
  "gender":"male",
  "age":25,
  "height":175,
  "weight":70,
  "bodyFat":15,
  "goal":"fat_loss",
  "trainPlace":"home",
  "vip":false,
  "createTime":0
}
```

---

## fitness_plan 训练计划表

```json
{
  "_id":"",
  "user_id":"",
  "title":"减脂训练计划",
  "goal":"fat_loss",
  "daysPerWeek":4,
  "plan":[
    {
      "weekDay":"Monday",
      "muscle":"胸部",
      "actions":[]
    }
  ],
  "createTime":0
}
```

---

## action_library 动作库

```json
{
  "_id":"",
  "name":"俯卧撑",
  "muscle":"胸部",
  "level":"beginner",
  "video":"",
  "gif":"",
  "description":"",
  "tips":"",
  "errors":[]
}
```

---

## gym_equipment 器械库

```json
{
  "_id":"",
  "name":"史密斯机",
  "image":"",
  "video":"",
  "description":"",
  "targetMuscle":[
    "胸",
    "腿"
  ],
  "tips":""
}
```

---

## diet_plan 饮食计划

```json
{
  "_id":"",
  "user_id":"",
  "calories":2200,
  "protein":150,
  "carbs":240,
  "fat":60,
  "breakfast":[],
  "lunch":[],
  "dinner":[],
  "createTime":0
}
```

---

## ai_chat_record

```json
{
  "_id":"",
  "user_id":"",
  "role":"user",
  "content":"",
  "createTime":0
}
```

---

## action_analysis

```json
{
  "_id":"",
  "user_id":"",
  "videoUrl":"",
  "result":"",
  "score":90,
  "suggestions":[
    "背部不够挺直"
  ],
  "createTime":0
}
```

---

## checkin_record

```json
{
  "_id":"",
  "user_id":"",
  "plan_id":"",
  "duration":45,
  "calories":320,
  "status":true,
  "createTime":0
}
```

---

## body_record

```json
{
  "_id":"",
  "user_id":"",
  "weight":70,
  "bodyFat":15,
  "chest":95,
  "waist":80,
  "arm":35,
  "createTime":0
}
```

---

## vip_order

```json
{
  "_id":"",
  "user_id":"",
  "orderNo":"",
  "amount":99,
  "type":"month",
  "status":"paid",
  "createTime":0
}
```
