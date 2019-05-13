<template>
  <transition name="index">
    <div class="body" style="overflow: hidden" :style="{ height: windowHeight}">
      <AppLoad :show="true"/>
      <div :class="{fixed:isFixed}">
        <logoHead :loginBtn="true"/>
      </div>
      <Swiper :imgList="swiperList"/>
      <MyActive :homeList="homeList.homerecommended"/>
      <information :information="homeList.information"/>
      <mylike/>
      <!--<FooterTab/>-->
      <backTop/>
      <loading v-if="loadingShow"/>
      <Login/>
    </div>
  </transition>
</template>
<script>
const indexoeo = '/api/mobile/indexoeo.json'
import AppLoad from '~/components/common/appLoad'
import backTop from '~/components/common/backTop'
import logoHead from '~/components/common/logo_head'
import loading from '~/components/common/loading'
import Swiper from '~/components/common/swiper'
import MyActive from '~/components/index/myactive'
import information from '~/components/index/information'
import mylike from '~/components/index/mylike'
import FooterTab from '~/components/common/footer'
import Login from '~/components/common/Login'
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
    backTop,
    logoHead,
    loading,
    Swiper,
    MyActive,
    information,
    mylike,
    Login,
    FooterTab
  },
  async asyncData () {
    let { data } = await axios.get(indexoeo);
    return {
      homeList: data
    }
    // let { like } = await axios.get('/api/mobile/guessYouLike.json')
    // return {
    //   likeList: data
    // }
  },
  computed:{
    ...mapState(['windowHeight']),
    params (){
      return {
        type:this.type
      }
    },
  },
  mounted(){
    // this.getLike();
    this.getUserInfo();

    window.addEventListener('scroll', this.scrollHead)
    // 获取screen至页面顶部的距离
    // debugger
    this.offsetTop = document.querySelector('.header').offsetTop;

  },
  methods:{
    ...mapActions(['getUserInfo']),
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
  .fixed{
    position: fixed;
    top:0;
    left:0;
    right:0;
    z-index: 20;
    &+.swiper{
      margin-top:1.4rem;
    }
  }
</style>
