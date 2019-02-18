<template>
  <div id="OrderPay">
    <!-- 头部 -->
    <nav class="nav">
      <div class="wrap clear">
        <!-- 登录注册 -->
        <div class="loginBtn">
          HI,欢迎来聚越[
          <div v-show="off">
            <router-link to="/login">登录</router-link>
            <router-link to="/registered">注册</router-link>
          </div>
          <div v-show="!off">
            <a href="javascript:;">{{getListDate.num}}</a>
            <a href="javascript:;" @click="outerLocal">退出</a>
          </div>
          ]
        </div>
        <!-- 我的聚越 -->
        <div class="myMai">
          <router-link to="/mine">我的聚越 <i class="el-icon-arrow-down"></i></router-link>
          <ul class="clear mineInfo">
            <li>
              <router-link to="/mine/message">个人信息</router-link>
            </li>
            <li>
              <router-link to="/mine">订单管理</router-link>
            </li>
          </ul>
        </div>
        <!-- 右侧列表 -->
        <ul class="clear">
          <!-- 聚越微信 -->
          <li>
            <a href="javascript:;">聚越网微信</a>
            <div>
              <img src="@/assets/images/download.jpg">
            </div>
          </li>
          <!-- 手机版 -->
          <li>
            <a href="javascript:;">手机版</a>
            <div>
              <img src="@/assets/images/download.jpg">
            </div>
          </li>
          <!-- 客户服务 -->
          <li>
            <a href="javascript:;">客户服务 <i class="el-icon-arrow-down"></i></a>
            <ul class="clear mineInfo">
              <li>帮助中心</li>
              <li>在线客服</li>
              <li>人工服务</li>
            </ul>
          </li>
          <!-- 网站导航 -->
          <li>
            <a href="javascript:;">网站导航 <i class="el-icon-arrow-down"></i></a>
            <dl class="clear mineInfo">
              <dt>演出分类</dt>
              <dd>演唱会</dd>
              <dd>音乐会</dd>
              <dd>舞蹈芭蕾</dd>
              <dd>曲苑杂坛</dd>
              <dd>度假休闲</dd>
              <dd>儿童亲子</dd>
              <dd>话剧歌剧</dd>
              <dd>动漫</dd>
            </dl>
          </li>
          <!-- 中英翻译 -->
          <li>
            <a href="javascript:;">English</a>
          </li>
        </ul>
      </div>
    </nav>
    <!-- 头部 -->
    <div class="payCont">
      <div class="wrap">
        <ul class="selectNav">
          <li>1 选择商品</li>
          <li>2 确认订单信息</li>
          <li>
            <div class="subBottom"></div>
            <div class="subtop"></div>
            <p>3 支付订单</p>
          </li>
          <li>4 收取商品</li>
        </ul>
        <div class="orderList">
          <div class="listTitle">
            <div>订单编号</div>
            <div>商品名称</div>
            <div>订单金额</div>
            <div>应付金额</div>
          </div>
          <div class="listCont">
            <div>{{orderNum}}</div>
            <div>{{detailCont.picTitle}}</div>
            <div>{{allPrice}}</div>
            <div>{{allPrice}}</div>
          </div>
        </div>
        <p>应付总金额： <span>{{allPrice}}</span>元</p>
        <p>以下字符平台都支持大多数银行卡:</p>
        <div class="payment clear">
          <div @click="changePay(payIndex)" class="clear" v-for="(payItem, payIndex) in paymentList" :key="payIndex">
            <span :class="{'fa fa-dot-circle-o': paymentNum === payIndex}" :style="{'border': paymentNum === payIndex ? 'none':'1px solid #e6e7e9'}"></span>
            <img v-lazy="payItem">
          </div>
        </div>
        <button @click="toQRpay">确认无误，支付</button>
      </div>
    </div>
    <!-- 底部 -->
    <footer class="footer">
      <div class="wrap">
        <!-- 企业介绍标签 -->
        <ul class="clear">
          <li>
            <a href="javascript:;">公司介绍</a>
          </li>
          <li>
            <a href="javascript:;">品牌识别</a>
          </li>
          <li>
            <a href="javascript:;">企业荣誉</a>
          </li>
          <li>
            <a href="javascript:;">隐私声明</a>
          </li>
          <li>
            <a href="javascript:;">联系及合作</a>
          </li>
          <li>
            <a href="javascript:;">招聘信息</a>
          </li>
          <li>
            <a href="javascript:;">网站地图</a>
          </li>
          <li>
            <a href="javascript:;">友情链接</a>
          </li>
          <li>
            <a href="javascript:;">公司大事记</a>
          </li>
        </ul>
        <p>京ICP证031086号|京ICP备1013248号|京公安网11032040599500349号|广播电视节目制作经营许可证（京）字第032256号</p>
        <p>网络文化经营许可证 京网文[2018]3243-534号|营业性演出许可证 京市演出888号</p>
        <p>北京阿博文化有限公司 大麦网 Copyright 2008-2018 All Right Reserved</p>
      </div>
    </footer>
    <!-- 底部 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'OrderPay',
  data () {
    return {
      off: true,
      // local数据
      getListDate: [],
      detailCont: {},
      orderNum: 0,
      paymentList: [
        require('@/assets/images/weixin.jpg'),
        require('@/assets/images/alipay.jpg')
      ],
      paymentNum: 0,
      // 订单local数据
      getOrderDate: ''
    }
  },
  computed: {
    // vuex选定时间
    ...mapState(['allPrice', 'detailTime', 'seatInfo', 'detailPrice'])
  },
  methods: {
    // vuex
    ...mapMutations(['toOrderNum']),
    toQRpay () {
      var orderObj = {
        orderNum: this.orderNum,
        time: this.detailTime,
        title: this.detailCont.picTitle,
        num: this.seatInfo.length,
        price: this.detailPrice,
        allPrice: this.allPrice
      }
      var orderStr = JSON.stringify(orderObj)
      if (this.$local.obtain('orderInfo')) {
        this.$local.set('orderInfo', '[' + this.getOrderDate.substring(1, this.getOrderDate.length - 1) + ',' + orderStr + ']')
      } else {
        this.$local.set('orderInfo', '[' + orderStr + ']')
      }
      this.toOrderNum(this.orderNum)
      this.$router.push({path: '/qrpay'})
      window.scrollTo(0, 0)
    },
    outerLocal () {
      this.getListDate = []
      this.$local.remove('loginUser')
      this.off = true
    },
    // 订单编号初始化数据
    orderNumGet () {
      this.$http.get(this.$url + 'orderId').then((res) => {
        this.orderNum = res.data.order[0]
      })
    },
    changePay (payI) {
      this.paymentNum = payI
    }
  },
  created () {
    this.orderNumGet()
    if (this.off && this.$local.obtain('loginUser')) {
      this.getListDate = this.$local.obtain('loginUser')
      this.off = false
    }
    if (this.$local.obtain('DetailData')) {
      this.detailCont = this.$local.obtain('DetailData')
    }
    if (this.$local.obtain('orderInfo')) {
      this.getOrderDate = this.$local.obtain('orderInfo')
    }
  }
}
</script>

