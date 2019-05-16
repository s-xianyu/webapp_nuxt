<template>
  <div class="city">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="city-content">
        <div class="city-stair1">
          <div class="mzaLocation">
            <i class="iconfont icon-dingwei"></i>您坐在的城市：
            <span>{{locationCity.hotKeys[1]}}</span>
            <div class="allBtn" @click="allSelectFun">我要{{allSelectText}}</div>
          </div>
          <div class="mzaHistory" v-if="historyCity.length > 0">
            <p>历史记录：</p>
            <div class="history_content">
              <span v-for="item in historyCity">{{item}}</span>
            </div>
          </div>
          <div class="mzaHot">
            <p>热门城市</p>
            <div class="hot_content" v-for="(item,index) in hotList" :key="index">
              <span v-for="span in item">{{span}}</span>
            </div>
          </div>
          <div class="mzaProvince">
            <div class="city-list" v-for="(upper,index) in keymap" :key="index">
              <p :id="upper">{{upper}}</p>
              <div
                class="city-lis"
                v-if="upper === item.bxwName"
                v-for="item in citystair1"
                :key="item.area_code">
                <span @click="cityFun(item.area_code,item.area_name)">{{item.area_name}}</span>
                <div class="leftBtn" v-if="selectShow">
                  <b class="animated fadeInRight" :class="{cur:radioToggle}"></b>
                </div>
                <u v-if="selectShow" @click="radioFun" class="bg"></u>
              </div>
            </div>
          </div>
        </div>
        <div class="city-stairTo city-stair2" :class="{cur:stair2Show}">
          <div class="city-stair2-left" @click="stair2Show = !stair2Show"></div>
          <div class="city-stair2-content">
            <div class="city_title">
              <span>{{thisCity}}</span>
              <i  @click="stair2Show = !stair2Show" class="close iconfont icon-close"></i>
            </div>
            <div class="line"></div>
            <div class="all" id="全部">不限</div>
            <ul>
              <li
                @click="city3Fun(item.area_code,item.area_name)"
                v-for="item in citystair2"
                :key="item.area_code">{{item.area_name}}</li>
            </ul>
          </div>
        </div>
        <div class="city-stairTo city-stair3" :class="{cur:stair3Show}">
          <div class="city-stair2-left" @click="stair3Show = !stair3Show"></div>
          <div class="city-stair2-content">
            <div class="city_title">
              <span>{{thisCity}}</span>
              <i  @click="stair3Show = !stair3Show" class="close iconfont icon-close"></i>
            </div>
            <div class="line"></div>
            <div class="all" id="全部">不限</div>
            <div class="title" v-if="citystair3.motorList">二手车交易市场</div>
            <ul>
              <li
                @click="city3Fun(item.area_code,item.area_name)"
                v-for="item in citystair3.motorList"
                :key="item.area_code">{{item.cityName}}</li>
            </ul>
            <div class="title" v-if="citystair3.areas">市辖区|县</div>
            <ul>
              <li
                @click="city3Fun(item.area_code,item.area_name)"
                v-for="item in citystair3.areas"
                :key="item.area_code"
                v-if="item.area_name != ''">{{item.area_name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="city-menu">
        <a v-for="item in keymap">{{item}}</a>
      </div>
      <div v-if="selectShow" class="allSelectBtn animated fadeInUp">
        <span>取消</span>
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import { historyKeyAndHotKey,getprovinces,getAreaByCityCode,getAreaLevel3} from '~/config/getData'
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        msg: 'city',
        heads:{
          title:'地区选择',
          position:true,
      },
        keymap: [], //首字母
        citystair1:[], //城市列表一级
        citystair2:[], //城市列表二级
        citystair3:[], //城市列表三级
        thisCity:'',  //当前选中的一级城市
        stair2Show:false, //二级显示
        stair3Show:false, //三级显示
        allSelectText:'多选', //多选按钮文字
        selectShow:false, //单选多选切换
        radioToggle:false, //多选城市按钮切换
        hotList:[
          ['全国','北京','上海','广州','深圳','杭州'],
          ['南京','天津','重庆','苏州','长沙','哈尔滨']
        ],  //热门城市，固定值
      }
    },
    computed:{
      ...mapState(['historyCity'])
    },
    components:{
      TitleHead
    },
    async asyncData(){
      // 当期定位城市获取
      let params = { keytype:0 };
      let { data } = await historyKeyAndHotKey(params);
      return {locationCity:data};
    },
    mounted(){
      this.getCityList();
    },
    methods:{
      // 一级地区获取
      async getCityList(){
        let params = {};
        let { data } = await getprovinces(params);
        this.citystair1=data.provinces;
        this.upPerCaseFun();
      },
      // 获取到的一级地区处理
      upPerCaseFun(){
        this.citystair1.forEach((k,i)=>{
          // debugger
          let bxwName = k.bxwName.toUpperCase().slice(0,1);
          // 改变bxwName为首字母大写;
          this.$set(this.citystair1[i],'bxwName',bxwName);
          // 数组合并，去重，排序，一步到位
          this.keymap = [...new Set([...this.keymap,...bxwName])].sort();
        });
      },
      // 单选，多选切换
      allSelectFun(){
        [
          this.selectShow, //切换按钮显示
          this.radioToggle //切换时，清掉radio选中
        ] = [
          !this.selectShow,
          false
        ];
        this.allSelectText = this.selectShow ? '单选' : '多选';
      },
      // 选择城市切换
      radioFun(){
        this.radioToggle = !this.radioToggle;
      },
      // 二级地区获取
      async cityFun(code,city){
        this.stair2Show = true;
        let params = {
          province:code
        };
        this.thisCity = city;
        let { data } = await getAreaByCityCode(params)
         this.citystair2 = data.cityList
      },
      //三级地区获取
      async city3Fun(code,city){
        debugger
        this.stair3Show = true;
        let params = {
          areacode:code
        }
        let { data } = await getAreaLevel3(params)
        this.citystair3 = data
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .city-content{
    padding-top:1.8rem;
    .city-stair1{
      .mzaLocation{
        @include wh(100%,1.518rem);
        @include flexCenter;
        justify-content: flex-start;
        padding-left:.6rem;
        font-size:.495rem;
        position:relative;
        background:$fff;
        span{
          font-size: .462rem;
          color:$c999;
        }
        .allBtn{
          position:absolute;
          top:50%;
          right:.3rem;
          transform: translate(0,-50%);
          color:$f60;
        }
      }
      .mzaHistory,.mzaHot{
        background:$fff;
        p{
          @include wh(100%,1.518rem);
          @include flexCenter;
          justify-content: flex-start;
          padding-left:.6rem;
          font-size:.46rem;
        }
        .history_content,.hot_content{
          display: flex;
          span{
            flex:1;
            @include wh(auto,.99rem);
            @include flexCenter;
            margin:0 .6rem .6rem;
            border:1px solid #eee;
            border-radius: .132rem;
            color:$c999;
            font-size:.462rem;
          }
        }
        .hot_content {
          padding:0 .4rem;
          span {
            margin: 0 .1rem .5rem;
          }
        }
      }
      .mzaHot{
        margin:.66rem 0;
      }
      .mzaProvince{
        margin-bottom:1.42rem;
        .city-list{
          p{
            @include wh(100%,1.188rem);
            @include flexCenter;
            justify-content: flex-start;
            padding-left:.6rem;
            border-bottom:1px solid #e1e1e1;
            color:#9b9b9b;
            font-size:.495rem;
          }
          .city-lis{
            position: relative;
            z-index:10;
            @include wh(100%,1.518rem);
            @include flexCenter;
            justify-content: flex-start;
            padding-left:.6rem;
            background:$fff;
            border-bottom:1px solid #e1e1e1;
            span{
              flex:2;
              display: flex;
              align-items: center;
              height:1.518rem;
              font-size:.492rem;
              color:$c333;
            }
            .leftBtn{
              display: flex;
              align-items: center;
              justify-content: flex-end;
              height:1.518rem;
              flex: 1;
              padding-right: .6rem;
              b{
                @include wh(.73rem,.73rem);
                border:1px solid #ccc;
                border-radius: 50%;
                &.cur{
                  border:none;
                  background: #f60 url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/brandselect.png) center center no-repeat;
                  background-size: .429rem auto;
                }
              }
            }
            .bg{
              @include flexCenter;
              @include wh(100%,100%);
              position:absolute;
              top:0;
              left:0;
              right:0;
              bottom:0;
              z-index:20;
            }
          }
        }
      }
    }
    .city-stair3{
      .city-stair2-left{
        z-index:135;
      }
      .city-stair2-content{
        z-index:135;
      }
    }
    .city-stairTo{
      position:fixed;
      top:0;
      right:0;
      z-index: 120;
      @include wh(100%,100%);
      -webkit-transition: all .3s;
      transition: all .3s;
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
      &.cur{
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
      }
      .city-stair2-left{
        @include wh(30%,100%);
        position:fixed;
        top:1.8rem;
        left:0;
        z-index: 130;
      }
      .city-stair2-content{
        position:fixed;
        top:1.8rem;
        right:0;
        @include wh(70%,100%);
        overflow: scroll;
        background:#fff;
        box-shadow:-.2rem 0 .2rem rgba(0, 0, 0, .1);
        .city_title{
          @include wh(100%,1.5rem);
          @include flexCenter;
          span{
            flex:2;
            @include flexCenter;
            justify-content: flex-start;
            padding-left:.6rem;
            font-size:.495rem;
            font-weight: bold;
          }
          i{
            flex:1;
            @include flexCenter;
          }
        }
        .line{
          background:#f6f6f6;
          @include wh(100%,.35rem);
        }
        .title{
          background:#f6f6f6;
          @include wh(100%,1rem);
          @include flexCenter;
          justify-content: flex-start;
          padding-left:.5rem;
          color:$c999;
        }
        .all{
          height:1.518rem;
          @include flexCenter;
          justify-content: flex-start;
          padding-left:.5rem;
          font-size:.492rem;
          border-bottom:1px solid #e1e1e1
        }
      }
      .close{

      }
      ul{
        li{
          height:1.518rem;
          @include flexCenter;
          justify-content: flex-start;
          padding-left:.5rem;
          font-size:.492rem;
          border-bottom:1px solid #e1e1e1
        }
      }
    }
  }
  .city-menu{
    position:fixed;
    top:50%;
    right:0;
    transform: translate(0,-50%);
    @include wh(.66rem,auto);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    a{
      @include flexCenter;
      @include wh(.66rem,.66rem);
      font-size:.46rem;
      margin:.165rem 0;
    }
  }
  .allSelectBtn{
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    @include wh(100%,1.42rem);
    background:$f60;
    font-size:.56rem;
    color:$fff;
    @include flexCenter;
    span{
      @include wh(100%,100%);
      @include flexCenter;
      &:first-child{
        flex:1;
        background:#f5f5f5;
        color:#333;
      }
      &:last-child{
        flex:2;
      }
    }
  }
</style>
