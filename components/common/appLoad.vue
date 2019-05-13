// wap端顶部APP下载模块

<template>
  <div class="load" v-if="show">
		<div class="load-bg"></div>
		<div class="load-content">
			<i @click="close"><img src="http://static.hx2cars.com/resource/web/dist/static/mobpages/images/close-org.png" style="width: 100%;margin:0;"></i>
			<div class="load-right" @click="appLoad">快速下载</div>
		</div>
  </div>
</template>
<script>
export default {
	props:['show'],
	methods:{
		close(){
			this.show = !this.show
		},
    appLoad(){
		  this.$hxWaptoapp();
    }
	}
}
</script>
<style lang="scss" scope>
  @import '~static/style/mixin';
  .load{
	@include wh(100%,1.513rem);
	.load-bg{
	  @include wh(100%,1.513rem);
	  @include bis('http://static.hx2cars.com/resource/web/dist/static/mobpages/images/adsbg2.jpg');
	  background-size: 100%;
	  background-position: center center;
	}
	.load-content{
	  i{
      @include wh(.4rem,.4rem);
      position: absolute;
      top:.3rem;
      right:.3rem;
	  }
    .load-right{
      @include wh(2.567rem,.992rem);
			display: flex;
			justify-content: center;
			align-items: center;
			color:$fff;
			background:$f60;
			border-radius: 1rem;
			position:absolute;
			top:.3rem;
			right:1rem;
    }
	}
  }
</style>
