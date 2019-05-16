<template>
  <div class="body">
    <header>
      <div class="header-content">
        <h2>个人中心</h2>
        <span class="iconfont icon-prev" @click="$history(-1)"></span>
        <span class="header-nav" @click="navEvent"><i class="iconfont icon-daohang"></i></span>
      </div>
      <headNav @backShowFun="backShowFun" :isShow="backShow"/>
    </header>
    <section class="userInfo">
      <div class="homeBg"></div>
      <div class="info">
        <div class="info-phone">
          <img class="info-phone-img" :src="userInfo.photo" alt="">
          <p class="info-phone-name">{{userInfo.name}}</p>
        </div>
        <div class="info-li">
          <ul>
            <li v-for="(item,index) in infoLi">
              <span class="info-li-count">0</span>
              <span class="info-li-text">{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="guide">
      <ul class="guide-list">
        <li>
          <span class="left"><i class="iconfont icon-xingzhuang"></i>我的个人会员服务</span>
          <span class="right"><i class="iconfont icon-xiayiye"></i></span>
        </li>
        <li>
          <span class="left"><i class="iconfont icon-xingzhuang"></i>我的个人会员服务</span>
          <span class="right"><i class="iconfont icon-xiayiye"></i></span>
        </li>
        <li>
          <span class="left"><i class="iconfont icon-xingzhuang"></i>我的个人会员服务</span>
          <span class="right"><i class="iconfont icon-xiayiye"></i></span>
        </li>
        <li>
          <span class="left"><i class="iconfont icon-xingzhuang"></i>我的个人会员服务</span>
          <span class="right"><i class="iconfont icon-xiayiye"></i></span>
        </li>
        <li @click="exitFun">
          <span class="left"><i class="iconfont icon-xingzhuang"></i>退出登录</span>
          <!--<span class="right"><i class="iconfont icon-xiayiye"></i></span>-->
        </li>
      </ul>
    </section>
    <section class="exit_model" v-show="exitShow">
      <div class="exit-box">
        <div class="affirm">
          <p>您确定退出么？</p>
          <span @click="outLogin">确认</span>
        </div>
        <div @click="exitFun" class="cancel">取消</div>
      </div>
    </section>
    <!--<div v-if="isLogin" class="main">-->
      <!--<mt-button class="outLogin" size="large" type="primary" @click.native="outLogin">退出</mt-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import headNav from '~/components/common/header/head_nav'
  import {mapMutations,mapState,mapActions} from 'vuex';
  export default {
    data() {
      return {
        backShow:false,
        exitShow:false,
        infoLi:['在售','微信车库','收藏','订阅']
      }
    },
    components:{
      headNav
    },
    computed:{
      ...mapState(['isLogin','userInfo'])
    },
    mounted(){
      this.getUserInfo();
    },
    methods:{
      ...mapMutations(['OUT_USER']),
      ...mapActions(['getUserInfo']),
      backShowFun(data){
        this.backShow = data;
      },
      navEvent(){
        this.backShow = !this.backShow
      },
      exitFun(){
        this.exitShow = !this.exitShow
      },
      outLogin(){
        this.OUT_USER();
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  header{
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 100;
    @include wh(100%,1.8rem);
    h2{
      @include wh(100%,1.8rem);
      @include flexCenter;
      color:$fff;
    }
    span{
      position:absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size:.7rem;
      @include wh(1.6rem,1.8rem);
      top:0;
      color:$fff;
      &.iconfont{left:0;}
      &.header-nav{
        right:0;
        i{
          font-size:.8rem;
        }
      }
    }
  }
  .userInfo{
    position:relative;
    height:9.3rem;
    .homeBg{
      @include wh(100%,5.86rem);
      /*background:url("../static/img/homeBg.png");*/
      @include bis('../static/img/homeBg.png');
    }
    .info{
      position:absolute;
      top:3.2rem;
      left:50%;
      margin-left:-46%;
      @include wh(92%,5.5rem);
      background:#fff;
      border-radius: .5rem;
      .info-phone{
        position:absolute;
        top:-1.3rem;
        left:0;
        right:0;
        .info-phone-img{
          @include wh(3rem,3rem);
          border-radius: 50%;
        }
        .info-phone-name{
          display: flex;
          align-items: center;
          justify-content: center;
          font-size:.5rem;
          padding:.3rem 0;
        }
      }
      .info-li{
        padding-bottom:.5rem;
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        ul{
          display: flex;
          li{
            flex:1;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            .info-li-count{
              font-size:.5rem;

            }
            .info-li-text{
              color:$c999;
              margin-top:.25rem;
              font-size:.45rem;
            }
          }
        }
      }
    }
  }
  .guide{
    background:$fff;
    ul{
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        height:2rem;
        position: relative;
        padding:0 .5rem;
        span{
          flex:1;
          display: flex;
          align-items: center;
          font-size:.45rem;
          color:$c666;
          &.right{
            justify-content: flex-end;
          }
          &.left{
            i{
              font-size:.7rem;
              margin-right:.4rem;
            }
          }
        }
        &:after{
          content: '';
          display: inline-block;
          width:90%;
          height:1px;
          background:#f6f6f6;
          position: absolute;bottom:0;
          right:0;
        }
      }
    }
  }
  .exit_model{
    @include wh(100%,100%);
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(0,0,0,.6);
    z-index: 120;
    .exit-box{
      position:absolute;
      bottom:1.5rem;
      left:50%;
      margin-left:-47%;
      z-index: 140;
      @include wh(94%,auto);
      .affirm{
        @include wh(100%,auto);
        background:$fff;
        border-radius: .5rem;
        p{
          display: flex;
          justify-content: center;
          align-items: center;
          height:1.4rem;
          border-bottom:1px solid #ececec;
          color:$c999;
        }
        span{
          display: flex;
          justify-content: center;
          align-items: center;
          height:2rem;
          font-size: .5rem;
          color:$f60;
        }
      }
      .cancel{
        @include wh(100%,1.8rem);
        font-size: .5rem;
        color:#2078f0;
        border-radius: .5rem;
        background:$fff;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top:.3rem;
      }
    }
  }
</style>
