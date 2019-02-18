<template>
  <div id="mine">
    <div class="mine-wrap">
      <div class="left-nav">
        <h1>我的聚越</h1>
        <div class="trade">
          <h2 @click="change1">交易中心 <i class="fa" :class="show1 ? 'fa-angle-down' : 'fa-angle-up' "></i></h2>
          <router-link exact v-show="show1" to="/mine/">订单管理</router-link>
        </div>
        <div class="account">
          <h2 @click="change2">账户中心
            <i class="fa" :class="show2 ? 'fa-angle-down' : 'fa-angle-up' "></i></h2>
          <router-link v-show="show2" to="/mine/message">个人信息</router-link>
          <router-link v-show="show2" to="/mine/ticket">常用购票人</router-link>
        </div>
      </div>
      <router-view class="right-content"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      show1: true,
      show2: true
    }
  },
  methods: {
    change1: function () {
      this.show1 = !this.show1
    },
    change2: function () {
      this.show2 = !this.show2
    }
  }
}
</script>

<style lang="less" scoped>
#mine{
  padding: 24px 8%;
  .mine-wrap{
    display: flex;
    background: white;
    .left-nav{
      width: 200px;
      border: 2px solid #ccc;
      cursor: pointer;
      height: 296px;
      text-indent: 24px;
      margin-right: 24px;
      h1{
        height: 50px;
        line-height: 50px;
        background: #1b7cff;
        font-size: 14px;
        color: white;
        text-indent: 24px;
      }
      h2{
        line-height: 50px;
      }
      a{
        display: block;
        text-indent: 44px;
        line-height: 48px;
        position: relative;
      }
      .router-link-active{
        color: #1b7cff;
        &:after{
          content: '';
          display: block;
          width: 2px;
          height: 48px;
          background: #1b7cff;
          position: absolute;
          top: 0;
          right: -2px;
        }
      }
    }
    .right-content{
      width: 100%;
    }
  }
}
</style>
