<template>
  <div class="detail">
    <div class="animated fadeInRight">
      <Header :heads="header"/>
      <div class="swiper">
        <mt-swipe :auto="4000" :showIndicators="false" @change="handleChange">
          <mt-swipe-item v-for="(item,index) in car.bigPicList" :key="index">
            <img :src="item" :alt="item.name">
          </mt-swipe-item>
        </mt-swipe>
        <div class="SpiperIndex">
          <span>{{swiperIndex}}/{{car.bigPicList.length}}</span>
        </div>
        <div class="bijia"><i class="iconfont icon-bijia"></i></div>
      </div>
      <div class="info">
        <div class="carname">
          <span>【{{car.shortAreaName}}】 {{car.year}} {{car.brandFullName}}  {{car.carAuto}}</span>
        </div>
        <div class="cprice">
          <div class="cpbox">
            <span>{{car.price}}</span>万
          </div>
          <div class="zxbtn">询问最低价</div>
        </div>
        <div class="loans" v-if="car.installment && car.installment !== '未知'">
          <span class="img"></span>
          <span class="instalments">{{car.installment}}成首付{{car.installmentMoney}}，最低月供{{installmentLoan.instalments | installmentMoneyS}}开回家</span>
          <i class="iconfont icon-shuangjiantou"></i>
        </div>
      </div>
      <div class="carBox">
        <div class="topBg"></div>
        <div class="car_des">
          <p>车辆描述</p>
          <div class="text animated" :style="{height:dec.height}">
            <span>{{car.describle}}</span>
          </div>
          <div
            v-if="car.describle && car.describle !== '未知'"
            class="decBtn"
            @click="decFun">
            {{dec.text}}
            <i class="iconfont icon-jiantou9" :class="dec.text !== '查看更多'? 'cur': ''"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { carDetail } from '~/config/Ajax'
import Swiper from '~/components/common/swiper/swiper'
import Header from '~/components/common/header/back_head';
import axios from '~/plugins/axios'

  export default {
    data() {
      return {
        msg: '_id',
        header: {
          title:'详情页'
        },
        swiperIndex:1, //默认swiper下标位置
        dec:{
          height:'2.4rem',
          text:'查看更多'
        }
      }
    },
    async asyncData ({params} ) {
      // debugger
      const { data } = await carDetail(params);
      return data;

    },
    components:{
      Header,
      Swiper
    },
    filters:{
      installmentMoneyS(val){
        let values = JSON.parse(val);
        // 取最低层里的期数最多
        let contant = values[0].contant;
        return contant[contant.length-1].value;
      }
    },
    methods:{
      handleChange(index){
        this.swiperIndex = index+1;
      },
      decFun(){
        if(this.dec.text === '查看更多'){
          this.dec.height = 'auto';
          this.dec.text = '隐藏内容';
        }else{
          this.dec.height = '2.4rem';
          this.dec.text = '查看更多';
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
.detail{
  background:#f1eef6;
}
  .swiper{
    position:relative;
    height:9rem;
    .SpiperIndex{
      @include wh(2rem,.74rem);
      position:absolute;
      left:50%;
      bottom:.8rem;
      margin-left:-1rem;
      background:rgba(0,0,0,.5);
      @include borRadius(2rem);
      @include flexCenter;
      color:$fff;
      font-size:.5rem;
      letter-spacing: 2px;
    }
    .bijia{
      position: absolute;top:0rem;
      right:0rem;
      @include wh(2rem,2rem);
      @include flexCenter;
      i{
        color:$fff;
        font-size:.7rem;
      }
    }
  }
  .info{
    background:#fff;
    padding-bottom:.6rem;
    .carname{
      span{
        @include wh(100%,auto);
        padding: 0 .4rem;
        font-size: .56rem;
        padding-top: .9rem;
        color: #333;
        font-weight: 700;
        overflow: hidden;
        display:-webkit-box;
        word-break:break-all;
        text-overflow:ellipsis;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;

      }
    }
    .cprice{
      padding:.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cpbox{
        font-weight: 700;
        color:$f60;
        span{
          font-weight: 700;
          font-size:.88rem;
        }
        i{
          font-weight: 700;
          font-size:.5rem;
        }
      }
      .zxbtn{
        @include wh(3rem,1.2rem);
        @include flexCenter;
        color:$f60;
        border:1px solid $f60;
        box-sizing: border-box;
        @include borRadius(.08rem);
      }
    }
    .loans{
      @include wh(100%,1rem);
      background-color: #ffe5d4;
      padding:0 .6rem;
      @include flexCenter;
      justify-content: space-between;
      .img{
        display: inline-block;
        @include wh(2rem,1.17rem);
        @include bis("~static/img/icon-loans.png");
      }
      .instalments{
        color:$f60;
      }
      i{
        color:$f60;
      }
    }
  }
  .carBox{
    position: relative;
    .topBg{
      @include wh(100%,3rem);
      background: -webkit-linear-gradient(top ,#fff,#f1eef6);
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
    }
    .car_des{
      background-color: $fff;
      -webkit-box-shadow: -0.06rem 0.21rem 0.98rem 0 rgba(157,167,199,.45);
      box-shadow: -0.06rem 0.21rem 0.98rem 0 rgba(157,167,199,.45);
      margin:0 .5rem;
      @include borRadius(.16rem);
      p{
        @include wh(100%,1.6rem);
        font-size:.56rem;
        @include flexCenter;
        color:$f60;
        font-weight: bolder;
        background: url('http://static.hx2cars.com/resource/web/dist/static/mobile/car/mdetail/images/title.png') no-repeat center;
        background-size: 3.2rem;
      }
      .text{
        margin: 0 .52rem;
        color: #666;
        line-height: .8rem;
        font-size: .4rem;
        overflow: hidden;
        -webkit-transition: height linear .2s;
        transition: height linear .2s;
      }
      .decBtn{
        @include wh(100%,1.6rem);
        @include flexCenter;
        color: $c999;
        i{
          &.cur{
            transform: rotate(180deg);
          }
        }
      }
    }
  }
</style>
