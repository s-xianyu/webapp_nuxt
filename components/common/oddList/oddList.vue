<template>
    <div class="list" ref="listHeight">
      <ul>
        <li v-for="(item,index) in list">
          <div class="left">
            <img :src="'http://img.hx2cars.com/upload'+item.image" alt="">
          </div>
          <div class="right">
            <h2>{{item.title}}</h2>
            <p>
              <i v-if="item.areaName">{{item.areaName}}</i>
              <i v-if="item.journey">/{{item.journey}}万公里</i>
              <i v-if="item.standard">/{{item.standard}}</i>
            </p>
            <div class="bot">
              <span v-if="item.price">￥{{item.price}}万</span>
              <span v-else>面议</span>
              <span>{{item.time}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'oddList',
        list:null,
      }
    },
    watch:{
      listInfo(val){
        this.list = val;
      }
    },
    mounted(){
      let height = this.$refs.listHeight .clientHeight;
      console.log(height);
    },
    props:['listInfo']
  }
</script>

<style lang="scss" scoped>
@import "~static/style/mixin";
  .list{
    @include wh(100%,auto);
    background:$fff;
    ul{
      li{
        display: flex;
        flex-direction: row;
        padding:.35rem .5rem;
        border-bottom:1px solid #e1e1e1;
        &:last-child{border:none;}
        .left{
          @include wh(4rem,3rem);
        }
        .right{
          flex:1;
          padding-left:.4rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          h2{
            height:1.28rem;
            line-height: .64rem;
            font-size:.44rem;
            display:-webkit-box;
            word-break:break-all;
            text-overflow:ellipsis;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
            margin-top:-5rpx;
            overflow:hidden;
          }
          p{
            font-size:.34rem;
            color:#999;
            padding:.1rem 0;
          }
          .bot{
            display: flex;
            justify-content: space-between;
            span{
              font-size:.35rem;
              &:first-child{
                font-size:.5rem;
                color:$f60;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
</style>
