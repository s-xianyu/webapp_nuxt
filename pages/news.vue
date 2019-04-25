<template>
  <transition name="index">
    <div class="body">
      <h1>news</h1>
      <FooterTab/>
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
  import loading from '~/components/common/loading'
  import FooterTab from '~/components/common/footer'

  export default {
    head () {
      return {
        title:'咸鱼-买车第一站'
      }
    },
    data () {
      return {
        loadingShow:true,
      }
    },
    components: {
      loading,
      FooterTab
    },
    mounted () {
      this.loadingShow = true;
      setTimeout(()=>{
        this.loadingShow = false;
      },1000)
    },
  }
</script>
