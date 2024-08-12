import ajax from '@/utils/request'

export const afficheGetNew = {
  fetcher: () => ajax.get('/api/affiche/getNew'),
  key: '/affiche/getNew',
}
