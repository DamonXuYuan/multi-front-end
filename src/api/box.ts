import ajax from '@/utils/request'

export const boxInfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/getMyInfo', params),
  key: '/box/getMyInfo',
}
export const boxGetList = {
  fetcher: () => ajax.get('/api/box/getList'),
  key: '/box/getList',
}
export const boxGetMyList = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/box/getMyList', params),
  key: '/box/getMyList',
}
