import ajax from '@/utils/request'

export const inviterelate = {
  fetcher: () => ajax.get('/user/inviterelate'),
  key: '/user/inviterelate',
}
