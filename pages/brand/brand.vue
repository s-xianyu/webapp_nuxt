<template>
  <div class="brand" style="overflow: hidden" :style="{ height: windowHeight }">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="brand-content">
        <!--一级列表-->
        <div class="brand-stair1">
          <div class="mbrHistory"></div>
          <div class="mbrBrand" ref="mbrBrand">
            <div class="brand-list">
              <p id="*">*</p>
              <div class="brand-lis">
                <span>不限品牌</span>
              </div>
            </div>
            <div class="brand-list" v-for="item in brandList">
              <p :id="item.key">{{item.key}}</p>
              <div
                class="brand-lis"
                @click="brandFun(li)"
                v-for="li in item.value">
                <img v-lazy="li.mobileLogo" alt="">
                <span>{{li.title}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--二级列表-->
        <div class="brand-stair2 brand-common" :class="{cur:stair2Show}">
          <div class="brand-stair-left" @click="thisStair2Fun"></div>
          <div class="brand-stair-right" :style="{height:stair2Height}">
            <div class="brand_title">
              <span><img :src="brandImg" alt="">{{brand}}</span>
              <i  @click="thisStair2Fun" class="close iconfont icon-close"></i>
            </div>
            <div class="line"></div>
            <div class="all">
              <div class="">不限</div>
              <div class="">多选</div>
            </div>
            <div class="brand-li"
                 :key="key"
                 v-for="(item,key) in stair2List">
              <p class="title">{{key}}</p>
              <ul>
                <li v-for="chi in item">
                  <span class="name">{{chi.title}}</span>
                  <span @click="brandToFun(chi)" class="model">车型</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--三级列表-->
        <div class="brand-stair3 brand-common" :class="{cur:stair3Show}">
          <div class="brand-stair-left" @click="stair3Show = !stair3Show"></div>
          <div class="brand-stair-right">
            <div class="brand_title" ref="brand3Title">
              <span><img :src="brandImg" alt="">{{brandTo}}</span>
              <i @click="stair3Show = !stair3Show" class="close iconfont icon-close"></i>
            </div>
            <div class="brand-model-content">
              <div class="left" :style="{height:stair3Height}">
                <span
                  @click="modelFun(-1)"
                  :class="stair3Index === -1 ? 'cur' : ''">所有</span>
                <span
                  @click="modelFun(index)"
                  :class="stair3Index === index ? 'cur' : ''"
                  v-for="(item,index) in stair3List.titles">{{item}}</span>
              </div>
              <div class="right" :style="{height:stair3Height}">
                <div class="right-li" v-for="(item,index) in stair3List.maps">
                  <p>{{item.key}}</p>
                  <ul>
                    <li v-for="chi in item.value">{{chi.subject}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--menu-->
      <div class="brand-menu">
        <a @click="Scrolls(item.key)" v-for="item in brandList">{{item.key}}</a>
      </div>

    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import {
    getonelevelbrand,
    getCarSerialByParentIdJson,
    getCarTypeByParentIdJson
  } from '~/config/getData'
  import {mapMutations,mapState} from 'vuex'
  export default {
    head(){
      return{
        title:'品牌选择'
      }
    },
    data() {
      return {
        msg: 'brand',
        heads:{
          title:'品牌选择',
          position:true,
        },
        brand:'', //一级品牌名
        brandImg:'', //一级品牌图片
        brandTo:'', //二级品牌名
        brandThe:'', //三级品牌名
        brandTheImg:'', //三级品牌图片
        stair2List:[], //二级品牌列表
        stair3List:[], //三级品牌列表
        stair2Show:false, //二级品牌显示
        stair3Show:false, //三级品牌显示
        stair2Height:'', //二级列表高度设置
        stair3Height:'', //三级列表高度设置
        stair3Index: -1, //默认三级列表下标
      }
    },
    async asyncData(){
      let { data } = await getonelevelbrand();
      return { brandList:data.logoList };
    },
    beforeUpdate(){
      // 获取浏览器高度
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      // 获取header高度
      let titleHeight = this.$refs.mbrBrand.parentNode.parentNode.parentNode.childNodes[0].offsetHeight;
      // 二级列表高度
      this.stair2Height = height-titleHeight+'px';
      //获取三级标题高度
      let brandTitleHeight = this.$refs.brand3Title.offsetHeight;
      // 用浏览器高度减去header高度再减title高度
      this.stair3Height = height-titleHeight-brandTitleHeight+'px';
    },
    computed:{
      ...mapState(['windowHeight']),
    },
    components:{
      TitleHead
    },
    methods:{
      ...mapMutations(['WIN_HEIGHT']),
      //锚点事件
      Scrolls(key){
        let top = document.querySelector('#'+key).offsetTop - this.$refs.mbrBrand.offsetTop;
        document.body.scrollTop = top;
        document.documentElement.scrollTop = top;
        window.pageYOffset = top;
      },
      // 二级品牌获取
      async brandFun(item){
        let params = {
          pids:item.id
        };
        let {data} = await getCarSerialByParentIdJson(params);
        this.stair2List = data.sonCarSerials;
        //数据保存
        this.stair2Show = true;
        this.brand = item.title;
        this.brandImg = item.mobileLogo;
        this.WIN_HEIGHT(true)
      },
      // 二级弹框关闭后设置全局高度
      thisStair2Fun(){
        this.stair2Show = !this.stair2Show;
        this.WIN_HEIGHT(false);
      },
      //三级品牌获取
      async brandToFun(item){
        let params = {
          parentId:item.id
        };
        let {data} = await getCarTypeByParentIdJson(params);
        // debugger
        this.stair3List = data

        //数据保存
        this.stair3Show = true;
        this.brandTo = item.title;
        this.WIN_HEIGHT(true)
      },
      // 车型信号获取
      async modelFun(index){
        this.stair3Index = index;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .brand{
    background:#f6f6f6;
  }
  .brand-content{
    padding-top: 1.8rem;
    .brand-stair1{
      .mbrBrand{
        width: 100%;
        .brand-list{
          p{
            @include wh(100%,1.188rem);
            @include flexCenter;
            justify-content: flex-start;
            padding-left:.6rem;
            border-bottom:1px solid #e1e1e1;
            color:#9b9b9b;
            font-size:.495rem;
          }
          .brand-lis{
            position: relative;
            z-index:10;
            @include wh(100%,1.518rem);
            @include flexCenter;
            justify-content: flex-start;
            padding-left:.6rem;
            background:$fff;
            border-bottom:1px solid #e1e1e1;
            img{
              @include wh(1rem,1rem);
              margin-right:.4rem;
            }
            span{
              flex:2;
              display: flex;
              align-items: center;
              height:1.518rem;
              font-size:.492rem;
              color:$c333;
            }
          }
        }
      }
    }
    .brand-common{
      overflow: scroll;
      position:fixed;
      top:1.8rem;
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
      .brand-stair-left{
        @include wh(30%,100%);
        position:fixed;
        top:0;
        left:0;
        z-index: 130;
      }
      .brand-stair-right{
        position:fixed;
        top:0;
        right:0;
        @include wh(70%,100%);
        overflow: scroll;
        background:#fff;
        box-shadow:-.2rem 0 .2rem rgba(0, 0, 0, .1);
        .brand_title{
          @include flexCenter;
          height:2rem;
          padding-left: .5rem;
          span{
            flex:3;
            @include flexCenter;
            justify-content: flex-start;
            font-size:.495rem;
            font-weight: bold;
            img{
              @include wh(1rem,1rem);
              display: inline-block;
              margin:0 .5rem 0 0;
              padding:0;
            }
          }
          i{
            flex:1;
            @include flexCenter;
            justify-content: flex-end;
            @include wh(.5rem,100%);
            padding-right:.5rem;
          }
        }
        .line{
          background:#f6f6f6;
          @include wh(100%,.35rem);
        }
        .all{
          @include flexCenter;
          @include wh(100%,1.518rem);
          padding:0 .5rem;
          & > div{
            @include flexCenter;
            flex:1;
            height:100%;
            font-size:.5rem;
            &:first-child{justify-content: flex-start}
            &:last-child{justify-content: flex-end;color:#f60;}
          }
        }
        .brand-li{
          .title{
            @include wh(100%,1rem);
            @include flexCenter;
            justify-content: flex-start;
            padding:0 .5rem;
            background:#f6f6f6;
            color:$c999;
          }
          ul{
            li{
              @include wh(100%,1.518rem);
              @include flexCenter;
              justify-content: space-between;
              padding:0 0 0 .5rem;
              border-bottom: 1px solid #e1e1e1;
              &:first-child{
                border-top: 1px solid #e1e1e1;
              }
              & > span{
                @include flexCenter;
                &.name{
                  font-size:.5rem;
                }
                &.model{
                  @include wh(1.8rem,100%);
                  position: relative;
                  color:$c999;
                  &::before{
                    content: '';
                    display: inline-block;
                    @include wh(1px,.4rem);
                    position: absolute;
                    left:0;
                    top:50%;
                    margin-top:-.2rem;
                    background-color: #e1e1e1;
                  }
                }
              }
            }
          }
        }
      }
    }
    .brand-stair3{
      .brand-stair-right{
        .brand_title{
          border-bottom: 1px solid #e1e1e1;
        }
        .brand-model-content{
          @include flexCenter;
          flex-direction: row;
          .left{
            @include wh(3rem,100%);
            border-right:1px solid #e1e1e1;
            flex-direction:column;
            align-items: flex-start;
            justify-content: flex-start;
            span{
              @include wh(100%,1.6rem);
              @include flexCenter;
              border-bottom:1px solid #e1e1e1;
              font-size:.5rem;
              &.cur{
                background-color:#f6f6f6;
              }
            }
          }
          .right{
            display: flex;
            @include wh(80%,100%);
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
            overflow: scroll;
            .right-li{
              @include wh(100%,auto);
              p{
                padding-left:.4rem;
                @include flexCenter;
                @include wh(100%,1rem);
                background-color:#f6f6f6;
                justify-content: flex-start;
                border-bottom:1px solid #e1e1e1;
              }
              ul{
                li{
                  padding:.45rem 0 .45rem .4rem;
                  @include wh(100%,auto);
                  @include flexCenter;
                  justify-content: flex-start;
                  border-bottom:1px solid #e1e1e1;
                  font-size:.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .brand-menu{
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
    }
  }
</style>
