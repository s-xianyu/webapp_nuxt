<template>
  <div class="body">
    <AppLoad :show="true"/>
    <div :class="{fixed:isFixed}">
      <LogoHead/>
    </div>
    <Swiper :imgList="swiperList"/>
    <MyActive :homeList="homeList.homerecommended"/>
    <Information :information="homeList.information"/>
    <Mylike/>
    <!--<FooterTab/>-->
    <BackTop/>
    <Loading v-if="loadingShow"/>
    <Login/>
  </div>
</template>
<script>
import {indexoeo} from '~/config/getData'
import AppLoad from '~/components/common/appLoad'
import LogoHead from '~/components/common/header/logo_head'
import Loading from '~/components/common/loading'
import Swiper from '~/components/common/swiper'
import MyActive from '~/components/index/myactive'
import Information from '~/components/index/information'
import Mylike from '~/components/index/mylike'
import FooterTab from '~/components/common/footer/footer'
import Login from '~/components/common/login/login'
import BackTop from '~/components/common/backTop'
import axios from '~/plugins/axios'
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
        {bussinessman : '',id : '0',name : '', href : '', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190304102629.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190304102629_0.jpg'}
	 ,
	 {bussinessman : '',id : '0',name : '个人会员', href : 'http://m.hx2car.com/mobile/weppersonalvipbuy.htm', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190429112020.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190429112020_0.jpg'}
	 ,
	 {bussinessman : '',id : '0',name : '4S', href : 'http://m.hx2car.com/4s', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190226104842.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190226104842_0.jpg'}
	 ,
	 {bussinessman : '',id : '0',name : '通讯录', href : 'http://m.hx2car.com/wap/fenghuimaillist.htm', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204141102.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204141102_0.jpg'}
	 ,
	 {bussinessman : '',id : '0',name : '', href : 'http://m.hx2car.com/wap/waphuabi.htm', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190416192142.png',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190416192142_0.png'}

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
    FooterTab
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
    this.getCity();

    window.addEventListener('scroll', this.scrollHead);
    // 获取screen至页面顶部的距离
    // debugger
    this.offsetTop = document.querySelector('.logo-header').offsetTop;

  },
  methods:{
    ...mapActions(['getCity']),
    scrollHead(){
      // debugger
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop >= this.offsetTop) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },

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
