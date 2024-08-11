import ajax from '@/utils/request'

export const boxInfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/box/getMyInfo', params),
  key: '/box/getMyInfo',
}
export const inviteinfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/box/inviteinfo', params),
  key: '/box/inviteinfo',
}
export const boxGetList = {
  fetcher: () => ajax.get('/api/box/getList'),
  key: '/box/getList',
}
export const receive = {
  fetcher: () => ajax.post('/box/receive'),
  key: '/box/receive',
}
export const boxGetMyList = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/getMyList', params),
  key: '/api/box/getMyList',
}
