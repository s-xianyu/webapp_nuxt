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
          <i class="iconfont icon-jiantou9"></i>
        </li>
      </ul>
    </div>
    <div class="listNav-layer mPublicBox" v-show="navShow">
      <div class="bg" @click="popupHide"></div>
      <div class="listNav-layer-content mPublicBox-bac" :data-type="navIndex">
        <ul class="order" v-if="navIndex === 0">
          <li
            v-for="(item,index) in orderArr"
            :class="item === nav[navIndex] ? 'cur' : ''"
            :data-id="index"
            @click="orderFun(item,index)"
            :key="index">
            <span>{{item}}</span>
            <i v-if="item === nav[navIndex]" class="iconfont icon-gou1"></i>
          </li>
        </ul>
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
              v-for="(item,index) in priceArr"
              :class="item === nav[navIndex] ? 'cur' : ''"
              @click="priceFun(item)"
              :key="index">{{item}}</span>
          </div>
        </div>
        <div v-if="navIndex === 3"  class="price">
          <h2>自定义车龄</h2>
          <div class="priceInput">
            <input type="number" placeholder="请输入" v-model="ageLow">
            <span>到</span>
            <input type="number" placeholder="请输入" v-model="ageTall">
            <button @click="commitBtnFun('age')">确认</button>
          </div>
          <div class="line"></div>
          <div class="priceLi">
            <span
              v-for="(item,index) in ageArr"
              :class="item === nav[navIndex] ? 'cur' : ''"
              :data-id="item.id"
              @click="ageFun(item)"
              :key="index">{{item.name}}</span>
            <span class="default"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        nav:['排序','品牌','价格','车龄','筛选'], //导航列表
        orderArr:['默认排序', '最近更新', '信誉最高', '信誉最低', '价格最高', '价格最低', '车龄最高', '车龄最低','性价比最高'],
        priceArr: ['价格不限', '3万元以下', '3-5万', '5-10万', '10-15万', '15-20万', '20-50万', '50-100万', '100万以上'],
        ageArr: [
          {name:`不限车龄`,id:''},
          {name:`${this.$getYear(1)}年以内`,id:'0-1'},
          {name:`${this.$getYear(2)}年以内`,id:'0-2'},
          {name:`${this.$getYear(3)}年以内`,id:'0-3'},
          {name:`${this.$getYear(4)}年以内`,id:'0-4'},
          {name:`${this.$getYear(5)}年以内`,id:'0-5'},
          {name:`${this.$getYear(3)}-${this.$getYear(1)}年`,id:'1-3'},
          {name:`${this.$getYear(5)}-${this.$getYear(3)}年`,id:'3-4'},
          {name:`${this.$getYear(8)}-${this.$getYear(5)}年`,id:'5-8'},
          {name:`${this.$getYear(10)}-${this.$getYear(8)}年`,id:'8-10'},
          {name:`${this.$getYear(10)}年以前`,id:'10-100'}
        ],
        navIndex:-1, //当前点击导航下标,默认-1. -->重要值。
        navShow:false, //排序弹框
        priceLow:'', //输入金额低价
        priceTall:'', //输入金额高价
        ageLow:'',  //输入年限低
        ageTall:''  //输入年限高
      }
    },
    computed:{
      ...mapState([''])
    },
    mounted(){
    },
    methods:{
      ...mapMutations(['FINDCARVAL']),

      //列表导航切換
      navToggle(index){
        // this.navShow = !this.navShow;
        //当前导航下标
        [this.navIndex] = [index];
        // debugger
        if(index === 0 || index === 2 || index === 3){  //下标为0、2、3弹框显示
          this.navShow = true;
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
        //金额返回true,否则false
        let isPrice = name === 'price' ? true : false;

        if(this.priceLow != '' && this.priceTall != '' && +this.priceLow < +this.priceTall ||
          this.ageLow != '' && this.ageTall != '' && +this.ageLow < +this.ageTall){

          //提交数组所需要的值
          let text = isPrice ? `${this.priceLow}-${this.priceTall}万` : `${this.ageLow}-${this.ageTall}年`;

          this.arrSplice(text)
        }else{
          let alertText = isPrice ? '价格' : '车龄';
          Toast(`请您输入正确的${alertText}区间`)
        }
      },
      //排序列表
      orderFun(item,index){
        let arr=[
          {k:0,v:' '},
          {k:1,v:'0'},
          {k:2,v:'1'},
          {k:3,v:'2'},
          {k:4,v:'5'},
          {k:5,v:'6'},
          {k:6,v:'7'},
          {k:7,v:'8'},
          {k:8,v:'3'},
      ];
        this.arrSplice(item);
        let newArr = arr.filter( key =>{
          if(index === key.k){
            return key;
          };
        });

        //val
        let val = {
          nav:this.navIndex,
          key:newArr[0].v
        };
        this.FINDCARVAL(val);
        this.popupHide();
      },
      // 价格列表
      priceFun(item){
        this.arrSplice(item);
      },
      // 车龄列表
      ageFun(item){
        this.arrSplice(item.name);
      },

      // 导航表数据改变
      arrSplice(data){
        //将值添加到nav数组里
        this.nav.splice(this.navIndex,0,data);
        //删除nav当前位置默认值
        this.nav.splice(this.navIndex+1,1);
      },

      //关闭导航弹框
      popupHide(){
        this.navShow = !this.navShow;
        this.navIndex= -1
      },
    }
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
    .listNav-head{
      background:$fff;
      border-style: solid;
      border-color: #eee;
      border-width: 1px 0 1px 0;
      position: relative;
      z-index: 11;
      ul{
        @include wh(100%,1.2rem);
        @include flexCenter;
        flex-direction: row;
        li{
          @include flexCenter;
          flex:1;
          width:20%;
          &+li{
            border-left:1px solid #ccc;
          }
          &.cur{
            color:$f60;
          }
          span{
            display: inline-block;
            max-width: 80%;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-size:.48rem;
          }
          i{
            font-size:.35rem;
            margin-left:.1rem;
          }
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
