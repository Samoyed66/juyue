<template>
  <div id="Selection">
    <div class="head">
      <p>
        <router-link to="/">大麦</router-link> >
        <a href="javascript:;">{{getCity}}</a> >
        <a href="javascript:;">电影</a> >
        <a href="javascript:;">{{detailCont.picTitle}}</a> >
        <a href="javascript:;">{{detailTime}}</a>
      </p>
    </div>
    <ul class="selectNav">
      <li>1 选取区域</li>
      <li>
        <div class="subBottom"></div>
        <div class="subtop"></div>
        <p>2 选择座位</p>
      </li>
      <li>3 结账付钱</li>
    </ul>
    <div class="choose">
      <cinemaSeatChoose></cinemaSeatChoose>
    </div>
  </div>
</template>

<script>
import cinemaSeatChoose from '@/components/lzd/cinema-seat-choose.vue'
import { mapState } from 'vuex'
export default {
  name: 'Selection',
  data () {
    return {
      getCity: '北京',
      detailCont: {}
    }
  },
  computed: {
    // vuex选定时间
    ...mapState(['detailTime'])
  },
  components: {
    cinemaSeatChoose
  },
  created () {
    if (this.$local.obtain('city')) {
      this.getCity = this.$local.obtain('city')
    }
    if (this.$local.obtain('DetailData')) {
      this.detailCont = this.$local.obtain('DetailData')
    }
  }
}
</script>

<style scoped lang="less">
  #Selection{
    width: 1200px;
    margin: 0 auto;
    .head{
      height: 50px;
      line-height: 50px;
      margin-bottom: 22px;
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
    .selectNav{
      height: 50px;
      display: flex;
      justify-content: space-around;
      background: linear-gradient(to bottom, #555, #3e3e3e, #555);
      li{
        color: white;
        font-style: italic;
        font-size: 18px;
        line-height: 50px;
        text-align: center;
        width: 33.333%;
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
    .choose{
      width: 100%;
      height: 678px;
      background: white;
      border: 1px solid #eee;
      margin-bottom: 20px;
    }
  }
</style>
