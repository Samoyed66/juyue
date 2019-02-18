<template>
  <div id="details">
    <div class="head">
      <p>
        <router-link to="/">大麦</router-link> >
        <a href="javascript:;">{{getCity}}</a> >
        <a href="javascript:;">电影</a> >
        <a href="javascript:;">{{detailCont.picTitle}}</a>
      </p>
    </div>
    <div id="box">
      <div class="information">
        <img v-lazy="detailCont.src">
        <div class="content">
          <h2>{{detailCont.picTitle}}</h2>
          <p>“{{detailCont.picTitle | TitleName}}”</p>
          <div class="step">
            <el-steps :space="300" :active="2" finish-status="success" :align-center="true">
              <el-step title="项目待定"></el-step>
              <el-step title="预售/预定"></el-step>
              <el-step title="售票中"></el-step>
              <el-step title="演出开始"></el-step>
            </el-steps>
          </div>
          <div class="time">
            <span>演出时间:</span>
            <ul>
              <li @click="changeTimeClass(timeIndex)" :class="{'selection': perforTimeNum === timeIndex}" v-for="(timeItem, timeIndex) in perforTime" :key="timeIndex">{{timeItem}}</li>
            </ul>
          </div>
          <div class="ticket">
            <span>选择价票:</span>
            <ul>
              <li @click="changepriceClass(priceIndex)" :class="{'selection': priceNum === priceIndex}" v-for="(priceItem, priceIndex) in priceList" :key="priceIndex">{{priceItem}}</li>
            </ul>
          </div>
          <button @click="toSelection">选座购买</button>
        </div>
      </div>
      <div class="score">
        <dl>
          <dt>大麦网评分:</dt>
          <dd>
            <el-rate
              v-model="scoreAll"
              disabled
              show-score
              :colors="['#e9e9e9', '#ff3c1b', '#ff3c1b']"
              text-color="#ff3c1b"
              score-template="{value}">
            </el-rate>
            <span>3000</span>人参与评论
          </dd>
        </dl>
        <dl>
          <dt>演出时间</dt>
          <dd>{{detailCont.time}}</dd>
        </dl>
        <dl>
          <dt>演出场馆</dt>
          <dd>{{detailCont.city}}</dd>
          <dd>
            <i class="fa fa-map-marker"></i>
            交通路线
          </dd>
        </dl>
        <dl>
          <dt>票品支持</dt>
          <dd>
            <i class="fa fa-usd"></i>
            返积分
          </dd>
        </dl>
        <dl>
          <dt>买票配送</dt>
          <dd>同城满100.00元免运费，</dd>
        </dl>
      </div>
    </div>
    <div id="box1">
      <div class="left">
        <ul class="subTitle clear">
          <li @click="changeTitleClass(subIndex)" :class="{'selection1': cardTitleNum === subIndex}" v-for="(subItem, subIndex) in cardTitle" :key="subIndex">{{subItem}}</li>
        </ul>
        <div class="detailsCardWrap clear" :style="{'transform': 'translateX(-' + cardTitleNum * 915 + 'px)'}">
          <div class="detailsCardCont">
            <div class="information">
              <span>基本信息</span>
              <strong></strong>
            </div>
            <div class="informationCont clear">
              <div>演出时间</div>
              <div>{{detailCont.time}}</div>
              <div>演出场馆</div>
              <div>{{detailCont.city}} 音乐厅</div>
              <div>演出时间</div>
              <div>{{detailCont.time}}</div>
              <div>演出场馆</div>
              <div>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
              </div>
            </div>
            <div class="information">
              <span>项目介绍</span>
              <strong></strong>
            </div>
            <dl>
              <dt>英文站入口</dt>
              <dd>英文站入口 hrt//sadisdjsacdskjcjckdsvbsv</dd>
              <dt>演出介绍</dt>
              <dd>世界经典原版音乐剧《猫》</dd>
              <dd>猫的足迹</dd>
              <dd>{{detailCont.cparagraph | firstPage}}</dd>
              <dd>
                <img v-lazy="detailCont.src">
              </dd>
              <dd>{{detailCont.cparagraph | nextPage}}</dd>
            </dl>
            <div class="comments">
              <div class="stars">
                打个分吧:
                <el-rate
                  v-model="score"
                  show-score
                  :colors="['#e9e9e9', '#f90', '#ff3c1b']"
                  text-color="#ff3c1b"
                  score-template="{value}">
                </el-rate>
              </div>
              <textarea v-model="comVal" rows="8" cols="40" maxlength="1000" placeholder="写个评论吧10-1000字"></textarea>
              <button @click="sendCom">评论</button>
            </div>
            <ul class="commentCont">
              <li v-for="(comItem, comIndex) in comList" :key="comIndex">
                <p>
                  <img v-lazy="detailCont.src">
                  <span>{{comIndex + 12}}</span>
                </p>
                <p>
                  <span>{{comItem.title}}</span>
                  <strong>
                    <el-rate
                      v-model="comItem.num"
                      disabled
                      show-score
                      :colors="['#e9e9e9', '#f90', '#ff3c1b']"
                      text-color="#ff3c1b"
                      score-template="{value}">
                    </el-rate>
                    <span>{{comItem.time}}</span>
                  </strong>
                </p>
              </li>
            </ul>
          </div>
          <div class="detailsCardCont">
            <div class="information">
              <span>写剧评</span>
              <strong></strong>
            </div>
            <div class="comments">
              <div class="stars">
                打个分吧:
                <el-rate
                  v-model="score"
                  show-score
                  :colors="['#e9e9e9', '#f90', '#ff3c1b']"
                  text-color="#ff3c1b"
                  score-template="{value}">
                </el-rate>
              </div>
              <textarea v-model="comVal" rows="8" cols="40" maxlength="1000" placeholder="写个评论吧10-1000字"></textarea>
              <button @click="sendCom">评论</button>
            </div>
            <ul class="commentCont">
              <li v-for="(comItem, comIndex) in comList" :key="comIndex">
                <p>
                  <img v-lazy="detailCont.src">
                  <span>{{comIndex + 12}}</span>
                </p>
                <p>
                  <span>{{comItem.title}}</span>
                  <strong>
                    <el-rate
                      v-model="comItem.num"
                      disabled
                      show-score
                      :colors="['#e9e9e9', '#f90', '#ff3c1b']"
                      text-color="#ff3c1b"
                      score-template="{value}">
                    </el-rate>
                    <span>{{comItem.time}}</span>
                  </strong>
                </p>
              </li>
            </ul>
          </div>
          <div class="detailsCardCont">
            <div class="information">
              <span>基本信息</span>
              <strong></strong>
            </div>
            <div class="informationCont clear">
              <div>演出时间</div>
              <div>{{detailCont.time}}</div>
              <div>演出场馆</div>
              <div>{{detailCont.city}} 音乐厅</div>
              <div>演出时间</div>
              <div>{{detailCont.time}}</div>
              <div>演出场馆</div>
              <div>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
                <p>{{detailCont.city}} 音乐厅</p>
              </div>
            </div>
          </div>
          <div class="detailsCardCont">
            <div class="information">
              <span>项目介绍</span>
              <strong></strong>
            </div>
            <dl>
              <dt>英文站入口</dt>
              <dd>英文站入口 hrt//sadisdjsacdskjcjckdsvbsv</dd>
              <dt>演出介绍</dt>
              <dd>世界经典原版音乐剧《猫》</dd>
              <dd>猫的足迹</dd>
              <dd>{{detailCont.cparagraph | firstPage}}</dd>
              <dd>
                <img v-lazy="detailCont.src">
              </dd>
              <dd>{{detailCont.cparagraph | nextPage}}</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="right">
        <dl>
          <dt>热门推荐</dt>
          <dd @click="toDetail(hotItem)" @mouseenter="HotShow(hotIndex)" :class="{'recommend': HotNum === hotIndex}" v-for="(hotItem, hotIndex) in HotRecList" :key="hotIndex">
            <img v-show="HotNum === hotIndex" v-lazy="hotItem.src">
             {{hotItem.picTitle}}
            <p>{{hotItem.time}}</p>
          </dd>
        </dl>
        <dl>
          <dt>浏览历史</dt>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
          <dd>
            大型多媒体励志互动儿童剧《爱丽丝梦幻仙境》( 11月 )
            <p>2017-09-17-2017-09-17</p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
