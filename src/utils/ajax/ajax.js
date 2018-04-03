/**
 * Created by zzy on 2018/2/1.
 */
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs' // 解决json跨域
import router from 'router'
import $store from '../store'

Vue.use(VueAxios, qs);

// element-ui的信息提示框
function msgTip(msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'warning'
  })
}

const Axios = axios.create({
  baseURL: '/api',
  timeout: 10000,
  responseType: 'json',
  withCredentials: true,  // 是否允许带cookie这些
  // headers: {'Content-Type': 'application/json;charset=utf-8'}
});
let loading = '';

// POST传参序列化（添加请求拦截器）
Axios.interceptors.request.use(config => {

    // loading = Vue.prototype.$loading({text: '玩命加载中...'})

    // 若是有做鉴权token，就给头部带上token
    if ($store.get('token')) {
      config.headers.Authorization = $store.get('token')
    } else {
      router.push({
        path: '/login'
      })
    }

    return config
  },
  err => {
    msgTip(err);

    return Promise.reject(err.data.error.message)
  });

// 返回状态判断（添加响应拦截器）
Axios.interceptors.response.use(res => {
    if (res.data && res.data.status !== 'SUCCESS') {
      msgTip(res.data.msg
        ? res.data.msg
        : '请求失败！');

      return Promise.reject(res.data.msg)
    }

    // loading.close();
    // 由于登录接口和其他接口返回结果不同，所以只返回res
    return res
  },
  err => {
    // 登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!$store.get('token')) {
      router.push({
        path: '/login'
      })
    } else {
      // 若是有基础信息的情况下, 判断时间戳和当前的时间
      // 若是当前的时间大于服务器过期的时间, 返回登录
      let lifeTime = JSON.parse($store.get('token')).lifeTime * 1000;
      let nowTime = (new Date()).getTime();
      if (nowTime > lifeTime) {
        msgTip('登录状态信息过期,请重新登录');

        router.push({
          path: '/login'
        })
      } else {
        // 接口回调的status, 指向对应的报错页面
        if (err.response.status === 403) {
          router.push({
            path: '/error/403'
          })
        }
        if (err.response.status === 500) {
          router.push({
            path: '/error/500'
          })
        }
        if (err.response.status === 502) {
          router.push({
            path: '/error/502'
          })
        }
        if (err.response.status === 404) {
          router.push({
            path: '/error/404'
          })
        }
      }
    }
    // 返回response里的错误信息
    // let errInfo = err.data.error ? err.data.error.message : err.data
    return Promise.reject(err)
  })


export default Axios
