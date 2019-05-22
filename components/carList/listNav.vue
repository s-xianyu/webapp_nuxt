<template>
  <div class="listNav" :class="{fixed:isFixed}">
    <div class="listNav-content">
      <ul>
        <li v-for="item in nav">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nav:['排序','品牌','价格','车辆','筛选'],
        isFixed:false
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .listNav{
    .listNav-content{
      background:$fff;
      border-style: solid;
      border-color: #eee;
      border-width: 1px 0 1px 0;
      ul{
        @include wh(100%,1.2rem);
        @include flexCenter;
        li{
          @include flexCenter;
          flex:1;
        }
      }
    }
  }
</style>
