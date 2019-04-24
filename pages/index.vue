<template>
  <transition name="index">
    <div class="body">
      <h2>
        hello
      </h2>
      <FooterTab/>
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
import loading from '~/components/common/loading'
import FooterTab from '~/components/common/footer'

export default {
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
    },2000)
  },
}
</script>
