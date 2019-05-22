// 带logo的头部导航

<template>
  <div class="header">
    <div class="content">
      <router-link tag="div" to="/" class="logo"></router-link>
      <router-link tag="div" to="/city/city" class="station">
        <span>{{thisCity}}</span>
        <i class="iconfont icon-jiantou9"></i>
      </router-link>
      <div class="mltSearch">
        <router-link tag="span" to="/search/search">我要找车</router-link>
      </div>
      <div class="mlRight">
        <div @click="getLogin" class="login" v-if="!isLogin">登录</div>
        <router-link tag="div" to="/home" v-else class="iconfont icon-yonghu home"></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
  data () {
    return {
      login:{
        state: false,
      },
    }
  },
  mounted() {

  },
  computed:{
    ...mapState(['isLogin','thisCity'])
  },
  methods:{
    ...mapMutations(['LOGIN_SHOW']),
    // 登录弹框
    getLogin(){
      this.LOGIN_SHOW();
    },
  },

}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .header{
    .content{
      display: flex;
      height:1.564rem;
      background:#f7f7f7;
      /*border-bottom: 1px solid #e1e1e1;*/
      position:relative;
      z-index: 30;
      & > div{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        &.logo{
          flex:.6;
          @include bis('http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/toplogo.png');
          @include wh(1.7rem,100%);
          background-size:.996rem auto;
          background-position: center center;
          background-color: #f7f7f7;
          margin-left:.3rem;
        }
        &.station{
          span{
            display: flex;
            width:2rem;
            justify-content: center;
            overflow: hidden;
            line-height: 1.564rem;
            height: 1.564rem;
            font-size:.48rem;
            color:$c666;
          }
          i{
            margin-right:.2rem;
          }
        }
        &.mltSearch{
          flex:4;
          span{
            display: flex;
            justify-content: flex-start;
            align-content: center;
            @include wh(6.8rem ,1rem);
            border:1px solid $c999;
            border-radius: .136rem;
            line-height: 1rem;
            padding-left:1.4rem;
            font-size:.442rem;
            color:$c999;
            background-image: url('http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/topsearch.png');
            background-repeat: no-repeat;
            background-position:.51rem center;
            background-size:.476rem auto;
          }
        }
        &.mlRight{
          flex:1;
          font-size:.48rem;
          .home{
            font-size:.7rem;
        }
        }
      }
    }
  }
  .fixed{
    .header{
      .content{
        background:$f60;
        .logo{
          display: none;
        }
        .station{
          color:$fff;
          span{
            color:$fff;
            margin-left: .2rem;
          }
        }
        .mltSearch{
          flex:5;
          span{
            width:7.5rem;
            background-color:$fff;
            border:1px solid $fff;
          }
        }
        .mlRight{
          color:$fff;
        }
      }
    }
  }
</style>
