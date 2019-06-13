<template>
  <div class="filtrate">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="cascad-menu" ref="cascadMenu">
        <scroll
          class="left-menu"
          :data="menus"
          ref="leftMenu">
          <div class="left-menu-container">
            <ul>
              <li
                class="left-item"
                ref="leftItem"
                :class="{'cur': currentIndex === index}"
                @click="selectLeft(index, $event)"
                v-for="(menu, index) in menus"
                :key="index">
                <p class="text">{{menu.name}}</p>
              </li>
            </ul>
          </div>
        </scroll>
        <scroll
          class="right-menu"
          :data="menus"
          ref="rightMenu"
          @scroll="scrollHeight"
          :listenScroll="true"
          :probeType="3">
          <div class="right-menu-container">
            <ul>
              <li class="right-item" ref="rightItem" v-for="(menu, menuIndex) in menus" :key="menuIndex">
                <router-link v-if="menu.type === 'city'" class="li" to="/city/city" tag="div">
                  <span class="left">{{menu.name}}</span>
                  <span class="right">
                    <em v-if="cityArr">{{cityArr}}</em>
                    <em v-else>不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </router-link>
                <router-link v-if="menu.type === 'brand'" class="li" to="/brand/brand" tag="div">
                  <span class="left">品牌</span>
                  <span class="right">
                    <em v-if="serialArr">{{serialArr}}</em>
                    <em v-else>不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </router-link>
                <router-link v-if="menu.type === 'price'" class="li" to="/price/price" tag="div">
                  <span class="left">价格</span>
                  <span class="right">
                    <em v-if="filtrateVal.priceInterval">{{filtrateVal.priceInterval}}万</em>
                    <em v-else>价格不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </router-link>
                <router-link v-if="menu.type === 'year'" class="li" tab="div" to="/brand/brand" tag="div">
                  <span class="left">车龄</span>
                  <span class="right">
                    <em v-if="filtrateVal.year">{{filtrateVal.year}}年</em>
                    <em v-else>车龄不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </router-link>
                <div v-if="menu.type === 'mileage'" class="box-item">
                  <div class="item-title">
                    <span class="tit">公里数</span>
                    <span class="rTxt">{{mileageText}}</span>
                  </div>

                  <VueRange
                    :dataArr="[0,2,4,6,8,10]"
                    :width="90"
                    v-if="hackReset"
                    :afterFun="mileageValFun"
                    :step="12"/>
                </div>
                <div v-if="menu.type === 'carType'" class="box-item">
                  <div class="item-title">
                    <span class="tit">类型</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="carTypeIndex === index ? 'cur' : ''"
                        @click="danSelectFun(item,index,menu.type)"
                        v-for="(item,index) in menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'carKinds'" class="box-item">
                  <div class="item-title">
                    <span class="tit">级别</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        ref="sort"
                        :class="{cur:item.cur}"
                        @click="allSelectFun(item,index,menu.type,menuIndex)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'bodType'" class="box-item">
                  <div class="item-title">
                    <span class="tit">结构</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="{cur:item.cur}"
                        @click="allSelectFun(item,index,menu.type,menuIndex)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'factory'" class="box-item">
                  <div class="item-title">
                    <span class="tit">厂商</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="{cur:item.cur}"
                        @click="allSelectFun(item,index,menu.type,menuIndex)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'standards'" class="box-item">
                  <div class="item-title">
                    <span class="tit">排放</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="{cur:item.cur}"
                        @click="allSelectFun(item,index,menu.type,menuIndex)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'gears'" class="box-item">
                  <div class="item-title">
                    <span class="tit">变速箱</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="gearsIndex === index ? 'cur' : ''"
                        @click="danSelectFun(item,index,menu.type)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'country'" class="box-item">
                  <div class="item-title">
                    <span class="tit">国别</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="countryIndex === index ? 'cur' : ''"
                        @click="danSelectFun(item,index,menu.type)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'colors'" class="box-item">
                  <div class="item-title">
                    <span class="tit">颜色</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="{cur:item.cur}"
                        @click="allSelectFun(item,index,menu.type,menuIndex)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
                <div v-if="menu.type === 'inventoryTime'" class="box-item">
                  <div class="item-title">
                    <span class="tit">库存时间</span>
                    <span class="rTxt">{{inventoryTimeText}}</span>
                  </div>
                  <VueRange
                    :dataArr="[0,10,20,30]"
                    :width="96"
                    :afterFun="inventoryTimeValFun"
                    :step="40"/>
                </div>
                <div v-if="menu.type === 'pf'" class="box-item">
                  <div class="item-title">
                    <span class="tit">批发车源</span>
                  </div>
                  <div class="carType">
                    <ul>
                      <li
                        :class="pfIndex === index ? 'cur' : ''"
                        @click="pfFun(item,index)"
                        v-for="(item,index) in  menu.data"
                        :key="index">{{item.name}}</li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </scroll>
      </div>
      <div class="footer">
        <div @click="refreshVal">重置</div>
        <div v-if="FNum > 0">查看{{FNum}}辆车源</div>
        <div v-else>暂无符合车辆</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroll from '~/components/better-scroll/scroll'
  import VueRange from '~/components/common/range/range'
  import TitleHead from '~/components/common/header/title_head'
  import { HX } from '~/config/util/pubData'
  import {filteData} from '~/config/Ajax'
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        msg: 'sellCar',
        heads:{
          title:'筛选车辆',
          position:true,
        },
        menus:HX.menus,
        rightTops: [],
        scrollY: 0,
        leftScrollY: 0,
        mileageText:'', //公里数
        mileageVal:'', //公里数
        inventoryTimeText:'', //库存数
        inventoryTimeVal:'', //库存数
        carTypeIndex:0, //类型
        carKindsArr:[], //级别数组
        bodTypeArr:[], //结构数组
        factoryArr:[], //厂商
        standardsArr:[], //排放
        gearsIndex:0, //变速箱
        countryIndex:0, //国别
        colorsArr:[], //颜色
        inventoryTimeIndex:0, //库存时间
        pfIndex:0, //批发车源
        filtrateVal:{
          areaCode:'',
          pageSize:5,
          currPage:1,
          order:'',
          priceInterval:'',
          year:'',
          serial:'',
          carType:'',
          standards:'',
          dayInterval:'',
          colors:'',
          gears:'',
          is4s:'',
          pifa:'',
          mileage:'',
          carKinds:'',
          bodType:'',
          factory:'',
          country:'',
          motor:'',
          devicetoken:'',
          newCar:'',
          appmobile:'',
          apptoken:'',
          keyword:''
        },
        FNum:'',
        hackReset:true, //重置刷新组件
      }
    },
    components: {
      TitleHead,
      Scroll,
      VueRange
    },
    computed: {
      ...mapState(['cityInfo','findCarVal']),
      // 地区
      cityArr(){
        let arr = this.cityInfo;
        let name = arr.map(i=>{
          return i.area_name
        });
        return name+'';
      },
      // 品牌
      serialArr(){
        let arr = this.findCarVal.serial.split('or');
        arr.map(i=>{
          return i.replace(/(^\s*)|(\s*$)/g, "");
        });
        if(arr.length>2){
          return (arr.splice(0,3))+'...';
        }else{
          return arr+'';
        }
      },
      // index
      currentIndex () {
        const { scrollY, rightTops } = this;
        let index = rightTops.findIndex((height, index) => {
          return scrollY >= rightTops[index] && scrollY < rightTops[index + 1]
        });
        if (scrollY > rightTops[index] + 50) {
          index++;
        }
        return index;
      }
    },
    created() {
      this.$nextTick(() => {
        this._calculateHeight()
      });
      // 获取vuex数据
      this.getFindCarVal();
    },
    mounted(){
      // 赋值到页面
      this.filtrateFun();
      // 获取车辆数
      this.getFindCarNum();
      // 为筛选按钮添加cur
      this.sortArrCur();
    },
    methods: {
      ...mapActions(['getCity','getFindCarVal']),
      refreshVal(){
        this.hackReset = false;
        this.filtrateVal = {};
        this.getFindCarNum();
        this.$nextTick(() => {
          this.hackReset = true
        })
      },
      // 为筛选按钮添加cur
      sortArrCur(){
        let arr = ['sort','structure','firm','letOut','color'];
        arr.map((k)=>{

        })
      },
      // 获取车辆数
      async getFindCarNum(){
        let { data } = await filteData(this.filtrateVal);
        this.FNum = data.danbaoTotal;
      },
      // 赋值到页面
      filtrateFun(){
        // 筛选条件赋值
        let filtrateVal = this.filtrateVal;
        filtrateVal.areaCode = this.findCarVal.areaCode;
        filtrateVal.priceInterval = this.findCarVal.priceInterval
        filtrateVal.year = this.findCarVal.year
      },
      // 接收到子组件事件执行
      mileageValFun(low,tall){
        if(low <= 0 && tall > 11){
          this.mileageText = '不限';
          this.filtrateVal.mileage = '0-100'
        }else if(low<=0 && tall <= 11){
          this.mileageText = `${tall}万公里以内`;
          this.filtrateVal.mileage = `0-${tall}`
        }else if(low > 0 && tall > 11){
          this.mileageText = `${low}万公里以上`;
          this.filtrateVal.mileage = `${low}-100`
        }else{
          this.mileageText = `${low}-${tall}万公里`;
          this.filtrateVal.mileage = `${low}-${tall}`
        }
        this.getFindCarNum();
      },
      // 库存
      inventoryTimeValFun(low,tall){
        if(low <= 0 && tall > 39){
          this.inventoryTimeText = '不限';
          this.filtrateVal.dayInterval = '0-100'
        }else if(low<=0 && tall <= 39){
          this.inventoryTimeText = `${tall}天以内`;
          this.filtrateVal.dayInterval =  `0-${tall}`
        }else if(low > 0 && tall > 39){
          this.inventoryTimeText = `${low}天以上`;
          this.filtrateVal.dayInterval = `${low}-100`
        }else{
          this.inventoryTimeText = `${low}-${tall}天`;
          this.filtrateVal.dayInterval = `${low}-${tall}`
        }
        this.getFindCarNum();
      },
      // 筛选单选
      danSelectFun(item,index,type){
        let thisIndex = `${type}Index`;
        this[thisIndex] = index;
        this.filtrateVal[type] = item.val;
        this.getFindCarNum();
      },
      // 筛选多选
      allSelectFun(item,index,type,menuIndex){
        // 获取当前点击对象的父级对象
        let data = HX.menus[menuIndex].data;
        // 保存在当前数组对象中
        let thisArr =  this[`${type}Arr`];
        // 多选保存
        if(index !== 0){
          data[0].cur = false;
          if(data[index].cur){
            this.$removeArrSame(thisArr,item.val);
          }else{
            thisArr.push(item.val);
          }
          data[index].cur = !data[index].cur;
        }else{
          // 如何点击不限
          data.map((key)=>{
            return key.cur = false
          });
          // 清空数组
          data[0].cur = true;
          thisArr = [];
        }
        this.filtrateVal[type] = thisArr+'';
        this.getFindCarNum();
      },
      // 批发车源
      pfFun(item,index){
        this.pfIndex = index;
      },

      selectLeft (index, event) {
        // console.log(index);
        if (!event._constructed) {
          return
        }
        let rightItem = this.$refs.rightItem;
        let el = rightItem[index];
        this.$refs.rightMenu.scrollToElement(el, 300)
      },
      scrollHeight (pos) {
        // console.log(pos);
        this.scrollY = Math.abs(Math.round(pos.y));
      },
      _calculateHeight() {
        let lis = this.$refs.rightItem;
        // console.log(lis)
        let height = 0;
        this.rightTops.push(height);
        Array.prototype.slice.call(lis).forEach(li => {
          height += li.clientHeight;
          this.rightTops.push(height);
        })
        // console.log(this.rightTops)
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .cascad-menu{
    display: flex;
    position: absolute;
    top: 1.8rem;
    bottom: 1.47rem;
    width: 100%;
    overflow: hidden;
    .left-menu{
      flex:0 0 30%;
      width:30%;
      background:#f6f6f6;
      .left-menu-container{
        &::-webkit-scrollbar {
        display: none;
        }
        ul{
          li{
            @include wh(100%,1.65rem);
            @include flexCenter;
            border-bottom:1px solid #e1e1e1;
            border-right:1px solid #e1e1e1;
            font-size:.49rem;
            &.cur{
              background:#fff;
              border-right: 1px solid #fff;
            }
          }
        }
      }
    }
    .right-menu{
      background:#f6f6f6;
      flex:1;
      .right-menu-container{
        &::-webkit-scrollbar {
          display: none;
        }
        ul{
          li{
            .li{
              background:$fff;
              padding:0 .5rem;
              @include wh(100%,1.65rem);
              @include flexCenter;
              border-bottom:1px solid #e1e1e1;
              & > span{
                @include wh(100%,100%);
                @include flexCenter;
                font-size:.49rem;
              }
              .left{
                flex:1;
                justify-content: flex-start;
              }
              .right{
                flex:3;
                justify-content: flex-end;
                em{
                  overflow: hidden;
                  @include flexCenter;
                  justify-content: flex-end;
                  @include wh(100%,100%);
                  line-height: .825rem;
                }
                i{
                  margin-left:.2rem;
                  color:#e1e1e1;
                }
              }
            }
            .box-item{
              background:$fff;
              padding:0 0 .6rem;
              margin-bottom:.35rem;
              .item-title{
                padding:0 .5rem;
                @include flexCenter;
                @include wh(100%,1.5rem);
                span{
                  @include wh(100,100%);
                  @include flexCenter;
                  font-size:.49rem;
                  &.tit{
                    flex:2;
                    justify-content: flex-start;
                  }
                  &.rTxt{
                    flex:3;
                    padding-right:.1rem;
                    justify-content: flex-end;
                    color:$f60;
                  }
                }
              }
              .carType{
                ul{
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  padding: 0 .5rem;
                  li{
                    box-sizing: border-box;
                    margin:.34rem 0;
                    @include flexCenter;
                    @include wh(29%,1.06rem);
                    border:1px solid #eee;
                    @include borRadius(.1rem);
                    font-size:.45rem;
                    &:last-child{border:none;}
                    &.cur{
                      border:1px solid $f60;
                      color:#ff6600;
                      background:#fff1e7;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    @include wh(100%,1.47rem);
    @include flexCenter;
    background:#fff;
    & > div{
      flex: 0 0 30%;
      @include flexCenter;
      font-size:.5rem;
      @include wh(100%,100%);
      &:last-child{
        flex:1;
        background:linear-gradient(to right, #ff9900, #ff6600);
        background:-webkit-linear-gradient(to right, #ff9900, #ff6600);
        color:#ffffff;

      }
    }
  }
</style>

