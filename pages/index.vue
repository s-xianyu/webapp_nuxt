<template>
  <transition name="index">
    <div class="body">
      <Swiper :imgList="swiperList"/>
      <FooterTab/>
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
import loading from '~/components/common/loading'
import Swiper from '~/components/common/swiper'
import FooterTab from '~/components/common/footer'
import axios from "../plugins/axios";

export default {
  head () {
    return{
      title:'咸鱼-中国第一品牌'
    }
  },
  data () {
    return {
      loadingShow:false,
      swiperList:[
        {bussinessman : '',id : '0',name : '', href : '', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190304102629.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190304102629_0.jpg'}
        ,
        {bussinessman : '',id : '0',name : '4S', href : 'http://m.hx2car.com/4s', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190226104842.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190226104842_0.jpg'}
        ,
        {bussinessman : '',id : '0',name : '通讯录', href : 'http://m.hx2car.com/wap/fenghuimaillist.htm', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204141102.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204141102_0.jpg'}
        ,
        {bussinessman : '',id : '0',name : '', href : 'http://m.hx2car.com/wap/waphuabi.htm', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190416192142.png',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2019/20190416192142_0.png'}
        ,
        {bussinessman : '',id : '0',name : '', href : 'http://m.hx2car.com/mobile/luckDrawHtm.htm?from=appClient&actMobile=13646821240', url : 'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204140616.jpg',smallUrl:'http://www.hx2car.com/upload/daily/normal/MobileIndexAds/MobileIndexTop/2018/20181204140616_0.jpg'}

      ]
    }
  },
  components: {
    loading,
    Swiper,
    FooterTab
  },
  mounted () {
  },
  methods:{
    message () {
      this.$toast('Hello world!')
    },
    okFun () {
      this.$messagebox.alert("操作成功").then(action => {

      });
    }
  }
}
</script>
