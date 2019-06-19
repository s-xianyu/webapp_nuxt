import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const state = () => ({

  // 省市区县信息
  cityInfo:[],
  //市
  thisCity:'全国',
  lastCity:'',
  // 历史记录地区
  historyCity:[],
  // 车龄框状态
  filtrateStatus:false,
  // 车龄框状态
  yearStatus:false,
  // 价格框状态
  priceIntervalStatus:false,
  // 登录框状态
  loginStatus:false,
  // 登录状态
  isLogin:false,
  //登录信息保存
  userInfo:null,
  // 找车页数据列表
  findCarList:[],
  // 猜您喜欢数据列表
  likeList:[],
  // 猜您喜欢当前页数
  likePage:1,
  // 猜您喜欢防止多次滚动
  likePrevent:true,
  //搜索历史记录列表
  historySearch:[],

  //找车页筛选数据
  findCarVal:{
    areaCode:'1000000',
    pageSize:10,
    currPage:0,
    order:'',
    priceInterval:'',
    year:'',
    serial:'',
    carType:'',
    standards:'',
    dayInterval:'',
    colors:'',
    gears:'',
    is4s:'',
    pifa:'',
    mileage:'',
    carKinds:'',
    bodType:'',
    factory:'',
    country:'',
    motor:'',
    devicetoken:'',
    newCar:'',
    appmobile:'',
    apptoken:'',
    keyword:''
  }
});
