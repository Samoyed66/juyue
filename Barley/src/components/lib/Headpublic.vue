<template>
  <div id="Headpublic">
    <!-- 头部导航 -->
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
    <!-- 头部搜索 -->
    <header class="header">
      <div class="wrap clear">
        <!-- logo -->
        <router-link to="/">
          <img src="@/assets/images/logo.png">
        </router-link>
        <!-- 城市列表 -->
        <div class="cityList">
          <span @mouseenter="changeShow" @mouseleave="changeHide">{{nowCity}}</span>
          <i class="el-icon-arrow-down"></i>
          <div @mouseenter="bothShow" @mouseleave="changeHide" v-show="cityOff" class="cityWrap">
            <div class="cityArrow"></div>
            <div class="nowCity">
              当前城市:
              <span>{{nowCity}}</span>
            </div>
            <div class="hotCity clear">
              <p>热门城市:</p>
              <ul class="clear">
                <li @click="changeCityName(hotItem)" v-for="(hotItem, hotIndex) in hotCity" :key="hotIndex">{{hotItem}}</li>
              </ul>
            </div>
            <div class="otherCit clear">
              <p>其他城市:</p>
              <ul class="clear">
                <li @click="changeCityName(otherItem)" v-for="(otherItem, otherIndex) in otherCity" :key="otherIndex">{{otherItem}}</li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 搜索框 -->
        <div class="search clear">
          <input type="text" placeholder="请输入演出、艺人、场馆名称..." v-model="searchVal">
          <button @click="searchBtn">搜索</button>
          <ul v-show="false" class="jsonpList">
            <li class="clear">
              <p>安防监控啥房间卡设计稿</p>
              <span>杭州杭州</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Headpublic',
  data () {
    return {
      searchVal: '',
      // local数据
      getListDate: [],
      off: true,
      // 热门城市
      hotCity: ['全国', '北京', '上海', '深圳', '广州', '杭州', '天津', '重庆', '成都', '香港'],
      // 其他城市
      otherCity: ['上海', '北京', '深圳', '天津', '杭州', '武汉', '成都', '广州', '重庆', '西安', '南京', '苏州', '宁波', '长沙', '厦门', '郑州', '香港', '合肥', '济南', '青岛', '贵阳', '昆明', '石家庄', '无锡', '太原', '绍兴', '沈阳', '宜昌', '南昌', '常州', '包头', '哈尔滨', '南宁', '长春', '珠海', '佛山', '福州', '呼和浩特', '河源', '大连', '东莞', '海口', '南通', '廊坊', '烟台', '澳门', '黄冈', '江门', '泉州', '中山', '桂林', '惠州', '兰州', '长治', '邯郸', '嘉兴', '金华', '扬州', '台州', '泰州', '唐山', '潍坊', '遵义', '大同', '丽水', '银川', '张家口', '安庆', '德阳', '黄石', '晋中', '荆州', '马鞍山', '眉山', '绵阳', '南充', '秦皇岛', '温州', '乌鲁木齐', '芜湖', '湘潭', '新乡', '徐州', '自贡', '阿坝', '鞍山', '安顺', '保定', '昌吉', '大理', '广安', '湖州', '济宁', '荆门', '九江', '柳州', '洛阳', '三门峡', '三亚', '汕头', '商丘', '韶关', '遂宁', '台北', '泰安', '西宁', '盐城', '运城', '湛江', '漳州', '桂林', '肇庆', '淄博', '境外'
      ],
      // 城市列表显示隐藏
      cityOff: false,
      timer: null,
      nowCity: '北京'
    }
  },
  methods: {
    // 跳转列表页
    searchBtn () {
      // 路由跳转到详情页不过地址后面带上对应的id值，对应的路由index文件里面要加上一个/:id
      this.$router.push({path: '/list/' + this.searchVal})
    },
    // vuex随机数修改
    ...mapMutations(['changeNum']),
    outerLocal () {
      this.$local.remove('loginUser')
      this.off = true
    },
    // 划入显示
    changeShow () {
      this.cityOff = true
    },
    // 划出延迟隐藏
    changeHide () {
      var _this = this
      this.timer = setTimeout(() => {
        _this.cityOff = false
      }, 200)
    },
    // 划出取消定时器
    bothShow () {
      clearTimeout(this.timer)
    },
    // 点击切换城市名
    changeCityName (val) {
      this.nowCity = val
      this.$local.set('city', val)
      this.cityOff = false
      this.changeNum(Math.round(Math.random() * 2))
    },
    // 初始化验证
    getCity () {
      if (this.$local.obtain('city')) {
        this.nowCity = this.$local.obtain('city')
      }
    }
  },
  watch: {
    $route (to, from) {
      if (this.off && this.$local.obtain('loginUser')) {
        this.getListDate = this.$local.obtain('loginUser')
        this.off = false
      }
      if (to.path.substring(1, 5) === 'list') {
        this.searchVal = to.params.val
      } else {
        this.searchVal = ''
      }
    }
  },
  created () {
    if (this.$route.params.val) {
      this.searchVal = this.$route.params.val
    }
    this.getCity()
  }
}
</script>

