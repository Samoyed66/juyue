<template>
  <div id="Footpublic">
    <div class="wrap">
      <!-- 底部列表排列 -->
      <div class="footList clear">
        <dl>
          <dt>订购方式</dt>
          <dd>
            <a href="javascript:;">在线订购</a>
          </dd>
          <dd>
            <a href="javascript:;">电话订购</a>
          </dd>
          <dd>
            <a href="javascript:;">上门订购</a>
          </dd>
          <dd>
            <a href="javascript:;">大客户团体订购</a>
          </dd>
          <dd>
            <a href="javascript:;">聚越超级票订购</a>
          </dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd>
            <a href="javascript:;">送货上门</a>
          </dd>
          <dd>
            <a href="javascript:;">电子票</a>
          </dd>
          <dd>
            <a href="javascript:;">上门自取</a>
          </dd>
          <dd>
            <a href="javascript:;">聚越自助机换票</a>
          </dd>
        </dl>
        <dl>
          <dt>支付方式</dt>
          <dd>
            <a href="javascript:;">在线支付</a>
          </dd>
          <dd>
            <a href="javascript:;">柜台付款</a>
          </dd>
        </dl>
        <dl>
          <dt>聚越网微信</dt>
          <dd>
            <img src="@/assets/images/download.jpg">
          </dd>
        </dl>
        <dl>
          <dt>聚越网触屏版</dt>
          <dd>
            <img src="@/assets/images/download.jpg">
          </dd>
        </dl>
        <dl>
          <dt>账户安全</dt>
          <dd>
            <a href="javascript:;">找回密码</a>
          </dd>
          <dd>
            <a href="javascript:;">账户注册</a>
          </dd>
          <dd>
            <a href="javascript:;">账户绑定</a>
          </dd>
          <dd>
            <a href="javascript:;">SSL安全证书</a>
          </dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd>
            <a href="javascript:;">退换及缺货说明</a>
          </dd>
          <dd>
            <a href="javascript:;">发票帮助</a>
          </dd>
          <dd>
            <a href="javascript:;">订票服务条款</a>
          </dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd>
            <a href="javascript:;">演出订阅</a>
          </dd>
        </dl>
      </div>
      <!-- 企业介绍标签 -->
      <ul class="clear">
        <li>
          <a href="javascript:;">公司介绍</a>
        </li>
        <li>
          <a href="javascript:;">品牌识别</a>
        </li>
        <li>
          <a href="javascript:;">企业荣誉</a>
        </li>
        <li>
          <a href="javascript:;">隐私声明</a>
        </li>
        <li>
          <a href="javascript:;">联系及合作</a>
        </li>
        <li>
          <a href="javascript:;">招聘信息</a>
        </li>
        <li>
          <a href="javascript:;">网站地图</a>
        </li>
        <li>
          <a href="javascript:;">友情链接</a>
        </li>
        <li>
          <a href="javascript:;">公司大事记</a>
        </li>
      </ul>
      <!-- 底部合作图片 -->
      <div class="picList clear">
        <img src="@/assets/images/foot01.png">
        <img src="@/assets/images/foot02.png">
        <img src="@/assets/images/foot03.gif">
        <img src="@/assets/images/foot04.png">
        <img src="@/assets/images/foot05.png">
        <img src="@/assets/images/foot06.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footpublic'
}
</script>

<style scoped lang="less">
  #Footpublic{
    width: 100%;
    background: #e6e6e6;
    .wrap{
      width: 1200px;
      margin: 0 auto;
      padding: 44px 0 49px;
      .footList{
        padding-bottom: 21px;
        border-bottom: 2px solid #1298ff;
        dl{
          float: left;
          padding-right: 69px;
          width: 85px;
          dt{
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            color: #333;
          }
          dd{
            height: 25px;
            line-height: 25px;
            a{
              font-size: 12px;
              color: #1b1b1b;
            }
            a:hover{
              color: #57a3f3;
            }
          }
          &:last-of-type{
            padding-right: 0;
          }
        }
      }
      ul{
        width: 866px;
        margin: 0 auto;
        height: 52px;
        line-height: 52px;
        padding-bottom: 15px;
        li{
          float: left;
          a{
            font-size: 15px;
            color: #666;
            padding: 0 13px 0 17px;
            border-right: 1px solid #666;
          }
          &:last-of-type{
            a{
              border-right: none;
            }
          }
        }
      }
      .picList{
        width: 850px;
        margin: 0 auto;
        img{
          float: left;
          margin-right: 20px;
        }
      }
    }
  }
</style>
