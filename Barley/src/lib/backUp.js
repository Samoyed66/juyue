var backTop = function () {
  var timer = setInterval(function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    document.documentElement.scrollTop = scrollTop - 80
    if (scrollTop <= 0) {
      clearInterval(timer)
    }
    // pc端滚轮事件
    document.onmousewheel = function () {
      clearInterval(timer)
    }
    // 移动端拖动事件清空定时器
    document.ontouchmove = function () {
      clearInterval(timer)
    }
  }, 15)
}
export default {
  install: function (vm) {
    vm.prototype.$backUp = backTop
  }
}
