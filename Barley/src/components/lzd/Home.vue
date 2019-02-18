<template>
  <div id="Home">
    <!-- 轮播图模块 -->
    <div class="bannerWrap">
      <div class="bannerBox clear">
        <div class="bannerAll">
          全部商品分类
          <ul>
            <li @mouseleave="changeOff" @mouseenter="InfoList(ListIndex)" v-for="(ListItem, ListIndex) in bannerList" :key="ListIndex">{{ListItem}}<i class="fa fa-angle-right"></i></li>
          </ul>
          <div @mouseleave="changeOff" @mouseenter="changeTrue" class="bannerCardBox" v-show="ListOff">
            <p>
              {{partList.title}}
              <i class="fa fa-angle-right"></i>
              <span v-for="(subItem, subIndex) in partList.subtitle" :key="subIndex">{{subItem}}</span>
            </p>
            <h4>热门推荐</h4>
            <ul class="clear">
              <li @click="toDetail(hotItem)" v-for="(hotItem, hotIndex) in partList.picList" :key="hotIndex">
                <img :src="hotItem.src">
                <h4>{{hotItem.picTitle}}</h4>
                <p>票价: <span>{{hotItem.price}}</span></p>
              </li>
            </ul>
          </div>
        </div>
        <ul class="bannerNav clear">
          <router-link tag="li" to="/children">儿童</router-link>
          <router-link tag="li" to="/sports">运动</router-link>
          <router-link tag="li" to="/dance">歌舞</router-link>
          <router-link tag="li" to="/drama">戏曲</router-link>
          <router-link tag="li" to="/rock">流行乐</router-link>
        </ul>
        <!-- 轮播图 -->
        <el-carousel :interval="2500" arrow="always" height="386px">
          <el-carousel-item v-for="(bannerItem, bannerIndex) in picList" :key="bannerIndex">
            <img v-lazy="bannerItem">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 轮播图模块 -->
    <!-- 选项卡模块 -->
    <div class="cardWrap">
      <ul class="clear">
        <li :class="{cardActive : cardNum === titleIndex}" @click="changeClass(titleIndex)" v-for="(titleItem, titleIndex) in cardTitle" :key="titleIndex">{{titleItem}}</li>
      </ul>
      <div class="cardListBox">
        <div class="cardListWrap clear" :style="{transform: 'translateX(' + (-1120 * cardNum) + 'px)'}">
          <ul class="clear" v-for="(cardItem, cardIndex) in cardInfoList" :key="cardIndex">
            <li @click="toDetail(cardInfoItem)" v-for="(cardInfoItem, cardInfoIndex) in cardItem.list" :key="cardInfoIndex">
              <img v-lazy="cardInfoItem.src">
              <h4>{{cardInfoItem.picTitle}}</h4>
              <p>票价: <span>{{cardInfoItem.price}}</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 选项卡模块 -->
    <!-- 主题内容 -->
    <div class="contBox clear" v-for="(contItem, contIndex) in contInfoList" :key="contIndex">
      <div class="contInfo clear">
        <h4><span>{{contItem.listLeft[0].order}}</span>{{contItem.listLeft[0].title}}</h4>
        <div @click="toDetail(bigItem)" @mouseenter="infoShow(contIndex)" @mouseleave="infoHide" class="bigPic" v-for="(bigItem, bigIndex) in contItem.listLeft[0].bigPic" :key="bigIndex">
          <img v-lazy="bigItem.src">
          <div class="PicInfo" :style="{'transform': contNum === contIndex ? 'translateY(0)':'translateY(82px)'}">
            <h4>{{bigItem.picTitle}}</h4>
            <p>{{bigItem.price}}</p>
            <p>时间: <span>{{bigItem.time}}</span></p>
            <p>地点: <span>{{bigItem.city}}</span></p>
          </div>
        </div>
        <ul class="clear smallPic">
          <li @click="toDetail(smallItem)" class="clear" v-for="(smallItem, smallIndex) in contItem.listLeft[0].smallPic" :key="smallIndex">
            <img v-lazy="smallItem.src">
            <div class="smallPicInfo">
              <h4>{{smallItem.picTitle}}</h4>
              <p>{{smallItem.time}}</p>
              <p>{{smallItem.city}}</p>
              <p>{{smallItem.price}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="contList">
        <p>
          <a href="javascript:;">查看全部>></a>
        </p>
        <h4>热门演出排行</h4>
        <ul>
          <li @click="toDetail(listItem)" v-for="(listItem, listIndex) in contItem.listRight" :key="listIndex">
            <span>{{listIndex + 1}}</span>
            <a href="javascript:;">{{listItem.picTitle}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 主题内容 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      // 随机数
      randomNum: 0,
      // 动态数据数组
      bannerInfo: ['homebanner01', 'homebanner02', 'homebanner03'],
      cardList: ['homecard01', 'homecard02', 'homecard03'],
      contList: ['homelist01', 'homelist02', 'homelist03'],
      // 轮播图左侧数据
      bannerList: ['演唱会', '音乐会', '歌剧话剧', '曲苑杂坛', '体育比赛', '儿童亲子', '舞蹈芭蕾'],
      // 轮播图图片
      picList: [
        require('@/assets/images/banner01.jpg'),
        require('@/assets/images/banner02.jpg'),
        require('@/assets/images/banner03.jpg')
      ],
      // 遮罩层初始化全部数据
      infoList: [],
      // 遮罩层划入部分数据
      partList: [],
      // 遮罩层显示隐藏
      ListOff: false,
      // 遮罩层隐藏定时器
      timer: null,
      // 选项卡标题
      cardTitle: ['今日推荐', '即将开售'],
      // 选项卡选项数据
      cardNum: 0,
      // 选项卡初始化全部数据
      cardInfoList: [],
      // 主体内容初始化全部数据
      contInfoList: [],
      // 主体内容选项数据
      contNum: -1
    }
  },
  computed: {
    // vuex随机数
    ...mapState(['changeRandomNum'])
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
    InfoList (ListI) {
      clearTimeout(this.timer)
      this.partList = this.infoList[ListI].list[0]
      this.ListOff = true
      console.log(this.partList)
    },
    changeOff () {
      this.timer = setTimeout(() => {
        this.ListOff = false
      }, 200)
    },
    changeTrue () {
      clearTimeout(this.timer)
    },
    // 遮罩层动态数据初始化
    bannerListAxios () {
      this.$http.get(this.$url + this.bannerInfo[this.randomNum]).then((res) => {
        this.infoList = res.data.banner
      })
    },
    // 选项卡切换样式
    changeClass (titleI) {
      this.cardNum = titleI
    },
    // 选项卡动态数据初始化
    CardListAxios () {
      this.$http.get(this.$url + this.cardList[this.randomNum]).then((res) => {
        this.cardInfoList = res.data.card
      })
    },
    // 主体内容动态数据初始化
    ContListAxios () {
      this.$http.get(this.$url + this.contList[this.randomNum]).then((res) => {
        this.contInfoList = res.data.data
      })
    },
    // 大图遮罩层显示
    infoShow (i) {
      this.contNum = i
    },
    // 大图遮罩层隐藏
    infoHide () {
      this.contNum = -1
    }
  },
  created () {
    this.randomNum = Math.round(Math.random() * 2)
    this.bannerListAxios()
    this.CardListAxios()
    this.ContListAxios()
  }
}
</script>