<style scoped lang="less">
#Headpublic{
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
        z-index: 1;
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
          z-index: 1;
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
  // 头部搜索
  .header{
    padding: 15px 0 18px;
    .wrap{
      img{
        float: left;
        width: 165px;
        height: 59px;
      }
      .cityList{
        position: relative;
        padding: 0 117px 0 18px;
        float: left;
        height: 19px;
        line-height: 19px;
        font-size: 15px;
        color: #333;
        &>span{
          display: inline-block;
          width: 45px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        }
        .cityWrap{
          width: 607px;
          padding: 21px;
          border: 1px solid #f4f4f4;
          background: white;
          position: absolute;
          left: -115px;
          top: 27px;
          z-index: 4;
          .cityArrow{
            width: 14px;
            height: 14px;
            border-left: 1px solid #f4f4f4;
            border-top: 1px solid #f4f4f4;
            transform: rotate(45deg);
            position: absolute;
            background: white;
            top: -7px;
            left: 138px;
          }
          .nowCity{
            height: 25px;
            line-height: 25px;
            font-size: 16px;
            color: #111;
            span{
              display: inline-block;
              margin-left: 32px;
              height: 100%;
              padding: 0 10px;
              background: #fff4f8;
              color: #ff1296;
            }
          }
          .hotCity{
            height: 56px;
            line-height: 56px;
            padding-right: 19px;
            font-size: 16px;
            color: #111;
            border-bottom: 1px solid #eee;
            margin-bottom: 13px;
            p{
              float: left;
            }
            ul{
              float: left;
              padding-left: 24px;
              li{
                padding: 0 8px;
                float: left;
                cursor: pointer;
                &:hover{
                  color: #ff3c1b;
                }
              }
            }
          }
          .otherCit{
            line-height: 29px;
            font-size: 16px;
            color: #111;
            p{
              float: left;
              height: 348px;
            }
            ul{
              width: 514px;
              padding-left: 24px;
              float: left;
              li{
                padding: 0 8px;
                float: left;
                cursor: pointer;
                &:hover{
                  color: #ff3c1b;
                }
              }
            }
          }
        }
      }
      .search{
        width: 569px;
        height: 34px;
        line-height: 34px;
        border: 3px solid #1298ff;
        float: left;
        position: relative;
        input{
          height: 100%;
          width: 479px;
          text-indent: 10px;
          font-size: 12px;
          float: left;
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
        button{
          width: 90px;
          height: 100%;
          float: left;
          background: #1298ff;
          font-size: 16px;
          color: white;
          cursor: pointer;
        }
        .jsonpList{
          width: 449px;
          padding: 0 14px;
          border: 1px solid #f4f4f4;
          border-radius: 3px;
          background: white;
          position: absolute;
          top: 40px;
          left: 0;
          z-index: 3;
          li{
            height: 56px;
            line-height: 56px;
            border-bottom: 1px solid #eee;
            font-size: 14px;
            color: #111;
            p{
              width: 262px;
              height: 100%;
              float: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            span{
              display: block;
              height: 100%;
              width: 60px;
              float: right;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>
