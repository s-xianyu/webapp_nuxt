<template>
  <transition name="index">
    <div class="body">
      <h1>news</h1>
      <ul>
       <li v-for="(item,index) in users" :key="item.id" :id="item.id">{{item.id}}{{index}}</li>
       </ul>
      <FooterTab/>
      <loading v-if="loadingShow"/>
    </div>
  </transition>
</template>
<script>
  import loading from '~/components/common/loading'
  import FooterTab from '~/components/common/footer'
  import axios from '~/plugins/axios'

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
    async asyncData () {
      let { data } = await axios.get('/api/mobile/filteData.json')
      return { users: data.carList }
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
