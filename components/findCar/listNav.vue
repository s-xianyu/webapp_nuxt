<template>
  <div>
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
    <!--<div class="subscription" v-if="subscriptionArr.length > 0">-->
      <!--<div class="subLeft">-->
        <!--<span class="subBtn"><i class="iconfont icon-xinhao"></i>订阅</span>-->
        <!--<span @click="allremoveSome"><i class="iconfont icon-shanchu1"></i></span>-->
      <!--</div>-->
      <!--<div class="subRight">-->
        <!--<div class="right-w">-->
          <!--<div class="right-s" :style="{width:subscriptionWidth+'px'}">-->
            <!--<div class="subLi"-->
                 <!--v-for="(item,index) in subscriptionArr"-->
                 <!--ref="subScr"-->
                 <!--@click="removeSome(item,index)">-->
              <!--<span :data-type="item.type" v-if="item.type === 'year'">{{item.key}}年</span>-->
              <!--<span :data-type="item.type" v-else-if="item.type === 'priceInterval'">{{item.key}}万</span>-->
              <!--<span :data-type="item.type" v-else-if="item.type === 'mileage'">{{item.key}}万公里</span>-->
              <!--<span :data-type="item.type" v-else>{{item.key}}</span>-->
              <!--<i class="iconfont icon-cha"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import { HX } from '~/config/util/pubData'
  import {mapState,mapMutations,mapActions} from 'vuex'
  import {removeStore} from '~/config/util/util'
  export default {
    data() {
      return {
        nav:['排序','品牌','价格','车龄','筛选'], //导航列表
        menu:[
          {name:'新车 ',id:'1',type:'newCar'},
          {name:'4s维保',id:'4s',type:'is4s'},
          {name:'批发',id:'1',type:'pifa'},
        ],
        orderArr:HX.orderArr,
        priceArr: HX.priceArr,
        ageArr: HX.ageArr,
        menuIndex:-1,  //新车、4s、批发车下标
        navIndex:-1, //当前点击导航下标,默认-1. -->重要值。
        navShow:false, //排序弹框
        priceLow:'', //输入金额低价
        priceTall:'', //输入金额高价
        ageLow:'',  //输入年限低
        ageTall:'',  //输入年限高
        subscriptionArr:[], //筛选后的数组表
        subscriptionWidth:1000,
        removeSubArr:{ //删除筛选传值
          type:'',
          key:null,
        }
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
      this._getFindCarVal();
      // 赋值到页面上渲染
      this.assignmentNav();
    },
    mounted(){
      this.subRightWidth();
    },
    watch:{
      nav(){
        this.assignmentFiltrate();
      }
    },
    methods:{
      ...mapMutations(['FINDCARVAL_NAV','FINDCARVAL_MENU','WIN_HEIGHT','FINDCARVAL_REMOVE']),
      ...mapActions(['_getFindCarVal']),

      //渲染导航条数据
      assignmentNav(){
        let findCarVal = this.findCarVal;
        //排序
        let getOrder = this.orderArr.filter(key=>{
          if(key.id === findCarVal.order && key.id !== ''){
            return key.name
          }
        });

        //金额
        let getPrice =
          findCarVal.priceInterval === '' ? '价格' : `${findCarVal.priceInterval}万`;

        //年龄
        let getPYear =
          findCarVal.year === '' ? '车龄' : `${findCarVal.year}年`;

        // 品牌
        let getSerial = findCarVal.serial === '' ? '品牌' : findCarVal.serial;

        // 从vux里获取值赋值到导航列表
        let newNavArr = [
          getOrder.length > 0 ? getOrder[0].name :  '排序',
          getSerial,
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
      //渲染筛选数据
      assignmentFiltrate(){
        this.subscriptionArr = [];
        // 需要添加的数据type（单）
        let listArrOdd = ['keyword','year','priceInterval','carType','dayInterval','gears','country','motor'];
        let listArrEven = ['carKinds','bodType','factory','standards','colors'];
        let findCarVal = this.findCarVal;
        let serial = findCarVal.serial;
        let sybArr = {};
        // 品牌
        if(serial !== ''){
          let arr  = serial.split('or');
          let serialArr = arr.map(k=>{
            return k.replace(/(^\s*)|(\s*$)/g, "");
          });
          serialArr.forEach(k=>{
            sybArr = {
              type:'removeSerial',
              key:k
            };
            this.subscriptionArr.push(sybArr);
          });
        }

        for(let i in findCarVal){
          // 单
          if(listArrOdd.includes(i)){
            if(findCarVal[i] !== '' && findCarVal[i] !== undefined){
              this.pubData(i,findCarVal[i]);
            }
          }
          // 双
          if(listArrEven.includes(i)) {
            if(findCarVal[i] !== '' && findCarVal[i] !== undefined) {
              let idArr = findCarVal[i].split(',');
              idArr.forEach(j => {
                this.pubData(i,j);
              })
            }
          }
        }

        this.subRightWidth();
      },
      pubData(type,key){
        let data = HX.menus;
        let sbyArr = {
          type:type,
          key:''
        };
        data.map(i=>{
          if(i.type === type){
            i.data.forEach(j=>{
              if(j.val === key){
                sbyArr.key = j.name;
              }
            });
          }
        });
        this.subscriptionArr.push(sbyArr);
      },
      // 筛选宽度设置
      subRightWidth(){
        setTimeout(()=>{
          let s = this.$refs.subScr;
          if(s){
            if(s.length < 5){
              this.subscriptionWidth = 40 * s.length;
            }else{
              this.subscriptionWidth = 25 * s.length;
            }
            s.forEach(k=>{
              this.subscriptionWidth+=k.offsetWidth;
            });
          }
        },50)
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
        let defaultName = name === '默认排序' ? '排序' : name;
        this.nav.splice(this.navIndex,1,defaultName);
      },
      arrSpliceId(item){
        // let text = item.id === ' ' ? '不限' : this.navIndex === 2 ? '万' : '年';
        let text = '';
        if(item.id === '' && this.navIndex === 2){
          text = '价格'
        }else if(item.id === '' && this.navIndex === 3){
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
        this.$parent.doParent()
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
      },
      // 筛选单个删除
      removeSome(item,index){
        // 获取type
        let type = item.type;
        // 获取参数信息
        let findCarVal = this.findCarVal;
        if(type === 'removeSerial'){ //品牌
          let serial = findCarVal.serial,
            arr = serial.split('or'),
            key = arr.map( l =>{
              return l.replace(/(^\s*)|(\s*$)/g, "");
            });
          for(let i in key){
            if(item.id === key[i]){
              key.splice(i,1);
            }
          }
          this.removeSubArr.key = key.length > 1 ? (key+'').replace(/,/g,' or ') : key+'';
          this.removeSubArr.type = type;
        }else if(type === 'year' || type === 'priceInterval'){
          this.removeSubArr.key = '';
          this.removeSubArr.type = type;
        }
        // 赋值到vuex,更新页面,重新请求数据
        this.FINDCARVAL_NAV(this.removeSubArr);
        // 更新视图
        this.upDataView();
      },
      // 筛选全部删除
      allremoveSome(){
        this.FINDCARVAL_REMOVE();
        this.upDataView();
      },
      upDataView(){
        this.assignmentFiltrate();
        this.assignmentNav();
        this.$parent.doParent();
      }
    },
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .fixeds{
    .listNav{
      @include wh(12.42rem,auto);
      position:fixed;
      top:0;
      left:0;
      right:0;
      z-index: 100;
    }
    .subscription{
      margin-top:3rem;
    }
  }
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
  .subscription{
    background-color: #f6f6f6;
    position:relative;
    @include flexCenter;
    @include wh(100%,1.5rem);
    flex-direction: row;
    .subLeft{
      position:absolute;
      top:0;
      left:0;
      @include wh(40%,100%);
      @include flexCenter;
      z-index:11;
      .subBtn{
        @include flexCenter;
        @include wh(2rem,.6rem);
        @include borRadius(.3rem);
        background:$f60;
        color:$fff;
        font-size:.4rem;
        margin-right:.5rem;
        i{
          font-size:.1rem;
        }
      }
    }
    .subRight{
      padding-left:35%;
      position:relative;
      @include wh(100%,1.5rem);
      @include flexCenter;
      .right-w{
        width: 100%;
        height: 100%;
        overflow-x: scroll;
        .right-s{
         @include wh(100%,1.5rem);
          @include flexCenter;
          overflow: hidden;
          flex-wrap: nowrap;
        }
        .subLi{
          min-width: 2rem;
          @include flexCenter;
          padding:.1rem .2rem;
          border: 1px solid #eaeaea;
          background:$fff;
          margin:0 .2rem;
          span{
            display: inline-block;
            padding:0 .2rem;
          }
          i{
            font-size:.3rem;
            color:#837979;
          }
        }
      }
    }
  }
</style>
