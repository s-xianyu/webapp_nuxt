<template>
    <footer class="footer">
      <ul>
        <router-link tag="li" to="/"><div><span class="iconfont icon-shouye"></span><em>首页</em></div></router-link>
        <router-link tag="li" to="/news"><div><span class="iconfont icon-yunshu"></span><em>买车</em></div></router-link>
        <router-link tag="li" to="/topic"><div><span class="iconfont icon-pengyouquan"></span><em>批发</em></div></router-link>
        <router-link tag="li" to="/home"><div><span class="iconfont icon-geren"></span><em>我的</em></div></router-link>
      </ul>
    </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '~static/style/mixin';
  .footer{
    position:fixed;
    bottom:0;
    @include wh(12.4rem,1.8rem);
    border-top:1px solid $bbb;
    background:$fff;
    ul{
      display: flex;
      li{
        @include flexCenter;
        width:100%;
        text-align: center;
        font-size:.4rem;
        color:#333;
        overflow: hidden;
        position:relative;
        > div{
          @include wh(100%,100%);
          overflow: hidden;
        }
        .iconfont{
          @include wh(.8rem,.8rem);
          display: block;
          margin:.2rem auto .1rem;
          &.icon-shouye{@include bis('~static/img/index_icon2.png')}
          &.icon-yunshu{@include bis('~static/img/news_icon2.png')}
          &.icon-pengyouquan{@include bis('~static/img/topic_icon2.png')}
          &.icon-geren{@include bis('~static/img/home_icon2.png')}
        }
      }
    }
    li.nuxt-link-exact-active{
      color:$f60;
      .iconfont{
        &.icon-shouye{@include bis('~static/img/index_icon.png')}
        &.icon-yunshu{@include bis('~static/img/news_icon.png')}
        &.icon-pengyouquan{@include bis('~static/img/topic_icon.png')}
        &.icon-geren{@include bis('~static/img/home_icon.png')}
      }
    }
    li.nuxt-link-exact-active:after{
      content: '';
      display: block;
      @include wh(.2rem,.2rem);
      @include center;
      background: $f60;
      opacity: 0;
      @include borRadius(50%);
      animation: ease-in-out scareX .3s;
    }
  }
  .footer li.nuxt-link-exact-active{
    color:$f60;
  }
  @keyframes scareX {
    0%{
      transform: scale(1,1);
      opacity: .7;
    }
    100%{
      transform: scale(18,18);
      opacity: 0;
    }
  }
</style>
