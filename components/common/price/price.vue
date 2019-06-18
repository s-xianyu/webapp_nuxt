<template>
  <div class="price" :class="{cur:priceStatus}">
    <div class="toFrom">
      <header>
        <h2>价格选择</h2>
        <span class="iconfont icon-prev" @click="back"></span>
      </header>
      <div class="price-content">
        <ul>
          <li>
            <div class="priceInput">
              <input type="number" placeholder="请输入" v-model="ageLow">
              <span>到</span>
              <input type="number" placeholder="请输入" v-model="ageTall">
              <button @click="commitBtnFun('priceInterval')">确认</button>
            </div>
          </li>
          <li v-for="item in priceArr" @click="commitValFun(item)"><span class="span">{{item.name}}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import { HX } from '~/config/util/pubData'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        msg: 'price',
        priceArr:HX.priceArr,
        ageLow:'',
        ageTall:'',
      }
    },
    watch:{
      ageLow(){
        if(this.ageLow > 10000){
          this.ageLow =1;
        }
      },
      ageTall(){
        if(this.ageTall > 10000){
          this.ageTall =1;
        }
      }
    },
    computed:{
      ...mapState(['priceStatus']),
    },
    components:{
      TitleHead
    },
    methods:{
      ...mapMutations(['ALL_STATUS']),
      back(){
      this.ALL_STATUS('price');
      },
      commitBtnFun(type){
        let values = {
          type:type,
          key:`${this.ageLow}-${this.ageTall}`
        };
        this.$parent.doPriceYear(values);
        this.ALL_STATUS('price');
      },
      commitValFun(item){
        let values = {
          type:item.type,
          key:item.id
        };
        // this.FINDCARVAL_NAV(values);
        this.ageLow = '';
        this.ageTall = '';
        this.$parent.doPriceYear(values);
        this.ALL_STATUS('price');
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
header{
  position: relative;
  z-index: 100;
  @include wh(100%,1.8rem);
  border-bottom:1px solid #e1e1e1;
  background:$fff;
  &.cur{
    position: fixed;
    top:0;
    left:0;
    right:0;
  }
  h2{
    @include wh(100%,1.8rem);
    @include flexCenter;
    color:$c333;
  }
  span{
    position:absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:.7rem;
    @include wh(1.6rem,1.8rem);
    left:0;
    top:0;
  }
}
.price{
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
  ul{
    li{
      padding:0 .48rem;
      line-height:1.5rem;
      border-bottom:1px solid #e1e1e1;
      .priceInput{
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
      .span{
        font-size:.5rem;
        @include wh(100%,100%);
        @include flexCenter;
        justify-content: flex-start;
      }
    }
  }
}
</style>
