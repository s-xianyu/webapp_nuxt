<template>
  <div class="brand">
    <div class="animated fadeInRight">
      <TitleHead :heads="heads"></TitleHead>
      <div class="brand-content"></div>
      <div class="brand-menu"></div>

    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  export default {
    head(){
      return{
        title:'品牌选择'
      }
    },
    data() {
      return {
        msg: 'brand',
        heads:{
          title:'品牌选择',
          position:true,
          brandMenu:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
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
