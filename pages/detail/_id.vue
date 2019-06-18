<template>
  <div class="detail">
    <div class="animated fadeInRight">
      <Header :heads="header"/>
      <Swiper :imgList="car.bigPicList" :imgHeight="8.5" :showIndicators="false"/>
    </div>
  </div>
</template>

<script>
import { carDetail } from '~/config/Ajax'
import Swiper from '~/components/common/swiper/swiper'
import Header from '~/components/common/header/back_head';
import axios from '~/plugins/axios'

  export default {
    data() {
      return {
        msg: '_id',
        header: {
          title:'详情页'
        },
      }
    },
    async asyncData ({params} ) {
      // debugger
      const { data } = await carDetail(params);
      return data;

    },
    components:{
      Header,
      Swiper
    }
  }
</script>

<style scoped>

</style>
