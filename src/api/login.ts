/**
 *
 *  pont不支持v1的swagger,因此手写
 *
 */
import Ajax from '@/utils/request'
const baseUrl = 'http://api.gxsccw.com/api'
const ajax = new Ajax(baseUrl)

// 注册
export const userRegister = {
  fetcher: (params: Record<string, any>) => ajax.post('/login/register', params),
  key: '/login/register',
}

// 登陆
export const userLogin = {
  fetcher: (params: Record<string, any>) => ajax.post('/login/passwordLogin', params),
  key: '/login/passwordLogin',
}