<style scoped lang="less">
 #OrderPay{
   // 中间区公共
   .wrap{
     width: 1200px;
     margin: 0 auto;
   }
   // 导航
   .nav{
     width: 100%;
     height: 34px;
     line-height: 34px;
     border-bottom: 1px solid #e5e5e5;
     .wrap{
       .loginBtn{
         font-size: 12px;
         color: #495060;
         float: left;
         padding-right: 10px;
         div{
           display: inline-block;
           a{
             &:nth-of-type(1){
               color: #ff3c1b;
             }
             &:nth-of-type(2){
               color: #495060;
               &:hover{
                 color: #57a3f3;
               }
             }
           }
         }
       }
       .myMai{
         float: left;
         position: relative;
         a{
           font-size: 12px;
           color: #495060;
         }
         a:hover{
           color: #57a3f3;
         }
         .mineInfo{
           width: 100px;
           height: 0;
           position: absolute;
           top: 40px;
           z-index: 5;
           background: white;
           border-radius: 3px;
           left: -20px;
           transition: .5s;
           overflow: hidden;
           li{
             height: 30px;
             line-height: 30px;
             font-size: 12px;
             color: #495060;
             text-indent: 15px;
             cursor: pointer;
             &:first-of-type{
               margin-top: 5px;
             }
             &:last-of-type{
               margin-bottom: 5px;
             }
           }
           li:hover{
             background: #f3f3f3;
           }
         }
         &:hover .mineInfo{
           height: 70px;
         }
       }
       &>ul{
         float: right;
         padding-right: 29px;
         &>li{
           position: relative;
           float: left;
           a{
             font-size: 12px;
             color: #495060;
             padding: 0 13px;
           }
           a:hover{
             color: #57a3f3;
           }
           &:nth-of-type(1){
             div{
               width: 122px;
               height: 0;
               overflow: hidden;
               background: white;
               border-radius: 3px;
               position: absolute;
               top: 39px;
               left: -15px;
               transition: .5s;
               img{
                 margin: 12px 16px 15px;
                 display: inline-block;
               }
             }
             &:hover div{
               height: 116px;
             }
           }
           &:nth-of-type(2){
             div{
               width: 122px;
               height: 0;
               overflow: hidden;
               background: white;
               border-radius: 3px;
               position: absolute;
               top: 39px;
               left: -30px;
               transition: .5s;
               img{
                 margin: 12px 16px 15px;
                 display: inline-block;
               }
             }
             &:hover div{
               height: 116px;
             }
           }
           &:nth-of-type(3){
             .mineInfo{
               width: 100px;
               height: 0;
               position: absolute;
               top: 40px;
               background: white;
               border-radius: 3px;
               left: -5px;
               transition: .5s;
               overflow: hidden;
               li{
                 height: 30px;
                 line-height: 30px;
                 font-size: 12px;
                 color: #495060;
                 text-indent: 15px;
                 cursor: pointer;
                 &:first-of-type{
                   margin-top: 5px;
                 }
                 &:last-of-type{
                   margin-bottom: 5px;
                 }
               }
               li:hover{
                 background: #f3f3f3;
               }
             }
             &:hover .mineInfo{
               height: 100px;
             }
           }
           &:nth-of-type(4){
             .mineInfo{
               width: 139px;
               height: 0;
               position: absolute;
               top: 40px;
               background: white;
               border-radius: 3px;
               left: -5px;
               transition: .5s;
               overflow: hidden;
               dt{
                 font-size: 12px;
                 color: #495060;
                 height: 27px;
                 line-height: 27px;
                 text-indent: 20px;
                 margin-top: 11px;
               }
               dd{
                 width: 49px;
                 height: 27px;
                 line-height: 27px;
                 font-size: 12px;
                 color: #495060;
                 cursor: pointer;
                 float: left;
                 padding: 0 11px 0 9px;
               }
               dd:hover{
                 color: #57a3f3;
               }
             }
             &:hover .mineInfo{
               height: 157px;
             }
           }
         }
       }
     }
   }
   .payCont{
     .wrap{
       background: white;
       margin-bottom: 30px;
       box-sizing: border-box;
       padding: 10px 20px 0;
       .selectNav{
         height: 50px;
         display: flex;
         justify-content: space-around;
         background: linear-gradient(to bottom, #555, #3e3e3e, #555);
         margin-bottom: 8px;
         li{
           color: white;
           font-size: 18px;
           line-height: 50px;
           text-align: center;
           width: 25%;
           &:nth-of-type(3){
             position: relative;
             &>div{
               width: 100%;
               height: 25px;
               background: #041997;
               &.subBottom{
                 transform: skew(45deg);
               }
               &.subtop{
                 transform: skew(-45deg);
               }
             }
             &>p{
               width: 100%;
               height: 50px;
               line-height: 50px;
               color: white;
               font-size: 18px;
               position: absolute;
               top: 0;
               left: 0;
             }
           }
         }
       }
       .orderList{
         width: 100%;
         border: 1px solid #dddee1;
         margin: 20px 0 5px;
         &>div{
           display: flex;
           justify-content: space-around;
           font-size: 12px;
           color: #495060;
           div{
             height: 40px;
             line-height: 40px;
             width: 25%;
             padding-left: 18px;
             border-right: 1px solid #dddee1;
             border-bottom: 1px solid #dddee1;
           }
           &.listTitle{
             background: #f8f8f9;
             div:last-of-type{
               border-right: none;
             }
           }
           &.listCont{
             div{
               height: 48px;
               line-height: 48px;
             }
             &:last-of-type{
               div{
                 border-bottom: none;
                 &:last-of-type{
                   border-right: none;
                 }
               }
             }
           }
         }
       }
       p{
         color: #495060;
         &:nth-of-type(1){
           height: 33px;
           line-height: 33px;
           font-size: 16px;
           span{
             color: #ff3c1b;
           }
         }
         &:nth-of-type(2){
           height: 29px;
           line-height: 29px;
           font-size: 12px;
         }
       }
       .payment{
         height: 56px;
         &>div{
           float: left;
           width: 138px;
           height: 100%;
           display: flex;
           align-items: center;
           cursor: pointer;
          span{
            display: block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            float: left;
            margin-right: 15px;
            color: #ff3c1b;
          }
           img{
             float: left;
           }
         }
       }
       button{
         width: 116px;
         height: 32px;
         background: #ff3c1b;
         color: white;
         font-size: 12px;
         border-radius: 5px;
         margin-bottom: 50px;
         cursor: pointer;
       }
     }
   }
   // 底部
   .footer{
     padding-bottom: 355px;
     .wrap{
       width: 1000px;
       margin: 0 auto;
       p{
         text-align: center;
         height: 30px;
         line-height: 30px;
         font-size: 12px;
         color: #1b1b1b;
       }
       ul{
         width: 824px;
         margin: 0 auto;
         padding-bottom: 70px;
         li{
           float: left;
           a{
             font-size: 12px;
             color: #1b1b1b;
             padding: 0 14px 0 26px;
             border-right: 1px solid #1b1b1b;
           }
           &:last-of-type{
             a{
               border-right: none;
             }
           }
         }
       }
     }
   }
 }
</style>
