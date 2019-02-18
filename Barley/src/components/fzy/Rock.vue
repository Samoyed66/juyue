<template>
  <!-- 导航栏 -->
  <div id="Rock">
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
    <!-- 猜你喜欢 -->
    <div class="books">
      <img src='@/assets/images/like-dance.png' class="like"/>
      <ul class="clear">
        <li @click="toDetail(likeItem)" v-for="(likeItem, likeIndex) in likeList" :key="likeIndex">
          <img v-lazy="likeItem.src">
          <h4>{{likeItem.picTitle}}</h4>
          <p>票价：<span>{{likeItem.price}}</span>起</p>
        </li>
      </ul>
    </div>
    <!-- 猜你喜欢 -->
    <!-- 精彩聚集 -->
    <div class="Gather">
      <img src='@/assets/images/Gather-dance.png' class="Gather1"/>
      <div class="clear">
        <div @click="toDetail(chhItem)" @mouseenter="bigInfoShow(chhIndex)" @mouseleave="bigInfoHide" class="chh" v-for="(chhItem, chhIndex) in focusing.bigPic" :key="chhIndex">
          <img v-lazy="chhItem.src">
          <div class="bigInfo" :style="{'transform': bigBol === chhIndex ? 'translateY(0)':'translateY(100%)'}">
            <h4>{{chhItem.picTitle}}</h4>
            <p>{{chhItem.price}}</p>
            <p>{{chhItem.time}}</p>
          </div>
        </div>
        <ul class="clear">
          <li @click="toDetail(smallItem)" @mouseenter="smallInfoShow(smallIndex)" @mouseleave="smallInfoHide" v-for="(smallItem, smallIndex) in focusing.smallPic" :key="smallIndex">
            <img v-lazy="smallItem.src">
            <div class="smallInfo" :style="{'transform': smallBol === smallIndex ? 'translateY(0)':'translateY(100%)'}">
              <h4>{{smallItem.picTitle}}</h4>
              <p>{{smallItem.price}}</p>
              <p>{{smallItem.time}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 精彩聚集 -->
    <!-- 中途图片 -->
    <div class="otherPic clear">
      <img src="@/assets/images/detail01.png">
      <img src="@/assets/images/detail02.png">
      <img src="@/assets/images/detail03.png">
    </div>
    <!-- 中途图片 -->
    <!-- 选项卡 -->
    <div class="childrenCard">
      <ul class="cardTitle clear">
        <li @click="changeCard(cardIndex)" :class="{'cardActive': cardNum === cardIndex}" v-for="(carditem, cardIndex) in cardTitle" :key="cardIndex">{{carditem}}</li>
      </ul>
      <div class="cardWrap">
        <div class="cardBox clear" :style="{'transform': 'translateX(' + (-1200 * cardNum) + 'px)'}">
          <ul class="clear" v-for="(cardItem, cardIndex) in cardList" :key="cardIndex">
            <li @click="toDetail(cardListItem)" class="clear" v-for="(cardListItem, cardListIndex) in cardItem.list" :key="cardListIndex">
              <div class="cardPic">
                <img v-lazy="cardListItem.src">
              </div>
              <div class="cardInfo">
                <h4>{{cardListItem.picTitle}}</h4>
                <p>{{cardListItem.time}}</p>
                <p>{{cardListItem.city}}</p>
                <p>{{cardListItem.price}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 选项卡 -->
    <!-- 热门推荐 -->
    <div class="hot">
      <img src='@/assets/images/hot-dance.png'/>
      <div class="hotWrap clear">
        <div @click="toDetail(bigItem)" class="bigPic" @mouseenter="hotInfoShow" @mouseleave="hotInfoHide" v-for="(bigItem, bigIndex) in hotList.bigPic" :key="bigIndex">
          <img v-lazy="bigItem.src">
          <div class="bigPicInfo" :style="{'transform': hotOff ? 'translateY(0)':'translateY(52px)'}">
            <h4>{{bigItem.picTitle}}</h4>
            <p>{{bigItem.time}}</p>
            <p>{{bigItem.city}}</p>
            <p>{{bigItem.price}}</p>
          </div>
          <div class="titleNum">TOP1</div>
        </div>
        <ul class="smallPic clear">
          <li @click="toDetail(smallItem)" class="clear" v-for="(smallItem, smallIndex) in hotList.smallPic" :key="smallIndex">
            <img v-lazy="smallItem.src">
            <div class="smallInfo">
              <h4>{{smallItem.picTitle}}</h4>
              <p>{{smallItem.time}}</p>
              <p>{{smallItem.city}}</p>
              <p>{{smallItem.price}}</p>
            </div>
            <div class="titleNum">TOP{{smallIndex + 2}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门推荐 -->
    <!-- 日历插件 -->
    <div class="cal">
      <Calendar :changeMonth="changeDate"></Calendar>
    </div>
    <!-- 日历插件 -->
    <!-- 合作方 -->
    <div class="cooperation">
      <img src='@/assets/images/cooperation-dance.png'/>
      <div class="picWrap clear">
        <img v-lazy="PicItem" v-for="(PicItem, PicIndex) in conPicList" :key="PicIndex">
      </div>
    </div>
    <!-- 合作方 -->
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component'
export default {
  name: 'Rock',
  data () {
    return {
      /* 精彩聚焦 */
      focusing: [],
      /* 猜我喜欢 */
      likeList: [],
      // 选项卡
      cardList: [],
      // 热门推荐
      hotList: [],
      picList: [
        require('@/assets/images/banner13.jpg'),
        require('@/assets/images/banner05.jpg'),
        require('@/assets/images/banner09.jpg')
      ],
      // 精彩聚焦大图遮罩层判断
      bigBol: -1,
      // 精彩聚焦小图遮罩层判断
      smallBol: -1,
      // 选项卡标题
      cardTitle: ['动漫', '度假休闲'],
      // 选项卡切换变量
      cardNum: 0,
      // 热门推荐变量
      hotOff: false,
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
      ]
    }
  },
  components: {
    Calendar
  },
  /* 事件 */
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
    /* 精彩聚集初始化数据 */
    focusingFn () {
      this.$http.get(this.$url + 'rockFouce').then((res) => {
        this.focusing = res.data.focus[0]
      })
    },
    /* 猜我喜欢初始化数据 */
    LikeFn () {
      this.$http.get(this.$url + 'rockLike').then((res) => {
        this.likeList = res.data.like
      })
    },
    // 精彩聚焦大图遮罩层显示
    bigInfoShow (i) {
      this.bigBol = i
    },
    // 精彩聚焦大图遮罩层隐藏
    bigInfoHide () {
      this.bigBol = -1
    },
    // 精彩聚焦小图遮罩层显示
    smallInfoShow (smallI) {
      this.smallBol = smallI
    },
    // 精彩聚焦小图遮罩层隐藏
    smallInfoHide () {
      this.smallBol = -1
    },
    // 选项卡切换
    changeCard (cardI) {
      this.cardNum = cardI
    },
    // 选项卡初始化数据
    cardListFn () {
      this.$http.get(this.$url + 'rockCard').then((res) => {
        this.cardList = res.data.card
      })
    },
    // 热门推荐初始化数据
    HotListFn () {
      this.$http.get(this.$url + 'rockHot').then((res) => {
        this.hotList = res.data.hot[0]
      })
    },
    // 热门推荐遮罩层显示
    hotInfoShow () {
      this.hotOff = true
    },
    // 热门推荐遮罩层隐藏
    hotInfoHide () {
      this.hotOff = false
    },
    // 左右切换月份
    changeDate (data) {
      console.log(data)
    }
  },
  /* 初始化生命周期 */
  created () {
    this.LikeFn()
    this.focusingFn()
    this.cardListFn()
    this.HotListFn()
  }
}
</script>

<style scoped lang="less">
 #Rock {
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
       &:nth-of-type(6) {
         color: #fff;
         background: #0266b3;
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
   .books{
     margin-top: 20px;
     background: #ffffff;
     .like{
       width: 581px;
       height: 51px;
       margin: 0 auto;
       padding: 15px 0 14px;
     }
     ul{
       padding: 0 17px 0 7px;
       li{
         width: 143px;
         margin-right: 63px;
         float: left;
         cursor: pointer;
         img{
           width: 143px;
           height: 193px;
         }
         h4{
           height: 50px;
           line-height: 50px;
           font-size: 12px;
           color: #495060;
           white-space:nowrap;
           overflow:hidden;
           text-overflow:ellipsis;
           &:hover{
             color: #ff3c1b;
           }
         }
         p{
           padding-bottom: 9px;
           font-size: 12px;
           color: #ccc;
           span{
             color: black;
             padding-right: 4px;
           }
         }
         &:last-of-type{
           margin-right: 0;
         }
       }
     }
   }
   .Gather{
     background: #ffffff;
     margin-top: 20px;
     .Gather1{
       margin: 0 auto;
       width: 581px;
       height: 51px;
       padding: 15px 0 14px;
     }
     &>div{
       padding: 0 8px 10px 5px;
       .chh{
         position: relative;
         cursor: pointer;
         overflow: hidden;
         img{
           width: 283px;
           height: 537px;
         }
         .bigInfo{
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           box-sizing: border-box;
           padding: 150px 20px;
           color: white;
           background: rgba(24,124,255,.5);
           transition: .3s;
           h4{
             font-size: 20px;
             line-height: 40px;
             padding-bottom: 50px;
             &:hover{
               color: #111;
             }
           }
           p{
             line-height: 25px;
             &:hover{
               color: #111;
             }
           }
         }
         &:nth-of-type(1){
           float: left;
         }
         &:nth-of-type(2){
           float: right;
         }
       }
       ul{
         padding: 0 13px 0 23px;
         width: 585px;
         float: left;
         li{
           float: left;
           width: 185px;
           margin-right: 10px;
           cursor: pointer;
           position: relative;
           overflow: hidden;
           img{
             width: 185px;
             height: 263px;
           }
           &:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3){
             margin-bottom: 10px;
           }
           .smallInfo{
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             box-sizing: border-box;
             padding: 40px 10px;
             color: white;
             background: rgba(24,124,255,.5);
             transition: .3s;
             h4{
               font-size: 16px;
               line-height: 40px;
               padding-bottom: 20px;
               overflow : hidden;
               text-overflow: ellipsis;
               display: -webkit-box;
               -webkit-line-clamp: 2;
               -webkit-box-orient: vertical;
               &:hover{
                 color: #111;
               }
             }
             p{
               font-size: 14px;
               line-height: 25px;
               &:hover{
                 color: #111;
               }
             }
           }
         }
       }
     }
   }
   .otherPic{
     padding: 20px 0 27px;
     img{
       float: left;
       margin-right: 25px;
       &:nth-of-type(1){
         margin-top: 3px;
       }
       &:nth-of-type(3){
         margin: 9px 0 0;
       }
     }
   }
   .childrenCard{
     margin-bottom: 20px;
    .cardTitle{
      height: 30px;
      border-bottom: 1px solid #dddee1;
      li{
        line-height: 29px;
        float: left;
        font-size: 17px;
        width: 90px;
        border: 1px solid #dddee1;
        border-bottom: none;
        text-align: center;
        color: #495060;
        cursor: pointer;
        margin-right: 10px;
        color: white;
        &:nth-of-type(1){
          background: #556fb5;
        }
        &:nth-of-type(2){
          background: #0068b7;
        }
        &.cardActive{
          background: white;
          line-height: 30px;
          border-top: 2px solid #ff3c1b;
          color: #ff3c1b;
        }
      }
    }
     .cardWrap{
       width: 1200px;
       height: 240px;
       overflow: hidden;
       .cardBox{
         transition: .3s;
         width: 4800px;
         ul{
           float: left;
           width: 1195px;
           height: 220px;
           padding: 20px 0 0 5px;
           background: white;
           li{
             width: 376px;
             height: 99px;
             padding: 0 22px 11px 0;
             float: left;
             cursor: pointer;
             .cardPic{
               width: 212px;
               height: 99px;
               margin-right: 8px;
               float: left;
               overflow: hidden;
             }
             .cardInfo{
               float: left;
               width: 156px;
               h4{
                 line-height: 17px;
                 font-size: 14px;
                 color: #495060;
                 padding-bottom: 6px;
                 &:hover{
                   color: #ff3c1b;
                 }
               }
               p{
                 height: 19px;
                 line-height: 19px;
                 font-size: 12px;
                 color: #495060;
                 &:last-of-type{
                   height: 17px;
                   line-height: 17px;
                   padding-top: 1px;
                 }
                 &:hover{
                   color: #ff3c1b;
                 }
               }
             }
           }
         }
       }
     }
   }
   .hot{
     background: white;
     margin-bottom: 20px;
    &>img{
      margin: 0 auto;
      width: 581px;
      height: 51px;
      padding: 15px 0 14px;
    }
     .hotWrap{
       width: 1150px;
       height: 330px;
       padding: 0 45px 0 5px;
       .bigPic{
         float: left;
         width: 200px;
         height: 316px;
         margin-right: 20px;
         position: relative;
         cursor: pointer;
         overflow: hidden;
         img{
           width: 200px;
           height: 316px;
         }
         .bigPicInfo{
           position: absolute;
           left: 0;
           bottom: 0;
           width: 100%;
           height: 100px;
           background: rgba(24,124,255,.5);
           text-align: center;
           box-sizing: border-box;
           padding: 4px 5px;
           color: white;
           font-size: 12px;
           transition: .3s;
           h4{
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
             height: 20px;
             line-height: 20px;
             &:hover{
               color: #000;
             }
           }
           p{
             height: 15px;
             line-height: 15px;
             padding-bottom: 11px;
             &:hover{
               color: #000;
             }
           }
         }
         .titleNum{
           width: 70px;
           height: 20px;
           line-height: 20px;
           border: 1px solid white;
           font-size: 12px;
           color: white;
           text-align: center;
           background: #e20c29;
           position: absolute;
           top: 5px;
           left: -18px;
           transform: rotate(-45deg);
         }
       }
       .smallPic{
         float: left;
         width: 930px;
         li{
           width: 264px;
           padding: 0 46px 15px 0;
           float: left;
           overflow: hidden;
           cursor: pointer;
           position: relative;
           img{
             width: 112px;
             height: 150px;
             margin-right: 8px;
             float: left;
           }
           .smallInfo{
             width: 144px;
             float: left;
             h4{
               line-height: 17px;
               font-size: 12px;
               color: #495060;
               padding-bottom: 39px;
               &:hover{
                 color: #ff3c1b;
               }
             }
             p{
               height: 25px;
               line-height: 25px;
               font-size: 12px;
               color: #495060;
               white-space: nowrap;
               overflow: hidden;
               text-overflow: ellipsis;
               &:last-of-type{
                 height: 23px;
                 line-height: 23px;
               }
               &:hover{
                 color: #ff3c1b;
               }
             }
           }
           .titleNum{
             width: 70px;
             height: 20px;
             line-height: 20px;
             border: 1px solid white;
             font-size: 12px;
             color: white;
             text-align: center;
             background: #e20c29;
             position: absolute;
             top: 5px;
             left: -18px;
             transform: rotate(-45deg);
           }
         }
       }
     }
   }
   .cooperation{
     background: white;
     margin-bottom: 20px;
     &>img{
       margin: 0 auto;
       width: 581px;
       height: 51px;
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
<!-- 修改插件全局样式 -->
<style lang="less">
  .cal{
    width: 1200px;
    height: 1020px;
    background: white;
    border-radius: 16px 16px 0 0;
    margin-bottom: 20px;
    overflow: hidden;
    .wh_container{
      max-width: 100%;
      height: 100%;
      .wh_content_all{
        height: 100%;
        background: white;
        .wh_top_changge{
          background: #ff3c1b;
          li{
            height: 97px;
          }
        }
        .wh_content{
          &:nth-of-type(2){
            background: #eaeaea;
            .wh_content_item{
              height: 66px;
              color: #495060;
              .wh_top_tag{
                height: 66px;
                line-height: 66px;
              }
            }
          }
          &:nth-of-type(3){
            padding: 0;
            .wh_content_item{
              color: #495060;
              width: 170px;
              height: 170px;
              border-right: 1px solid #eee;
              border-bottom: 1px solid #eee;
              &:nth-of-type(7),&:nth-of-type(14),&:nth-of-type(21),&:nth-of-type(28),&:nth-of-type(35){
                border-right: none;
              }
              &:nth-of-type(29),&:nth-of-type(30),&:nth-of-type(31),&:nth-of-type(32),&:nth-of-type(33),&:nth-of-type(34),&:nth-of-type(35){
                border-bottom: none;
              }
              .wh_item_date{
                width: 100%;
                height: 100%;
                &.wh_isToday{
                  background: #eee;
                }
                &.wh_chose_day{
                  background: #eee;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
