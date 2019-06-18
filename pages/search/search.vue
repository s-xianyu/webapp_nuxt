<template>
  <div class="search">
    <div class="animated fadeInRight">
      <div class="header">
        <span class="iconfont icon-prev" @click="$history(-1)"></span>
        <div class="input">
        <span>
          <i class="iconfont icon-sousuo1"></i>
          <input ref="search" type="text" v-on:input="thisKeyUp" v-model="searchVal" placeholder="请输入品牌/车系/年份" name="keyWorld">
        </span>
        </div>
        <div class="searchBtn" @click="$history(-1)">取消</div>
      </div>
      <div v-if="searchList.length == 0" class="search-content">
        <div class="history" v-if="historySearch.length > 0">
          <h2 class="title"><i class="iconfont icon-lishi"></i><span>历史记录</span></h2>
          <ul>
            <li @click="pathList(item,true)" v-if="index < 8" v-for="(item,index) in historySearch" :key="item.id">{{item}}</li>
          </ul>
        </div>
        <div class="hot">
          <h2 class="title"><i class="iconfont icon-remen"></i><span>热门搜索</span></h2>
          <ul>
            <li @click="pathList(item.title,true)" v-if="index < 8" v-for="(item,index) in hotList.hotlist" :key="item.id">{{item.title}}</li>
          </ul>
        </div>
        <div class="like">
          <h2 class="title"><i class="iconfont icon-aixin"></i><span>猜您喜欢</span></h2>
          <ul>
            <li @click="pathList(item.title,false)" v-for="(item,index) in likeList.resultList" :key="item.id" v-if="item.title">
              <span class="tit">{{item.title}}</span>
              <span v-if="item.type == 0" class="carCount">全国<i>{{item.carCount}}</i>辆<b class="iconfont icon-xiayiye"></b></span>
              <span v-else class="carCount">全国<i>{{item.forsale}}</i>辆<b class="iconfont icon-xiayiye"></b></span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="search-list">
        <ul>
          <li @click="pathList(item,true)" v-for="(item,index) in searchList.resList" :key="index">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { gethotcar,guessWhatYouLike,searchsuggest} from '~/config/Ajax'
  import {mapState,mapMutations,mapActions} from 'vuex'
  export default {
    head(){
      return {
        title:'搜索页'
      }
    },
    data() {
      return {
        msg: 'search',
        searchVal:'',
        searchList:[],
      }
    },
    mounted(){
      this.$refs.search.focus();
      this._getHistorySearch();
    },
    computed:{
      ...mapState(['historySearch'])
    },
    async asyncData(){
      let [ hotList,likeList ] = await Promise.all([
        gethotcar(),
        guessWhatYouLike(),
      ]);
      return {
        hotList:hotList.data,
        likeList:likeList.data
      }
    },
    methods:{
      ...mapActions(['_getHistorySearch']),
      ...mapMutations(['HISTORYSEARCH_SAVE','FINDCARVAL_NAV']),
      async thisKeyUp(){
        let params = {
          keyword:this.searchVal,
          x:'',
          y:''
        };
        if(this.searchVal){
          let { data } = await searchsuggest(params);
          this.searchList = data;
        }else{
          this.searchList = [];
        }
      },
      //跳转列表页
      pathList(name,isSave){
        //name --> 保存、传值
        //isSave --> 是否保存
        if(isSave){
          this.HISTORYSEARCH_SAVE([name]);
        }
        let val = {
          key:name,
          type:'keyword'
        };
        this.FINDCARVAL_NAV(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
 @import "~static/style/mixin";
 .title{
   @include wh(100%,1.4rem);
   display: flex;
   align-items: center;
   i{
     font-size:.5rem;
     color:$c999;
   }
   span{
     font-size:.5rem;
     color:$c999;
     margin-left:.2rem;
   }
 }
 .search{
   .header{
     @include wh(12.42rem,1.564rem);
     @include flexCenter;
     border-bottom:1px solid #e1e1e1;
     background:$fff;
     position:fixed;
     top:0;
     left:50%;
     margin-left:-6.21rem;
     z-index: 100;
     span,.searchBtn{
       flex:1;
       height:100%;
       @include flexCenter;
       font-size:.8rem;
     }
     .input{
       flex:5;
       border-radius: .136rem;
       background-color:#f7f7f7;
       border:1px solid #eaeaea;
       span{
         @include wh(100%,1.02rem);
          i{
            @include wh(1.5rem,1rem);
            @include flexCenter;
            color:$f60;
            font-size:.52rem;
          }
         input{
           @include wh(100%,100%);
           border:none;
           background-color:transparent;
           font-size:.43rem;
         }
       }
     }
     .searchBtn{
       font-size:.48rem;
       color:$f60;
     }
   }
   .search-content{
    padding-top:1.564rem;
     .hot,.history{
       padding:0 .4rem;
       background:$fff;
       h2{
         @extend .title;
       }
       ul{
         display: flex;
         flex-wrap: wrap;
         box-sizing: border-box;
         li{
           @include wh(22%,1.05rem);
            line-height: 1.05rem;
           text-align: center;
           margin:.3rem 0;
           border:1px solid #ccc;
           border-radius: .2rem;
           font-size:.476rem;
           color:$c999;
           overflow:hidden;
           white-space:nowrap;
           text-overflow:ellipsis;
           &:nth-child(4n+3),
           &:nth-child(4n+2){
             margin:.3rem 3%;
           }
         }
       }
     }
     .like{
       padding:0 .4rem;
       h2{
         @extend .title;
       }
       ul{
         li{
           @include wh(100%,1.4rem);
           display: flex;
           border-top:1px solid #f6f6f6;
           font-size:.467rem;
         }
         span{
           flex:1;
           @include flexCenter;
           &:first-child{justify-content: flex-start}
           &:last-child{justify-content: flex-end}
           i{
             color:$f60;
           }
           b{
             font-size:.4rem;
           }
         }
       }
     }
   }
   .search-list{
     padding-top:1.564rem;
     ul{
       li{
         @include wh(100%,1.4rem);
         @include flexCenter;
         justify-content: flex-start;
         padding-left:.6rem;
         border-bottom:1px solid #e1e1e1;
         font-size:.467rem;
       }
     }
   }
 }
</style>
