import axios, { AxiosInstance } from "axios"
class HTTPRequest {
  request: AxiosInstance
  error: any
  requestInterceptors = {
    resolve: (config: any) => {
      config.headers = Object.assign(
        {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        config.headers || {}
      )
      return config
    },
    reject: (err: any) => {
      // eslint-disable-next-line
      this.error = err;
      return Promise.reject(err)
    },
  }
  options: Record<string, any> = {}
  constructor(option: any) {
    const opt = Object.assign({}, option || {})
    this.request = axios.create(opt)
    this.options = this.mergeOption(opt);
  }
  mergeOption(option: any) {
    this.options = Object.assign(this.request.defaults, option || {})
    return this.options
  }
  async send(option?: any): Promise<{ data: any, error?: any }> {
    this.error = '';
    return new Promise(async (resolve, reject) => {
      const interceptors = this.requestInterceptors;
      // 响应拦截
      this.request.interceptors.request.use(interceptors.resolve, interceptors.reject)
      this.request.interceptors.response.use(interceptors.resolve, interceptors.reject)
      let result = null;
      try {
        result = await this.request(this.mergeOption(option))
        resolve({ data: result });
      } catch (err) {
        resolve({ data: null, error: err });
      }
    })

  }


}
const request = async (url: string, option?: any) => {
  const http = new HTTPRequest({
    ...(option || {}), url
  })
  return await http.send();
}
export default request;
