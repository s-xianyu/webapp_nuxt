<template>
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
          <li class="right-item" ref="rightItem" v-for="(menu, i) in menus" :key="i">
            <router-link v-if="i === 0" class="li" to="/city/city" tag="div">
              <span class="left">{{menu.name}}</span>
              <span class="right">
                    <em v-if="">{{cityArr}}</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
            </router-link>
            <router-link v-if="i === 1" class="li" to="/brand/brand" tag="div">
              <span class="left">品牌</span>
              <span class="right">
                    <em>{{serialArr}}</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
            </router-link>
            <router-link v-if="i === 2" class="li" to="/price/price" tag="div">
              <span class="left">价格</span>
              <span class="right">
                    <em>{{priceArr}}</em>
                    <i class="iconfont icon-xiayiye"></i>
                  </span>
            </router-link>
            <router-link v-if="i === 3" class="li" tab="div" to="/brand/brand" tag="div">
              <span class="left">车龄</span>
              <span class="right">
                        <em>{{yearArr}}</em>
                        <i class="iconfont icon-xiayiye"></i>
                      </span>
            </router-link>
            <div v-if="i === 4" class="box-item">
              <div class="item-title">
                <span class="tit">公里数</span>
                <span class="rTxt">{{mileageText}}</span>
              </div>

              <VueRange
                :dataArr="[0,2,4,6,8,10]"
                :step="12"/>
            </div>
            <div v-if="i === 5" class="box-item">
              <div class="item-title">
                <span class="tit">类型</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 6" class="box-item">
              <div class="item-title">
                <span class="tit">级别</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 7" class="box-item">
              <div class="item-title">
                <span class="tit">结构</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 8" class="box-item">
              <div class="item-title">
                <span class="tit">厂商</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 9" class="box-item">
              <div class="item-title">
                <span class="tit">排放</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 10" class="box-item">
              <div class="item-title">
                <span class="tit">变速箱</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 11" class="box-item">
              <div class="item-title">
                <span class="tit">国别</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 12" class="box-item">
              <div class="item-title">
                <span class="tit">颜色</span>
              </div>
              <div class="carType">
                <ul>
                  <li
                    v-for="(item,index) in  menu.data"
                    :key="index">{{item.name}}</li>
                  <li></li>
                </ul>
              </div>
            </div>
            <div v-if="i === 13" class="box-item">
              <div class="item-title">
                <span class="tit">库存时间</span>
                <span class="rTxt">不限</span>
              </div>
            </div>
            <div v-if="i === 14" class="box-item">
              <div class="item-title">
                <span class="tit">批发车源</span>
              </div>
              <div class="carType">
                <ul>
                  <li
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
</template>

<script>
  import BScroll from 'better-scroll'
  import Scroll from './scroll'
  import VueRange from '~/components/common/range/range'
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        rightTops: [],
        scrollY: 0,
        leftScrollY: 0,
        mileageText:''
      }
    },
    props:{
      menus: {
        required: true,
        type: Array,
        default () {
          return []
        }
      }
    },
    components: {
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
      // 价格
      priceArr(){
        let arr = this.findCarVal.priceInterval;
        if(arr === '' || arr === ' '){
          return '价格不限'
        }else{
          return arr+'万'
        }
      },
      // 车龄
      yearArr(){
        let arr = this.findCarVal.year;
        if(arr === '' || arr === ' '){
          return '车龄不限'
        }else{
          return arr+'年'
        }
      },
      // index
      currentIndex () {
        const { scrollY, rightTops } = this
        let index = rightTops.findIndex((height, index) => {
          return scrollY >= rightTops[index] && scrollY < rightTops[index + 1]
        })
        if (scrollY > rightTops[index] + 50) {
          index++;
        }
        return index
      }
    },
    created() {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    methods: {
      ...mapActions(['getCity','getFindCarVal']),
      selectLeft (index, event) {
        console.log(index);
        if (!event._constructed) {
          return
        }
        let rightItem = this.$refs.rightItem
        let el = rightItem[index]
        this.$refs.rightMenu.scrollToElement(el, 300)
      },
      scrollHeight (pos) {
        console.log(pos);
        this.scrollY = Math.abs(Math.round(pos.y))
      },
      _calculateHeight() {
        let lis = this.$refs.rightItem;
        console.log(lis)
        let height = 0
        this.rightTops.push(height)
        Array.prototype.slice.call(lis).forEach(li => {
          height += li.clientHeight
          this.rightTops.push(height)
        })
        console.log(this.rightTops)
      },
      // 接收到子组件事件执行
      mileageValFun(low,tall){
        if(low <= 0 && tall > 11){
          this.mileageText = '不限';
          this.mileageVal = '0-100'
        }else if(low<=0 && tall <= 11){
          this.mileageText = `${tall}万公里以内`;
          this.mileageVal = `${low}-${tall}`
        }else if(low > 0 && tall > 11){
          this.mileageText = `${low}万公里以上`;
        }else{
          this.mileageText = `${low}-${tall}万公里`;
        }
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
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .left-menu{
    flex:0 0 30%;
    width:30%;
    background:#f6f6f6;
    .left-menu-container{
      /*&::-webkit-scrollbar {*/
        /*display: none;*/
      /*}*/
      ul{
        li{
          @include wh(100%,1.65rem);
          @include flexCenter;
          border-bottom:1px solid #e1e1e1;
          border-right:1px solid #e1e1e1;
          font-size:.49rem;
          &.cur{
            background:#fff;
            /*border-right: 1px solid #fff;*/
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
          &:last-child{
            .li{border:none;}
          }
          .li{
            background:$fff;
            padding:0 .5rem;
            @include wh(100%,1.65rem);
            @include flexCenter;
            border-bottom:1px solid #e1e1e1;
            &:last-child{border:none;}
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
</style>
