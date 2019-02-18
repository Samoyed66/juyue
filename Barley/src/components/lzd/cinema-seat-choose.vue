<template>
  <div class="wrapper">
    <div class="cinema-wrapper">
      <div class="btn-wrapper" v-show="seatOff">
        <h4>已选座位[<span>{{seatList.length}}</span>]</h4>
        <ul>
          <li class="clear" v-for="(seatItem, seatIndex) in seatList" :key="seatIndex">
            <div class="seatTrue">
              <img src="@/assets/images/selected.png">
              <p>{{detailPrice}}</p>
            </div>
            <div class="seatInfo">
              <p>座位:<span>{{seatItem.row}}排{{seatItem.col}}号</span></p>
              <p>看台:<span>{{detailCont.city}}</span></p>
              <p>楼层:<span>剧场</span></p>
            </div>
          </li>
        </ul>
        <div class="btn-buy" @click="buySeat">结账: <span>{{seatList.length * detailPrice}}</span></div>
        <div class="btn-buy" @click="resetSeat">重置座位</div>
      </div>
      <div class="seat-wrapper">
        <div class="illustration">
          <div class="illustration-img-wrapper unselected-seat">
          </div>
          <span class="illustration-text">可选</span>
          <div class="illustration-img-wrapper selected-seat">
          </div>
          <span class="illustration-text">已选</span>
          <div class="illustration-img-wrapper bought-seat">
          </div>
          <span class="illustration-text">不可选</span>
        </div>
        <div class="screen-center">
          银幕中央<div class="mid-line"></div>
        </div>
        <div class="inner-seat-wrapper" ref="innerSeatWrapper" >
          <div v-for="row in seatRow" :key="row">
            <!-- 这里的v-if很重要，如果没有则会导致报错，因为seatArray初始状态为空 -->
            <div v-for="col in seatCol"
                 :key="col"
                 v-if="seatArray.length > 0"
                 class="seat">
              <div class="markBox" v-show="mouseNum.rowNum === row && mouseNum.colNum === col">
                <div class="markIcon"></div>
                <p>座位: <span>{{row}}排{{col}}座</span></p>
                <p>楼层: 剧场</p>
                <p>看台: <span>{{detailCont.city}}</span></p>
                <p>票价: <span>{{detailPrice}}元</span></p>
                <p>状态: <span>可售</span></p>
              </div>
              <div class="inner-seat"
                   @mouseleave="markHide"
                   @mouseenter="markShow(row, col)"
                   @click="handleChooseSeat(row - 1,col - 1)"
                   v-if="seatArray[row - 1][col - 1] !== -1"
                   :class="seatArray[row - 1][col - 1] === 2 ? 'bought-seat':(seatArray[row - 1][col - 1] === 1 ? 'selected-seat':'unselected-seat')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'cinemaSeatChoose',
  data () {
    return {
      // 影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
      seatArray: [],
      // 影院座位行数
      seatRow: 11,
      // 影院座位列数
      seatCol: 30,
      // 座位信息数据
      seatList: [],
      // 座位信息显示隐藏
      seatOff: false,
      detailCont: {},
      mouseNum: {
        rowNum: -1,
        colNum: -1
      },
      timer: null
    }
  },
  computed: {
    // vuex选定时间
    ...mapState(['detailPrice'])
  },
  methods: {
    // vuex
    ...mapMutations(['toSeatInfo', 'toAllPrice']),
    // 划过显示信息
    markShow (rowI, colI) {
      clearTimeout(this.timer)
      this.mouseNum.rowNum = rowI
      this.mouseNum.colNum = colI
    },
    // 划出隐藏
    markHide () {
      this.timer = setTimeout(() => {
        this.mouseNum.rowNum = -1
        this.mouseNum.colNum = -1
      }, 100)
    },
    // 重置座位
    resetSeat () {
      // 将所有座位的值变为0
      let oldArray = this.seatArray.slice()
      for (let i = 0; i < this.seatRow; i++) {
        for (let j = 0; j < this.seatCol; j++) {
          if (oldArray[i][j] !== -1) {
            oldArray[i][j] = 0
          }
        }
      }
      this.seatList = []
      this.seatOff = false
      this.seatArray = oldArray
    },
    // 选定且购买座位
    buySeat () {
      // 遍历seatArray，将值为1的座位变为2
      let oldArray = this.seatArray.slice()
      for (let i = 0; i < this.seatRow; i++) {
        for (let j = 0; j < this.seatCol; j++) {
          if (oldArray[i][j] === 1) {
            oldArray[i][j] = 2
          }
        }
      }
      this.seatArray = oldArray
      this.toSeatInfo(this.seatList)
      this.toAllPrice(this.seatList.length * this.detailPrice)
      this.$router.push({path: '/orderSure'})
      window.scrollTo(0, 0)
    },
    // 处理座位选择逻辑
    handleChooseSeat (row, col) {
      let seatValue = this.seatArray[row][col]
      let newArray = this.seatArray
      // 如果是已购座位，直接返回
      if (seatValue === 2) return
      // 如果是已选座位点击后变未选
      if (seatValue === 1) { // 取消
        newArray[row][col] = 0
        var hideOff = this.seatList.filter((item) => {
          return item.row !== (row + 1) || item.col !== col
        })
        this.seatList = hideOff
        if (this.seatList.length <= 0) {
          this.seatOff = false
        }
      } else if (seatValue === 0) { // 选中
        var onceOff = this.seatList.some((item) => {
          return item.row === (row + 1) && item.col === col
        })
        if (!onceOff) {
          let obj = {
            row: row + 1,
            col: col
          }
          this.seatList.push(obj)
          this.seatOff = true
        }
        newArray[row][col] = 1
      }
      // 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
      this.seatArray = newArray.slice()
    },
    // 初始座位数组
    initSeatArray () {
      let seatArray = Array(this.seatRow).fill(0).map(() => Array(this.seatCol).fill(0))
      this.seatArray = seatArray
      // 初始化不是座位的地方
      this.initNonSeatPlace()
    },
    // 初始化不是座位的地方
    initNonSeatPlace () {
      for (let i = 0; i < 1; i++) {
        this.seatArray[i][2] = -1
        this.seatArray[i][12] = -1
        this.seatArray[i][17] = -1
        this.seatArray[i][26] = -1
      }
      for (let i = 0; i < 2; i++) {
        this.seatArray[i][1] = -1
        this.seatArray[i][11] = -1
        this.seatArray[i][18] = -1
        this.seatArray[i][27] = -1
      }
      for (let i = 0; i < 3; i++) {
        this.seatArray[i][10] = -1
        this.seatArray[i][19] = -1
        this.seatArray[i][28] = -1
      }
      for (let i = 0; i < 4; i++) {
        this.seatArray[i][0] = -1
        this.seatArray[i][9] = -1
        this.seatArray[i][20] = -1
        this.seatArray[i][29] = -1
      }
      for (let i = 0; i < 11; i++) {
        this.seatArray[i][8] = -1
        this.seatArray[i][21] = -1
      }
      for (let i = 9; i < 11; i++) {
        this.seatArray[i][0] = -1
        this.seatArray[i][10] = -1
        this.seatArray[i][19] = -1
        this.seatArray[i][29] = -1
      }
      for (let i = 6; i < 11; i++) {
        this.seatArray[i][9] = -1
        this.seatArray[i][20] = -1
      }
      // 横向空行
      for (let i = 0; i < this.seatArray[0].length; i++) {
        this.seatArray[6][i] = -1
      }
    }
  },
  mounted () {
    this.initSeatArray(10, 20)
  },
  created () {
    if (this.$local.obtain('DetailData')) {
      this.detailCont = this.$local.obtain('DetailData')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    height:100%;
    box-sizing: border-box;
  }
  .cinema-wrapper{
    height:100%;
    position: relative;
  }
  .seat-wrapper{
    height:100%;
    width:1000px;
    position: relative;
  }
  .inner-seat-wrapper{
    position: absolute;
    top:120px;
    bottom:0;
    width:100%;
    box-sizing: border-box;
  }
  .seat{
    width: 33px;
    height: 48px;
    float:left;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .inner-seat{
    width:80%;
    height:80%;
    cursor: pointer;
  }
  .markBox{
    width: 184px;
    height: 120px;
    background: rgba(0,0,0,.5);
    position: absolute;
    bottom: 50px;
    left: 0;
    border-radius: 3px;
    transform: translateX(-43%);
    color: white;
    box-sizing: border-box;
    padding: 15px;
  }
  .markBox p{
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .markBox .markIcon{
    border-top: 5px solid transparent;
    border-left: 5px solid transparent;
    border-right: 5px solid rgba(0,0,0,.5);
    border-bottom: 5px solid rgba(0,0,0,.5);
    position: absolute;
    left: 50%;
    bottom: -8px;
    transform: rotate(45deg) translateX(-50%);
  }
  .selected-seat{
    background: url('../../assets/images/selected.png') center center no-repeat;
    background-size: contain;
  }
  .unselected-seat{
    background: url('../../assets/images/unselected.png') center center no-repeat;
    background-size: contain;
  }
  .bought-seat{
    background: url('../../assets/images/bought.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .screen-center{
    position: absolute;
    left:49.5%;
    transform: translateX(-50%);
    padding:5px;
    font-size: 13px;
    border-radius: 5px;
    top:50px;
    background-color: #f6f6f6;
    color: #636363;
    border:1px solid #b1b1b1;
  }
  .mid-line{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top:100%;
    width:1px;
    height:600px;
    border-left:1px dashed #919191;
  }
  .btn-wrapper{
    width:200px;
    height:100%;
    text-align: center;
    background: #efefef;
    position: absolute;
    right: 0;
    top: 0;
    overflow: hidden;
  }
  .btn-wrapper h4{
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    color: #000;
    margin-bottom: 3px;
    background: #ddd;
  }
  .btn-wrapper h4 span{
    color: red;
  }
  .btn-wrapper ul li{
    width: 180px;
    height: 71px;
    padding: 12px 10px 10px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transform: translateX(-1px);
    margin-bottom: 3px;
  }
  .btn-wrapper ul li .seatTrue{
    width: 25px;
    padding-right: 4px;
    float: left;
  }
  .btn-wrapper ul li .seatTrue img{
    margin-left: 1px;
  }
  .btn-wrapper ul li .seatTrue p{
    margin-top: 10px;
    text-align: left;
    font-size: 12px;
    color: #495060;
  }
  .btn-wrapper ul li .seatInfo{
    float: left;
    width: 151px;
    text-align: left;
  }
  .btn-wrapper ul li .seatInfo p{
    line-height: 17px;
    font-size: 12px;
    color: #495060;
  }
  .btn-buy{
    height:30px;
    line-height: 30px;
    font-size: 14px;
    border-radius: 5px;
    padding:0 5px;
    background-color: #ffa349;
    color: #fff;
    display: inline-block;
    cursor: pointer;
    margin: 7px 10px 0 0;
  }
  .illustration{
    position: absolute;
    left:0;
    top:0;
    height:35px;
    width:300px;
  }
  .illustration-img-wrapper{
    width:25px;
    height:25px;
    position: relative;
    top:50%;
    display: inline-block;
    transform: translateY(-50%);
    margin-left: 10px;
  }
  .illustration-text{
    display: inline-block;
    height:100%;
    line-height: 35px;
    font-size: 14px;
    position: relative;
    top:-2px;
  }
</style>
