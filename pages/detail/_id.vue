<template>
  <div class="detail">
    <div class="animated fadeInRight">
      <Header :heads="header"/>
      <div class="swiper">
        <mt-swipe :auto="4000" :showIndicators="false" @change="handleChange">
          <mt-swipe-item v-for="(item,index) in carInfo.car.bigPicList" :key="index">
            <img :src="item" :alt="item.name">
          </mt-swipe-item>
        </mt-swipe>
        <div class="SpiperIndex">
          <span>{{swiperIndex}}/{{carInfo.car.bigPicList.length}}</span>
        </div>
        <div class="bijia"><i class="iconfont icon-bijia"></i></div>
      </div>
      <div class="info">
        <div class="carname">
          <span>【{{carInfo.car.shortAreaName}}】 {{carInfo.car.year}} {{carInfo.car.brandFullName}}  {{carInfo.car.carAuto}}</span>
        </div>
        <div class="cprice">
          <div class="cpbox">
            <span>{{carInfo.car.price}}</span>万
          </div>
          <div class="newCar">
            <span>新车价：{{carInfo.car.newCarPrice}}</span>万
          </div>
          <div class="zxbtn">询问最低价</div>
        </div>
        <div class="loans" v-if="carInfo.car.installment && carInfo.car.installment !== '未知'">
          <span class="img"></span>
          <span class="instalments">{{carInfo.car.installment}}成首付{{carInfo.car.installmentMoney}}，最低月供{{carInfo.installmentLoan.instalments | installmentMoneyS}}开回家</span>
          <i class="iconfont icon-shuangjiantou"></i>
        </div>
        <div class="publishDate" v-if="carInfo.car.publishDate">更新 {{carInfo.car.publishDate}}</div>
      </div>
      <div class="carBox">
        <div class="topBg"></div>
        <div class="car_conf">
          <div class="shows">
            <div class="flex">
              <div class="li">
                <span>排放标准</span>
                <p>{{carInfo.car.discharge  || '--'}}</p>
              </div>
              <div class="li">
                <span>排量</span>
                <p>{{carInfo.car.carpailiang || '--'}}</p>
              </div>
              <div class="li">
                <span>燃油</span>
                <p>{{carInfo.car.oilWear  || '--'}}</p>
              </div>
            </div>
            <div class="flex">
              <div class="li">
                <span>里程</span>
                <p>{{carInfo.car.journey  || '--'}}</p>
              </div>
              <div class="li">
                <span>用途</span>
                <p>{{carInfo.car.usePurpose || '--'}}</p>
              </div>
              <div class="li">
                <span>能否过户</span>
                <p>{{carInfo.car.transfer | transfer}}</p>
              </div>
            </div>
          </div>
          <div class="hides" v-if="carConfHide">
            <div class="list">
              <div class="li">
                <strong>车型</strong>
                <span>{{carInfo.car.type || '--'}}</span>
              </div>
              <div class="li">
                <strong>能否按揭</strong>
                <span>{{carInfo.car.morgage || '--'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>颜色</strong>
                <span>{{carInfo.car.color || '--'}}</span>
              </div>
              <div class="li">
                <strong>上牌时间</strong>
                <span>{{carInfo.car.year || '--'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>车身结构</strong>
                <span>{{carInfo.car.fjmap || '--'}}</span>
              </div>
              <div class="li">
                <strong>保险情况</strong>
                <span>{{carInfo.car.insuranceMonth ? carInfo.car.insuranceYear+'年'+carInfo.car.insuranceMonth+'月' : '未知'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>驱动方式</strong>
                <span>{{carInfo.fjmap.qdfs || '--'}}</span>
              </div>
              <div class="li">
                <strong>年审情况</strong>
                <span>{{carInfo.car.inspectionMonth ? carInfo.car.inspectionYear+'年'+carInfo.car.inspectionMonth+'月' : '未知'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>发动机</strong>
                <span>{{carInfo.fjmap.fdj || '--'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>变速箱</strong>
                <span>{{carInfo.fjmap.bsx || '--'}}</span>
              </div>
            </div>
            <div class="list">
              <div class="li">
                <strong>长*宽*高</strong>
                <span>{{carInfo.fjmap.cd || '--'}}*{{carInfo.fjmap.kd || '--'}}*{{carInfo.fjmap.gd || '--'}}</span>
              </div>
            </div>
          </div>
          <div class="btn" @click="carConfHide = !carConfHide">
            <span
              class="iconfont icon-jiantou9"
              :class="{cur:carConfHide}"></span>
          </div>
        </div>
        <div class="car_des">
          <div>
            <p>车辆描述</p>
            <div class="text animated" :style="{height:dec.height}">
              <span @click="decFun">{{carInfo.car.describle}}</span>
            </div>
            <div
              v-if="carInfo.car.describle && carInfo.car.describle !== '未知'"
              class="decBtn"
              @click="decFun">
              {{dec.text}}
              <i class="iconfont icon-jiantou9" :class="dec.text !== '查看更多'? 'cur': ''"></i>
            </div>
          </div>
          <div class="msgBtn">咨询车况</div>
        </div>
        <div class="car_tel">
          <div class="left">
            <h2>不知道什么车适合自己？</h2>
            <p>资深从业者帮您免费解答！</p>
          </div>
          <div class="right">
            <button>立即咨询</button>
          </div>
        </div>
        <!--<div class="car_4s">-->
          <!--<div class="left"><img :src="'http://img.hx2cars.com/upload/brandlogo/'+carInfo.logo" alt=""></div>-->
          <!--<div class="center">-->
            <!--<h2>查看4S维修记录</h2>-->
            <!--<p>全面了解最真实车况</p>-->
            <!--<span>维保次数: {{carInfo.wxjl || '0'}}</span>-->
          <!--</div>-->
          <!--<div class="right">-->
            <!--<button class="btn">立即查看</button>-->
          <!--</div>-->
        <!--</div>-->
        <div class="car_bright">
          <div class="list" v-for="(item,index) in carInfo.spotshows" :key="index">
            <h2>{{item.title}}</h2>
            <div class="content">
              <p v-for="li in item.key">{{li}}</p>
            </div>
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
import {mapState,mapActions} from 'vuex'
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
        },
        carConfHide:false,
      }
    },
    async asyncData ( res ) {
      let params = {
        id:res.params.id,
        position:res.query.position,
      }
      // params = { id : 167331326 };
      const { data } = await carDetail(params);
      // this.carInfo = data;
      return {carInfo:data};
      console.log(this.carInfo);

    },
    components:{
      Header,
      Swiper
    },
    computed:{
      ...mapState(['isLogin','userInfo'])
    },
    filters:{
      installmentMoneyS(val){
        let values = JSON.parse(val);
        // 取最低层里的期数最多
        let contant = values[0].contant;
        return contant[contant.length-1].value;
      },
      transfer(val){
        if(val === ''){
          return '面议'
        }else if(val === '1'){
          return '能'
        }else{
          return '不能'
        }
      },
      brightFilter(val){
        debugger
        let arr = {
          'gkjpz':'高科技配置',
          'czpz':'操作配置',
          'wbpz':'外部配置',
          'dgpz':'灯光配置',
          'dmtpz':'多媒体配置',
          'aqpz':'安全配置'
        },brightArr = [];
        for(let i in arr){
          for(let m in val){
            if(i === m){
              let ketArr = spotshows[m].split(',');
              brightArr.push({
                title:arr[i],
                key:ketArr,
              })
            }
          }
        }
        return brightArr;
      }
    },
    created(){
      this._getUserInfo();
    },
    methods:{
      ...mapActions(['_getUserInfo']),
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
.boxShow{
  background-color: $fff;
  -webkit-box-shadow: -0.06rem 0.21rem 0.98rem 0 rgba(157,167,199,.45);
  box-shadow: -0.06rem 0.21rem 0.98rem 0 rgba(157,167,199,.45);
  margin:0 .5rem .5rem;
  @include borRadius(.16rem);
  overflow: hidden;
}
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
    .publishDate{
      @include wh(auto,1.2rem);
      @include flexCenter;
      justify-content: flex-end;
      padding:0 .6rem;
      color:#999;
      font-size:.4rem;
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
    .car_conf{
      @extend .boxShow;
      padding:.4rem 0 0;
      .shows{
        .flex{
          @include flexCenter;
          flex-direction: row;
          .li{
            @include flexCenter;
            flex-direction: column;
            flex:1;
            @include wh(100%,2rem);
            span{
              font-size:.38rem;
              color:#999;
            }
            p{
              font-size: .51rem;
              font-weight: bolder;
              color:#333;
              padding-top:.3rem;
            }
          }
        }
      }
      .hides{
        border-top:1px solid #e1e1e1;
        padding:.3rem 0 0;
        margin:0 .46rem;
        .list{
          @include wh(100%,.8rem);
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .li{
            flex:1;
            font-size:.4rem;
            strong{
              color:#999;
              font-weight: normal;
            }
          }
         }
      }
      .btn{
        @include wh(100%,1.5rem);
        @include flexCenter;
        span{
          font-size:.7rem;
          &.cur{
            transform: rotate(180deg);
          }
        }
      }
    }
    .car_des{
      @extend .boxShow;
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
      .msgBtn{
        @include flexCenter;
        @include wh(100%,1.4rem);
        background:rgba(69,129,239,1);
        font-size:.51rem;
        color:#fff;
        position:relative;
      }
    }
    .car_4s{
      @include flexCenter;
      padding: 0 .48rem .5rem;
      .left{
        flex:1;
        img{
          @include wh(1.8rem,1.8rem);
        }
      }
      .center{
        flex:3;
        h2{
          font-size:.6rem;
          font-weight: bold;
        }
        p{
          font-size:.45rem;
          color:#999;
          padding:.2rem 0;
        }
      }
      .right{
        flex:1;
        justify-content: flex-end;
        .btn{
          @include wh(2.6rem,.8rem);
          @include borRadius(1rem);
          background:#f60;
          color:#fff;
        }
      }
    }
    .car_tel{
      @include flexCenter;
      padding:.5rem 1.1rem 0;
      .left{
        flex:2;
        h2{
          font-size:.6rem;
          font-weight: bold;
        }
        p{
          font-size:.45rem;
          color:#999;
          padding:.2rem 0;
        }
      }
      .right{
        flex:1;
        display: flex;
        justify-content: flex-end;
        button{
          @include wh(2rem,2rem);
          @include borRadius(50%);
          background:#f60;
          color:#fff;
          font-size:.45rem;
        }
      }
    }
  }
</style>