<style scoped lang="less">
  #Home{
    .bannerWrap{
      padding-top: 36px;
      width: 100%;
      border-bottom: 34px solid #0266b3;
      margin-bottom: 30px;
      .bannerBox{
        width: 1200px;
        margin: 0 auto;
        .bannerAll{
          height: 50px;
          line-height: 50px;
          width: 202px;
          text-align: center;
          background: #000;
          color: white;
          font-size: 12px;
          float: left;
          font-weight: bold;
          position: relative;
          &>ul{
            width: 202px;
            position: absolute;
            z-index: 3;
            background: #1b7cff;
            height: 420px;
            li{
              padding-left: 69px;
              text-align: left;
              cursor: pointer;
              color: white;
              height: 50px;
              line-height: 50px;
              font-weight: normal;
              background: url("../../assets/images/home-icon01.png") no-repeat 32px center;
              &:nth-of-type(2){
                background: url("../../assets/images/home-icon02.png") no-repeat 32px center;
              }
              &:nth-of-type(3){
                background: url("../../assets/images/home-icon03.png") no-repeat 32px center;
              }
              &:nth-of-type(4){
                background: url("../../assets/images/home-icon04.png") no-repeat 32px center;
              }
              &:nth-of-type(5){
                background: url("../../assets/images/home-icon05.png") no-repeat 32px center;
              }
              &:nth-of-type(6){
                background: url("../../assets/images/home-icon06.png") no-repeat 32px center;
              }
              &:nth-of-type(7){
                background: url("../../assets/images/home-icon07.png") no-repeat 32px center;
              }
              i{
                font-size: 16px;
                float: right;
                padding: 21px 16px 0 0;
              }
            }
          }
          .bannerCardBox{
            width: 968px;
            height: 386px;
            position: absolute;
            left: 202px;
            z-index: 3;
            background: rgba(24,124,255,.5);
            text-align: left;
            padding: 0 15px;
            &>p{
              font-size: 16px;
              span{
                font-size: 12px;
              }
            }
            &>h4{
              font-size: 24px;
              padding: 15px 0;
            }
            ul{
              li{
                width: 118px;
                float: left;
                padding: 0 25px;
                cursor: pointer;
                img{
                  width: 118px;
                  height: 159px;
                }
                h4{
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                p{
                  height: 12px;
                  line-height: 12px;
                }
              }
            }
          }
        }
        .bannerNav{
          width: 996px;
          height: 48px;
          line-height: 48px;
          background: white;
          border: 1px solid #dcdcdc;
          float: left;
          li{
            cursor: pointer;
            font-size: 16px;
            color: #1b1b1b;
            padding: 0 30px;
            float: left;
            &:hover{
              color: #ff3c1b;
            }
          }
        }
        .el-carousel{
          height: 386px;
          width: 100%;
          .el-carousel__container{
            .el-carousel__item{
              height: 386px;
              img{
                height: 386px;
              }
            }
          }
        }
      }
    }
    .cardWrap{
      background: white;
      width: 1200px;
      margin: 0 auto 30px;
      box-sizing: border-box;
      padding: 0 50px 31px 31px;
      &>ul{
        border-bottom: 1px solid #dddee1;
        li{
          height: 36px;
          line-height: 36px;
          font-size: 12px;
          color: #495060;
          float: left;
          padding: 0 17px 0 15px;
          margin-right: 17px;
          cursor: pointer;
          &.cardActive{
            color: #ff3c1b;
            border-bottom: 2px solid #ff3c1b;
          }
        }
      }
      .cardListBox{
        overflow: hidden;
        width: 1120px;
        .cardListWrap{
          width: 2240px;
          transition: .3s;
          ul{
            float: left;
            width: 1120px;
            li{
              float: left;
              padding-right: 48px;
              cursor: pointer;
              img{
                width: 146px;
                height: 192px;
                margin: 16px 0 11px;
              }
              &:last-of-type{
                padding-right: 0;
              }
              h4{
                width: 121px;
                height: 29px;
                line-height: 29px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #495060;
                &:hover{
                  color: #ff3c1b;
                }
              }
              p{
                height: 31px;
                line-height: 31px;
                font-size: 12px;
                color: #495060;
                span{
                  color: #000;
                }
                &:hover{
                  color: #ff3c1b;
                  span{
                    color: #ff3c1b;
                  }
                }
              }
            }
          }
        }
      }
    }
    .contBox{
      width: 1200px;
      margin: 0 auto 30px;
      .contInfo{
        width: 896px;
        background: white;
        box-sizing: border-box;
        padding: 0 20px 0 26px;
        float: left;
        &>h4{
          height: 67px;
          line-height: 67px;
          font-size: 16px;
          color: #495060;
          span{
            color: #ff3c1b;
            padding-right: 5px;
          }
        }
        .bigPic{
          float: left;
          width: 238px;
          height: 364px;
          overflow: hidden;
          margin-right: 34px;
          position: relative;
          cursor: pointer;
          img{
            width: 238px;
            height: 364px;
          }
          .PicInfo{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 238px;
            background: rgba(27,124,255,.5);
            box-sizing: border-box;
            padding: 20px 38px 18px 19px;
            color: white;
            font-size: 12px;
            transition: .3s;
            transform: translateY(82px);
            h4{
              line-height: 17px;
            }
            p{
              line-height: 39px;
            }
          }
        }
        .smallPic{
          float: left;
          width: 578px;
          li{
            float: left;
            padding: 0 14px 59px 0;
            cursor: pointer;
            img{
              width: 112px;
              height: 150px;
              margin-right: 8px;
              float: left;
            }
            .smallPicInfo{
              float: left;
              width: 155px;
              font-size: 12px;
              color: #495060;
              h4{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                height: 18px;
                line-height: 18px;
                padding-bottom: 40px;
                &:hover{
                  color: #ff3c1b;
                }
              }
              p{
                height: 27px;
                line-height: 27px;
                &:hover{
                  color: #ff3c1b;
                }
              }
            }
            &:nth-of-type(3), &:nth-of-type(4){
              padding-bottom: 45px;
            }
          }
        }
      }
      .contList{
        float: right;
        width: 280px;
        background: white;
        box-sizing: border-box;
        height: 471px;
        padding: 18px 24px 0 25px;
        font-size: 12px;
        color: #1b1b1b;
        &>p{
          text-align: right;
          height: 13px;
          line-height: 13px;
          a{
            font-size: 12px;
            color: #1b1b1b;
            &:hover{
              color: #ff3c1b;
            }
          }
        }
        &>h4{
          height: 13px;
          line-height: 13px;
          padding-bottom: 22px;
        }
        ul{
          padding: 0 8px;
          li{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 30px;
            line-height: 30px;
            span{
              display: inline-block;
              width: 16px;
              height: 13px;
              line-height: 13px;
              text-align: center;
              background: #808080;
              color: white;
            }
            a{
              font-size: 12px;
              color: #1b1b1b;
              &:hover{
                color: #ff3c1b;
              }
            }
            &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3){
              span{
                background: #ff3c1b;
              }
            }
          }
        }
      }
    }
  }
</style>
