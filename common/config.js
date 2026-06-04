export const CLOUD_CONFIG = {
  provider: 'tencent',
  spaceName: 'ai-coach',
  spaceId: 'env-00jy6faz3aab',
  spaceAppId: '2021005185664497',
  storageUploadDomain: 'https://u.object.cloudrun.cloudbaseapp.cn',
  storageDownloadDomain: 'https://env-00jy6faz3aab.normal.cloudstatic.cn',
  requestDomain: 'https://env-00jy6faz3aab.api-hz.cloudbasefunction.cn',
  socketDomain: 'wss://env-00jy6faz3aab.api-hz.cloudbasefunction.cn'
}

export const AI_CONFIG = {
  routerName: 'FreeToken Router',
  baseURL: 'https://api.chatanywhere.tech/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  temperature: 0.7
}
