<template>
    <div id="BackTop">
      <ul>
        <li>
          <p class="el-icon-service"></p>
          <p href="javascript:;">在线客服</p>
        </li>
        <!-- 大麦二维码划入显示 -->
        <li>
          <p href="javascript:;">聚越</p>
          <p href="javascript:;">APP下载</p>
          <div class="appIcon">
            <img src="@/assets/images/back-app.png">
            <div class="iconout"></div>
          </div>
        </li>
        <!-- 返回顶部按钮 -->
        <li :style="{'visibility': backShow?'visible':'hidden'}" @click="backTop">
          <p class="el-icon-arrow-up"></p>
          <p href="javascript:;">回到顶部</p>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'BackTop',
  data () {
    return {
      backShow: false // 返回顶部按钮显示隐藏
    }
  },
  methods: {
    // 返回顶部显示隐藏
    getScrollTop () {
      if (window.scrollY >= 500) {
        this.backShow = true
      } else {
        this.backShow = false
      }
    },
    // 返回顶部
    backTop () {
      this.$backUp()
    }
  },
  mounted () {
    // 滚动条事件
    window.addEventListener('scroll', this.getScrollTop)
  }
}
</script>

<style scoped lang="less">
#BackTop{
  position: fixed;
  bottom: 114px;
  right: 10px;
  ul{
    width: 80px;
    li{
      border: 1px solid #ebebeb;
      background: white;
      height: 70px;
      text-align: center;
      cursor: pointer;
      p{
        font-size: 12px;
        color: #111;
        &:first-of-type{
          font-size: 24px;
          margin: 10px 0 13px;
        }
      }
      &:nth-of-type(1){
        border-bottom: none;
      }
      &:nth-of-type(2){
        position: relative;
        p:nth-of-type(1){
          font-size: 14px;
          font-weight: bold;
        }
        &:hover{
          p{
            color: #ff2775;
          }
          .appIcon{
            display: block;
          }
        }
        .appIcon{
          position: absolute;
          top: -10px;
          left: -90px;
          background: white;
          display: none;
          box-shadow: 3px 3px 3px #c6c6c6;
          img{
            margin: 7px;
            width: 63px;
            height: 63px;
          }
          .iconout{
            position: absolute;
            top: 50%;
            right: -14px;
            transform: translateY(-50%);
            border-left: 7px solid white;
            border-top: 7px solid transparent;
            border-right: 7px solid transparent;
            border-bottom: 7px solid transparent;
          }
        }
      }
      &:nth-of-type(3){
        border-top: none;
        p:nth-of-type(1){
          width: 21px;
          text-align: center;
          height: 21px;
          line-height: 21px;
          border: 2px solid #151515;
          border-radius: 50%;
          font-size: 20px;
        }
      }
    }
  }
}
</style>
