<template>
  <div class="listNav">
    <div class="listNav-head">
      <ul>
        <li
          :class="navIndex === index ? 'cur' : ''"
          v-for="(item,index) in nav"
          :key="index"
          @click="navToggle(index)">
          <span>{{item}}</span>
          <i class="iconfont icon-xiasanjiao1"></i>
        </li>
      </ul>
    </div>
    <!--新车、4s、批发-->
    <div class="listNav-menu">
      <span
        @click="menuFun(item,index)"
        :class="menuIndex === index ? 'cur' : ''"
        v-for="(item,index) in menu">{{item.name}}</span>
    </div>
    <div class="listNav-layer mPublicBox" v-show="navShow">
      <div class="bg" @click="popupHide"></div>
      <div class="listNav-layer-content mPublicBox-bac" :data-type="navIndex">
        <!--排序-->
        <ul v-if="navIndex === 0" class="order">
          <li
            v-for="item in orderArr"
            :class="item.name === nav[navIndex] ? 'cur' : ''"
            @click="orderFun(item)">
            <span>{{item.name}}</span>
            <i v-if="item === nav[navIndex]" class="iconfont icon-gou1"></i>
          </li>
        </ul>
        <!--价格-->
        <div v-if="navIndex === 2"  class="price">
          <h2>自定义价格(万元)</h2>
          <div class="priceInput">
            <input type="number" placeholder="最低价" v-model="priceLow">
            <span>到</span>
            <input type="number" placeholder="最高价" v-model="priceTall">
            <button @click="commitBtnFun('price')">确认</button>
          </div>
          <div class="line"></div>
          <div class="priceLi">
            <span
              v-for="item in priceArr"
              :class="item.id+'万' === nav[navIndex] ? 'cur' : ''"
              @click="priceFun(item)">{{item.name}}</span>
          </div>
        </div>
        <!--车龄-->
        <div v-if="navIndex === 3"  class="price">
          <h2>自定义车龄</h2>
          <div class="priceInput">
            <input type="number" placeholder="请输入" v-model="ageLow">
            <span>到</span>
            <input type="number" placeholder="请输入" v-model="ageTall">
            <button @click="commitBtnFun('year')">确认</button>
          </div>
          <div class="line"></div>
          <div class="priceLi">
            <span
              v-for="item in ageArr"
              :class="item.id+'年' === nav[navIndex] ? 'cur' : ''"
              :data-id="item.id"
              @click="ageFun(item)">{{item.name}}</span>
            <span class="default"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {removeStore} from '~/config/util/util'
  export default {
    data() {
      return {
        nav:[
          {name:'排序',id:' ',type:'order'},
          {name:'品牌',id:' ',type:'serial'},
          {name:'价格',id:' ',type:'priceInterval'},
          {name:'车龄',id:' ',type:'year'},
          {name:'筛选',id:' ',type:'filtrate'},
        ], //导航列表
        menu:[
          {name:'新车 ',id:'1',type:'newCar'},
          {name:'4s维保',id:'4s',type:'is4s'},
          {name:'批发',id:'1',type:'pifa'},
        ],
        orderArr:[
          {name:'默认排序',id:' ',type:'order'},
          {name:'最近更新',id:'0',type:'order'},
          {name:'信誉最高',id:'1',type:'order'},
          {name:'信誉最低',id:'2',type:'order'},
          {name:'价格最高',id:'5',type:'order'},
          {name:'价格最低',id:'6',type:'order'},
          {name:'车龄最高',id:'7',type:'order'},
          {name:'车龄最低',id:'8',type:'order'},
          {name:'性价比最高',id:'3',type:'order'},
        ],
        priceArr: [
          {name:'价格不限',id:' ',type:'priceInterval'},
          {name:'3万元以下',id:'0-3',type:'priceInterval'},
          {name:'3-5万',id:'3-5',type:'priceInterval'},
          {name:'5-10万',id:'5-10',type:'priceInterval'},
          {name:'10-15万',id:'10-15',type:'priceInterval'},
          {name:'15-20万',id:'15-20',type:'priceInterval'},
          {name:'20-50万',id:'20-50',type:'priceInterval'},
          {name:'50-100万',id:'50-100',type:'priceInterval'},
          {name:'100万以上',id:'100-10000',type:'priceInterval'},
        ],
        ageArr: [
          {name:`不限车龄`,id:' ',type:'year'},
          {name:`${this.$getYear(1)}年以内`,id:'0-1',type:'year'},
          {name:`${this.$getYear(2)}年以内`,id:'0-2',type:'year'},
          {name:`${this.$getYear(3)}年以内`,id:'0-3',type:'year'},
          {name:`${this.$getYear(4)}年以内`,id:'0-4',type:'year'},
          {name:`${this.$getYear(5)}年以内`,id:'0-5',type:'year'},
          {name:`${this.$getYear(3)}-${this.$getYear(1)}年`,id:'1-3',type:'year'},
          {name:`${this.$getYear(5)}-${this.$getYear(3)}年`,id:'3-4',type:'year'},
          {name:`${this.$getYear(8)}-${this.$getYear(5)}年`,id:'5-8',type:'year'},
          {name:`${this.$getYear(10)}-${this.$getYear(8)}年`,id:'8-10',type:'year'},
          {name:`${this.$getYear(10)}年以前`,id:'10-100',type:'year'}
        ],
        menuIndex:-1,  //新车、4s、批发车下标
        navIndex:-1, //当前点击导航下标,默认-1. -->重要值。
        navShow:false, //排序弹框
        priceLow:'', //输入金额低价
        priceTall:'', //输入金额高价
        ageLow:'',  //输入年限低
        ageTall:'',  //输入年限高
      }
    },
    computed:{
      ...mapState([
        'isLogin',
        'userInfo',
        'findCarVal'
      ])
    },
    created(){
      //获取到storage
      this.getFindCarVal();
      // 赋值到页面数据上
      this.assignmentPage();
    },
    mounted(){
      console.log(this.navIndex);
    },
    methods:{
      ...mapMutations(['FINDCARVAL_NAV','FINDCARVAL_MENU','WIN_HEIGHT']),
      ...mapActions(['getFindCarVal']),
      assignmentPage(){
        let findCarVal = this.findCarVal;
        //排序
        let getOrder = this.orderArr.filter(key=>{
          if(key.id === findCarVal.order){
            return key.name
          }
        });

        //金额
        let getPrice =
          findCarVal.priceInterval === ' ' ? '价格' :
          findCarVal.priceInterval === '' ? '价格' : `${findCarVal.priceInterval}万`;

        //年龄
        let getPYear =
          findCarVal.year === ' ' ? '车龄' :
          findCarVal.year === '' ? '车龄' : `${findCarVal.year}年`;
        // 从vux里获取值赋值到导航列表
        let newNavArr = [
          getOrder.length >= 1 ? getOrder[0].name :  '排序',
          '品牌',
          getPrice,
          getPYear,
          '筛选'
        ];
        //赋值给nav
        this.nav = newNavArr;

        // 获取数据改变menu样式
        if(findCarVal.newCar === '1'){
          this.menuIndex = 0;
        }else if(findCarVal.is4s === '4s'){
          this.menuIndex = 1;
        }else if(findCarVal.pifa === '1'){
          this.menuIndex = 2;
        }else{
          this.menuIndex = -1;
        }
      },
      //列表导航切換
      navToggle(index){
        if(this.navIndex === index){
          [this.navShow,this.navIndex] = [!this.navShow, -1];
          this.WIN_HEIGHT(false)
        }else{
          [this.navShow, this.navIndex] = [true,index];
          this.WIN_HEIGHT(true)
        }
        //当前导航下标
        // debugger
        if(index === 0 || index === 2 || index === 3){  //下标为0、2、3弹框显示
        }else if(index === 1){  //为1跳转到品牌选择页
          this.navShow = false;
          this.$router.push({
            path:'/brand/brand'
          })

        }else{ //否则为4跳转到筛选页
          this.navShow = false;
          this.$router.push({
            path:'/filtrateCar/filtrateCar'
          })
        }
      },
      //输入确认按钮
      commitBtnFun(name){
        debugger
        //金额返回true,否则false
        let isPrice = name === 'price' ? true : false;
        // 如果提交不为空或者low小与tall则为真
        if(this.priceLow != '' && this.priceTall != '' && +this.priceLow < +this.priceTall ||
          this.ageLow != '' && this.ageTall != '' && +this.ageLow < +this.ageTall){
          let val = {};
          if(isPrice){
            val = {
              id:`${this.priceLow}-${this.priceTall}`,
              name:'自定义',
              type:'priceInterval'
            }
          }else{
            val = {
              id:`${this.ageLow}-${this.ageTall}`,
              name:'自定义',
              type:'year'
            }
          }
          //提交数组所需要的值
          this.arrSpliceId(val)
        }else{
          let alertText = isPrice ? '价格' : '车龄';
          Toast(`请您输入正确的${alertText}区间`)
        }
      },
      //排序列表 ''为默认排序
      // 根据下标传值；如，点击下标为2，传值为1
      //   k:下标
      //   v:传值
      orderFun(item){
        this.arrSpliceName(item.name);
        this.findCarPushVuexNav(item);
        this.popupHide();
      },
      // 价格列表
      priceFun(item){
        this.arrSpliceId(item);
      },
      // 车龄列表
      ageFun(item){
        this.arrSpliceId(item);
      },
      //关闭导航弹框
      popupHide(){
        this.navShow = !this.navShow;
        this.WIN_HEIGHT(false);
        this.navIndex= -1
      },
      // 点击后导航表数据改变
      arrSpliceName(name){
        //将值赋值到nav数组里
        this.nav.splice(this.navIndex,1,name);
      },
      arrSpliceId(item){
        // let text = item.id === ' ' ? '不限' : this.navIndex === 2 ? '万' : '年';
        let text = '';
        if(item.id === ' ' && this.navIndex === 2){
          text = '价格'
        }else if(item.id === ' ' && this.navIndex === 3){
          text = '车龄'
        }else{
          text = this.navIndex === 2 ? '万' : '年'
        }
        this.nav.splice(this.navIndex,1,item.id+text);
        this.findCarPushVuexNav(item);
        this.popupHide();
      },
      menuFun(item,index){
        if(item.type === 'pifa'){ //批发车辆
          if(this.isLogin){ //登录状态
            if(this.userInfo.vipState === 1){ //是否vip
              this.findCarPushVuexMenu(item)
            }else{ //否则跳会员购买页面
              let type = '110';
              this.$router.push({
                path:`/weppersonalvipbuy/${type}`
              })
            }
          }else{
            this.WIN_HEIGHT(true);
          }

        }else{ //否则
          this.findCarPushVuexMenu(item,index)
        }
      },
      // nav添加数据到vuex
      findCarPushVuexNav(item){
        let val = {
          type:item.type,
          key:item.id
        };
        this.FINDCARVAL_NAV(val);
        this.$parent.doParent(this.desc)
      },
      // menu添加数据到vuex
      findCarPushVuexMenu(item,index){
        let isKey = '';
        if(this.menuIndex === index){
          this.menuIndex = -1;
          isKey = ''
        }else{
          this.menuIndex = index;
          isKey = item.id;
        }
        let val = {
          type:item.type,
          key:isKey
        };
        this.FINDCARVAL_MENU(val);
        this.$parent.doParent()
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
.mPublicBox{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  .bg{
    background: rgba(0,0,0,.5);
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index: 10;
  }
  .mPublicBox-bac{
    position:absolute;
    top:1.21rem;
    left:0;
    right:0;
    z-index:12;
    background:$fff;
  }
}
  .listNav{
    position:relative;
    background:#fff;
    .listNav-head{
      background:$fff;
      position: relative;
      z-index: 11;
      ul{
        @include wh(100%,1.53rem);
        @include flexCenter;
        flex-direction: row;
        padding:  0 .3rem;
        li{
          @include flexCenter;
          flex:1;
          width:20%;
          &.cur{
            span,i{
              color:$f60;
            }
          }
          span{
            display: inline-block;
            max-width: 80%;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-size:.48rem;
            color:$c666;
          }
          i{
            font-size:.5rem;
            color:$c666;
          }
        }
      }
    }
    .listNav-menu{
      background:#fff;
      @include wh(100,auto);
      padding: .2rem 0 .44rem;
      display: flex;
      justify-content: space-evenly;
      span{
        @include wh(3.06rem,.82rem);
        background:#f0f2f6;
        @include flexCenter;
        font-size: .42rem;
        color:$c666;
        &.cur{
          color: #f60;
          background: #fbece8;
          border: 1px solid #f60;
        }
      }
    }
    .listNav-layer{
      @extend .mPublicBox;
      .listNav-layer-content{
        .order{
          li{
            padding:0 .48rem;
            border-top:1px solid #e1e1e1;
            @include wh(100%,1.34rem);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size:.45rem;
            &.cur{
              span{
                color:$f60;
              }
            }
            i{
              color:$f60;
              font-size:.42rem;
            }
          }
        }
        .price{
          h2{
            padding:0 .48rem;
            @include wh(100%,1.84rem);
            @include flexCenter;
            justify-content: flex-start;
            font-size:.45rem;
          }
          .priceInput{
            padding:0 .48rem .4rem;
            @include flexCenter;
            justify-content: space-between;
            input{
              @include wh(2.5rem,1.08rem);
              border:1px solid #e9e9e9;
              @include flexCenter;
              text-align: center;
              @include borRadius(.1rem);
            }
            button{
              @include wh(2.5rem,1.08rem);
              border:1px solid #ff9483;
              color:$f60;
              background-color:#fff1e7;
              @include borRadius(.1rem);
            }
          }
          .line{
            height:.3rem;
            background:#f6f6f6;
          }
          .priceLi{
            padding:.5rem .48rem;
            @include wh(100%,auto);
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            span{
              @include borRadius(.1rem);
              margin:.25rem 0;
              @include flexCenter;
              @include wh(2.5rem,1.08rem);
              border:1px solid #e9e9e9;
              &.default{
                border:none;
              }
              &.cur{
                border:1px solid #ff9483;
                background-color:#fff1e7;
                color:$f60;
              }
            }
          }
        }
      }
    }
  }
</style>
