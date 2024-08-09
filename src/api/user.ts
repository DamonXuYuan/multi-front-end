import ajax from '@/utils/request'

export const inviterelate = {
  fetcher: () => ajax.get('/api/user/inviterelate'),
  key: '/user/inviterelate',
}
