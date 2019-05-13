<template>
  <div class="information">
    <div class="information-h2">
      <h2>行业资讯</h2>
      <div class="information-right">查看更多<i class="iconfont icon-xiayiye"></i></div>
    </div>
    <ul>
      <li @click="goLocation(item.url)" v-for="(item, index) in information" :key="index">
        <div class="information-pic"><img :src="item.pic" alt=""></div>
        <div class="information-text">
          <span class="information-tit">{{item.title}}</span>
          <span class="information-ndate">{{item.ndate}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props:['information'],
  methods:{
    goLocation(url){
      location.href=url;
    }
  }
}
</script>
<style lang="scss" scope>
@import '~static/style/mixin';
.information{
  background:$fff;
  margin-top:.4rem;
  .information-h2{
    height:1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:0 .3rem;
    position:relative;
    h2{
      font-size: .48rem;
      font-weight: bold;
      padding-left:.3rem;
      &::before{
        content: '';
        display: inline-block;
        @include wh(.1rem,.6rem);
        background:$c333;
        position: absolute;
        top: .4rem;
        left: 0;
      }
    }
    .information-right{
      color:$c666;
      .iconfont{
        font-size:.3rem;
      }
    }
  }
  ul{
    li{
      display:flex;
      flex-direction: row;
      padding:.3rem;
      border-bottom:1px solid #f1f1f1;
      .information-pic{
        @include wh(4rem,3rem);
        min-width:4rem;
        height:3rem;
        img{
          width: 100%;
          height:100%;
        }
      }
      .information-text{
        display:flex;
        flex-direction:column;
        justify-content: space-between;
        margin-left:.5rem;
        .information-tit{
          font-size:.5rem;
          display:-webkit-box;
          word-break:break-all;
          text-overflow:ellipsis;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
        .information-ndate{
          font-size:.45rem;
          color:$c666;
          margin-bottom:.2rem;
        }
      }
    }
  }
}
</style>
