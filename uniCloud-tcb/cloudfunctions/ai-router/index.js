'use strict'

const DEFAULT_ENDPOINT = 'https://api.chatanywhere.tech/v1/chat/completions'
const DEFAULT_MODEL = 'gpt-3.5-turbo'

exports.main = async (event) => {
  const messages = Array.isArray(event.messages) ? event.messages : []
  if (!messages.length) {
    return { code: 400, message: 'messages is required' }
  }

  const apiKey = process.env.FREETOKEN_API_KEY
  if (!apiKey) {
    return {
      code: 500,
      message: '请在 UniCloud 云函数环境变量中配置 FREETOKEN_API_KEY，避免把密钥暴露在小程序前端。'
    }
  }

  const response = await uniCloud.httpclient.request(process.env.FREETOKEN_API_URL || DEFAULT_ENDPOINT, {
    method: 'POST',
    dataType: 'json',
    contentType: 'json',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    data: {
      model: process.env.FREETOKEN_MODEL || DEFAULT_MODEL,
      messages,
      temperature: Number(process.env.FREETOKEN_TEMPERATURE || 0.7)
    }
  })

  const data = response.data || {}
  if (response.status >= 400) {
    return { code: response.status, message: data.error?.message || 'FreeToken Router request failed', raw: data }
  }

  return {
    code: 0,
    scene: event.scene || 'chat',
    content: data.choices?.[0]?.message?.content || '',
    usage: data.usage || null
  }
}
