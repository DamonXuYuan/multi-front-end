import ajax from '@/utils/request'

export const boxInfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/box/getMyInfo', params),
  key: '/box/getMyInfo',
}
export const boxGetList = {
  fetcher: () => ajax.get('/box/getList'),
  key: '/box/getList',
}
export const boxGetMyList = {
  fetcher: (params: Record<string, any>) => ajax.get('/box/getMyList', params),
  key: '/box/getMyList',
}
