<template>
  <div id="Registered">
    <header class="header">
      <div class="wrap clear">
        <!-- logo -->
        <router-link to="/" class="clear">
          <img src="@/assets/images/logo.png">
        </router-link>
        <h4>账户注册</h4>
      </div>
    </header>
    <div class="formWrap">
      <div class="formCont">
        <div class="formNum">
          <div :style="{'border' : !NumOff ? '1px solid #dddee1':'1px solid #ed3f14'}">
            <span :style="{'border-right' : !NumOff ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-user"></span>
            <input @focus="ContShow" @blur="ContHide" type="text" placeholder="请输入手机号" v-model="NumVal">
          </div>
          <p v-show="NumOff">{{NumCont}}</p>
        </div>
        <div class="formPwd">
          <div :style="{'border' : !PwdOff ? '1px solid #dddee1':'1px solid #ed3f14'}">
            <span :style="{'border-right' : !PwdOff ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-lock"></span>
            <input @focus="PwdShow" @blur="PwdHide" type="password" placeholder="请输入密码" v-model="PwdVal">
          </div>
          <p v-show="PwdOff">{{PwdCont}}</p>
        </div>
        <div class="formAgainPwd">
          <div :style="{'border' : !AgainPwdOff ? '1px solid #dddee1':'1px solid #ed3f14'}">
            <span :style="{'border-right' : !AgainPwdOff ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-lock"></span>
            <input @focus="AgainPwdShow" @blur="AgainPwdHide" type="password" placeholder="请确认填写密码" v-model="AgainPwdVal">
          </div>
          <p v-show="AgainPwdOff">{{AgainPwdCont}}</p>
        </div>
        <div class="formCord clear">
          <div :style="{'border' : !CordOff ? '1px solid #dddee1':'1px solid #ed3f14'}">
            <span :style="{'border-right' : !CordOff ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-commenting-o"></span>
            <input @focus="CordShow" @blur="CordHide" type="text" placeholder="请输入验证码" v-model="CordVal">
          </div>
          <div @click="CordTime">{{CordTimeCont}}</div>
          <p v-show="CordOff">{{CordCont}}</p>
        </div>
        <button @click="registeredForm($event)">立即注册</button>
      </div>
    </div>
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
    <!-- 弹窗 -->
    <div class="AlertWrap" v-show="alertShow">
      <div class="AlertCont">
        <h4>提示</h4>
        <p>{{alertCont}}或<span @click="toOther">点击此处</span>跳转</p>
      </div>
    </div>
    <!-- 弹窗 -->
  </div>
</template>

<script>
export default {
  name: 'Registered',
  data () {
    return {
      // 手机号提示信息显示隐藏
      NumOff: false,
      // 手机号提示信息
      NumCont: '请输入手机号',
      // 手机号输入信息
      NumVal: '',
      // 手机号正则验证
      NumRes: /^[1][3,4,5,7,8][0-9]{9}$/,
      // 密码提示信息显示隐藏
      PwdOff: false,
      // 密码提示信息
      PwdCont: '请填写密码',
      // 密码输入信息
      PwdVal: '',
      // 密码正则验证
      PwdRes1: /[^0-9]/,
      PwdRes2: /[^a-z]/,
      PwdRes3: /^\w{6,20}$/,
      // 重复密码提示信息显示隐藏
      AgainPwdOff: false,
      // 重复密码提示信息
      AgainPwdCont: '请确认填写密码',
      // 重复密码输入信息
      AgainPwdVal: '',
      // 验证码提示信息显示隐藏
      CordOff: false,
      // 验证码提示信息
      CordCont: '请输入验证码',
      // 验证码输入信息
      CordVal: '',
      // 验证码正则验证
      CordRes: /^[0-9]{4}$/,
      // 验证码内容
      CordTimeCont: '获取验证码',
      // 定时器变量
      CordNum: 60,
      // 定时器对象
      timer: null,
      // local数据
      getListDate: '',
      newArr: [],
      // 倒计时
      toNum: 5,
      timere: null,
      alertCont: '倒计时5s后跳转首页',
      alertShow: false
    }
  },
  methods: {
    // 点击跳转
    toOther () {
      clearInterval(this.timere)
      this.$router.push('/') // 跳转到首页
    },
    // 手机号光标进入
    ContShow () {
      if (this.ContHide()) {
        this.NumOff = false
      } else {
        this.NumOff = true
      }
    },
    // 手机号光标移出
    ContHide () {
      if (this.getListDate) {
        // 如果数据存在再做判断
        var result = this.newArr.some((item, index) => {
          return this.NumVal === item.num
        })
        if (result) {
          this.NumOff = true
          this.NumCont = '当前手机号已注册！'
          return false
        }
      }
      if (this.NumVal === '') {
        this.NumOff = true
        this.NumCont = '手机号不能为空！'
        return false
      } else if (!this.NumRes.test(this.NumVal)) {
        this.NumOff = true
        this.NumCont = '手机号格式不正确！'
        return false
      } else {
        this.NumOff = false
        return true
      }
    },
    // 密码光标移入
    PwdShow () {
      if (this.PwdHide()) {
        this.PwdOff = false
      } else {
        this.PwdOff = true
      }
    },
    // 密码光标移出
    PwdHide () {
      if (this.PwdVal === '') {
        this.PwdOff = true
        this.PwdCont = '密码不能为空!'
        return false
      } else if (!this.PwdRes3.test(this.PwdVal)) {
        this.PwdOff = true
        this.PwdCont = '密码长度不足!'
        return false
      } else if (!this.PwdRes1.test(this.PwdVal)) {
        this.PwdOff = true
        this.PwdCont = '密码不能为纯数字!'
        return false
      } else if (!this.PwdRes2.test(this.PwdVal)) {
        this.PwdOff = true
        this.PwdCont = '密码不能为纯字母!'
        return false
      } else {
        this.PwdOff = false
        return true
      }
    },
    // 重复密码光标移入
    AgainPwdShow () {
      if (this.AgainPwdHide()) {
        this.AgainPwdOff = false
      } else {
        this.AgainPwdOff = true
      }
    },
    // 重复密码光标移出
    AgainPwdHide () {
      if (this.AgainPwdVal === '') {
        this.AgainPwdOff = true
        this.AgainPwdCont = '密码不能为空！'
        return false
      } else if (this.AgainPwdVal !== this.PwdVal) {
        this.AgainPwdOff = true
        this.AgainPwdCont = '两次密码不一致！'
        return false
      } else {
        this.AgainPwdOff = false
        return true
      }
    },
    // 验证码光标进入
    CordShow () {
      if (this.CordHide()) {
        this.CordOff = false
      } else {
        this.CordOff = true
      }
    },
    // 验证码光标移出
    CordHide () {
      if (this.CordVal === '') {
        this.CordOff = true
        this.CordCont = '验证码不能为空！'
        return false
      } else if (!this.CordRes.test(this.CordVal)) {
        this.CordOff = true
        this.CordCont = '验证码格式不正确！'
        return false
      } else {
        this.CordOff = false
        return true
      }
    },
    // 验证码计时器
    CordTime () {
      var _this = this
      this.timer = setInterval(() => {
        if (_this.CordNum > 0) {
          _this.CordNum--
          _this.CordTimeCont = _this.CordNum + 's'
        } else {
          _this.CordNum = 60
          _this.CordTimeCont = '重复发送'
          clearInterval(_this.timer)
          _this.timer = null
        }
      }, 1000)
    },
    // 注册按钮
    registeredForm (ev) {
      if (this.ContHide() && this.PwdHide() && this.AgainPwdHide() && this.CordHide()) {
        // 数据存localstorage中
        var listData = {
          num: this.NumVal,
          pwd: this.PwdVal
        }
        var DataStr = JSON.stringify(listData)
        if (this.$local.obtain('newUser')) {
          this.$local.set('newUser', '[' + this.getListDate.substring(1, this.getListDate.length - 1) + ',' + DataStr + ']')
        } else {
          this.$local.set('newUser', '[' + DataStr + ']')
        }
        // 弹窗显示
        this.alertShow = true
        this.timere = setInterval(() => {
          if (this.toNum > 0) {
            this.toNum--
            this.alertCont = '倒计时' + this.toNum + 's后跳转首页'
          } else {
            this.alertShow = false
            clearInterval(this.timere)
            this.$router.push('/')
          }
        }, 1000)
      } else {
        this.$alert('当前信息填写不正确！', '提示', {
          confirmButtonText: '确定'
        })
        ev.preventDefault()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$local.obtain('newUser')) {
        vm.getListDate = vm.$local.obtain('newUser')
        if (vm.getListDate) {
          vm.newArr = JSON.parse(vm.getListDate)
        }
      }
    })
  }
}
</script>

