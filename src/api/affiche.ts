import ajax from '@/utils/request'

export const afficheGetNew = {
  fetcher: () => ajax.get('/affiche/getNew'),
  key: '/affiche/getNew',
}
