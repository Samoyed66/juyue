<template>
    <div id="ticket">
      <h1>我的聚越>账户中心>常用购票人</h1>
      <el-button type="danger" @click="open">添加购票人</el-button>
      <table width="100%">
        <thead>
          <tr>
            <th>#</th>
            <th>姓名</th>
            <th>卡类型</th>
            <th>身份证号</th>
            <th>操作</th>
          </tr>
        </thead>
        <tr v-for="(item,index) in tableinfo" :key="index">
          <td>{{index+1}}</td>
          <td>{{item.name}}</td>
          <td>{{item.cardtype}}</td>
          <td>{{item.id}}</td>
          <td>
            <el-button @click="remove(index)"  size="mini" type="danger">删除</el-button>
          </td>
        </tr>
      </table>
      <!--添加购票人信息弹出框-->
      <el-form :rules="rules" ref="formwrap" v-show="show" class="addinfo" label-position="right" label-width="80px" :model="addinfo">
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
</template>

<script>
export default {
  name: 'Ticket',
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
      /* 弹出框是否显示 */
      show: false,
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
      }
    }
  },
  created: function () {
    if (this.$local.obtain('tableinfo')) {
      this.tableinfo = this.$local.obtain('tableinfo')
    } else {
      this.$local.set('tableinfo', this.tableinfo)
    }
  },
  methods: {
    /* 弹出信息输入框 */
    open: function () {
      this.show = true
    },
    /* 取消信息输入 */
    reslove: function () {
      this.show = false
    },
    /* 验证成功信息添加 */
    onSubmit: function (addinfo) {
      this.$refs[addinfo].validate((valid) => {
        if (valid) {
          this.tableinfo.push(this.addinfo)
          this.$local.set('tableinfo', this.tableinfo)
          this.show = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 删除身份信息 */
    remove: function (index) {
      this.tableinfo.splice(index, 1)
      this.$local.set('tableinfo', this.tableinfo)
    }
  }
}
</script>

<style lang="less" scoped>
#ticket{
  margin-bottom: 79px;
  h1{
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #ccc;
  }
  &>button{
    float: right;
    margin: 30px 0;
  }
  table{
    table-layout: fixed;
    word-break: break-all;
    word-wrap: break-word;
    thead{
      background: #eeeeee;
      th{
        border: 1px solid #ccc;
        padding: 8px 6px;
      }
    }
    td{
      border: 1px solid #ccc;
      padding: 10px 8px;
    }
  }
  .addinfo{
    padding: 20px;
    width: 50%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(left top, white , blueviolet);
  }
}
</style>
