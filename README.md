# nuxt开发的wenapp项目

> 这是一个基于nuxt、vuex、vue2、mint-ui、开发的个人项目。

## 安装、启动

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


## 页面

``` bash
pages
  detail                  //详情页
  carList.vue             //列表页
  home.vue                //个人中心
  index.vue               //首页
  
```

## 组件

``` bash
components
  carList
    list.vue            //单列式列表
    
  common         -->  公用模块文件    
    appload.vue         //app下载模块
    back_head.vue       //带返回得到头部的模块
    backTop.vue         //返回顶部通用模块
    footer.vue          //底部导航模块
    loading.vue         //加载loading图表模块
    login.vue           //通用登录模块
    logo_head.vue       //带登录的顶部模块
    swiper.vue          //首页轮播图模块
    
  index          -->  首页模块文件
    information.vue       // 资讯
    myyactive.vue         //首页导航
    myLike.vue            //猜您喜欢
         
```    
