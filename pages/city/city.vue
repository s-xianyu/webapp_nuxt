<template>
  <div class="body">
    <TitleHead :heads="heads"></TitleHead>
    <div class="city">
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
          <div class="city-lis" v-if="upper === item.bxwName" v-for="item in cityList" :key="item.area_code">
            <span>{{item.area_name}}</span>
            <div class="leftBtn">
              <u class="animated fadeInRight"></u>
              <b class="animated fadeInRight" @click="radioFun" :class="{cur:radioToggle}" v-if="selectShow"></b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="city-menu">
      <a v-for="item in keymap">{{item}}</a>
    </div>
    <div v-if="selectShow" class="allSelectBtn animated fadeInUp">选好了</div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import { historyKeyAndHotKey,getprovinces} from '~/config/getData'
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
        cityList:[], //城市列表
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
        this.cityList=data.provinces;
        this.upPerCaseFun();
      },
      // 获取到的一级地区处理
      upPerCaseFun(){
        this.cityList.forEach((k,i)=>{
          // debugger
          let bxwName = k.bxwName.toUpperCase().slice(0,1);
          // 改变bxwName为首字母大写;
          this.$set(this.cityList[i],'bxwName',bxwName);
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
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .city{
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
  }
</style>
