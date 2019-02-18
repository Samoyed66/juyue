<template>
  <div id="Login">
    <header class="header">
      <div class="wrap clear">
        <!-- logo -->
        <router-link to="/" class="clear">
          <img src="@/assets/images/logo.png">
        </router-link>
        <h4>欢迎登录</h4>
      </div>
    </header>
    <div class="loginWrap clear">
      <div class="loginPic">
        <img src="@/assets/images/loginPic.png">
      </div>
      <div class="loginBox">
        <ul class="clear">
          <li :class="{'loginActive': loginNum === loginIndex}" @click="changeStyle(loginIndex)" v-for="(loginItem, loginIndex) in loginCardTitle" :key="loginIndex">{{loginItem}}</li>
        </ul>
        <div class="loginFormWrap">
          <div :style="{'transform': 'translateX(' + -loginNum * 456 + 'px)'}" class="loginFormBox clear">
            <div class="accountLogin">
              <div class="formGroup">
                <div>
                  <span class="fa fa-user"></span>
                  <input type="text" placeholder="请输入手机号码" v-model="NumVal">
                </div>
              </div>
              <div class="formGroup">
                <div>
                  <span class="fa fa-lock"></span>
                  <input type="password" placeholder="请输入登录密码" v-model="PwdVal">
                </div>
              </div>
              <button @click="accountLoginCheck($event)">登录</button>
              <div class="autoLogin clear">
                <div class="checkAuto">
                  <input id="loginAuto" type="checkbox">
                  <label for="loginAuto">下次自动登录</label>
                </div>
                <p>
                  <a href="javascript:;">忘记密码？</a>
                  <router-link to="/registered">立即注册</router-link>
                </p>
              </div>
              <div class="threeLogin">
                <span>其他登录：</span>
                <a target="_blank" href="https://open.weixin.qq.com/connect/qrconnect?appid=wx864b5cdda9161678&redirect_uri=http%3A%2F%2Fopen.damai.cn%2FUniversallyAPI%2Fbridge.aspx%3FtargetUrl%3Dhttps%253A%252F%252Fipassport.damai.cn%252Foauth_sign.htm%253Ftype%253Dweixin%2526return_url%253Dhttps%25253A%25252F%25252Fpassport.damai.cn%25252Fdologin.htm%25253FredirectUrl%25253Dhttps%252525253A%252525252F%252525252Fwww.damai.cn%252525252F%252525253Futm_source%252525253Dsearch%2525252526utm_medium%252525253Dbaidupc%2525252526utm_content%252525253Dpmarket_yhcpyyb%2525252526utm_campaign%252525253Dalink_bdsem_hzh_shouye_0981%252526platform%25253D106002&response_type=code&state=idc_1uL-278DdKROCBGfNnP6J9Q&scope=snsapi_login#wechat_redirect" class="fa fa-weixin"></a>
              </div>
            </div>
            <div class="loginSMS">
              <div class="formNum">
                <div :style="{'border' : !threeNumBol ? '1px solid #dddee1':'1px solid #ed3f14'}">
                  <span :style="{'border-right' : !threeNumBol ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-user"></span>
                  <input @focus="threeContShow" @blur="threeContHide" type="text" placeholder="请输入手机号" v-model="threeNumVal">
                </div>
                <p v-show="threeNumBol">{{threeNumCont}}</p>
              </div>
              <div class="formCord clear">
                <div :style="{'border' : !threeCordBol ? '1px solid #dddee1':'1px solid #ed3f14'}">
                  <span :style="{'border-right' : !threeCordBol ? '1px solid #dddee1':'1px solid #ed3f14'}" class="fa fa-commenting-o"></span>
                  <input @focus="CordContShow" @blur="CordContHide" type="text" placeholder="请输入验证码" v-model="threeCordVal">
                </div>
                <div @click="CordTime">{{threeCordTime}}</div>
                <p v-show="threeCordBol">{{threeCordCont}}</p>
              </div>
              <button @click="threeLogin($event)">登录</button>
            </div>
          </div>
        </div>
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
  name: 'Login',
  data () {
    return {
      loginCardTitle: ['账户登录', '短信快捷登录'],
      // 登录选项卡下标
      loginNum: 0,
      // 账号登录手机号
      NumVal: '',
      // 账号登录密码
      PwdVal: '',
      // 短信登录手机号
      threeNumVal: '',
      threeNumCont: '请输入手机号',
      threeNumBol: false,
      // 手机号正则验证
      threeNumRes: /^[1][3,4,5,7,8][0-9]{9}$/,
      // 短信登录验证码
      threeCordVal: '',
      threeCordTime: '获取验证码',
      threeCordCont: '请输入验证码',
      threeCordBol: false,
      // 验证码正则
      threeCordRes: /^[0-9]{4}$/,
      // 验证码倒计时变量
      threeCordNum: 60,
      // 验证码计时器对象
      timere: null,
      // local数据
      getListDate: [],
      newArr: [],
      // 倒计时
      toNum: 5,
      timer: null,
      alertCont: '倒计时5s后跳转',
      alertShow: false
    }
  },
  methods: {
    // 点击此处跳转
    toOther () {
      clearInterval(this.timer)
      if (this.$route.query.a) {
        this.$router.push('/' + this.$route.query.a)
      } else {
        this.$router.push('/') // 跳转到首页
      }
    },
    // 选项卡切换
    changeStyle (i) {
      this.loginNum = i
    },
    // 账号登录验证
    accountLoginCheck (ev) {
      var loginNumOff = this.newArr.some((item, index) => {
        return this.NumVal === item.num && this.PwdVal === item.pwd
      })
      if (loginNumOff) {
        // 数据存localstorage中
        var loginData = {
          num: this.NumVal,
          pwd: this.PwdVal
        }
        this.$local.set('loginUser', loginData)
        // 弹窗显示
        this.alertShow = true
        this.timer = setInterval(() => {
          if (this.toNum > 0) {
            this.toNum--
            this.alertCont = '倒计时' + this.toNum + 's后跳转'
          } else {
            this.alertShow = false
            clearInterval(this.timer)
            if (this.$route.query.a) {
              this.$router.push('/' + this.$route.query.a)
            } else {
              this.$router.push('/') // 跳转到首页
            }
          }
        }, 1000)
      } else {
        this.$alert('当前手机号或密码不正确！', '提示', {
          confirmButtonText: '确定',
          center: true
        })
        ev.preventDefault()
      }
    },
    // 短信登录手机号光标进入
    threeContShow () {
      if (this.threeContHide()) {
        this.threeNumBol = false
      } else {
        this.threeNumBol = true
      }
    },
    // 短信登录手机号光标移出
    threeContHide () {
      if (this.threeNumVal === '') {
        this.threeNumBol = true
        this.threeNumCont = '手机号不能为空！'
        return false
      } else if (!this.threeNumRes.test(this.threeNumVal)) {
        this.threeNumBol = true
        this.threeNumCont = '手机号格式不正确！'
        return false
      } else {
        this.threeNumBol = false
        return true
      }
    },
    // 验证码倒计时
    CordTime () {
      var _this = this
      this.timere = setInterval(() => {
        if (_this.threeCordNum > 0) {
          _this.threeCordNum--
          _this.threeCordTime = _this.threeCordNum + 's'
        } else {
          _this.threeCordNum = 60
          _this.threeCordTime = '重复发送'
          clearInterval(_this.timere)
          _this.timere = null
        }
      }, 1000)
    },
    // 验证码光标进入
    CordContShow () {
      if (this.CordContHide()) {
        this.threeCordBol = false
      } else {
        this.threeCordBol = true
      }
    },
    // 验证码光标移出
    CordContHide () {
      if (this.threeCordVal === '') {
        this.threeCordBol = true
        this.threeCordCont = '验证码不能为空！'
        return false
      } else if (!this.threeCordRes.test(this.threeCordVal)) {
        this.threeCordBol = true
        this.threeCordCont = '验证码格式不正确！'
        return false
      } else {
        this.threeCordBol = false
        return true
      }
    },
    // 短信登录按钮
    threeLogin (ev) {
      if (this.threeContHide() && this.CordContHide()) {
        // 数据存localstorage中
        var loginData = {
          num: this.threeNumVal
        }
        this.$local.set('loginUser', loginData)
        // 弹窗显示
        this.alertShow = true
        this.timer = setInterval(() => {
          if (this.toNum > 0) {
            this.toNum--
            this.alertCont = '倒计时' + this.toNum + 's后跳转'
          } else {
            this.alertShow = false
            clearInterval(this.timer)
            if (this.$route.query.a) {
              this.$router.push('/' + this.$route.query.a)
            } else {
              this.$router.push('/') // 跳转到首页
            }
          }
        }, 1000)
      } else {
        this.$alert('当前信息填写不正确！', '提示', {
          confirmButtonText: '确定',
          center: true
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
  #Login{
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
    .loginWrap{
      width: 1000px;
      margin: 90px auto 215px;
      .loginPic{
        float: left;
        img{
          width: 526px;
          height: 398px;
        }
      }
      .loginBox{
        background: white;
        float: right;
        width: 456px;
        height: 396px;
        border: 1px solid #e6e6e6;
        ul{
          height: 31px;
          border-bottom: 1px solid #e6e6e6;
          li{
            background: #f8f8f9;
            line-height: 30px;
            color: #495060;
            font-size: 12px;
            padding: 0 16px;
            margin-right: 4px;
            border: 1px solid #e6e6e6;
            border-bottom: none;
            float: left;
            border-radius: 5px 5px 0 0;
            cursor: pointer;
            &.loginActive{
              color: #ff3c1b;
              line-height: 31px;
              background: white;
            }
          }
        }
        .loginFormWrap{
          width: 456px;
          height: 363px;
          overflow: hidden;
          .loginFormBox{
            width: 912px;
            transition: .3s;
            .accountLogin{
              float: left;
              width: 456px;
              height: 363px;
              box-sizing: border-box;
              padding: 17px 26px 0;
              .formGroup{
                width: 100%;
                padding-bottom: 24px;
                position: relative;
                div{
                  width: 100%;
                  height: 34px;
                  line-height: 34px;
                  border-radius: 5px;
                  overflow: hidden;
                  border: 1px solid #dddee1;
                  span{
                    display: inline-block;
                    width: 25px;
                    height: 100%;
                    line-height: 34px;
                    text-align: center;
                    border-right: 1px solid #dddee1;
                    background: #eee;
                  }
                  input{
                    width: 373px;
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
              }
              button{
                width: 100%;
                height: 40px;
                background: #ff3c1b;
                color: white;
                font-size: 12px;
                border-radius: 5px;
                cursor: pointer;
                margin: 8px 0 17px;
              }
              .autoLogin{
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: #9397a1;
                .checkAuto{
                  float: left;
                  input{
                    vertical-align: middle;
                  }
                  label{
                    cursor: pointer;
                  }
                }
                p{
                  float: right;
                  a{
                    font-size: 12px;
                    color: #1b1b1b;
                    &:nth-of-type(2){
                      color: red;
                    }
                  }
                }
              }
              .threeLogin{
                height: 42px;
                line-height: 42px;
                font-size: 12px;
                color: #9397a1;
                a{
                  font-size: 20px;
                  vertical-align: middle;
                  color: #80a910;
                }
              }
            }
            .loginSMS{
              float: left;
              width: 456px;
              height: 363px;
              box-sizing: border-box;
              padding: 17px 26px 0;
              &>div{
                width: 100%;
                padding-bottom: 24px;
                position: relative;
                div{
                  width: 100%;
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
                    background: #eee;
                  }
                  input{
                    width: 373px;
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
                  width: 404px;
                  height: 21px;
                  line-height: 21px;
                  font-size: 12px;
                  color: #ed3f14;
                  clear: both;
                  position: absolute;
                  bottom: 3px;
                }
                &.formCord{
                  div{
                    width: 260px;
                    margin-right: 25px;
                    float: left;
                    span{
                      background: #eee;
                    }
                    input{
                      width: 229px;
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
              button{
                width: 100%;
                height: 40px;
                background: #ff3c1b;
                color: white;
                font-size: 12px;
                border-radius: 5px;
                cursor: pointer;
                margin: 8px 0 17px;
              }
            }
          }
        }
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
