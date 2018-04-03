// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import ElementUI from 'element-ui'
import promise from 'es6-promise';
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'
import store from 'utils/store'
import ajax from 'utils/ajax'
import SockJS from '../static/sockjs.min.js'
import getUrl from './geturl.js'

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$ajax   = ajax;
Vue.prototype.$getUrl = getUrl;
Vue.prototype.SockJS = SockJS;

promise.polyfill();

Vue.use(ElementUI);

Array.prototype.indexOf = function(val) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  let index = this.indexOf(val);
  if(index !== -1) this.splice(index, 1);
};
/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
Array.prototype.inArray = function(val) {
  if(this.indexOf && typeof(this.indexOf) === 'function'){
    let index = this.indexOf(val);
    if(index >= 0){
      return true;
    }
  }
  return false;
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