<style scoped lang="less">
  #Registered{
    .header{
      width: 100%;
      height: 88px;
      background: white;
      .wrap{
        height: 100%;
        line-height: 88px;
        width: 1000px;
        margin: 0 auto;
        a{
          float: left;
          border-right: 2px solid #dadada;
          padding-right: 54px;
          margin-top: 15px;
          img{
            width: 165px;
            height: 59px;
          }
        }
        h4{
          float: left;
          padding-left: 16px;
          font-size: 22px;
          color: #495060;
          font-weight: normal;
        }
      }
    }
    .formWrap{
      width: 1000px;
      margin: 90px auto 160px;
      background: white;
      .formCont{
        width: 600px;
        margin: 0 auto;
        padding: 51px 0 104px;
        &>div{
          width: 100%;
          padding-bottom: 30px;
          position: relative;
          div{
            width: 598px;
            height: 34px;
            line-height: 34px;
            border-radius: 5px;
            overflow: hidden;
            span{
              display: inline-block;
              width: 25px;
              height: 100%;
              line-height: 34px;
              text-align: center;
            }
            input{
              width: 567px;
              height: 100%;
              color: #495060;
              &::-webkit-input-placeholder{
                color: #bbbec4;
              }
              &::-moz-input-placeholder{/* Firefox 19+ */
                color: #bbbec4;
              }
              &:-moz-input-placeholder{/* Firefox 4 to 18 */
                color: #bbbec4;
              }
              &:-ms-input-placeholder{
                color: #bbbec4;
              }
            }
          }
          p{
            width: 600px;
            height: 21px;
            line-height: 21px;
            font-size: 12px;
            color: #ed3f14;
            clear: both;
            position: absolute;
            bottom: 9px;
          }
          &.formCord{
            div{
              width: 325px;
              margin-right: 25px;
              float: left;
              span{
                background: #eee;
              }
              input{
                width: 294px;
              }
              &:nth-of-type(2){
                text-align: center;
                width: 90px;
                font-size: 12px;
                color: #495060;
                cursor: pointer;
                border: 1px solid #dddee1;
              }
            }
          }
        }
      }
      button{
        width: 100%;
        height: 32px;
        background: #ed3f14;
        color: white;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .footer{
      padding-bottom: 5px;
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
    .AlertWrap{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      top: 0;
      left: 0;
      .AlertCont{
        width: 420px;
        height: 137px;
        border-radius: 5px;
        text-align: center;
        background: white;
        border: 1px solid #ebeef5;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        h4{
          font-size: 18px;
          font-weight: normal;
          padding: 31px 0 26px;
        }
        p{
          font-size: 14px;
          span{
            color: #e51f1f;
            font-weight: bold;
            padding: 2px;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
