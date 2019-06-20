// 通用带标题header模块
// 接收一个对象heads
// title  -->标题
// position  -->true/false.是否fixed顶部
// history  -->true:返回上一页。   false：弹框关闭。
// name   --> 弹框staus前缀名

<template>
  <header ref="titleHearder" :class="{cur : heads.position}">
    <h2>{{ heads.title }}</h2>
    <span v-if="heads.history" class="iconfont icon-prev" @click="$history(-1)"></span>
    <span v-else class="iconfont icon-prev" @click="getAllStatus"></span>
  </header>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        msg: 'header',
      }
    },
    props:['heads'],
    mounted(){
    },
    methods:{
      ...mapMutations(['ALL_STATUS']),
      getAllStatus(){
        this.ALL_STATUS(this.heads.name);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  header{
    position: relative;
    z-index: 100;
    @include wh(100%,1.8rem);
    border-bottom:1px solid #e1e1e1;
    background:$fff;
    &.cur{
      position: fixed;
      top:0;
      left:0;
      right:0;
    }
    h2{
      @include wh(100%,1.8rem);
      @include flexCenter;
      color:$c333;
    }
    span{
      position:absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:.7rem;
      @include wh(1.6rem,1.8rem);
      left:0;
      top:0;
    }
  }
</style>
