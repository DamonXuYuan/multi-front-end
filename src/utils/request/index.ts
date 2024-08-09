import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Router from 'next/router'
import { getLocalStorage, removeLocalStorage } from '@/utils/storage'

// const baseURLMap = new Map() //不同baseUrl的映射

class Ajax {
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl
  }
  public static setHeader(headerName: string, value: string) {
    if (!headerName) {
      console.error('setHeader', '参数不合法')
      return
    }
    axios.interceptors.request.use(
      (config: any) => {
        // config.headers['Access-Control-Allow-Origin'] = '*'
        // config.headers['Access-Control-Allow-Methods'] = '*'
        // config.headers['Access-Control-Allow-Headers'] = '*'
        config.headers[headerName] = value
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  private baseUrl = '' //TODO:添加baseUrl

  public request(params: AxiosRequestConfig): Promise<any> {
    const newParams = {
      ...params,
      // TODO:其他默认的值
    }

    return new Promise((resolve) => {
      axios({ ...newParams, url: `${this.baseUrl}${params.url}` })
        .then((res: AxiosResponse) => {
          console.log('res', res)
          if (res.status === 200) {
            switch (res?.data?.code) {
              case 0:
                resolve(res?.data)
                break
              case 1001:
                Router.push('/login')
                removeLocalStorage('userInfo')
                break
              case 401:
                // TODO:鉴权
                break
              default:
                resolve(res?.data)
                break
            }
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((err: AxiosError) => {
          // TODO: 错误处理
          resolve(err?.response)
        })
    })
  }
  private queryString(url: string, query?: Record<string, string>): string {
    const str = []
    for (const key in query) {
      str.push(key + '=' + query[key])
    }
    const paramStr = str.join('&')
    return paramStr ? `${url}?${paramStr}` : url
  }

  public get(url = '', params: Record<string, string> = {}): Promise<any> {
    return this.request({
      method: 'get',
      url: this.queryString(`${url}`, params),
    })
  }

  public setBaseUrl = (url: string) => {
    this.baseUrl = url
  }

  public post(url: string, params?: Record<string, any>): Promise<any> {
    return this.request({
      method: 'post',
      url: `${url}`,
      data: params,
    })
  }
}
let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://api.gxsccw.com'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '/'
}
if (typeof window !== 'undefined') {
  const userInfo = getLocalStorage('userInfo')
  const token = userInfo ? JSON.parse(userInfo).token : ''
  Ajax.setHeader('token', token)
}
export default new Ajax(baseUrl)
