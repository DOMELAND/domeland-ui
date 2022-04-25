import { request } from "@/utils/request";

export function register(data = {}) {
  return request({
    url: "/register",
    method: "post",
    data,
  });
}

export function verifyToken(data = {}) {
  return request({
    url: "/verify",
    method: "get",
    params: data,
  });
}

export function changePwd(data = {}) {
  return request({
    url: "/changepass",
    method: "post",
    data,
  });
}
