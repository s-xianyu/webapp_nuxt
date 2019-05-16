import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({

  // 地区选择
  city:'怒江傈僳族自治州',
  // 历史记录地区
  historyCity:['北京','上海','杭州'],
  // 登录弹框展示
  loginShow:false,
  //浏览器高度
  windowHeight:'auto',
  // 登录状态
  isLogin:false,
  //登录信息保存
  userInfo:'',
  // 猜您喜欢数据列表
  likeList:[],
  // 猜您喜欢当前页数
  page:1,
  // 猜您喜欢防止多次滚动
  likePrevent:true,
});