var moment = require('moment')
export default {
  name: 'Details',
  data () {
    return {
      HotRecList: [],
      HotNum: 0,
      comVal: '',
      scoreAll: 4.6,
      score: 0,
      getCity: '北京',
      detailCont: {},
      perforTime: ['1999-11-09 09:44:55', '2000-05-22 06:48:36', '2000-07-16 07:19:01', '2002-09-22 04:43:40'],
      perforTimeNum: -1,
      priceList: ['80元', '90元', '100元'],
      priceNum: -1,
      cardTitle: ['演出信息', '精彩剧评', '购买说明', '付款方式'],
      cardTitleNum: 0,
      comList: [
        {
          title: '喜剧风格引发深度思考，精彩！精彩！精彩！非常值得一看!',
          num: 1.5,
          time: '2017年12月23日'
        },
        {
          title: '喜剧风格引发深！精彩！非常值得一看!',
          num: 2.5,
          time: '2017年12月23日'
        },
        {
          title: '喜剧风格引发深度思考，精彩！精得一看!',
          num: 3.5,
          time: '2017年12月23日'
        },
        {
          title: '喜剧风格引发深度思考一看!',
          num: 4.5,
          time: '2017年12月23日'
        },
        {
          title: '精彩！精彩！精彩！非常值得一看!',
          num: 5,
          time: '2017年12月23日'
        },
        {
          title: '值得一看!',
          num: 5,
          time: '2017年12月23日'
        }
      ]
    }
  },
  filters: {
    TitleName (item) {
      return item.substring(3, 7)
    },
    firstPage (item) {
      return item.substring(0, 350)
    },
    nextPage (item) {
      return item.substring(350, 500)
    }
  },
  watch: {
    $route (to, from) {
      if (this.$local.obtain('DetailData')) {
        this.detailCont = this.$local.obtain('DetailData')
      }
      window.scrollTo(0, 0)
    }
  },
  methods: {
    // vuex选定时间
    ...mapMutations(['toTime', 'toPrice']),
    // 点击跳转详情页并存数据
    toDetail (val) {
      // val是点击时当前的一组数据
      // 原型上面绑定的local本地数据存储的方法
      this.$local.set('DetailData', val)
      // 路由跳转到详情页不过地址后面带上对应的id值，对应的路由index文件里面要加上一个/:id
      this.$router.push({path: '/details/' + val.id})
      window.scrollTo(0, 0)
    },
    changeTimeClass (timeI) {
      if (this.perforTimeNum === timeI) {
        this.perforTimeNum = -1
      } else {
        this.perforTimeNum = timeI
      }
    },
    changepriceClass (priceI) {
      if (this.priceNum === priceI) {
        this.priceNum = -1
      } else {
        this.priceNum = priceI
      }
    },
    // 跳转选座页
    toSelection () {
      if (this.perforTimeNum !== -1 && this.priceNum !== -1) {
        this.toTime(this.perforTime[this.perforTimeNum])
        this.toPrice(parseInt(this.priceList[this.priceNum]))
        this.$router.push({path: '/selection'})
        window.scrollTo(0, 0)
      }
    },
    changeTitleClass (TitleI) {
      this.cardTitleNum = TitleI
    },
    // 发送评论
    sendCom () {
      if (this.score === 0 || this.comVal.length < 10) {
        this.$alert('当前评论至少10字或咱没有评分', '提示', {
          confirmButtonText: '确定',
          center: true
        })
      } else {
        var obj = {
          title: this.comVal,
          num: this.score,
          time: moment().format('YYYY年M月D日')
        }
        this.comList.unshift(obj)
        this.score = 0
        this.comVal = ''
        this.$local.set('ComCont', this.comList)
      }
    },
    // 热门推荐初始化数据
    HotRec () {
      this.$http.get(this.$url + 'listHotCard03').then((res) => {
        this.HotRecList = res.data.card[0].list
      })
    },
    HotShow (hotI) {
      this.HotNum = hotI
    }
  },
  created () {
    this.HotRec()
    if (this.$local.obtain('city')) {
      this.getCity = this.$local.obtain('city')
    }
    if (this.$local.obtain('DetailData')) {
      this.detailCont = this.$local.obtain('DetailData')
    }
    if (this.$local.obtain('ComCont')) {
      this.comList = this.$local.obtain('ComCont')
    }
  }
}
</script>

