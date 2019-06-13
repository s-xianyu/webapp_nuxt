<template>
  <div class="filtrate">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <ScrollMenu :menus="menus"/>
    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  import ScrollMenu from '~/components/better-scroll/better-scroll'
  import { HX } from '~/config/util/pubData'
  export default {
    data() {
      return {
        msg: 'sellCar',
        heads:{
          title:'筛选车辆',
          position:true,
        },
        menus:HX.menus,
      }
    },
    components: {
      TitleHead,
      ScrollMenu
    },
    mounted(){
      console.log(this.menus)
    }
  }
</script>

<style scoped>

</style>
