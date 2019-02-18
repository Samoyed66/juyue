<template>
  <div id="Sports">
    <!-- 导航 -->
    <ul class="subNav clear">
      <router-link tag="li" to="/">首页</router-link>
      <router-link tag="li" to="/children">儿童</router-link>
      <router-link tag="li" to="/sports">运动</router-link>
      <router-link tag="li" to="/dance">歌舞</router-link>
      <router-link tag="li" to="/drama">戏曲</router-link>
      <router-link tag="li" to="/rock">流行乐</router-link>
    </ul>
    <!-- 导航 -->
    <!-- 轮播图 -->
    <el-carousel :interval="2500" arrow="always" height="386px">
      <el-carousel-item v-for="(item, index) in picList" :key="index">
        <img v-lazy="item">
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图 -->
    <!-- 热门赛事 -->
    <div class="hot">
      <h4>热门赛事<span>全部赛事 <i>></i></span></h4>
      <div class="hotCont clear">
        <div @click="toDetail(hotItem)" class="bigPicCont" v-for="(hotItem, hotIndex) in hotList.bigPic" :key="hotIndex">
          <span>{{hotItem.citynamename}}</span>
          <img v-lazy="hotItem.src">
          <div class="picInfoBg">
            <div class="picInfo">
              <h4>{{hotItem.picTitle}}</h4>
              <p>{{hotItem.city}}</p>
            </div>
          </div>
        </div>
        <ul class="smallPicCont clear">
          <li @click="toDetail(smallItem)" class="clear" v-for="(smallItem, smallIndex) in hotList.smallPic" :key="smallIndex">
            <span>{{smallItem.cityname}}</span>
            <img v-lazy="smallItem.src">
            <div class="picInfo">
              <h4>{{smallItem.picTitle}}</h4>
              <p class="picCity">{{smallItem.city}}</p>
              <p class="picTime">{{smallItem.time}}</p>
              <p class="picPrice">¥<span>{{smallItem.price}}</span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门赛事 -->
    <div class="otherCont" v-for="(otherItem, otherIndex) in otherList" :key="otherIndex">
      <h4>{{otherItem.subtitle}}<span v-show="otherIndex !== 2">更多 <i>></i></span></h4>
      <ul class="clear">
        <li @click="toDetail(picItem)" v-for="(picItem, picIndex) in otherItem.subList" :key="picIndex">
          <span>{{picItem.cityname}}</span>
          <img v-lazy="picItem.src">
          <div class="otherInfo">
            <h4>{{picItem.picTitle}}</h4>
            <p>{{picItem.time}}</p>
            <p class="otherPrice">¥<span>{{picItem.price}}</span></p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 合作方 -->
    <div class="cooperation">
      <img src='@/assets/images/cooperation.png'/>
      <div class="picWrap clear">
        <img v-lazy="PicItem" v-for="(PicItem, PicIndex) in conPicList" :key="PicIndex">
      </div>
    </div>
    <!-- 合作方 -->
  </div>
</template>

