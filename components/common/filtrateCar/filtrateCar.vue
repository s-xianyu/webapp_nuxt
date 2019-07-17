<template>
  <div class="filtrate" :class="{cur:filtrateStatus}">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"/>
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
                <div v-if="menu.type === 'city'" class="li" @click="getCity">
                  <span class="left">{{menu.name}}</span>
                  <span class="right">
                    <em v-if="thisCity">{{thisCity}}</em>
                    <em v-else>不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </div>
                <div v-if="menu.type === 'serial'" class="li" @click="getBrand">
                  <span class="left">品牌</span>
                  <span class="right">
                    <em v-if="serialArr">{{serialArr}}</em>
                    <em v-else>不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </div>
                <div @click="getPopup(menu.type)" v-if="menu.type === 'priceInterval'" class="li">
                  <span class="left">价格</span>
                  <span class="right">
                    <em v-if="filtrateVal.priceInterval">{{filtrateVal.priceInterval}}万</em>
                    <em v-else>价格不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </div>
                <div  @click="getPopup(menu.type)" v-if="menu.type === 'year'" class="li">
                  <span class="left">车龄</span>
                  <span class="right">
                    <em v-if="filtrateVal.year">{{filtrateVal.year}}年</em>
                    <em v-else>车龄不限</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
                </div>
                <div v-if="menu.type === 'mileage'" class="box-item">
                  <div class="item-title">
                    <span class="tit">公里数</span>
                    <span class="rTxt">{{mileageVal}}</span>
                  </div>

                  <VueRange
                    v-if="hackReset"
                    :dataArr="[0,2,4,6,8,10]"
                    :width="90"
                    :XY="filtrateVal.mileage"
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
                    <span class="rTxt">{{inventoryTimeVal}}</span>
                  </div>
                  <VueRange
                    v-if="hackReset"
                    :XY="filtrateVal.dayInterval"
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
        <div @click="refreshCar">重置</div>
        <div v-if="FNum > 0" @click="lookCar">查看{{FNum}}辆车源</div>
        <div v-else>暂无符合车辆</div>
      </div>
      <!--价格、车龄弹框-->
      <Price/>
      <Year/>
    </div>
  </div>
</template>

