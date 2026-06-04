# AI健身指导小程序

基于仓库中的 PRD、页面结构和 UniCloud MongoDB 设计，已搭建一个 **UniApp 小程序 + UniCloud 云函数 + FreeToken Router** 的 AI 健身指导 MVP。

## 功能范围

- 首页：用户信息卡片、今日训练、饮食目标、推荐课程、动作库和器械入口。
- 训练：AI 生成计划、家庭训练、健身房训练、动作库。
- AI 生成计划：输入性别、年龄、身高、体重、目标、训练天数和训练环境，生成 BMI、热量宏量营养估算与周训练计划。
- 动作库：胸、背、肩、腿、手臂、核心分类动作讲解、常见错误和推荐组数。
- 健身房器械：坐姿推胸机、高位下拉器、坐姿划船、史密斯机、龙门架、深蹲架。
- AI 教练：聊天窗口、快捷问题、饮食/训练/器械咨询。
- AI 动作分析：上传图片或视频后获取姿势建议（当前为文本 AI 分析 MVP）。
- 打卡与我的：训练完成记录、统计和个人中心入口。
- 个人成长记录：体重、体脂、围度、BMI、周趋势和月趋势。
- 会员中心：免费版/会员版权益、月会员/季会员/年会员方案。

## UniCloud 服务空间

`common/config.js` 中记录了服务空间与域名信息：

- 服务空间名称：`ai-coach`
- SpaceId：`env-00jy6faz3aab`
- SpaceAppId：`2021005185664497`
- request 域名：`https://env-00jy6faz3aab.api-hz.cloudbasefunction.cn`
- socket 域名：`wss://env-00jy6faz3aab.api-hz.cloudbasefunction.cn`

> 安全说明：AK/SK 和 AI API Key 不应提交到前端代码仓库。请在 UniCloud 控制台或云函数环境变量中配置。

## FreeToken Router 配置

云函数路径：`uniCloud-tcb/cloudfunctions/ai-router`。

请在 UniCloud 云函数环境变量中设置：

```bash
FREETOKEN_API_KEY=你的 FreeToken Router Key
FREETOKEN_API_URL=https://api.chatanywhere.tech/v1/chat/completions
FREETOKEN_MODEL=gpt-3.5-turbo
FREETOKEN_TEMPERATURE=0.7
```

前端通过 `uniCloud.callFunction({ name: 'ai-router' })` 调用，避免密钥暴露在小程序端。

## 本地检查

```bash
npm test
```

该命令会校验 `package.json`、`pages.json`、`manifest.json` 是否为合法 JSON。

## HBuilderX / UniApp 运行

1. 使用 HBuilderX 打开本仓库。
2. 关联 UniCloud 服务空间 `ai-coach`。
3. 上传并部署 `uniCloud-tcb/cloudfunctions/ai-router` 云函数。
4. 在云函数环境变量中配置 `FREETOKEN_API_KEY` 等参数。
5. 运行到微信小程序或 H5 进行调试。
