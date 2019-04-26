<template>
  <div class="swiper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in imgList" :key="index">
        <img :src="item.url" :alt="item.name">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'swiper'
      }
    },
    props:['imgList']
  }
</script>

<style lang="scss" scoped>
  @import '~static/style/mixin';
  .swiper{
    @include wh(100%,3.8rem);
  }
</style>