<style scoped lang="less">
  #details{
    .head{
      width: 1200px;
      height: 50px;
      line-height: 50px;
      margin: 0 auto;
      background: #f6f6f6;
      p{
        text-indent: 21px;
        color: #dddee1;
        a{
          color: #495060;
          font-size: 12px;
          &:nth-of-type(3){
            color: #ff3c1b;
          }
        }
      }
    }
    #box{
      width: 1200px;
      height: 457px;
      background: white;
      margin: 0 auto;
      overflow: hidden;
      margin-bottom: 30px;
      .information{
        padding: 31px 11px 18px 22px;
        float: left;
        overflow: hidden;
        img{
          width: 277px;
          height: 372px;
          float: left;
        }
        .content{
          width: 600px;
          float: left;
          margin-left: 19px;
          h2{
            font-size: 20px;
            margin-bottom: 38px;
          }
          p{
            font-size: 16px;
            color: #495060;
            margin-bottom: 23px;
          }
          .time{
            width: 100%;
            overflow: hidden;
            span{
              display: inline-block;
              margin-top: 56px;
              font-size: 12px;
              float: left;
            }
            ul{
              overflow: hidden;
              margin-top: 22px;
              li{
                border: 1px solid #ccc;
                border-radius: 4px;
                padding: 8px 20px;
                display: inline-block;
                font-size: 12px;
                margin-left: 10px;
                margin-top: 5px;
                cursor: pointer;
              }
              .selection{
                border: 1px solid #ff3c1b;
                color: #ff3c1b;
              }
            }
          }
          .ticket{
            width: 100%;
            height: 36px;
            overflow: hidden;
            margin-top: 25px;
            span{
              display: inline-block;
              font-size: 14px;
              float: left;
              margin-top: 8px;
            }
            ul{
              li{
                display: inline-block;
                padding: 8px 13px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 12px;
                margin-left: 12px;
                cursor: pointer;
              }
              .selection{
                border: 1px solid #ff3c1b;
                color: #ff3c1b;
              }
              .on{
                background: #f7f7f7;
                color: #ccc;
              }
            }
          }
          button{
            width: 152px;
            height: 41px;
            border-radius: 4px;
            font-size: 16px;
            color: white;
            background: #ff3c1b;
            margin: 12px 0 0 66px;
            cursor: pointer;
          }
        }
      }
      .score{
        float: left;
        dl:nth-of-type(1){
          width: 263px;
          border-bottom: 1px dashed #ccc;
          dt{
            font-size: 14px;
            margin-top: 34px;
            margin-bottom: 19px;
          }
          dd{
            display: flex;
            font-size: 12px;
            margin-bottom: 18px;
            span{
              display: inline-block;
              margin-left: 8px;
              color: #ff3c1b;
            }
          }
        }
        dl{
          border-bottom: 1px dashed #ccc;
          dt{
            font-size: 12px;
            margin: 12px 0 20px 0;
          }
          dd{
            font-size: 12px;
            margin-bottom: 12px;
            i{
              color: #ff3c1b;
            }
          }
        }
      }
    }
    #box1{
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .left{
        width: 915px;
        padding-bottom: 20px;
        float: left;
        background: white;
        overflow: hidden;
        .subTitle{
          width: 100%;
          overflow: hidden;
          margin-bottom: 42px;
          li{
            width: 88px;
            float: left;
            font-size: 16px;
            line-height: 38px;
            box-sizing: border-box;
            text-align: center;
            cursor: pointer;
            &.selection1{
              color: #ff3c1b;
              border-top: 3px solid #ff3c1b;
            }
          }
        }
        .detailsCardWrap{
          width: 3660px;
          transition: .3s;
          .detailsCardCont{
            float: left;
            width: 915px;
            .information{
              width: 899px;
              height: 27px;
              line-height: 27px;
              border-left: 2px solid #ff3c1b;
              margin-left: 30px;
              span{
                display: inline-block;
                margin-left: 9px;
                font-size: 18px;
              }
              strong{
                width: 765px;
                display: inline-block;
                border-bottom: 1px dashed #ccc;
                margin-left: 30px;
              }
              &:nth-of-type(3){
                margin: 22px 0 25px 40px;
              }
            }
            .informationCont{
              width: 741px;
              height: 228px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-top: 2px solid #ccc;
              margin: 35px 0 39px 130px;
              background: white;
              &>div{
                float: left;
                font-size: 12px;
                color: #495060;
                &:first-of-type, &:nth-of-type(3){
                  width: 109px;
                  height: 48px;
                  line-height: 48px;
                  text-align: center;
                  background: #eee;
                  border-right: 1px solid #ccc;
                  border-bottom: 1px solid #ccc;
                }
                &:nth-of-type(2), &:nth-of-type(4){
                  width: 258px;
                  height: 48px;
                  line-height: 48px;
                  text-align: center;
                  border-right: 1px solid #ccc;
                  border-bottom: 1px solid #ccc;
                }
                &:nth-of-type(4){
                  width: 260px;
                  border-right: none;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                &:nth-of-type(5), &:nth-of-type(7){
                  width: 109px;
                  line-height: 48px;
                  text-align: center;
                  background: #eee;
                  border-right: 1px solid #ccc;
                  height: 176px;
                }
                &:nth-of-type(6), &:nth-of-type(8){
                  width: 258px;
                  line-height: 48px;
                  text-align: center;
                  border-right: 1px solid #ccc;
                  height: 176px;
                }
                &:nth-of-type(8){
                  width: 260px;
                  border-right: none;
                  line-height: 18px;
                  padding-top: 15px;
                  p{
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
            &>dl{
              width: 721px;
              margin-left: 143px;
              dt{
                width: 721px;
                height: 41px;
                line-height: 41px;
                background: #eee;
                text-indent: 8px;
                margin: 22px 0;
              }
              dd{
                width: 721px;
                font-size: 12px;
                line-height: 22px;
                img{
                  width: 277px;
                  height: 372px;
                  margin:0 0 9px 230px;
                }
              }
            }
            .comments{
              margin-top: 28px;
              width: 721px;
              margin-left: 143px;
              .stars{
                display: flex;
                margin-bottom: 9px;
                span{
                  display: inline-block;
                  margin-right: 8px;
                }
              }
              textarea{
                width: 741px;
                border-radius: 5px;
                border: 1px solid #ccc;
                text-indent: 7px;
              }
              button{
                width: 153px;
                height: 42px;
                border-radius: 5px;
                background: #ff3c1b;
                color: white;
                font-size: 14px;
                margin: 20px 0 20px 20px;
                cursor: pointer;
              }
            }
            .commentCont{
              li{
                width: 847px;
                overflow: hidden;
                margin: 20px 0 39px 0;
                p:nth-of-type(1){
                  float: left;
                  padding-left: 20px;
                  img{
                    width: 45px;
                    height: 45px;
                    margin: 0;
                  }
                  span{
                    display: inline-block;
                    margin-left: 13px;
                    font-size: 12px;
                  }
                }
                p:nth-of-type(2){
                  width: 742px;
                  height: 87px;
                  background: #f0f0f0;
                  float: right;
                  &>span{
                    display: inline-block;
                    margin: 23px 0 0 20px;
                    font-size: 14px;
                  }
                  strong{
                    display: inline-block;
                    display: flex;
                    margin: 20px;
                    font-size: 12px;
                    span{
                      padding-left: 12px;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .right{
        width: 264px;
        float: right;
        dl{
          background: white;
          padding: 0 6px 34px 6px;
          dt{
            width: 100%;
            height: 33px;
            line-height: 33px;
            border-bottom: 1px solid #ccc;
            font-size: 16px;
            margin-bottom: 18px;
          }
          dd{
            cursor: pointer;
            font-size: 12px;
            line-height: 24px;
            border-bottom: 1px dashed #ccc;
            p{
              margin-bottom: 8px;
            }
          }
          .recommend{
            font-size: 12px;
            text-align: center;
            line-height: 24px;
            border-bottom: 1px dashed #ccc;
            img{
              width: 100%;
              height: 356px;
            }
          }
          dd:nth-of-type(6){
            border-bottom: 1px solid #ccc;
          }
        }
        dl:nth-of-type(2){
          margin-top: 10px;
        }
        dd:nth-of-type(10){
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
</style>
<style lang="less">
  .step{
    width: 600px;
    height: 85px;
    background: #f7f7f7;
    box-sizing: border-box;
    padding-top: 30px;
    .el-steps--horizontal{
      transform: translateX(-5%);
      .is-horizontal{
        .el-step__head{
          width: 85%;
          .el-step__line{
            left: 120%;
            right: -50%;
          }
          &.is-success{
            color: #ff3c1b;
            border-color: #ff3c1b;
          }
          &.is-process{
            .el-step__icon{
              border: none;
              background: #ff3c1b;
              .el-step__icon-inner{
                color: white;
              }
            }
          }
        }
        .el-step__main{
          position: absolute;
          right: 0;
          top: -35%;
          .el-step__title{
            color: #999;
            &.is-process{
              color: #666;
            }
          }
        }
      }
    }
  }
</style>
