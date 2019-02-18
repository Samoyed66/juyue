<template>
  <div id="list">
    <p>共 <span>{{allNum}}</span> 个商品</p>
    <div id="box">
      <div class="left">
        <div class="choice">
          <div class="city" v-for="(choiceItem, choiceIndex) in choiceList" :key="choiceIndex">
            <span>{{choiceItem.title}}</span>
            <ul>
              <li @click="changeClass(linksIndex, choiceIndex)" :class="{'selection': choiceItem.index === linksIndex}" v-for="(linksItem, linksIndex) in choiceItem.links" :key="linksIndex">{{linksItem}}</li>
              <li v-if="choiceIndex === 2">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  align="center"
                  @change="changerandom"
                  :editable="false"
                  :clearable="false"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li v-if="choiceIndex === 2">
                <el-date-picker
                  v-model="value2"
                  align="center"
                  type="date"
                  @change="changerandom"
                  :editable="false"
                  :clearable="false"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
            </ul>
          </div>
        </div>
        <div class="box1">
          <div class="tab">
            <ul>
              <li @click="changeCard(cardIndex)" :class="{'popular': cardTitleNum === cardIndex}" v-for="(cardItem, cardIndex) in cardTitle" :key="cardIndex">{{cardItem}}</li>
            </ul>
            <div class="typeface">
              <span @click="changeIcon(iconIndex)" v-for="(iconItem, iconIndex) in cardIcon" :key="iconIndex" :class="{'in': iconNum === iconIndex}">
                <i :class="iconItem"></i>
              </span>
            </div>
          </div>
          <div class="box2 clear">
            <div @click="toDetail(ListItem)" class="main1" v-for="(ListItem, ListIndex) in someList" :key="ListIndex" :style="{'width': iconNum === 1 ? '227px':'908px'}">
              <div class="listPic" @mouseenter="InfoShow(ListIndex)" @mouseleave="InfoHide">
                <img :src="ListItem.src">
                <div class="cityInfo" v-show="iconNum === 1" :style="{'transform': cityInfoShow === ListIndex ? 'translateY(0)':'translateY(20px)'}">{{ListItem.city}}</div>
              </div>
              <dl v-show="iconNum !== 1">
                <dt>[{{ListItem.city | someCity}}] {{ListItem.picTitle}}</dt>
                <dd>{{ListItem.cparagraph | somePage}}</dd>
                <dd><i class="fa fa-th"></i>{{ListItem.time}}</dd>
                <dd><i class="fa fa-map-marker"></i>{{ListItem.city}}</dd>
                <dd><span>{{ListItem.price}}</span>售票中</dd>
                <dd><i class="iconfont">&#xe623;</i>电子票</dd>
              </dl>
              <div class="smallInfo" v-show="iconNum === 1">
                <h4>{{ListItem.picTitle}}</h4>
                <p>{{ListItem.time}}</p>
                <p><span>{{ListItem.price}}</span>售票中</p>
              </div>
            </div>
            <div class="paging">
              <span>共 {{allNum}} 条</span>
              <el-pagination
                @prev-click="listNumDown"
                @next-click="listNumUp"
                @current-change="changelistNum"
                layout="prev, pager, next"
                :total="GetList.length * 10">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <h4>您可能喜欢</h4>
        <div @click="toDetail(someList[otherIndex])" v-if="someList.length > 0" class="main" v-for="otherIndex in 2" :key="otherIndex">
          <img v-lazy="someList[otherIndex].src">
          <div class="right-1">
            <dl>
              <dt>{{someList[otherIndex].picTitle}}</dt>
              <dd>{{someList[otherIndex].city}}</dd>
              <dd>{{someList[otherIndex].time}}</dd>
              <dd><span>{{someList[otherIndex].price | otherPrice}}</span> 起</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data () {
    return {
      // 随机数
      randomNum: 0,
      value1: '',
      value2: '',
      // 筛选器城市
      choiceList: [
        {
          index: 0,
          title: '城市:',
          links: ['全部', '北京', '上海', '深圳', '广州', '成都', '西安']
        },
        {
          index: 0,
          title: '分类: ',
          links: ['全部', '音乐会', '朗诵', '曲苑杂坛', '独奏', '管弦乐', '声乐及合唱']
        },
        {
          index: 0,
          title: '时间: ',
          links: ['全部', '今天', '明天']
        }
      ],
      // 选项卡标题
      cardTitle: ['热门推荐', '最近开场', '最新上架'],
      // 选项卡标题变量
      cardTitleNum: 0,
      // 布局样式切换
      cardIcon: ['fa fa-reorder', 'fa fa-th-large'],
      iconNum: 0,
      // 数据列表
      allList: [
        ['listHotCard01', 'listHotCard02', 'listHotCard03'],
        ['listRecentCard01', 'listRecentCard02', 'listRecentCard03'],
        ['listNewCard01', 'listNewCard02', 'listNewCard03']
      ],
      // 获取的数据
      GetList: [],
      someList: [],
      otherList: [],
      // 变量
      listNum: 0,
      changeNum: 0,
      allNum: 0,
      cityInfoShow: -1
    }
  },
  filters: {
    someCity (item) {
      var arr = item.split(' ')
      return item.split(' ')[arr.length - 1]
    },
    somePage (item) {
      return item.substring(0, 15)
    },
    otherPrice (item) {
      return item.substring(1, item.length - 1)
    }
  },
  methods: {
    // 点击跳转详情页并存数据
    toDetail (val) {
      // val是点击时当前的一组数据
      // 原型上面绑定的local本地数据存储的方法
      this.$local.set('DetailData', val)
      // 路由跳转到详情页不过地址后面带上对应的id值，对应的路由index文件里面要加上一个/:id
      this.$router.push({path: '/details/' + val.id})
      window.scrollTo(0, 0)
    },
    // 分页切换
    listNumUp () {
      this.listNum++
      this.someList = this.GetList[this.listNum].list
      window.scrollTo(0, 0)
    },
    listNumDown () {
      this.listNum--
      this.someList = this.GetList[this.listNum].list
      window.scrollTo(0, 0)
    },
    changelistNum (i) {
      this.listNum = i - 1
      this.someList = this.GetList[this.listNum].list
      window.scrollTo(0, 0)
    },
    changerandom () {
      this.randomNum = Math.round(Math.random() * 2)
      this.$http.get(this.$url + this.allList[this.changeNum][this.randomNum]).then((res) => {
        this.GetList = res.data.card
        this.someList = this.GetList[this.listNum].list
        for (var k = 0; k < this.GetList.length; k++) {
          this.allNum = this.GetList[k].list.length
        }
      })
    },
    // 修改选中项
    changeClass (i, j) {
      this.choiceList[j].index = i
      this.randomNum = Math.round(Math.random() * 2)
      this.$http.get(this.$url + this.allList[this.changeNum][this.randomNum]).then((res) => {
        this.GetList = res.data.card
        this.someList = this.GetList[this.listNum].list
        for (var k = 0; k < this.GetList.length; k++) {
          this.allNum = this.GetList[k].list.length
        }
      })
    },
    // 选项卡切换
    changeCard (cardI) {
      this.cardTitleNum = cardI
      this.randomNum = Math.round(Math.random() * 2)
      this.changeNum = cardI
      this.$http.get(this.$url + this.allList[this.changeNum][this.randomNum]).then((res) => {
        this.GetList = res.data.card
        this.someList = this.GetList[this.listNum].list
        for (var k = 0; k < this.GetList.length; k++) {
          this.allNum += this.GetList[k].list.length
        }
      })
    },
    // 布局切换
    changeIcon (iconI) {
      this.iconNum = iconI
    },
    // 热门推荐初始化数据
    hotListFn () {
      this.$http.get(this.$url + this.allList[0][this.randomNum]).then((res) => {
        this.GetList = res.data.card
        this.someList = this.GetList[this.listNum].list
        for (var k = 0; k < this.GetList.length; k++) {
          this.allNum += this.GetList[k].list.length
        }
      })
    },
    InfoShow (InfoI) {
      this.cityInfoShow = InfoI
    },
    InfoHide () {
      this.cityInfoShow = -1
    }
  },
  created () {
    this.randomNum = Math.round(Math.random() * 2)
    this.hotListFn()
  }
}
</script>

