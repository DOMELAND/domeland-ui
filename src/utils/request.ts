import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useChainStore } from "@/stores/chainStore";

const service: AxiosInstance = axios.create({
  baseURL: "/web3",
  timeout: 10000,
});

// request interceptor
service.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const chain = useChainStore();
    const web3token = chain.token;
    config.headers.Authorization = web3token;
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
    const response = error.response;
    if (response.status == 403) {
      window.$message.error(`Error: ${response.status}`);
    } else {
      const msg = response.data.message || "Error";
      window.$message.error(msg);
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
