<template>
  <div id="order">
    <h1>我的聚越>交易中心>订单管理</h1>
    <!--近期订单列表-->
    <div class="order-wrap">
      <h2>近期订单列表</h2>
      <div class="head">
        <div class="left">
          <el-select v-model="value" clearable placeholder="全部订单">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="seach-right">
          <input type="input" placeholder="请输入订单编号/商品名称...">
          <button>查询</button>
        </div>
      </div>
      <!--订单详情-->
      <table width="100%">
        <tr>
          <th>订单编号</th>
          <th>购买时间</th>
          <th>商品名称</th>
          <th>数量</th>
          <th>单价</th>
          <th>订单金额</th>
          <th>交易状态</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in orderinfo" :key="index">
          <td>{{item.orderNum}}</td>
          <td>{{item.time}}</td>
          <td>{{item.title}}</td>
          <td>{{item.num}}</td>
          <td>{{item.price}}</td>
          <td>{{item.allPrice}}</td>
          <td>未支付</td>
          <td>操作</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'oredr',
  data () {
    return {
      orderinfo: null,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  created: function () {
    this.orderinfo = JSON.parse(this.$local.obtain('orderInfo'))
    console.log(this.orderinfo)
  }
}
</script>

<style lang="less" scoped>
#order{
  margin-bottom: 167px;
  h1{
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;
  }
  .order-wrap{
    margin-top: 36px;
    h2{
      width: 120px;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      color: #1b7cff;
      border-bottom: 1px solid #1b7cff;
    }
    .head{
      display: flex;
      justify-content: space-between;
      margin: 16px 0 26px;
      .left{
        display: flex;
        .el-col{
          margin-right: 8px;
          .el-dropdown{
            padding: 8px;
            width: 148px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          .el-dropdown-link{
            display: inline-block;
            width: 100%;
            cursor: pointer;
            .fa{
              float: right;
            }
          }
        }
      }
      .seach-right{
        input{
          width: 300px;
          height: 38px;
          border-radius: 6px;
          border: 1px solid #ccc;
          text-indent: 6px;
        }
        button{
          width: 54px;
          height: 38px;
          border-radius: 6px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
        }
      }
    }
    table{
      th{
        padding: 16px;
        border: 1px solid #ccc;
      }
      td{
        padding: 16px;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
