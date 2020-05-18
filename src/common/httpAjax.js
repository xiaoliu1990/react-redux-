/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import { Toast } from 'antd-mobile';
import axios from 'axios';
import {ToastCiYun} from './toast';
const axiosHttp = axios.create({ // 创建服务
  timeout: 30000, // 请求延时
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});
// http request 拦截器
axiosHttp.interceptors.request.use((config) => {
  ToastCiYun("loadingOpen");
  return config;
}, (error) => {
  Toast.info('接口故障,稍后再试！', 3, '', true)
  return Promise.reject(error);
});
//http response 拦截器
axiosHttp.interceptors.response.use((res) => {
  ToastCiYun("loadingHide");
  return res;
}, (error) => {
  ToastCiYun("loadingHide");
  if (error.response) {
    Toast.info('网络异常，请稍后重试！', 3, '', true)
    switch (error.response.status) {
      case 500:
        console.log("502处理")
      case 404:
        console.log("404处理")
    }
  } else {
    console.log(error)
    Toast.info('未获取到token，请重新登陆', 3, '', true)
    return false;
  }
  return Promise.reject(error);
});

const http = (method, url, params, success, fail) => {
  let data = params;
  let successFn = success;
  let failFn = fail;
  let SERVER_URL = process.env.SERVER_URL+url;
  return new Promise((resolve, reject) => {
    axiosHttp({
      method: method,
      url: SERVER_URL,
      data: data
    }).then((response) => {
      let res = response.data;
      if (res.code == '0') {
        successFn(res);
      } else {
        Toast.info(res.message, 2, '', true)
      }
    }).catch((error) => {
      let originalRequest = error.config;
      console.log(error)
      if (error.code === 'ECONNABORTED'
        && error.message.indexOf('timeout') !== -1
        && !originalRequest._retry) {
        failFn('10101', '链接超时,请检查网络再重新连接');
      } else {
        failFn('10102', '服务器出错了');
      }
    });
  })
}

export { http };