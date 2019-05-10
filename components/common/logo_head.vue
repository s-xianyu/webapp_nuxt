// 带搜索logo的头部导航

<template>
  <div class="header">
    <div class="content">
      <router-link tag="div" to="/" class="logo"></router-link>
      <div class="station">
        <span>{{city}}</span>
        <i class="iconfont icon-jiantou9"></i>
      </div>
      <div class="mltSearch">
        <span>我要找车</span>
      </div>
      <div class="mlRight" v-if="loginBtn">
        <router-link tag="div" to="/personage/logo" class="login" v-if="!isLogin">登录</router-link>
        <router-link tag="div" to="/home" v-else class="iconfont icon-yonghu home"></router-link>
      </div>
      <div class="mlRight" v-else>
        <div class="iconfont icon-yonghu home" @click="mlTopBoxFun"></div>
      </div>
    </div>
    <div v-if="!loginBtn" class="mlTopBox" :class="{back:backShow}">
      <div class="content">
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
    </div>
    <div class="bg" v-if="backShow" @click="mlTopBoxFun"></div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      login:{
        state: false,
      },
      backShow:false
    }
  },
  props:['loginBtn'],
  mounted() {

  },
  computed:{
    ...mapState(['isLogin','city'])
  },
  methods:{
    mlTopBoxFun(){
      this.backShow = !this.backShow
    }
  },

}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .header{
    .content{
      display: flex;
      padding:0 .3rem;
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
        }
        &.mltSearch{
          flex:4;
          span{
            display: flex;
            justify-content: flex-start;
            align-content: center;
            @include wh(6rem ,1rem);
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
          flex:.8;
          font-size:.48rem;
          .home{
            font-size:.7rem;
        }
        }
      }
    }
    .mlTopBox{
      position:absolute;
      top:0;
      left:0;
      right:0;
      z-index: 28;
      @include wh(100%,6rem);
      margin-top:1.567rem;
      -webkit-transition: all .5s;
      transition: all .5s;
      -webkit-transform: translate(0, -175%);
      transform: translate(0, -175%);
      &.back{
        -webkit-transform: translate(0, 0);
        transform: translate(0, 0);
      }
      .content{
        background:$fff;
        position:absolute;
        top:0;
        left:50%;
        margin-left:-6.21rem;
        @include wh(12.42rem,auto);
        z-index: 12;
        ul{
          li{
            float:left;
            width:33.333%;
            height:3rem;
          }
        }
      }
    }
    .bg{
        position: fixed;
        z-index: 27;
        top:0;
        right:0;
        bottom:0;
        left:0;
        background:rgba(0,0,0,.5);
        -webkit-transition: all .5s;
        transition: all .5s;
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
          }
        }
        .mltSearch{
          flex:5;
          span{
            width:7rem;
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
