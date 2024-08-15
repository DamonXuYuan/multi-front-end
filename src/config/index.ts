export interface IConfig {
  cdnUrl: string
  authKey: string
  apiUrl: string
  baseUrl: string
}

export const config: IConfig = {
  cdnUrl: '',
  apiUrl: '',
  baseUrl: 'https://api.gxsccw.com',
  authKey: 'Authorization',
}
