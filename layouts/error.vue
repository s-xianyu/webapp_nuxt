<template>
  <div class="err">
    <Header :heads="header"/>
    <img src="http://static.hx2cars.com/resource/web/mobpages/images/404.png" alt="">
    <div class="text">
      <span @click="back">返回上一页</span>
      <router-link tag="span" to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
  import Header from '~/components/common/back_head';
  export default {
    head(){
      return {
        title:'未找到页面'
      }

    },
    data() {
      return {
        msg: 'error',
        header: {
          title:'个人中心'
        },
      }
    },

    components:{
      Header
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
  .err{
    img{
      @include wh(10rem,auto);
      margin:3rem auto 0;
    }
    .text{
      display:flex;
      justify-content: space-between;
      margin:1rem;
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size:.5rem;
        @include wh(50%,1.3rem);
        border-radius: 2rem;
        background:$f60;
        color:$fff;
        margin:0 .5rem;
      }
    }
  }
</style>
