// 存储登录的用户名和密码
var obj = {
  set: function (key, val) {
    localStorage.setItem(key, JSON.stringify(val))
  },
  obtain: function (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove: function (key) {
    return localStorage.removeItem(key)
  }
}
export default {
  install: function (vm) {
    vm.prototype.$local = obj
  }
}
