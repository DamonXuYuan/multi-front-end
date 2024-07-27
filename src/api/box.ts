import ajax from '@/utils/request'

export const boxInfo = {
  fetcher: (params: Record<string, any>) => ajax.get('/box/receive', params),
  key: '/box/receive',
}