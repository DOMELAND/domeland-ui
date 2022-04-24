import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const service: AxiosInstance = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: "/api",
  timeout: 10000,
});

// request interceptor
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (error.response.status == 403) {
      window.$message.error(`Error: ${error.response.status}`);
    } else {
      window.$message.error(`Error`);
    }
    return Promise.reject(error);
  }
);

export const request = (options: object) => {
  return new Promise((resolve, reject) => {
    // 请求处理
    service(options)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default request;
