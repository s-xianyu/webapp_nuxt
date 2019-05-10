//  加载loading图表
 
 <template>
	<div class="loading_container">
    <div class="svg">
      <svg t="1556092636021" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1169" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M500.914065 101.849403m-101.850403 0a101.850403 101.850403 0 1 0 203.700806 0 101.850403 101.850403 0 1 0-203.700806 0Z" p-id="1170" fill="#ffffff"></path><path d="M254.163511 187.508901m-96.031438 0a96.031437 96.031437 0 1 0 192.062875 0 96.031437 96.031437 0 1 0-192.062875 0Z" p-id="1171" fill="#ffffff"></path><path d="M120.713293 381.395765m-90.210472 0a90.210471 90.210471 0 1 0 180.420943 0 90.210471 90.210471 0 1 0-180.420943 0Z" p-id="1172" fill="#ffffff"></path><path d="M118.049308 609.722427m-84.390505 0a84.390506 84.390506 0 1 0 168.781011 0 84.390506 84.390506 0 1 0-168.781011 0Z" p-id="1173" fill="#ffffff"></path><path d="M224.002687 786.127394m-78.570539 0a78.57054 78.57054 0 1 0 157.141079 0 78.57054 78.57054 0 1 0-157.141079 0Z" p-id="1174" fill="#ffffff"></path><path d="M418.803546 889.708787m-72.750574 0a72.750574 72.750574 0 1 0 145.501148 0 72.750574 72.750574 0 1 0-145.501148 0Z" p-id="1175" fill="#ffffff"></path><path d="M626.851327 877.857856m-66.931608 0a66.931608 66.931608 0 1 0 133.863216 0 66.931608 66.931608 0 1 0-133.863216 0Z" p-id="1176" fill="#ffffff"></path><path d="M800.334311 762.483532m-61.110642 0a61.110642 61.110642 0 1 0 122.221283 0 61.110642 61.110642 0 1 0-122.221283 0Z" p-id="1177" fill="#ffffff"></path><path d="M889.516788 587.14856m-55.290676 0a55.290676 55.290676 0 1 0 110.581352 0 55.290676 55.290676 0 1 0-110.581352 0Z" p-id="1178" fill="#ffffff"></path><path d="M888.602793 408.896604m-49.47071 0a49.47071 49.47071 0 1 0 98.94142 0 49.47071 49.47071 0 1 0-98.94142 0Z" p-id="1179" fill="#ffffff"></path><path d="M818.663203 260.047476m-43.650744 0a43.650744 43.650744 0 1 0 87.301488 0 43.650744 43.650744 0 1 0-87.301488 0Z" p-id="1180" fill="#ffffff"></path><path d="M708.18485 159.990063m-37.829778 0a37.829778 37.829778 0 1 0 75.659557 0 37.829778 37.829778 0 1 0-75.659557 0Z" p-id="1181" fill="#ffffff"></path></svg>
    </div>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
  @import '~static/style/mixin';
  .loading_container{
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    @include wh(2.3rem,2.3rem);
    @include borRadius(.2rem);
    background:rgba(0,0,0,.5);
    .svg{
      @include wh(1.5rem,1.5rem);
     position:absolute;
      top:.45rem;
      left:.45rem;
      -webkit-transition-property: -webkit-transform;
      -webkit-transition-duration: 1s;
      -moz-transition-property: -moz-transform;
      -moz-transition-duration: 1s;
      -webkit-animation: rotate 3s linear infinite;
      -moz-animation: rotate 3s linear infinite;
      -o-animation: rotate 3s linear infinite;
      animation: rotate 3s linear infinite;
      svg{
        @include wh(100%,100%);
      }
    }
  }
  @keyframes rotate {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }

  }

</style>
