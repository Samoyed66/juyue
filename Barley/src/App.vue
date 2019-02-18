<template>
  <div id="app">
    <!-- 公共头部 -->
    <Headpublic v-show="$route.meta.headShow"></Headpublic>
    <!-- 公共头部 -->
    <router-view/>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
    <!-- 返回顶部 -->
    <!-- 公共底部 -->
    <Footpublic v-show="$route.meta.footShow"></Footpublic>
    <!-- 公共底部 -->
  </div>
</template>

<script>
// 头部引入
import Headpublic from '@/components/lib/Headpublic'
// 底部引入
import Footpublic from '@/components/lib/Footpublic'
// 返回顶部引入
import BackTop from '@/components/lib/BackTop'
export default {
  name: 'App',
  components: {
    Headpublic,
    Footpublic,
    BackTop
  }
}
</script>

<style lang="less">
  #app{
    background: #f5f5f5;
  }
</style>
