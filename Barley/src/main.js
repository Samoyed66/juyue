// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 二维码生成
import QRCode from 'qrcode2'
import App from './App'
import router from './router'
// 饿了么ui库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// axios
import axios from 'axios'
import vueAxios from 'vue-axios'
// vuex
import store from './store'
// 存、取、删local数据js插件
import Local from '@/lib/local'
// 返回顶部效果js插件
import Back from '@/lib/backUp'
// jsonp
import VueJsonp from 'vue-jsonp'
// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: 'assets/images/error.png',
  loadimg: 'assets/images/loadimg.gif'
})
Vue.use(VueJsonp)
Vue.prototype.$QRCodeSC = (url) => {
  let qrcode = new QRCode('qrcode', { // qrcode  html为标签id
    width: 152, // 长度
    height: 152, // 宽度
    text: url // 内容
  })
  return qrcode
}
Vue.use(vueAxios, axios)
Vue.use(ElementUI)
Vue.use(Local)
Vue.use(Back)
/* easymock数据公共路径绑定 */
Vue.prototype.$url = 'https://www.easy-mock.com/mock/5c6815b2c5d6817e50999dae/Juyue/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
