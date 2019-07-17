<template>
  <div class="brand" style="overflow: hidden" :class="{cur:brandStatus}">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="brand-content">
        <!--一级列表-->
        <div class="brand-stair1">
          <div class="mbrHistory"></div>
          <div class="mbrBrand" ref="mbrBrand">
            <div class="brand-list">
              <p id="*">*</p>
              <div class="brand-lis brand-lis1">
                <span class="astrict" @click="allUnlimited">不限品牌</span>
                <span class="allSelect" @click="allSelectToggle">我要{{allSelectText}}</span>
              </div>
            </div>
            <div class="brand-list" v-for="(item,index) in brandList" :key="index">
              <p :id="item.key">{{item.key}}</p>
              <div
                class="brand-lis"
                :class="brand === li.title ? 'cur' : ''"
                v-for="(li,index) in item.value" 
                :key="index">
                <div class="leftBtn" @click="brandFun(li)">
                  <img v-lazy="li.mobileLogo" src="" alt="">
                  <span>{{li.title}}</span>
                </div>
                <div class="rightBtn" v-if="selectShow">
                  <b class="animated fadeInRight"></b>
                </div>
                <u class="bg" @click="radioFun($event,li)" v-show="selectShow"></u>
              </div>
            </div>
          </div>
          <div class="allSelectBtn animated fadeInUp" v-show="selectShow">
            <span @click="allSelectToggle">取消</span>
            <span @click="allSelectCommit">确认</span>
          </div>
        </div>
        <!--二级列表-->
        <div class="brand-stair2 brand-common" :class="{cur:stair2Show}">
          <!--<div class="brand-stair-left" @click="thisStair2Fun"></div>-->
          <div class="brand-stair-right" :style="{height:stair2Height}">
            <div class="brand-top">
              <div class="brand_title" ref="brand2Title">
                <span><img :src="brandImg" alt="">{{brand}}</span>
                <i  @click="thisStair2Fun" class="close iconfont icon-close"></i>
              </div>
              <div class="line"></div>
              <div class="all">
                <div @click="twoUnlimited">不限车系</div>
                <div @click="allSelectToggleTo">{{allSelectTextTo}}</div>
              </div>
              <div class="brand-li"
                   :key="key"
                   v-for="(item,key) in stair2List">
                <p class="title">{{key}}</p>
                <ul>
                  <li v-for="(chi,index) in item" :key="index">
                    <span @click.stop="brandCommitVuex(chi)" class="name">{{chi.title}}</span>
                    <span class="rightBtnTo" v-show="selectShowTo">
                      <b class="animated fadeInRight"></b>
                    </span>
                    <u class="bg" @click="radioFun($event,chi)" v-show="selectShowTo"></u>
                    <span @click="brandToFun(chi)" class="model" v-show="!selectShowTo">车型</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="brand-bottom animated fadeInUp" v-if="selectShowTo">
              <span @click="allSelectToggleTo">取消</span>
              <span @click="allSelectCommit">确认</span>
            </div>
          </div>
        </div>
        <!--三级列表-->
        <div class="brand-stair3 brand-common" :class="{cur:stair3Show}">
          <div class="brand-stair-left" @click="stair3Show = !stair3Show"></div>
          <div class="brand-stair-right">
            <div class="brand-top">
              <div class="brand_title" ref="brand3Title">
                <span><img :src="brandImg" alt="">{{brandTo}}</span>
                <i @click="stair3Show = !stair3Show" class="close iconfont icon-close"></i>
              </div>
            </div>
            <div class="brand-model-content">
              <div class="left" :style="{height:stair3Height}">
                <span
                  @click="modelFun('',-1)"
                  :class="stair3Index === -1 ? 'cur' : ''">所有</span>
                <span
                  @click="modelFun(item,index)"
                  :class="stair3Index === index ? 'cur' : ''"
                  v-for="(item,index) in stair3List.titles" 
                  :key="index">{{item}}</span>
              </div>
              <div class="right" :style="{height:stair3Height}">
                <div class="right-li" v-for="(item,index) in stair3List.maps" :key="index">
                  <p>{{item.key}}</p>
                  <ul>
                    <li v-for="(chi,index) in item.value"
                    :key="index"
                     @click="brandCommitVuexTo(chi)">{{chi.subject}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--menu-->
      <div class="brand-menu">
        <a @click="Scrolls(item.key)" 
        v-for="(item,index) in brandList" 
        :key="index">{{item.key}}</a>
      </div>

    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import {
    getonelevelbrand,
    getCarSerialByParentIdJson,
    getCarTypeByParentIdJson,
    getCarTypeByParentIdKuanxin
  } from '~/config/Ajax'
  import {mapMutations,mapState} from 'vuex'
  export default {
    // head(){
    //   return{
    //     title:'品牌选择'
    //   }
    // },
    data() {
      return {
        msg: 'brand',
        heads:{
          title:'品牌选择',
          position:true,
          history:false,
          name:'brand'
        },
        brand:'', //一级品牌名
        brandImg:'', //一级品牌图片
        brandTo:'', //二级品牌名
        brandThe:'', //三级品牌名
        brandTheImg:'', //三级品牌图片
        brandList:[], //一级品牌列表
        stair2List:[], //二级品牌列表
        stair3List:[], //三级品牌列表
        stair2Show:false, //二级品牌显示
        stair3Show:false, //三级品牌显示
        stair2Height:'', //二级列表高度设置
        stair3Height:'', //三级列表高度设置
        stair3Index: -1, //默认三级列表下标
        stair2Id:'', //二级ID
        selectShow:false, //一级多选显示
        selectShowTo:false, //一级多选显示
        allOptionName:[], //多选品牌名保存D
        allSelectText:'多选', //一级列表单选多选切换
        allSelectTextTo:'多选', //二级列表单选多选切换
        vuexVal:{
          key:'',
          type:'serial'
        }
      }
    },
    props:['afterFun'],
    // async asyncData(){
    //   let { data } = await getonelevelbrand();
    //   return { brandList:data.logoList };
    // },
    beforeUpdate(){
      // 获取浏览器高度
      let height = document.documentElement.clientHeight || document.body.clientHeight;
      // 获取header高度
      let titleHeight = this.$refs.mbrBrand.parentNode.parentNode.parentNode.childNodes[0].offsetHeight;
      // 获取二级列表title高度
      let brand2TitleHeight = this.$refs.brand2Title.offsetHeight;
      // 设置二级列表高度
      this.stair2Height = height-titleHeight+'px';
      //获取三级标题高度
      let brand3TitleHeight = this.$refs.brand3Title.offsetHeight;
      // 设置三级列表高度，用浏览器高度减去header高度再减title高度
      this.stair3Height = height-titleHeight-brand3TitleHeight+'px';
    },
    mounted(){
    
    },
    watch:{
      brandStatus(){
        if(this.brandStatus){
          this.getBrandList();
        }
      }
    },
    computed:{
      ...mapState(['brandStatus']),
    },
    components:{
      TitleHead
    },
    methods:{
      ...mapMutations(['WIN_HEIGHT','FINDCARVAL_NAV','ALL_STATUS']),
      async getBrandList(){
        let { data } = await getonelevelbrand();
        this.brandList = data.logoList;
      },
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
        //二级列表显示
        this.stair2Show = true;
        // 二级列表title内容赋值
        this.brand = item.title;
        // 二级列表img
        this.brandImg = item.mobileLogo;
        // 滚动穿透
        this.WIN_HEIGHT(true);
      },
      // 二级弹框关闭后设置全局高度
      thisStair2Fun(){
        this.selectShowTo = false;
        document.querySelectorAll('.rightBtnTo').forEach(key =>{
          key.classList.remove('cur');
        });
        this.allOptionName = [];

        this.stair2Show = !this.stair2Show;
        // 关闭时清除brand
        this.brand = '';
        this.WIN_HEIGHT(false);
      },
      //三级品牌获取
      async brandToFun(item){
        this.stair2Id = item.id;
        let params = {
          parentId:this.stair2Id,
        };
        let {data} = await getCarTypeByParentIdJson(params);
        // debugger
        this.stair3List = data;

        //三级列表显示
        this.stair3Show = true;
        // 三级列表title
        this.brandTo = item.title;
      },
      // 车型信号获取
      async modelFun(item,index){
        let params = {
          parentId:this.stair2Id,
          title:item
        };
        //切换样式
        this.stair3Index = index;
        // 空为所有，展示全部
        if(item === ''){
          let {data} = await getCarTypeByParentIdJson(params);
          this.stair3List = data;
        }else{
          let { data } = await getCarTypeByParentIdKuanxin(params);
          this.stair3List = data;
        }
      },
      // 一级不限--恢复默认
      allUnlimited(){
        this.vuexVal.key = '';
        this.commitOk(this.vuexVal);
      },
      // 二级不限
      twoUnlimited(){
        this.vuexVal.key = this.brand;
        this.commitOk(this.vuexVal);
      },
      /* 一级确认提交
       * 二级确认提交
       * 根据selectShow判断是一级还是二级
       */
      allSelectCommit(){
        if(this.allOptionName.length > 1){
          this.vuexVal.key = (this.allOptionName+'').replace(/,/g,' or ');
        }else{
          this.vuexVal.key = (this.allOptionName+'')
        }
        // console.log(this.vuexVal);
        this.commitOk(this.vuexVal);
      },
      // 二级列表选择
      brandCommitVuex(item){
        this.vuexVal.key = item.completeCarSerial;
        this.commitOk(this.vuexVal);
      },
      // 三级列表选择
      brandCommitVuexTo(item){
        this.vuexVal.key = this.brandTo+' '+item.subject;
        this.commitOk(this.vuexVal);
      },
      // 一级列表多选按钮显示切换
      allSelectToggle(){
        this.selectShow = !this.selectShow;
        // 切换文字
        this.allSelectText = this.selectShow ? '单选' : '多选';
        // 如果是一级多选状态删除选中样式并清空选中列表数组
        if(!this.selectShow){
          document.querySelectorAll('.rightBtn').forEach(key =>{
            key.classList.remove('cur');
          });
          this.allOptionName = []
        }
      },
      // 二级列表多选按钮显示切换
      allSelectToggleTo(){
        this.selectShowTo = !this.selectShowTo;
        // 切换文字
        this.allSelectTextTo = this.selectShowTo ? '单选' : '多选';
        // 如果是一级多选状态删除选中样式并清空选中列表数组
        if(!this.selectShowTo){
          document.querySelectorAll('.rightBtnTo').forEach(key =>{
            key.classList.remove('cur');
          });
          this.allOptionName = [];
          // this.stair2Show = false;
        }
      },
      // 多选按钮
      radioFun(e,item){
        // 如果allOptionName不是空
        if(this.allOptionName.includes(item.title)){
          // 删除class和当前选中值
          e.currentTarget.previousElementSibling.classList.remove('cur');
          this.removeArray(this.allOptionName,item.title);

          // 否则添加class并把值添加进数组
        }else{
          e.currentTarget.previousElementSibling.classList.add('cur');
          this.allOptionName = this.allOptionName.concat(item.title);
        }
        console.log(''+this.allOptionName);
      },
      // 删除重复
      removeArray(arr,val){
        for(let i in arr){
          if(arr[i] === val){
            arr.splice(i,1);
            break
          }
        }
      },
      // 最终提交函数
      commitOk(val){
        this.FINDCARVAL_NAV(val);
        this.ALL_STATUS('brand');
        this.afterFun();
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "~static/style/mixin";
  .brand{
    z-index: 999;
    position: fixed;
    overflow-y: scroll;
    @include wh(100%,100%);
    background-color: #f6f6f6;
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
  .brand-content{
    display: flex;
    position: absolute;
    top: 1.8rem;
    bottom: 1.5rem;
    width: 100%;
    overflow: scroll;
    .brand-stair1{
      @include wh(100%,100%);
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
            justify-content: space-between;
            padding-left:.6rem;
            background:$fff;
            border-bottom:1px solid #e1e1e1;
            &.cur{background:#e1e1e1;}
            div{
              flex:1;
              display: flex;
              align-items: center;
              height:1.518rem;
              font-size:.492rem;
              color:$c333;
            }
            .leftBtn{
              flex:2;
              img{
                display: inline-block;
                @include wh(1.3rem,1.3rem);
                margin:0 .6rem 0 0;
              }
              span{
                @include flexCenter;
              }
            }
            &.brand-lis1{
              justify-content: space-between;
              padding:0 .6rem;
              span{
                display: flex;
                height:1.518rem;
                align-items: center;
                font-size:.492rem;
                color:$c333;
                flex:none;
              }
              .allSelect{
                width:2rem;
                justify-content: flex-end;
                color:$f60;
              }
            }
            .rightBtn{
              @include flexCenter;
              flex:1;
              justify-content: flex-end;
              padding-right:.6rem;
              &.cur{
                b{
                  border: none;
                  background: #f60 url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/brandselect.png) center center no-repeat;
                  background-size: .429rem auto;
                }
              }
              b{
                @include wh(.73rem,.73rem);
                border: 1px solid #ccc;
                border-radius: 50%;
              }
            }
            .bg{
              position:absolute;
              top:0;
              bottom:0;
              right:0;
              z-index: 10;
              @include wh(100%,100%);
            }
          }
        }
      }
      .allSelectBtn{
        @extend .allSelectBtn;
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
      -webkit-transform: translate(105%, 0);
      transform: translate(105%, 0);
      &.brand-stair2{
        width:80%;
        box-shadow:-.2rem 0 .2rem rgba(0, 0, 0, .1);
        .brand-stair-right{
          @include wh(100%,100%);
          padding-bottom:1.5rem;
        }
      }
      &.cur{
        -webkit-transform: translate(0px, 0px);
        transform: translate(0px, 0px);
      }
      .brand-stair-left{
        @include wh(20%,100%);
        position:fixed;
        top:0;
        left:0;
        z-index: 130;
      }
      .brand-stair-right{
        position:fixed;
        top:0;
        right:0;
        @include wh(80%,100%);
        overflow: scroll;
        background:#fff;
        box-shadow:-.2rem 0 .2rem rgba(0, 0, 0, .1);
        .brand-top{
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
                position:relative;
                @include wh(100%,1.518rem);
                @include flexCenter;
                justify-content: space-between;
                border-bottom: 1px solid #e1e1e1;
                &:first-child{
                  border-top: 1px solid #e1e1e1;
                }
                & > span{
                  @include flexCenter;
                  &.name{
                    padding-left:.5rem;
                    font-size:.5rem;
                    @include wh(80%,100%);
                    @include flexCenter;
                    justify-content: flex-start;
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
                  &.rightBtnTo{
                    @include wh(1.8rem,100%);
                    &.cur{
                      b{
                        border: none;
                        background: #f60 url(http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/brandselect.png) center center no-repeat;
                        background-size: .429rem auto;
                      }
                    }
                    b{
                      @include wh(.73rem,.73rem);
                      border: 1px solid #ccc;
                      border-radius: 50%;
                    }
                  }
                }
                .bg{
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  z-index: 10;
                  @include wh(100%,100%);
                }
              }
            }
          }
        }
        .brand-bottom{
          @extend .allSelectBtn;
          bottom:1.8rem;
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
