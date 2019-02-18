<template>
  <div id="OrderSure">
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
    <!-- 购票人信息弹窗 -->
    <div class="infoWrap" v-show="infoOff">
      <div class="infoBox">
        <div class="newBtn clear">
          <span class="fa fa-close" @click="closeWrap"></span>
          <button @click="open">新建购票人</button>
          <button @click="trueCheck">确认</button>
        </div>
        <div class="presonList">
          <div class="listTitle">
            <div><input type="checkbox" v-model="isCheckeds"></div>
            <div>姓名</div>
            <div>卡类型</div>
            <div>身份证号</div>
          </div>
          <div class="listCont" v-for="(listItem, liseIndex) in tableinfo" :key="liseIndex">
            <div><input type="checkbox" v-model="listItem.checked"></div>
            <div>{{listItem.name}}</div>
            <div>{{listItem.cardtype}}</div>
            <div>{{listItem.id}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--添加购票人信息弹出框-->
    <div class="NewWrap" v-show="show">
      <el-form :rules="rules" ref="formwrap" class="addinfo" label-position="right" label-width="80px" :model="addinfo">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="卡类型" prop="cardtype">
          <el-select v-model="addinfo.cardtype" placeholder="请选择卡类型">
            <el-option label="vip" value="vip"></el-option>
            <el-option label="svip" value="svip"></el-option>
            <el-option label="lowb" value="lowb"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="id">
          <el-input v-model.number="addinfo.id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('formwrap')">立即创建</el-button>
          <el-button @click="reslove">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 购票人信息弹窗 -->
    <div class="OrderCont">
      <div class="wrap">
        <ul class="selectNav">
          <li>1 选择商品</li>
          <li>
            <div class="subBottom"></div>
            <div class="subtop"></div>
            <p>2 确认订单信息</p>
          </li>
          <li>3 支付订单</li>
          <li>4 收取商品</li>
        </ul>
        <div class="orderTitle">
          <span>实名证件信息</span>
        </div>
        <div class="presonWrap">
          <div class="selectPreson">
            购票人: <button @click="presonInfo">选择购票人</button>
          </div>
          <div class="checkList" v-show="checkPresonList.length > 0">
            <div class="listTitle">
              <div>#</div>
              <div>姓名</div>
              <div>卡类型</div>
              <div>身份证号</div>
              <div>操作</div>
            </div>
            <div class="listCont" v-for="(listItem, liseIndex) in checkPresonList" :key="liseIndex">
              <div>{{liseIndex + 1}}</div>
              <div>{{listItem.name}}</div>
              <div>{{listItem.cardtype}}</div>
              <div>{{listItem.id}}</div>
              <div><button @click="falseCheck(listItem)">取消</button></div>
            </div>
          </div>
        </div>
        <div class="orderTitle">
          <span>选择付款方式</span>
        </div>
        <div class="payment">
          <span class="fa fa-dot-circle-o"></span>
          <span>网上付款</span>
        </div>
        <div class="orderTitle">
          <span>商品清单</span>
        </div>
        <div class="orderList">
          <div class="listTitle">
            <div>商品名称</div>
            <div>座位号</div>
            <div>价格</div>
            <div>数量</div>
            <div>价格小计（元）</div>
          </div>
          <div class="listCont" v-for="(listItem, liseIndex) in seatInfo" :key="liseIndex">
            <div>{{detailCont.picTitle}}</div>
            <div>{{listItem.row}}排{{listItem.col}}座</div>
            <div>{{detailPrice}}</div>
            <div>1</div>
            <div>{{detailPrice}}</div>
          </div>
        </div>
        <div class="orderTitle">
          <span>我要开发票</span>
        </div>
        <div class="invoice">
          <ul class="invoiceTitle clear">
            <li @click="changeInvoiceClass(invoiceIndex)" :class="{'invoiceActive': invoiceNum === invoiceIndex}" v-for="(invoiceItem, invoiceIndex) in invoiceList" :key="invoiceIndex">{{invoiceItem}}</li>
          </ul>
          <div class="invoiceWrap">
            <div class="invoiceBox clear" :style="{'transform': 'translateX(-' + invoiceNum * 1158 + 'px)'}">
              <div class="invoiceCont">
                <div>
                  公司抬头:
                  <input type="text" placeholder="请输入公司抬头">
                </div>
                <div>
                  公司税号:
                  <input type="text" placeholder="请输入公司税号">
                </div>
                <button>确认发票信息</button>
              </div>
              <div class="invoiceCont">
                <div>
                  个人抬头:
                  <input type="text" placeholder="请输入个人抬头">
                </div>
                <button>确认发票信息</button>
              </div>
            </div>
          </div>
        </div>
        <div class="insurance">
          <p>
            <input id="insuranceCheck" type="checkbox" v-model="insuranceVal">
            <label for="insuranceCheck">购买“安心订票保险”，本单保费金额: 20.00元</label>
          </p>
          <p>查看 保险服务说明 和 《安心订票保险条款》</p>
          <p>购买保险，请填写真实姓名</p>
          <p>商品金额: <span>¥{{allPrice}}</span></p>
          <p>商品保险: +<span>¥{{changeCheck}}</span></p>
        </div>
        <div class="orderAll">
          <p>
            <span>待支付总额: </span>
            <span>{{allPrice + changeCheck}}</span>
          </p>
          <p>
            <input id="orderCheck" type="checkbox" v-model="orderVal">
            <label for="orderCheck"><span>我已经阅读同意</span> 《订购服务条款》 《退换货约定》 《退款约定》</label>
          </p>
          <p>同意“票品为不记名凭证，请您妥善保管，遗失不补”</p>
          <button @click="toOrderPay" :style="{'background': orderVal ? '#ff3c1b':'#c3c3c3'}">同意以上协议并提交订单</button>
        </div>
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
  name: 'OrderSure',
  data () {
    /* 自定义验证身份证号 */
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    var checkid = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (reg.test(value) === false) {
            callback(new Error('身份证输入不合法'))
          } else {
            callback()
          }
        }
      }, 200)
    }
    return {
      off: true,
      // local数据
      getListDate: [],
      detailCont: {},
      invoiceList: ['公司', '个人'],
      invoiceNum: 0,
      insuranceVal: true,
      orderVal: false,
      infoOff: false,
      /* 总购票人信息 */
      tableinfo: [
        {
          name: '小明',
          cardtype: 'vip',
          id: '421658956123456789',
          checked: false
        },
        {
          name: '小hong',
          cardtype: 'svip',
          id: '421658956123456345',
          checked: false
        },
        {
          name: '小王',
          cardtype: 'lowb',
          id: '421658954567328906',
          checked: false
        }
      ],
      /* 弹出框是否显示 */
      show: false,
      /* 单个添加的购票人信息 */
      addinfo: {
        name: '',
        cardtype: '',
        id: '',
        checked: false
      },
      /* 表单验证规则 */
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        cardtype: [
          { required: true, message: '请选择卡类型', trigger: 'change' }
        ],
        id: [
          {validator: checkid, trigger: 'blur'}
        ]
      },
      allOff: true,
      checkPresonList: []
    }
  },
  computed: {
    // vuex选定时间
    ...mapState(['seatInfo', 'allPrice', 'detailPrice']),
    changeCheck () {
      if (this.insuranceVal) {
        return 20
      } else {
        return 0
      }
    },
    isCheckeds: {
      get () {
        return this.tableinfo.every((item) => {
          return item.checked
        })
      },
      set () {
        if (this.allOff) {
          this.tableinfo.forEach((item) => {
            item.checked = true
          })
        } else {
          this.tableinfo.forEach((item) => {
            item.checked = false
          })
        }
        this.allOff = !this.allOff
      }
    }
  },
  methods: {
    // vuex
    ...mapMutations(['toSeatInfo', 'toAllPrice']),
    outerLocal () {
      this.getListDate = []
      this.$local.remove('loginUser')
      this.off = true
    },
    changeInvoiceClass (invoiceI) {
      this.invoiceNum = invoiceI
    },
    toOrderPay () {
      if (this.orderVal) {
        this.toAllPrice(this.allPrice + this.changeCheck)
        this.$router.push({path: '/orderPay'})
        window.scrollTo(0, 0)
      }
    },
    // 购票人信息
    presonInfo () {
      this.infoOff = true
    },
    // 关闭信息弹窗
    closeWrap () {
      this.infoOff = false
    },
    /* 弹出信息输入框 */
    open () {
      this.show = true
      this.infoOff = false
    },
    /* 取消信息输入 */
    reslove () {
      this.show = false
      this.infoOff = true
    },
    /* 验证成功信息添加 */
    onSubmit (addinfo) {
      this.$refs[addinfo].validate((valid) => {
        if (valid) {
          this.tableinfo.push(this.addinfo)
          this.$local.set('tableinfo', this.tableinfo)
          this.show = false
          this.infoOff = true
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 确认购票人
    trueCheck () {
      this.checkPresonList = this.tableinfo.filter((item) => {
        return item.checked
      })
      this.infoOff = false
    },
    // 取消购票人
    falseCheck (val) {
      val.checked = false
      this.checkPresonList = this.checkPresonList.filter((item) => {
        return item.checked
      })
    }
  },
  created () {
    if (this.off && this.$local.obtain('loginUser')) {
      this.getListDate = this.$local.obtain('loginUser')
      this.off = false
    }
    if (this.$local.obtain('DetailData')) {
      this.detailCont = this.$local.obtain('DetailData')
    }
    if (this.$local.obtain('tableinfo')) {
      this.tableinfo = this.$local.obtain('tableinfo')
    } else {
      this.$local.set('tableinfo', this.tableinfo)
    }
  }
}
</script>

<style scoped lang="less">
  #OrderSure{
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
    .OrderCont{
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
            &:nth-of-type(2){
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
                position: absolute;
                top: 0;
                left: 0;
              }
            }
          }
        }
        .orderTitle{
          width: 100%;
          height: 32px;
          line-height: 32px;
          border-bottom: 1px solid #d7d7d7;
          span{
            display: inline-block;
            width: 120px;
            text-indent: 10px;
            color: #ff3c1b;
            border-bottom: 1px solid #ff3c1b;
          }
        }
        .presonWrap{
          width: 100%;
          padding-bottom: 18px;
          .selectPreson{
            height: 52px;
            line-height: 52px;
            font-size: 12px;
            color: #495060;
            button{
              width: 92px;
              height: 32px;
              background: #ff3c1b;
              color: white;
              border-radius: 5px;
              cursor: pointer;
              margin-left: 10px;
            }
          }
          .checkList{
            width: 100%;
            border: 1px solid #dddee1;
            &>div{
              display: flex;
              justify-content: space-around;
              font-size: 12px;
              color: #495060;
              div{
                height: 40px;
                line-height: 40px;
                width: 20%;
                padding-left: 18px;
                border-right: 1px solid #dddee1;
                border-bottom: 1px solid #dddee1;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              &.listTitle{
                background: #f8f8f9;
                font-size: 14px;
                div{
                  &:last-of-type{
                    border-right: none;
                  }
                }
              }
              &.listCont{
                div{
                  height: 48px;
                  line-height: 48px;
                  &:last-of-type{
                    border-right: none;
                    button{
                      width: 60px;
                      height: 32px;
                      background: #ff3c1b;
                      color: white;
                      border-radius: 5px;
                      cursor: pointer;
                    }
                  }
                }
                &:last-of-type{
                  div{
                    border-bottom: none;
                  }
                }
              }
            }
          }
        }
        .payment{
          width: 100%;
          height: 40px;
          line-height: 40px;
          padding-bottom: 17px;
          font-size: 12px;
          color: #495060;
          .fa-dot-circle-o{
            color: #ff3c1b;
            padding-right: 10px;
            cursor: pointer;
          }
        }
        .orderList{
          width: 100%;
          border: 1px solid #dddee1;
          margin: 10px 0 28px;
          &>div{
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            color: #495060;
            div{
              height: 40px;
              line-height: 40px;
              width: 20%;
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
                &:nth-of-type(1){
                  height: 42px;
                  padding-top: 6px;
                  line-height: 18px;
                }
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
        .invoice{
          width: 100%;
          padding-bottom: 20px;
          border-bottom: 1px solid #c3c3c3;
          .invoiceTitle{
            height: 35px;
            border-bottom: 1px solid #dddee1;
            li{
              width: 60px;
              text-align: center;
              line-height: 35px;
              float: left;
              cursor: pointer;
              &.invoiceActive{
                line-height: 34px;
                border-bottom: 2px solid #ff3c1b;
                color: #ff3c1b;
              }
            }
          }
          .invoiceWrap{
            width: 1158px;
            height: 199px;
            border: 1px solid #dddee1;
            border-top: none;
            overflow: hidden;
            .invoiceBox{
              width: 2316px;
              transition: .3s;
              .invoiceCont{
                width: 1158px;
                height: 199px;
                box-sizing: border-box;
                padding: 15px 0 0 15px;
                float: left;
                &>div{
                  height: 50px;
                  line-height: 50px;
                  font-size: 12px;
                  color: #495060;
                  input{
                    width: 298px;
                    height: 30px;
                    border: 1px solid #c3c3c3;
                    border-radius: 3px;
                    text-indent: 4px;
                    &::-webkit-input-placeholder{
                      color: #757575;
                    }
                    &::-moz-input-placeholder{/* Firefox 19+ */
                      color: #757575;
                    }
                    &:-moz-input-placeholder{/* Firefox 4 to 18 */
                      color: #757575;
                    }
                    &:-ms-input-placeholder{
                      color: #757575;
                    }
                  }
                }
                button{
                  width: 104px;
                  height: 32px;
                  background: #ff3c1b;
                  color: white;
                  border-radius: 5px;
                  font-size: 12px;
                  margin: 20px 0 0 30px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .insurance{
          width: 100%;
          height: 119px;
          padding: 20px 0 21px;
          text-align: right;
          border-bottom: 1px dashed #c3c3c3;
          p{
            font-size: 12px;
            color: #1b1b1b;
            height: 23px;
            line-height: 23px;
            span{
              color: #ff3c1b;
            }
          }
        }
        .orderAll{
          text-align: right;
          padding: 20px 0 70px;
          p{
            font-size: 12px;
            color: #495060;
            height: 23px;
            line-height: 23px;
            span{
              font-weight: bold;
            }
            &:first-of-type{
              span:last-of-type{
                color: #ff3c1b;
              }
            }
          }
          button{
            width: 164px;
            height: 32px;
            border-radius: 5px;
            margin-top: 21px;
            color: white;
            font-size: 12px;
            cursor: pointer;
          }
        }
      }
    }
    // 底部
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
    // 添加购票人
    .NewWrap{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background: rgba(0,0,0,.5);
      z-index: 3;
      .addinfo{
        padding: 20px;
        width: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(left top, white , blueviolet);
      }
    }
    .infoWrap{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 3;
      .infoBox{
        width: 500px;
        height: 181px;
        padding: 15px;
        background: white;
        border: 1px solid #f7f7f7;
        border-top: 2px solid #f7f7f7;
        border-bottom: 2px solid #f7f7f7;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        .newBtn{
          width: 100%;
          margin-bottom: 15px;
          span{
            padding-left: 5px;
            cursor: pointer;
            font-size: 20px;
          }
          button{
            width: 80px;
            height: 26px;
            background: #ed3f14;
            color: white;
            font-size: 12px;
            border-radius: 3px;
            float: right;
            margin-right: 15px;
            cursor: pointer;
            &:last-of-type{
              width: 50px;
              background: green;
            }
          }
        }
        .presonList{
          width: 100%;
          max-height: 143px;
          border: 1px solid #dddee1;
          overflow: auto;
          &>div{
            display: flex;
            justify-content: space-around;
            font-size: 12px;
            color: #495060;
            div{
              height: 30px;
              line-height: 30px;
              width: 25%;
              padding-left: 18px;
              border-right: 1px solid #dddee1;
              border-bottom: 1px solid #dddee1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            &.listTitle{
              background: #f8f8f9;
              div{
                &:first-of-type{
                  width: 45px;
                }
                &:last-of-type{
                  border-right: none;
                }
              }
            }
            &.listCont{
              div{
                height: 36px;
                line-height: 36px;
                &:nth-of-type(1){
                  width: 45px;
                }
                &:last-of-type{
                  border-right: none;
                }
              }
              &:last-of-type{
                div{
                  border-bottom: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
