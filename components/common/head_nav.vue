<template>
  <div>
    <div class="mlTopBox" :class="{back:isShow}">
      <div class="content">
        <ul>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </div>
    <div class="bg" v-if="isShow" @click="mlTopBoxFun"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'head_nav'
      }
    },
    props:['isShow'],
    methods:{
      mlTopBoxFun(){
        this.$emit('backShowFun',!this.isShow)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '~static/style/mixin';
  .mlTopBox{
    position:absolute;
    top:0;
    left:0;
    right:0;
    z-index: 28;
    @include wh(100%,6rem);
    margin-top:1.567rem;
    -webkit-transition: all .5s;
    transition: all .5s;
    -webkit-transform: translate(0, -175%);
    transform: translate(0, -175%);
    &.back{
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    .content{
      background:$fff;
      position:absolute;
      top:0;
      left:50%;
      margin-left:-6.21rem;
      @include wh(12.42rem,auto);
      z-index: 12;
      ul{
        li{
          float:left;
          width:33.333%;
          height:3rem;
        }
      }
    }
  }
  .bg{
    position: fixed;
    z-index: 27;
    top:0;
    right:0;
    bottom:0;
    left:0;
    background:rgba(0,0,0,.5);
    -webkit-transition: all .5s;
    transition: all .5s;
  }
</style>
