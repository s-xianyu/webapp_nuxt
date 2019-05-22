<template>
  <div class="city">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="city-content">
        <div class="city-stair1">
          <div class="mzaLocation">
            <i class="iconfont icon-dingwei"></i>您所在的城市：
            <span>{{locationCity.hotKeys[1]}}</span>
            <div class="allBtn" @click="allSelectFun">我要{{allSelectText}}</div>
          </div>
          <div class="mzaHistory" v-if="historyCity.length > 0">
            <p>历史记录：</p>
            <div class="history_content">
              <span @click="historyCityFun(item)" v-for="item in historyCity" :key="item.erea_code">{{item.area_name}}</span>
            </div>
          </div>
          <div class="mzaHot" v-if="hotList.length > 0">
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
                v-for="item in cityStair1"
                :key="item.area_code">
                <span @click="cityFun(item.area_code,item.area_name)">{{item.area_name}}</span>
                <div class="leftBtn" v-show="selectShow">
                  <b class="animated fadeInRight"></b>
                </div>
                <u v-show="selectShow" @click="radioFun($event,item)" class="bg"></u>
              </div>
            </div>
          </div>
        </div>
        <div class="city-stairTo city-stair2" :class="{cur:stair2Show}">
          <div class="city-stair2-left" @click="stair2Show = !stair2Show"></div>
          <div class="city-stair2-content">
            <div class="city_title">
              <span>{{province.area_name}}</span>
              <i  @click="stair2Show = !stair2Show" class="close iconfont icon-close"></i>
            </div>
            <div class="line"></div>
            <div @click="unlimitedCity" class="all">不限</div>
            <ul>
              <li
                @click="city3Fun(item.area_code,item.area_name)"
                v-for="item in cityStair2"
                :key="item.area_code">{{item.area_name}}</li>
            </ul>
          </div>
        </div>
        <div class="city-stairTo city-stair3" :class="{cur:stair3Show}">
          <div class="city-stair2-left" @click="stair3Show = !stair3Show"></div>
          <div class="city-stair2-content">
            <div class="city_title">
              <span @click="unlimitedCounty">{{city.area_name}}</span>
              <i  @click="stair3Show = !stair3Show" class="close iconfont icon-close"></i>
            </div>
            <div class="line"></div>
            <div @click="unlimitedCounty" class="all">不限</div>
            <div class="title" v-if="cityStair3.motorList">二手车交易市场</div>
            <ul>
              <li
                @click="city4Fun(item.id)"
                v-for="item in cityStair3.motorList"
                :key="item.area_code">{{item.cityName}}</li>
            </ul>
            <div class="title" v-if="cityStair3.areas">市辖区|县</div>
            <ul>
              <li
                @click="city4Fun(item.id)"
                v-for="item in cityStair3.areas"
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
        <span @click="allSelectFun">取消</span>
        <span @click="allSelectOn">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import TitleHead from '~/components/common/header/title_head'
  import { historyKeyAndHotKey,getprovinces,getAreaByCityCode,getAreaLevel3} from '~/config/getData'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    data() {
      return {
        msg: 'city',
        heads:{
          title:'地区选择',
          position:true,
      },
        keymap: [], //首字母
        province:'',  //当前选中的一级城市
        city:'', //当前选中的二级城市
        county:'', //当前选中的三级城市
        cityStair1:[], //城市列表一级
        cityStair2:[], //城市列表二级
        cityStair3:[], //城市列表三级
        stair2Show:false, //二级显示
        stair3Show:false, //三级显示
        allSelectText:'多选', //多选按钮文字
        allOption:[], //多选保存数组
        allOptionID:[], //多选ID数组
        selectShow:false, //单选多选切换
        hotList:[
          // ['全国','北京','上海','广州','深圳','杭州'],
          // ['南京','天津','重庆','苏州','长沙','哈尔滨']
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
      this.getHistoryCity();
    },
    methods:{
      ...mapActions(['getHistoryCity']),
      ...mapMutations(['CITY_SAVE','ALL_CITY']),

      // 一级地区获取
      async getCityList(){
        let params = {};
        let { data } = await getprovinces(params);
        this.cityStair1=data.provinces;
        this.upPerCaseFun();
      },

      // 获取到的一级地区处理
      upPerCaseFun(){
        this.cityStair1.forEach((k,i)=>{
          // debugger
          let bxwName = k.bxwName.toUpperCase().slice(0,1);
          // 改变bxwName为首字母大写;
          this.$set(this.cityStair1[i],'bxwName',bxwName);
          // 数组合并，去重，排序，一步到位
          this.keymap = [...new Set([...this.keymap,...bxwName])].sort();
        });
      },

      // 二级地区获取
      async cityFun(code,city){
        //获取数据
        let params = {
          province:code
        };
        let { data } = await getAreaByCityCode(params);
        this.cityStair2 = data.cityList;

        // 保存数据
        this.stair2Show = true;
        this.province = this.forOFKey(this.cityStair1,code);
      },

      //三级地区获取
      async city3Fun(code,city){
        let params = {
          areacode:code
        };
        let { data } = await getAreaLevel3(params);
        this.cityStair3 = data;

        // 保存数据
        this.stair3Show = true;
        this.city = this.forOFKey(this.cityStair2,code);
      },

      //三级地区选择
      city4Fun(code){
        //合并二手车市场和县辖区
        // let arr = [...this.cityStair3.areas,...this.cityStair3.motorList];
        //合并前判断是否为null，如果为null,则赋值为空数组
        if(!this.cityStair3.areas){
          this.$set(this.cityStair3,'areas',[]);
        }
        if(!this.cityStair3.motorList){
          this.$set(this.cityStair3,'motorList',[]);
        }
        //合并二手车市场和县辖区
        let arr = [...this.cityStair3.areas,...this.cityStair3.motorList];
        this.county = this.forOFKey2(arr,code);
        let val = [this.city,this.county];
        this.CITY_SAVE(val);
      },

      // 市级不限选择
      unlimitedCity(){
        let val = [this.province];
        this.CITY_SAVE(val);

      },
      // 县级不限选择
      unlimitedCounty(){
        let val = [this.city];
        this.CITY_SAVE(val);
      },

      //历史记录选择
      historyCityFun(item){
        this.CITY_SAVE([item]);
      },

      // 单选，多选切换
      allSelectFun(){
        [
          this.selectShow, //切换按钮显示
        ] = [
          !this.selectShow,
        ];
        this.allSelectText = this.selectShow ? '单选' : '多选';
        if(!this.selectShow){
          document.querySelectorAll('.leftBtn').forEach(key =>{
            key.classList.remove('cur');
          })
          this.allOption = [];
          this.allOptionID = [];
        }
      },

      // 多选城市
      radioFun(e,key){
        if(this.allOptionID.includes(key.area_code) || this.allOption.length >= 5){
          e.currentTarget.previousElementSibling.classList.remove('cur');
          this.removeArray(this.allOption, key.area_code);
          this.removeArray(this.allOptionID, key.area_code);
        }else{
          e.currentTarget.previousElementSibling.classList.add('cur');
          this.allOption = this.allOption.concat( key);
          this.allOptionID = this.allOptionID.concat( key.area_code);
        }
      },

      //确认多选提交
      allSelectOn(){
        this.ALL_CITY(this.allOption);
      },
      removeArray(arr,val){
        for (let i in arr) {
          if (arr[i].area_code === val) {
            //删除当前数组
            arr.splice(i, 1);
            //删除当前数组ID
            this.allOptionID.splice(i,1);
            break;
          }
        }
      },

      // 返回当前地区信息
      forOFKey(list,val){
        let arr;
        for(let key of list){
         try {
           if(+(key.area_code) === +val){
             arr = key
           }
         }catch (e) {
            arr = {};
         }
        }
        return arr;
      },

      // 返回当前地区信息2
      forOFKey2(list,val){
        let arr;
        for(let key of list){
          try {
            if(+(key.id) === +val){
              arr = key
            }
          }catch (e) {
            arr = {};
          }
        }
        return arr;
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
.city{
  background:#f6f6f6;
}
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
            @include wh(33.333%,.99rem);
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
              &.cur{
                b{
                  border:none;
                  background: #f60 url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/brandselect.png) center center no-repeat;
                  background-size: .429rem auto;
                }
              }
              b{
                @include wh(.73rem,.73rem);
                border:1px solid #ccc;
                border-radius: 50%;
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
    z-index:10;
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