<style scoped lang="less">
  @font-face {
    font-family: 'iconfont';
    src: url('../../assets/font/iconfont.eot');
    src: url('../../assets/font/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../assets/font/iconfont.woff2') format('woff2'),
    url('../../assets/font/iconfont.woff') format('woff'),
    url('../../assets/font/iconfont.ttf') format('truetype'),
    url('../../assets/font/iconfont.svg#iconfont') format('svg');
  }
  #list{
    width: 1200px;
    margin: 0 auto;
    &>p{
      width: 100%;
      height: 52px;
      background: white;
      line-height: 52px;
      font-size: 12px;
      text-indent: 19px;
      span{
        color: #ff3c1b;
      }
    }
    #box{
      overflow: hidden;
      .left{
        width: 928px;
        float: left;
        margin-bottom: 41px;
        .choice{
          width: 100%;
          height: 234px;
          background: white;
          border: 1px solid #ccc;
          .city{
            width: 881px;
            height: 78px;
            margin:0 auto;
            border-bottom: 1px dashed #ccc;
            overflow: hidden;
            span{
              float: left;
              margin-top: 21px;
              font-size: 14px;
            }
            ul{
              float: left;
              height: 28px;
              line-height: 28px;
              margin-top: 11px;
              margin-left: 17px;
              li{
                display: inline-block;
                font-size: 14px;
                padding: 6px 10px;
                cursor: pointer;
              }
              .selection{
                background: #ff3c1b;
                color: white;
              }
            }
          }
          .city:nth-of-type(3){
            border: none;
          }
        }
        .box1{
          width: 927px;
          height: 100%;
          background: white;
          margin-top: 17px;
          border: 1px solid #ccc;
          .tab{
            width: 100%;
            height: 32px;
            background: #f8f8f9;
            margin-bottom: 15px;
            ul{
              float: left;
              overflow: hidden;
              li{
                float: left;
                font-size: 14px;
                padding: 6px 15px;
                cursor: pointer;
              }
              .popular{
                background: #fff;
                color: #ff3c1b;
              }
            }
            .typeface{
              height: 30px;
              float: left;
              margin-left: 524px;
              border-radius: 3px;
              cursor: pointer;
              span{
                i{
                  font-size: 10px;
                  padding: 9px 17px 9px 21px;
                  border: 1px solid #ccc;
                  background: white;
                  &:nth-of-type(1){
                    border-top-left-radius: 3px;
                    border-bottom-left-radius: 3px;
                  }
                  &:nth-of-type(2){
                    border-top-right-radius: 3px;
                    border-bottom-right-radius: 3px;
                  }
                }
                &.in{
                  i{
                    border: 1px solid #ff3c1b;
                    color: #ff3c1b;
                  }
                }
              }
            }
          }
          .box2{
            width: 908px;
            margin: 0 auto;
            .main1{
              float: left;
              padding: 25px 0 19px 0;
              overflow: hidden;
              cursor: pointer;
              border-bottom: 1px dashed #ccc;
              .listPic{
                width: 151px;
                height: 207px;
                margin-left: 10px;
                float: left;
                overflow: hidden;
                position: relative;
                img{
                  width: 151px;
                  height: 207px;
                }
                .cityInfo{
                  width: 151px;
                  font-size: 12px;
                  height: 20px;
                  line-height: 20px;
                  background: #1b7cff;
                  text-align: center;
                  position: absolute;
                  color: white;
                  bottom: 0;
                  left: 0;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  transition: .3s;
                }
              }
              dl{
                float: left;
                margin-left: 21px;
                dt{
                  font-size: 16px;
                }
                dd{
                  font-size: 12px;
                  color: #999;
                  margin-top: 15px;
                  span{
                    display: inline-block;
                    margin-right: 12px;
                    color: #ff3c1c;
                    font-weight: bold;
                  }
                  i{
                    padding-right: 8px;
                    color: #ff3c1c;
                  }
                }
                dd:nth-of-type(3){
                  color: black;
                  font-size: 14px;
                }
                dd:nth-of-type(4){
                  font-size: 12px;
                }
                dd:nth-of-type(5){
                  color: black;
                  i.iconfont{
                    font-family: "iconfont" !important;
                    font-style: normal;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                  }
                }
              }
              .smallInfo{
                margin-left: 10px;
                width: 151px;
                font-size: 12px;
                color: #495060;
                h4{
                  width: 100%;
                  height: 17px;
                  line-height: 17px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  margin-bottom: 4px;
                }
                p{
                  height: 16px;
                  line-height: 16px;
                  span{
                    color: #ff3c1c;
                  }
                }
              }
            }
            .paging{
              width: 100%;
              height: 42px;
              margin-left: 200px;
              display: flex;
              line-height: 42px;
            }
          }
        }
      }
      .right{
        width: 257px;
        float: right;
        background: white;
        padding-bottom: 17px;
        h4{
          height: 40px;
          line-height: 40px;
          background: #e6e6e6;
          font-size: 14px;
          text-indent: 16px;
        }
        .main{
          overflow: hidden;
          padding: 21px 10px 16px 16px;
          background: white;
          cursor: pointer;
          img{
            width: 100px;
            height: 133px;
            float: left;
          }
          .right-1{
            width: 120px;
            float: right;
            dl{
              dt{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
              }
              dd{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #999;
                span{
                  color: #ff3c1b;
                  font-weight: bold;
                }
              }
              dd:nth-of-type(1){
                margin-top: 50px;
              }
              dd:nth-of-type(3){
                margin-top: 22px;
              }
            }
          }
          &:last-of-type{
            border-bottom: 1px solid #ccc;
          }
        }
      }
    }
  }
</style>
