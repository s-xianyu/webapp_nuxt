<template>
  <div>
    <div class="mlTopBox" :class="{back:navShow}">
      <div class="swiper-nav">
        <mt-swipe :auto="40000">
          <mt-swipe-item v-for="(item,index) in nav" :key="index">
            <ul>
              <li @click="getPath(li.path)" v-for="(li,index) in item" :key="index">
                <img :src="li.img" alt="">
                <p>{{li.title}}</p>
              </li>
            </ul>
          </mt-swipe-item>
        </mt-swipe>
        <div class="center_page_btn">
          <button class="homeBtn">个人中心</button>
        </div>
      </div>
    </div>
    <div class="bg" v-if="navShow" @click="mlTopBoxFun"></div>
  </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        msg: 'head_nav',
        nav:[
          [
            {title:'卖车',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/but_car.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'}
          ],
          [
            {title:'卖车',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/but_car.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'},
            {title:'保养记录',img:'http://static.hx2cars.com/resource/web/dist/static/mobpages/images/mindex/tool1.png',path:'/carList'}
          ]
        ],
      }
    },
    props:['navShow'],
    computed:{
      ...mapState(['']),
    },
    methods:{
      ...mapMutations(['WINHEIGHT']),
      mlTopBoxFun(){
        this.$emit('navShow',!this.navShow);
        this.WINHEIGHT();
      },
      getPath(path){
        // debugger
        location.href = path;
        this.isShow = !this.isShow

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~static/style/mixin';
  .mlTopBox{
    position:absolute;
    top:0;
    left:0;
    right:0;
    z-index: 28;
    @include wh(100%,6rem);
    margin-top:1.567rem;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translate(0, -180%);
    transform: translate(0, -180%);
    &.back{
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    .swiper-nav{
      background:$fff;
      position:relative;
      top:0;
      left:50%;
      margin-left:-6.21rem;
      @include wh(12.42rem,auto);
      z-index: 12;
      height:9rem;
      .mint-swipe{
        height:6.8rem;
      }
      ul{
        overflow: hidden;
        height:6.8rem;
        li{
          float:left;
          width:25%;
          height:2.78rem;
          margin:0 auto;
          img{
            @include wh(1.3rem,1.3rem);
            margin: 0 auto;
            margin-top: .8rem;
            margin-bottom: .2rem;
          }
          p{
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .center_page_btn{
        width: 100%;
        background: #fff;
        padding-top: .6rem;
        padding-bottom: .17rem;
        .homeBtn{
          display: block;
          width: 5.71rem;
          height: 1.1rem;
          line-height: 1.1rem;
          background: #f60;
          text-align: center;
          margin: 0 auto;
          border-radius: 3px;
          color: #fff;
          font-size: .37rem;
        }
      }
    }
  }
  .bg{
    position: fixed;
    z-index: 27;
    top:1.8rem;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,.5);
    -webkit-transition: all .5s;
    transition: all .5s;
  }
</style>
