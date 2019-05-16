<template>
<div class="">
  <Header :heads="header"/>
  <h2>
    范围：{{assessPrice}}</br>
    <hr>
    车辆ID:{{car.carId}}</br>
    车辆名称:{{car.brandFullName}}
  </h2>
</div>
</template>

<script>
import { carDetail } from '~/config/getData'
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
      Header
    }
  }
</script>

<style scoped>

</style>
