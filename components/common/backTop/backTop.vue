// 返回顶部按钮模块
<template>
  <div class="stick">
    <i class="iconfont icon-zhiding1" @click="stickScrollTop"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '_stick',
        four:null,
      }
    },
    mounted(){
    },
    methods:{
      stickScrollTop(){
        const currentY = document.documentElement.scrollTop || document.body.scrollTop;
        this.$scrollTop(currentY, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '~static/style/mixin';
  .stick{
    width:1.5rem;
    height:1.5rem;
    background:#fff;
    @include borRadius(50%);
    position: fixed;
    bottom:2.5rem;
    right:1rem;
    box-shadow: 0 0 1rem #bbb;
    cursor: pointer;
    z-index: 1000;
    i{
      display: flex;
      height:100%;
      align-items: center;
      justify-content: center;
      // padding-top:.2rem;
      font-size:1rem;
    }
  }
</style>