<script>
export default {
  name: 'Sports',
  data () {
    return {
      picList: [
        require('@/assets/images/banner03.jpg'),
        require('@/assets/images/banner08.jpg'),
        require('@/assets/images/banner12.jpg')
      ],
      // 合作方图片
      conPicList: [
        require('@/assets/images/cop01.png'),
        require('@/assets/images/cop02.png'),
        require('@/assets/images/cop03.png'),
        require('@/assets/images/cop04.png'),
        require('@/assets/images/cop05.png'),
        require('@/assets/images/cop06.png'),
        require('@/assets/images/cop07.png'),
        require('@/assets/images/cop08.png'),
        require('@/assets/images/cop09.png'),
        require('@/assets/images/cop10.png'),
        require('@/assets/images/cop11.png'),
        require('@/assets/images/cop12.png')
      ],
      // 热门赛事图片
      hotList: [],
      // 其他数据
      otherList: []
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
    hotListData () {
      this.$http.get(this.$url + 'sportHot').then((res) => {
        this.hotList = res.data.hot[0]
      })
    },
    otherListData () {
      this.$http.get(this.$url + 'sportList').then((res) => {
        this.otherList = res.data.list
        console.log(this.otherList)
      })
    }
  },
  created () {
    this.hotListData()
    this.otherListData()
  }
}
</script>

<style scoped lang="less">
  #Sports{
    width: 1200px;
    margin: 0 auto;
    .subNav{
      background: #fff;
      width: 100%;
      li {
        line-height: 57px;
        float: left;
        margin-right: 17px;
        padding: 0px;
        width: 91px;
        height: 57px;
        text-align: center;
        cursor: pointer;
        &:hover{
          color: #fff;
          background: #0266b3;
        }
      }
      li:nth-of-type(3) {
        color: #fff;
        background: #0266b3;
      }
    }
    .el-carousel{
      height: 386px;
      width: 100%;
      margin-bottom: 20px;
      .el-carousel__container{
        .el-carousel__item{
          height: 386px;
          img{
            height: 386px;
          }
        }
      }
    }
    .hot{
      width: 100%;
      &>h4{
        height: 39px;
        line-height: 39px;
        text-indent: 65px;
        font-size: 21px;
        color: #495060;
        font-weight: normal;
        border-bottom: 2px solid #0266b3;
        background: url("../../assets/images/sportIcon01.png") no-repeat;
        background-size: 58px 39px;
        margin-bottom: 15px;
        span{
          font-size: 16px;
          float: right;
          cursor: pointer;
          i{
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: white;
            border-radius: 50%;
            background: #0266b3;
            text-indent: 0;
          }
        }
      }
      .hotCont{
        margin-bottom: 30px;
        .bigPicCont{
          width: 274px;
          float: left;
          position: relative;
          margin-right: 22px;
          cursor: pointer;
          img{
            width: 274px;
            height: 370px;
          }
          &>span{
            position: absolute;
            top: 1px;
            left: 0;
            font-size: 12px;
            color: white;
            background: rgba(0,0,0,.5);
            padding: 7px 10px;
            z-index: 1;
          }
          .picInfoBg{
            position: absolute;
            top: 0;
            left: 0;
            width: 274px;
            height: 370px;
            background: linear-gradient(to bottom, transparent, 75%, black);
            .picInfo{
              width: 100%;
              position: absolute;
              top: 220px;
              left: 0;
              color: white;
              box-sizing: border-box;
              padding: 0 26px 0 20px;
              h4{
                font-size: 16px;
                font-weight: normal;
                height: 48px;
                line-height: 24px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              p{
                height: 21px;
                line-height: 21px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #c9c9c9;
              }
            }
          }
        }
        .smallPicCont{
          float: left;
          width: 904px;
          li{
            float: left;
            width: 288px;
            height: 175px;
            background: white;
            margin: 0 20px 20px 0;
            position: relative;
            cursor: pointer;
            img{
              width: 130px;
              height: 175px;
              float: left;
            }
            &>span{
              position: absolute;
              top: 1px;
              left: 0;
              font-size: 12px;
              color: white;
              background: rgba(0,0,0,.5);
              padding: 7px 10px;
              z-index: 1;
            }
            .picInfo{
              width: 117px;
              float: left;
              padding: 10px 29px 0 12px;
              h4{
                height: 44px;
                line-height: 22px;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 16px;
                color: #000;
                margin-bottom: 12px;
                font-weight: normal;
              }
              p{
                height: 15px;
                line-height: 15px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #666;
                &.picCity{
                  height: 17px;
                  line-height: 17px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
                &.picTime{
                  margin-bottom: 15px;
                }
                &.picPrice{
                  span{
                    font-size: 15px;
                    color: #fa1268;
                  }
                }
              }
            }
            &:nth-of-type(3), &:nth-of-type(6){
              margin-right: 0;
            }
            &:nth-of-type(4), &:nth-of-type(5), &:nth-of-type(6){
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .otherCont{
      width: 100%;
      padding-bottom: 30px;
      &>h4{
        height: 39px;
        line-height: 39px;
        text-indent: 65px;
        font-size: 21px;
        color: #495060;
        font-weight: normal;
        border-bottom: 2px solid #0266b3;
        background: url("../../assets/images/sportIcon03.png") no-repeat 9px center;
        background-size: 39px 39px;
        margin-bottom: 15px;
        span{
          font-size: 16px;
          float: right;
          cursor: pointer;
          i{
            display: inline-block;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            color: white;
            border-radius: 50%;
            background: #0266b3;
            text-indent: 0;
          }
        }
      }
      &>ul{
        li{
          width: 185px;
          margin-right: 18px;
          float: left;
          background: white;
          position: relative;
          cursor: pointer;
          &>span{
            position: absolute;
            top: 1px;
            left: 0;
            font-size: 12px;
            color: white;
            background: rgba(0,0,0,.5);
            padding: 7px 10px;
            z-index: 1;
          }
          img{
            width: 185px;
            height: 249px;
          }
          .otherInfo{
            width: 100%;
            box-sizing: border-box;
            padding: 10px;
            h4{
              height: 36px;
              line-height: 18px;
              font-size: 12px;
              color: #495060;
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            p{
              height: 29px;
              line-height: 29px;
              font-size: 12px;
              color: #999;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.otherPrice{
                height: 24px;
                line-height: 24px;
                font-size: 12px;
                color: #495060;
                span{
                  font-size: 16px;
                  color: #fa1268;
                }
              }
            }
          }
          &:last-of-type{
            margin-right: 0;
          }
        }
      }
      &:nth-of-type(4){
        &>h4{
          background: url("../../assets/images/sportIcon04.png") no-repeat 9px center;
          background-size: 39px 39px;
        }
      }
      &:nth-of-type(5){
        &>h4{
          background: url("../../assets/images/sportIcon05.png") no-repeat 9px center;
          background-size: 39px 39px;
        }
      }
      &:nth-of-type(6){
        &>h4{
          background: url("../../assets/images/sportIcon06.png") no-repeat 9px center;
          background-size: 39px 39px;
        }
      }
      &:nth-of-type(7){
        &>h4{
          background: url("../../assets/images/sportIcon07.png") no-repeat 9px center;
          background-size: 39px 39px;
        }
      }
      &:nth-of-type(8){
        &>h4{
          background: url("../../assets/images/sportIcon08.png") no-repeat 9px center;
          background-size: 39px 39px;
        }
      }
    }
    .cooperation{
      background: white;
      margin-bottom: 20px;
      &>img{
        margin: 0 auto;
        width: 160px;
        height: 37px;
        padding: 15px 0;
      }
      .picWrap{
        padding: 0 117px 12px 116px;
        img{
          margin: 0 29px 30px 0;
          float: left;
          &:nth-of-type(7),&:nth-of-type(8),&:nth-of-type(9),&:nth-of-type(10),&:nth-of-type(11),&:nth-of-type(12){
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>
