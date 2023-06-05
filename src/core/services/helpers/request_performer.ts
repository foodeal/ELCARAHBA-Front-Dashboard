import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

class RequestPerformer {
  method: string;
  path: string;
  onSuccess: (response: AxiosResponse) => void;
  onFailure: (error: any) => void;
  data: Record<string, any>;

  constructor(method: string, path: string, onSuccess: (response: AxiosResponse) => void, onFailure: (error: any) => void) {
    this.method = method;
    this.path = path;
    this.onSuccess = onSuccess;
    this.onFailure = onFailure;
    this.data = {}
  }

  setData(data: Record<string, any>) {
    this.data = data;
  }

  performRequest() {
    const headers = { Accept: 'application/json' };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJpYXQiOjE2ODU5MjYwODcsImV4cCI6MTY4NjUzMDg4N30.RUgS2wvhg35nXjrN2dSFB_N_ld1ggOB66XzfplsnLe8";

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axios.request({
      method: this.method,
      url: this.path,
      headers: {
        ...headers,
      },
      data: this.data

    })
      .then((response: AxiosResponse) => {
        this.onSuccess(response);
      })
      .catch((error: any) => {
        this.onFailure(error);
      });
  }
}

export default RequestPerformer;