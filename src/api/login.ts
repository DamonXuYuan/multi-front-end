/**
 *
 *  pont不支持v1的swagger,因此手写
 *
 */
import ajax from '@/utils/request'

// 注册
export const userRegister = {
  fetcher: (params: Record<string, any>) => ajax.post('/api/login/register', params),
  key: '/login/register',
}

// 登陆
export const userLogin = {
  fetcher: (params: Record<string, any>) => ajax.post('/api/login/passwordLogin', params),
  key: '/login/passwordLogin',
}

// 发送验证码
export const sendCode = {
  fetcher: (params: Record<string, any>) => ajax.post('/common/user/sendEmailCode', params),
  key: '/login/sendCode',
}
