import ajax from '@/utils/request'

export const boxInfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/getMyInfo', params),
  key: '/box/getMyInfo',
}
export const inviteinfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/inviteinfo', params),
  key: '/api/box/inviteinfo',
}
export const boxGetList = {
  fetcher: () => ajax.get('/api/box/getList'),
  key: '/box/getList',
}
export const receive = {
  fetcher: () => ajax.post('/api/box/receive'),
  key: '/api/box/receive',
}
export const boxGetMyList = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/getMyList', params),
  key: '/api/box/getMyList',
}
