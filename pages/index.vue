<template>
  <div class="body">
    <AppLoad :show="true"/>
    <div :class="{fixed:isFixed}">
      <LogoHead/>
    </div>
    <Swiper :imgList="swiperList" :imgHeight="3.8"/>
    <MyActive :homeList="homeList.homerecommended"/>
    <Information :information="homeList.information"/>
    <Mylike/>
    <BackTop/>
    <Loading v-if="loadingShow"/>
    <Login :afterFun="LoginAfterFun"/>
    <City/>
  </div>
</template>
<script>
import {indexoeo} from '~/config/Ajax'
import AppLoad from '~/components/common/appLoad/appLoad'
import LogoHead from '~/components/common/header/logo_head'
import Loading from '~/components/common/loading/loading'
import Swiper from '~/components/common/swiper/swiper'
import MyActive from '~/components/index/myactive'
import Information from '~/components/index/information'
import Mylike from '~/components/index/myLike'
import Login from '~/components/common/login/login'
import BackTop from '~/components/common/backTop/backTop'
import City from '~/components/common/city/city'
import {mapActions,mapState} from 'vuex'
export default {
  head () {
    return{
      title:'咸鱼-中国第一品牌',
    }
  },
  data () {
    return {
      loadingShow:false,
      swiperList:[
        'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190304102629.jpg',
        'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190429112020.jpg',
        'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190226104842.jpg',
        'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204141102.jpg',
        'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190416192142.png'
      ],
      type:'1',
      homeList:[],
      isFixed:false,
      offsetTop:0,
    }
  },
  components: {
    AppLoad,
    BackTop,
    LogoHead,
    Loading,
    Swiper,
    MyActive,
    Information,
    Mylike,
    Login,
    City
  },
  async asyncData () {
    let { data } = await indexoeo();
    return { homeList: data }
  },
  computed:{
    params (){
      return {
        type:this.type
      }
    },
  },
  mounted(){
    // this.getLike();
    this._getCity();

    window.addEventListener('scroll', this.scrollHead);
    // 获取screen至页面顶部的距离
    // debugger
    this.offsetTop = document.querySelector('.logo-header').offsetTop;

  },
  methods:{
    ...mapActions(['_getCity']),
    scrollHead(){
      // debugger
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    // 成功回调执行函数
    LoginAfterFun(){
      console.log('ok');
    }
  }
}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .body{
    background:#f6f6f6;
  }
  .fixed{
    position: fixed;
    top:0;
    left: 50%;
    right: 0;
    z-index: 20;
    transform: translate(-50%,0);
    width: 12.42rem;
    &+.swiper{
      margin-top:1.4rem;
    }
  }
</style>
