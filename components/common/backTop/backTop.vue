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
    methods:{
      stickScrollTop:function(){
        this.four=setInterval(this.FourscrollBy,10);
      },
      FourscrollBy:function () {
        if(document.documentElement && document.documentElement.scrollTop) { //IE
          if (document.documentElement.scrollTop <= 0) {
            clearInterval(this.four);
          } else {
            document.documentElement.scrollBy(0, -30);
          }
        } else { //Chrome不支持documentElement.scrollTop
          if (document.body.scrollTop <= 0) {
            clearInterval(this.four);
          } else {
            document.documentElement.scrollBy(0, -30);
          }
        }
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
