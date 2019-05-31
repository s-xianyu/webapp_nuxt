// 带logo的头部导航
// 接收参数
// false -->返回上一页
// true -->返回到首页

<template>
  <div class="back-header">
    <div class="content">
      <div class="back">
        <span v-if="!back" class="iconfont icon-prev" @click="$history(-1)"></span>
        <router-link to="/" v-else class="iconfont icon-prev" @click="$history(-1)"></router-link>
      </div>
      <div class="station">
        <router-link tag="span" to="/city/city"><i class="iconfont icon-dingwei"></i>{{thisCity}}</router-link>
        <!--<i class="iconfont icon-jiantou9"></i>-->
      </div>
      <div class="mltSearch">
        <router-link tag="span" to="/search/search">我要找车</router-link>
      </div>
      <div class="mlRight" @click="navEvent">
        <div class="iconfont icon-daohang home"></div>
      </div>
    </div>
    <headNav @navShow="navGetData" :navShow="navShow"/>
  </div>
</template>
<script>
  import headNav from '~/components/common/header/head_nav'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        navShow:false,
      }
    },
    mounted() {

    },
    props:['back'],
    components:{
      headNav,
    },
    computed:{
      ...mapState(['thisCity'])
    },
    methods:{
      ...mapMutations(['WIN_HEIGHT']),
      navEvent(){
        this.navShow = !this.navShow;
        this.WIN_HEIGHT(this.navShow);
      },
      navGetData(data){
        this.navShow = data;
        this.WIN_HEIGHT(this.navShow);
      }
    },

  }
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .back-header{
    .content{
      display: flex;
      /*padding:0 .3rem;*/
      height:1.564rem;
      background:#fff;
      /*border-bottom: 1px solid #e1e1e1;*/
      position:relative;
      z-index: 120;
      & > div{
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        &.back{
          flex:.8;
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
            background-color: #f0f2f6;
            @include borRadius(1rem);
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
