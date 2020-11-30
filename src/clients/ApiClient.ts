import axios, { AxiosRequestConfig, Method } from 'axios';

export default class ApiClient {
  baseURL: string;
  
  constructor(baseURL: string){
    this.baseURL = baseURL;
  }

  buildRequest(path: string = '/', method: Method): AxiosRequestConfig {
    return {
      method,
      url: path,
      baseURL: this.baseURL
    }
  }

  async get(path: string = '/', params?: any): Promise<any>{
    const request = this.buildRequest(path, 'get' as Method);

    if (params){
      request.params = params;
    }

    return this.sendRequest(request);
  }

  async sendRequest(request: AxiosRequestConfig): Promise<any> {
    const response = await axios.request(request);
    return response.data;
  }
}