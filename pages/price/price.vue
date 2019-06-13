<template>
  <div class="price">
    <TitleHead :heads="heads"></TitleHead>
    <div class="price-content">
      <ul>
        <li>
          <div class="custom">
            自定义
            <input type="number" placeholder="价格">
            -
            <input type="number" placeholder="价格">
            <button>确定</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import TitleHead from '~/components/common/header/title_head'
  export default {
    data() {
      return {
        msg: 'price',
        heads:{
          title:'价格选择',
          position:true,
        },
      }
    },
    components:{
      TitleHead
    },
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .price-content{
    margin-top:1.8rem;
  }
</style>
