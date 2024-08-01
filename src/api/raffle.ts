/**
 *
 *  pont不支持v1的swagger,因此手写
 *
 */
import ajax from '@/utils/request'

// 获取抽签列表
export const getRaffleList = {
  fetcher: (params: Record<string, any>) => ajax.get('/lottery/getList', params),
  key: '/lottery/getList',
}

// 获取抽签详情
export const getRaffleDetail = {
  fetcher: (params: Record<string, any>) => ajax.get('/lottery/getLotteryInfo', params),
  key: '/lottery/getLotteryInfo',
}
