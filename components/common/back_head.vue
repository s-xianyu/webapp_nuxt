// header带返回上一步的模块

<template>
  <header :class="{cur : fixed}">
    <h2>{{ heads.title }}</h2>
    <span @click="back"></span>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'header',
        fixed:false,
      }
    },
    props:['heads'],
    mounted(){
      // 是否置顶header
      if(this.heads.position === 'top'){
        this.fixed = true;
      }
    },
    methods:{
      back(){
        history.go(-1);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  header{
    position: relative;
    z-index: 100;
    @include wh(100%,1.6rem);
    background:$f60;
    &.cur{
      position: fixed;
      top:0;
      left:0;
      right:0;
    }
    h2{
      @include wh(100%,1.6rem);
      @include flexCenter;
      color:$fff;
    }
    span{
      position:absolute;
      display: block;
      @include wh(1.6rem,1.6rem);
      left:0;
      top:0;
      @include bis('http://www.2schome.net/resource/web/dist/static/mobpages/images/mcarlist/leftarrow2.png');
      background-size: .29rem .51rem;
      background-position: center;
    }
  }
</style>
