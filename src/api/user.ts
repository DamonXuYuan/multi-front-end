import ajax from '@/utils/request'

export const inviterelate = {
  fetcher: () => ajax.get('/api/user/inviterelate'),
  key: '/api/user/inviterelate',
}
export const sendEmailCode = {
  fetcher: (params: Record<string, any>) => ajax.post('/common/user/sendEmailCode', params),
  key: '/common/user/sendEmailCode',
}
export const checkEmailCode = {
  fetcher: (params: Record<string, any>) => ajax.post('/common/user/checkEmailCode', params),
  key: '/common/user/checkEmailCode',
}
export const editPassword = {
  fetcher: (params: Record<string, any>) => ajax.post('/common/user/editPassword', params),
  key: '/common/user/editPassword',
}
export const editEmail = {
  fetcher: (params: Record<string, any>) => ajax.post('/common/user/editEmail', params),
  key: '/common/user/editEmail',
}
export const invites = {
  fetcher: (params: Record<string, any>) => ajax.get('/api/user/invites', params),
  key: '/api/user/invites',
}
