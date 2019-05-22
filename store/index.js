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
  // 登录弹框展示
  loginShow:false,
  // 登录弹框展示
  cityShow:false,
  //浏览器高度
  windowHeight:'auto',
  // 登录状态
  isLogin:false,
  //登录信息保存
  userInfo:null,
  // 猜您喜欢数据列表
  likeList:[],
  // 猜您喜欢当前页数
  page:1,
  // 猜您喜欢防止多次滚动
  likePrevent:true,
  //搜索历史记录列表
  historySearch:[],
});
