<template>
  <div class="brand">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  export default {
    head(){
      return{
        title:'筛选车辆'
      }
    },
    data() {
      return {
        msg: 'filtrateCar',
        heads:{
          title:'筛选车辆',
          position:true,
        },
      }
    },
    components:{
      TitleHead
    }
  }
</script>

<style scoped>

</style>