<script>
  import Scroll from '~/components/better-scroll/scroll'
  import VueRange from '~/components/common/range/range'
  import TitleHead from '~/components/common/header/title_head'
  import Price from '~/components/common/price/price'
  import Year from '~/components/common/year/year'
  import { HX } from '~/config/util/pubData'
  import {filteData} from '~/config/Ajax'
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        msg: 'sellCar',
        heads:{
          title:'筛选车辆',
          position:true,
          history:false,
          name:'filtrate'
        },
        menus:HX.menus,
        rightTops: [],
        scrollY: 0,
        leftScrollY: 0,
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
      VueRange,
      Price,
      Year
    },
    computed: {
      ...mapState(['thisCity','findCarVal','filtrateStatus']),
      mileageVal(){
        let value = this.filtrateVal.mileage.split('-');
        if(value[0]){
          let m =value[0],l=value[1];
          if(m <= 0 && l > 11 || value === ''){
            return '不限';
          }else if(m <= 0 && l <= 11){
            return `${l}万公里以内`
          }else if(m > 0 && l > 11){
            return `${m}万公里以上`
          }else{
            return `${m}-${l}万公里`
          }
        }else{
          return '不限'
        }
      },
      inventoryTimeVal(){
        let value = this.filtrateVal.dayInterval.split('-');
        if(value[0]){
          let m =value[0],l=value[1];
          if(m <= 0 && l > 39){
            return '不限';
          }else if(m <= 0 && l <= 39){
            return `${l}天以内`
          }else if(m > 0 && l > 39){
            return `${m}天以上`
          }else{
            return `${m}-${l}天`
          }
        }else{
          return '不限'
        }
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
      this._getFindCarVal();
      // 获取地区信息
      this._getCity();
    },
    mounted(){
    

    },
    watch:{
      filtrateStatus(){
        if(this.filtrateStatus){
          // 赋值到页面
          this.filtrateFun();
          // 获取车辆数
          this.getFindCarNum();
        }
      }
    },
    methods: {
      ...mapActions(['_getCity','_getFindCarVal']),
      ...mapMutations(['ALL_STATUS','FINDCARVAL_NAV','FINDCARVAL_ADD']),
      backGo(){
        this.ALL_STATUS('filtrate')
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
        // 地区
        filtrateVal.areaCode = this.findCarVal.areaCode;
        // 品牌
        filtrateVal.serial = this.findCarVal.serial;

      },
      allMileageInventory(type,low,tall,num){
        let values = '';
        if(low <= 0 && tall > num-1){
          values = ''
        }else if(low<=0 && tall <= num-1){
          values = `0-${tall}`
        }else if(low > 0 && tall > num-1){
          values = `${low}-100`
        }else{
          values = `${low}-${tall}`
        }
        this.filtrateVal[type] = values;
        this.getFindCarNum();
      },
      // 接收到子组件事件执行
      mileageValFun(low,tall){
        this.allMileageInventory('mileage',low,tall,12);
      },
      // 库存
      inventoryTimeValFun(low,tall){
        this.allMileageInventory('dayInterval',low,tall,40);
      },
      // 筛选单选
      danSelectFun(item,index,type){
        let values = '';
        let thisIndex = `${type}Index`;
        this[thisIndex] = index;
        values = item.val;
        this.filtrateVal[type] = values;
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
          // 如果点击不限
          data.map((key)=>{ return key.cur = false });
          // 清空数组
          data[0].cur = true;
          thisArr = [];
          this[`${type}Arr`] = [];
        }
        let values = thisArr+'';
        this.filtrateVal[type] = values;
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
      // 获取价格、车龄弹框
      getPopup(type){
        this.ALL_STATUS(type)
      },
      // 价格、车龄回调
      doPriceYear(val){
        this.filtrateVal[val.type] = val.key;
        this.getFindCarNum();
      },
      refreshCar(){
        // 刷新滑块组件
        this.hackReset = false;
        this.$nextTick(()=>{
          this.hackReset = true;
          this.mileageText = this.inventoryTimeText = '不限';
        });
        // 清除筛选值
        this.getFindCarNum();

        // 设置选中状态（单选）
        this.carTypeIndex = this.gearsIndex = this.countryIndex = this.inventoryTimeIndex = 0;
        // 设置选中状态（多选）
        this.bodTypeArr = [];
        this.menus.map((item,index)=>{
          if(item.data.length > 0){
            item.data.forEach(key=>{
              if(key.name === '不限'){
                return key.cur = true;
              }else{
                return key.cur = false;
              }
            });
          }
        })
      },
      lookCar(){
        // 重新获取一下
        this.filtrateVal.serial = this.findCarVal.serial;
        let arr = this.filtrateVal;
        // for(let i in arr){
        //   let values = {
        //     type:i,
        //     key:arr[i]
        //   };
        //   this.FINDCARVAL_NAV(values);
        // };
        this.FINDCARVAL_ADD(this.filtrateVal);
        // 执行关闭
        this.ALL_STATUS('filtrate');
        // 更新子组件
        this.$parent.doParent();
      },
      getCity(){
        this.ALL_STATUS('city');
      },
      getBrand(){
        this.ALL_STATUS('brand');
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .filtrate{
    z-index: 999;
    position: fixed;
    overflow-y: scroll;
    @include wh(100%,100%);
    background-color: #fff;
    left: 0;
    top: 0;
    -webkit-transition: all .3s;
    transition: all .3s;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    &.cur{
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
  }
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
            /*&:last-child{*/
              /*.box-item{*/
                /*padding-bottom:15rem;*/
              /*}*/
            /*}*/
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

