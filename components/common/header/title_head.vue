// 通用带标题header模块
// 接收一个对象heads
// title  -->标题
// position  -->true/false.是否fixed顶部

<template>
  <header ref="titleHearder" :class="{cur : heads.position}">
    <h2>{{ heads.title }}</h2>
    <span class="iconfont icon-prev" @click="$history(-1)"></span>
  </header>
</template>

<script>
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
