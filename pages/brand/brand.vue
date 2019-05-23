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
        title:'品牌选择'
      }
    },
    data() {
      return {
        msg: 'brand',
        heads:{
          title:'品牌选择',
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
