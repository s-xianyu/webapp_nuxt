# nuxt开发的WEB项目

> 这是一个基于nuxt、vuex、vue2、mint-ui、开发的个人项目。

## 安装、启动

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:2019
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## 组件、页面

``` bash
components
    │  
    ├─better-scroll
    │      scroll.vue       --better-scroll组件
    │      
    ├─common
    │  ├─appLoad
    │  │      appLoad.vue   --app下载组件
    │  │      
    │  ├─backTop
    │  │      backTop.vue   --返回顶部组件
    │  │      
    │  ├─brand
    │  │      brand.vue     --品牌选择组件
    │  │      
    │  ├─city
    │  │      city.vue      --城市选择组件
    │  │      
    │  ├─filtrateCar
    │  │      filtrateCar.vue     --筛选组件
    │  │      
    │  ├─footer
    │  │      footer.vue        --底部导航组件（暂时没用）
    │  │      
    │  ├─header
    │  │      back_head.vue     --带返回的头部组件
    │  │      head_nav.vue      --头部轮播导航组件
    │  │      logo_head.vue     --带logo头部组件
    │  │      title_head.vue    --单独标题组件
    │  │      
    │  ├─loading
    │  │      loading.vue        --加载动画组件1
    │  │      loading2.vue       --加载动画组件2
    │  │      
    │  ├─login
    │  │      login.vue          --登录组件
    │  │      
    │  ├─oddList
    │  │      oddList.vue        --单列车辆列表组件
    │  │      
    │  ├─price
    │  │      price.vue          --金额选择组件
    │  │      
    │  ├─range
    │  │      range.vue          --滑动组件
    │  │      
    │  ├─search
    │  │      search.vue         --搜索页组件
    │  │      
    │  ├─swiper
    │  │      swiper.vue         --轮播组件
    │  │      
    │  └─year
    │          year.vue          --车辆选择组件
    │          
    ├─findCar
    │      list.vue              --找车页列表组件
    │      listNav.vue           --找车页导航组件
    │      
    └─index
            information.vue      --首页资讯组件
            myactive.vue         --首页找车导航组件
            myLike.vue           --猜您喜欢组件
pages
    │  findCar.vue       --找车页
    │  home.vue          --个人中心页
    │  index.vue         --首页，默认页
    │  record4s.vue      --4s记录（空）
    │  sellCar.vue       --卖车页（空）
    │  topic.vue         --批发页（空）
    │  
    ├─company
    │      company.vue    --我的店面（空）
    │      
    ├─detail
    │  │  _id.vue         --车辆详情页
    │  │  
    │  └─peizi
    │          _id.vue    --车辆配置页
    │          
    ├─search
    │      search.vue     --搜索页
    │      
    └─weppersonalvipbuy   
            _type.vue     --vip开通页    
```    

## 工具、辅助、静态文件

``` bash
config
    │  Ajax.js              --全局接口
    │  
    └─util
            filters.js      --全局过滤器
            pubData.js      --全局公用数据
            rem.js          --rem根字体JS
            scroll.js       --滚动组件JS
            util.js         --常用JS       

static             --静态文件

store
    actions.js  
    getters.js
    index.js
    list.txt
    mutations-type.js
    mutations.js
```
