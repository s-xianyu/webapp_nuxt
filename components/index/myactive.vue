<template>
  <div class="myactive">
    <div class="tab">
      <div class="">
        <router-link class="mCar" tag="span" to="/findCar">我要买车 <i class="iconfont icon-bianqian"></i></router-link>
        <router-link class="mCar2" tag="span" to="/sellCar">我要卖车 <i class="iconfont icon-bianqian"></i></router-link>
      </div>
      <div class="">
        <router-link class="m4s" tag="span" to="/record4s">4S记录 <i class="iconfont icon-yunshu"></i></router-link>
        <router-link class="mpg" tag="span" to="/">免费评估 <i class="iconfont icon-yunshu"></i></router-link>
      </div>
    </div>
    <ul>
      <li v-for="(item, index) in homeList" :data-id="item.type" :key="index">{{item.detail}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'myavtive'
      }
    },
    props:['homeList'],
  }
</script>

<style lang="scss" scoped>
@import '~static/style/mixin';
  .myactive{
    padding:.2rem .3rem;
    background:$fff;
    .tab{
      &>div{
        display: flex;
        span{
          flex:1;
          display: flex;
          justify-content: center;
          align-items: center;
          @include wh(100%,1.2rem);
           margin:.2rem .3rem;
           font-size:.6rem;
           font-weight: bolder;
           color:$fff;
           border-radius: .14rem;
           &.mCar{background:#ff6d62;}
           &.mCar2{background:#ff8450;}
           &.m4s{background:#d3a2f1;}
           &.mpg{background:#5fbcf5;}
           i{
             margin-left:.2rem;
           }
        }
      }
    }
    ul{
      width:100%;
      li{
        font-family: "微软雅黑", arial;
        display: inline-block;
        @include wh(25%,1rem);
        text-align: center;
        line-height:1rem;
        font-size:.45rem;
      }
    }
  }
</style>
