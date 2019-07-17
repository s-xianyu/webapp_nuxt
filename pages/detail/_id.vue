<template>
  <div class="detail">
    <div class="animated fadeInRight">
      <Header :heads="header"/>
      <div class="swiper">
        <mt-swipe :auto="3000" :showIndicators="false" @change="handleChange">
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
              v-if="carInfo.car.describle &&
                carInfo.car.describle !== '未知' ||
                carInfo.car.describle !== '暂无填写车辆具体描述'"
              class="decBtn"
              @click="decFun">
              {{dec.text}}
              <i class="iconfont icon-jiantou9" :class="dec.text !== '查看更多'? 'cur': ''"></i>
            </div>
          </div>
          <div class="msgBtn">咨询车况</div>
        </div>
        <div class="car_bright" v-if="!carInfo.detailConfDes">
          <div class="list"
               v-for="(item,index) in brightFilter(carInfo.spotshows)"
               :key="index"
               v-if="index < brightNum">
            <h2>{{item.title}}</h2>
            <div class="content">
              <p v-for="(li,index) in item.key" :key="index">{{li}}</p>
            </div>
          </div>
          <div v-if="brightNum === 2">
            <div class="btn"
                 v-if="brightFilter(carInfo.spotshows).length > 2"
                 @click="brightFun">查看更多</div>
          </div>
          <div v-else>
            <router-link tag="div" :to="{path:'/detail/peizi/'+carInfo.car.carId}" class="btn">查看详细配置</router-link>
          </div>
        </div>
        <div class="car_bright" :class="carInfo.detailConfDes ? 'cur' : ''" v-else>
          <router-link tag="div" :to="{path:'/detail/peizi/'+carInfo.car.carId}" class="pzBtn">查看详细配置</router-link>
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
        <div class="car_data" ref="carData">
          <p>价格趋势</p>
          <div id="container" style="width:11.4rem;height:10rem;"></div>
          <div class="hint">
            <div class="kjBtn">砍价</div>
            <div class="szBtn">私人助理</div>
          </div>
        </div>
        <div class="car_shop">
          <div class="user">
            <div class="left" :class="carInfo.evaluateScore > 0 ? '' : 'cur'">
              <div class="img">
                <img :src="carInfo.user.headPic" alt="">
              </div>
              <div class="info">
                <h2>{{carInfo.user.companyName || carInfo.user.mobliePhone}}</h2>
                <div class="mid">
                  <!--<span class=. v-if="carInfo.verifycompany == 1">认证车商</span>-->
                  <span class="gsrz" v-if="carInfo.business">工商认证</span>
                  <span class="xyz" v-if="carInfo.user.creditValue != 0">信誉值：{{carInfo.user.creditValue}}</span>
                </div>
                <div class="bot">
                  <span>在售：{{carInfo.user.noSaleCount}}</span>
                  <span>已售：{{carInfo.user.carHadSale}}</span>
                </div>
                <div class="nextGo">
                  <i class="iconfont icon-xiayiye1"></i>
                </div>
              </div>
            </div>
            <div class="right" v-if="carInfo.evaluateScore > 0">
              <h2>商家评分</h2>
              <span>{{(carInfo.evaluateScore).toFixed(1)}}</span>
            </div>
          </div>
          <div class="btn">
            <span>预约到店看车</span>
          </div>
        </div>
        <div class="car_complaint">
          <div class="left">
            <span class="iconfont icon-icon-warning"></span>
          </div>
          <div class="center">
            <h2>车辆图文描述信息不符？</h2>
            <span>点此我要报错</span>
          </div>
          <div class="right">
            <span class="iconfont icon-xiayiye1"></span>
          </div>
        </div>
        <div class="car_order">
          <h2>持续关注此类车型</h2>
          <div class="content">
            <div class="left">
              <ul>
                <li v-for="(item,index) in carInfo.subscribeCondision"
                    :data-t="item.type"
                    :data-v="item.value"
                    :key="index">{{item.title}}</li>
              </ul>
            </div>
            <div class="right">
              <span class="iconfont icon-jia"></span>
            </div>
          </div>
          <div class="bot">
            <span class="iconfont icon-xinfeng"></span>
            <span>订阅上新通知</span>
          </div>
        </div>
        <div class="car_sim">
          <div class="title">
            <div v-for="(item,index) in simTitle" 
                :key="index" 
                @click="simCarFun(index)" 
                :class="index === simCarIndex ? 'cur' : ''">
              <span>同{{item}}</span>
            </div>
          </div>
          <div class="oddList">
            <List v-if="!loadding" :listInfo="simCarInfoSplice"/>
          </div>
        </div>
        <div class="car_load">
          <div class="btn" @click="$hxWaptoapp()">去华夏APP查看更多优质车辆</div>
        </div>
      </div>
      <div class="footer">
        <div class="left">
          <span class="iconfont icon-aixin"></span>收藏
        </div>
        <div class="center">
          <span class="iconfont icon-kanjia"></span>我要砍价
        </div>
        <div class="right">
          <span class="iconfont icon-weibiaoti-1"></span>拨打电话
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { carDetail,getcardata,getsimcar } from '~/config/Ajax'
import Header from '~/components/common/header/back_head';
import List from '~/components/common/oddList/oddList'
import {mapState,mapActions} from 'vuex'
import axios from '~/plugins/axios'

  export default {
    data() {
      return {
        msg: '_id',
        header:true,
        swiperIndex:1, //默认swiper下标位置
        dec:{
          height:'2.4rem',
          text:'查看更多'
        },
        carConfHide:false,
        brightNum:2, //亮点配置默认展示2大类
        simTitle:['品牌','类型','价位','地区'],
        simCarData:{}, //传值
        simCarInfo:[], //保存数据
        simCarInfoSplice:[], //展示的数据
        simCarIndex:0,
        simCarNum:4, //分类默认展示4条
        loadding:false,
      }
    },
    async asyncData ( res ) {
      let carId = res.params.id;
      // let carId = '166431138';
      let params = {  // 车辆信息传值
          position:res.query.position,
          flag: 'hqqs',
          id:carId,
        // id:'168221264',
      };
      let [carDetailInfo,getcardataInfo] = await Promise.all([
        carDetail(params),
        getcardata(params)
      ]);
      return {
        carInfo:carDetailInfo.data,
        cardataInfo:getcardataInfo.data
      };
    },
    components:{
      Header,
      List,
    },
    computed:{
      ...mapState(['isLogin','userInfo']),
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
    },
    created(){
      this._getUserInfo();
    },
    mounted(){
      // 绘制图表
      this.getEcharts();
      // 请求分类数据
      this.simCarData ={
        title:this.carInfo.car.serial,
        brandStr:'brand'
      };
      this.getSimCar();
    },
    methods:{
      ...mapActions(['_getUserInfo']),
      getEcharts(){
        let dom = document.getElementById("container");
        let myChart = echarts.init(dom);
        window.onresize = myChart.resize;
        let app = {};
        let option = null;
        //获取数据
        let getcardataInfo = this.cardataInfo;
        let infos = getcardataInfo.infos;
        let list = []; //列表
        let date = []; //时间
        let price = []; //金额
        for(let key in infos){
          list = infos[key].split('~');
        }
        if(list && list.length > 0){
          for(let m in list){
            if(list[m]){
              let li = list[m].split(',');
              let time = this.$forTime('YYYY-MM',(+li[0]));
              let money = (+li[1]).toFixed(2);
              date = [...date,time];
              price = [...price,money];
            }
          }
        }
        // 切割数据保持16
        if(price.length > 16){
          let num = date.length;
          date = date.splice(num-16,num);
          price = price.splice(num-16,num);
        }
        option = {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#f60'
              }
            }
          },
          grid: {
            left: '10%',
            right: '5%',
            bottom: '12%',
            // containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              boundaryGap : false,
              data : date,
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'价格',
              type:'line',
              areaStyle: {
                backgroundColor:'#e1e1e1',
                color:'#eaf1f5'
              },
              itemStyle : {
                normal : {
                  color:'#97bbcd',
                  lineStyle:{
                    // color:'#97bbcd'
                  }
                }
              },
              smooth: true,
              data: price
            }
          ]
        };

        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }

      },
      brightFilter(val){
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
              brightArr.push({
                title:arr[i],
                key:val[m].split(','),
              })
            }
          }
        }
        return brightArr;
      },
      handleChange(index){
        this.swiperIndex = index+1;
      },
      brightFun(){
        this.brightNum = 20;
        console.log(this.brightNum)
      },
      decFun(){
        if(this.dec.text === '查看更多'){
          this.dec.height = 'auto';
          this.dec.text = '隐藏内容';
        }else{
          this.dec.height = '2.4rem';
          this.dec.text = '查看更多';
        }
      },
      async getSimCar(){
        let obj = null;
        let values = [];
        let { data } = await getsimcar(this.simCarData);
        let carList = data.carsbrand ||   //同品牌
                          data.carsserial ||  //同类型
                          data.carsmoney ||   //同金额
                          data.carsareacode;   //同地区
        if(carList){
          for(let i of carList){
            obj = {
              id:i.id,
              title:i.title,
              price: i.money,
              areaName:i.areaName,
              brand:i.shortTitle,
              image:i.firstSmallPic,
              journey:i.journey,
              standard:i.standard,
              time:this.$forTime('YYYY-MM-DD',i.createTime),
            };
            values.push(obj);
          }
          this.simCarInfo = values;
          this.simCarListDataPush();
        }
      },
      simCarListDataPush(){
        let bit = this.simCarNum;
        this.simCarInfoSplice = this.simCarInfo.slice(bit-4,bit);
      },
      simCarFun(index){
        if(index === 0){
          this.simCarData = {
            title:this.carInfo.car.serial,
            brandStr:'brand'
          };
        }else if(index === 1){
          this.simCarData = {
            carKind:this.carInfo.car.carKind || this.carInfo.car.type,
            CarKindStr:'kind'
          };
        }else if(index === 2){
          this.simCarData = {
            money:this.carInfo.car.price,
            priceStr:'money'
          };
        }else{
          this.simCarData = {
            areacode:this.carInfo.car.areaCode,
            carCode:'areacode'
          };
        }
        this.simCarIndex = index;
        // 切换分类重置数据
        [
          this.simCarNum,
        ] = [ 4] ;
        this.getSimCar();
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
.carTitle{
  @include wh(100%,1.6rem);
  font-size:.56rem;
  @include flexCenter;
  color:$f60;
  font-weight: bolder;
  background: url('http://static.hx2cars.com/resource/web/dist/static/mobile/car/mdetail/images/title.png') no-repeat center;
  background-size: 3.2rem;
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
    padding-bottom:2.4rem;
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
       @extend .carTitle;
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
    .car_bright{
      @extend .boxShow;
      padding: 0 .6rem;
      &.cur{padding:0;}
      .list{
        border-bottom:1px solid #e1e1e1;
        padding-bottom:.4rem;
        &:last-child{border:0;}
        h2{
          color: #f60;
          font-size: .42rem;
          line-height: 1.6rem;
          font-weight: 700;
        }
        .content{
          p{
            @include wh(50%,.8rem);
            line-height: .8rem;
            display: inline-block;
            padding-left:.5rem;
            &:before{
              content: '';
              display: inline-block;
              width: .24rem;
              height: .24rem;
              background: #fe9c47;
              border-radius: .2rem;
              -webkit-transform: scale(.5);
              transform: scale(.5);
              margin-right: .2rem;
            }
          }
        }
      }
      .btn{
        @include wh(100%,1.5rem);
        color:#f60;
        font-size: .45rem;
        @include flexCenter;
      }
      .pzBtn{
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
      padding:.5rem 1.1rem .8rem;
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
    .car_data{
      position: relative;
      @extend .boxShow;
      p{
        @extend .carTitle;
        position: absolute;
        top:0;
        left:0;
        right:0;
      }
      .hint{
        @include wh(100%,auto);
        @include flexCenter;
        font-family: '微软雅黑';
        position:relative;
        padding: 0 .5rem .5rem;
        & > div{
          @include flexCenter;
          height:1.25rem;
          @include borRadius(1rem);
          color:#fff;
          font-size:.45rem;
        }
        .kjBtn{
          flex:1.5;
          background:rgba(69,129,239,1);
          margin-right:.8rem;
        }
        .szBtn{
          flex:1;
          background:$f60;
        }
      }
    }
    .car_shop{
      @extend .boxShow;
      .user{
        @include flexCenter;
        padding:.6rem 0 .6rem .53rem;
        .left{
          width:75%;
          @include flexCenter;
          &.cur{
            width:100%;
          }
          .img{
            @include wh(2rem,2rem);
            @include borRadius(.08rem);
            overflow: hidden;
          }
          .info{
            @include wh(70%,auto);
            margin-left:.6rem;
            position:relative;
            h2{
              display:inline-block;
              font-size:.51rem;
              width:90%;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;

            }
            .mid{
              span{
                display:inline-block;
                height:.6rem;
                line-height: .6rem;
                text-align: center;
                border-radius:.1rem;
                padding:0 .15rem;
                font-size:.25rem;
                color:#fff;
                /*&.rzcs{*/
                  /*background:linear-gradient(107deg,rgba(255,174,0,1),rgba(253,105,15,1))*/
                /*}*/
                &.gsrz{
                  background:linear-gradient(90deg,rgba(255,184,71,1),rgba(255,153,71,1));
                }
                &.xyz{
                  background:linear-gradient(90deg,rgba(137,245,178,1),rgba(51,198,155,1));
                  margin-left:.2rem;
                }
              }
            }
            .nextGo{
              position:absolute;
              right:0;
              top:50%;
              margin-top:-.25rem;
              @include wh(.5rem,.5rem);
              i{
                font-size:.4rem;
                color:$f60;
              }
            }
          }
        }
        .right{
          @include flexCenter;
          flex-direction: column;
          flex:1;
          height:2.22rem;
          border-left:1px solid #e1e1e1;
          h2{
            font-size:.51rem;
          }
          span{
            font-size: .9rem;
            color:$f60;
            font-weight: bold;
          }
        }
      }
      .btn{
        @include wh(100%,1.6rem);
        background:$f60;
        span{
          @include wh(100%,100%);
          @include flexCenter;
          font-size:.48rem;
          color:$fff;
        }
      }
    }
    .car_complaint{
      @include flexCenter;
      padding:0 .5rem .8rem;
      .left{
        flex:1;
        @include flexCenter;
        span{
          font-size: 1.5rem;
          color:$f60;
        }
      }
      .center{
        flex:3;
        h2{
          font-size:.6rem;
          font-weight: bold;
          padding:.1rem 0;
        }
      }
      .right{
        flex:1;
        display: flex;
        justify-content: flex-end;
        span{
          font-size:.45rem;
          color:$f60;
        }
      }
    }
    .car_order{
      background: $fff;
      padding-bottom:.48rem;
      h2{
        @include wh(100%,1.64rem);
        font-size:.51rem;
        font-weight: bold;
        padding-left:.5rem;
        @include flexCenter;
        justify-content: flex-start;
      }
      .content{
        @include flexCenter;
        margin:0 .5rem;
        .left{
          flex: 4;
          ul{
            box-sizing: border-box;
            li{
              display: inline-block;
              @include wh(31.33%,1rem);
              text-align: center;
              line-height: 1rem;
              border:1px solid #d3d3d3;
              background:#f8f8f8;
              border-radius: .1rem;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
              margin:.1rem 0;
              &:nth-child(3n-1){
                margin:.1rem 3%;
              }
            }
          }
        }
        .right{
          flex: 1;
          @include flexCenter;
          height:100%;
          span{
            color:$f60;
            font-size: .75rem;
          }
        }
      }
      .bot{
        margin:.48rem .5rem 0;
        @include flexCenter;
        @include wh(auto,1.35rem);
        background:$f60;
        border-radius: .08rem;
        color:#fff;
        span{
          font-size:.51rem;
        }
        .iconfont{
          font-size:.55rem;
          margin-right:.2rem;
        }
      }
    }
    .car_sim{
      .title{
        @include wh(80%,1.8rem);
        @include flexCenter;
        padding-left:.5rem;
        div{
          flex:1;
          @include flexCenter;
          height:100%;
          &.cur{
            span{
              font-size:.65rem;
              border-bottom:.02rem solid $f60;
              font-weight: bolder;
            }
          }
        }
      }
      .oddList{
        @extend .boxShow;
      }
    }
    .car_load{
      .btn{
        @include flexCenter;
        margin:0 .5rem;
        @include wh(auto,1.6rem);
        background:$f60;
        @include borRadius(.2rem);
        color:#fff;
        font-size:.5rem;
      }
    }
  }
  .footer{
    @include flexCenter;
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    @include wh(100%,1.6rem);
    background:#fff;
    box-shadow: 0 -2px 3px #f4f4f4;
    & > div{
      @include wh(100%,100%);
      @include flexCenter;
      color:#fff;
      font-size: .48rem;
    }
    .left{
      flex:1;
      background:#fff;
      color:#444;
      font-size:.4rem;
      flex-direction: column;
      span{
        font-size: .8rem;
      }
    }
    .center{
      flex:2;
      background:#fe9c47;
      span{margin-right:.2rem;}
    }
    .right{
      flex:2;
      background:$f60;
      span{margin-right:.2rem;}
    }
  }
</style>
