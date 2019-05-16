import {
  GET_USER,
  OUT_USER,
  ADD_LIKE,
  ADD_PAGE,
  LOGIN_SHOW,
} from './mutations-type';
import {setStore,getStore,removeStore} from '../config/util/util';
export default {

  // 登录保存信息和登录状态
  [GET_USER](state, val) {
    if (val) {
      [
        state.userInfo,
        state.isLogin,
        state.loginShow
      ] = [
        val,
        true,
        false
      ];

      // 获取到的用户信息去过头像为空，设置默认头像
      if(state.userInfo.photo === ''){
        state.userInfo.photo = 'http://img.hx2cars.com/upload/car/2015/6/5/14/89/38/27/32/1489382732.png';
      }

      // 添加到缓存
      setStore('userInfo', val);
    } else {
      state.isLogin = false;
      state.userInfo = '';
    }

    // 获取到窗口高度并保存
    if(state.loginShow === true){
      state.windowHeight = `${document.documentElement.clientHeight || document.body.clientHeight}px`
    }else{
      state.windowHeight = 'auto';
    }
  },

  // 退出登录清除登录信息
  [OUT_USER](state) {
    state.isLogin = false;
    state.userInfo = '';
    removeStore('userInfo');
  },

  // 猜您喜欢数据获取保存
  [ADD_LIKE](state,val){
    // 不是第一次加载就累加
    // debugger
    if (parseInt(state.likeList.length) !== 0) {

      // 如果加载的数据和前一次加载的相同测不添加
      // let num = state.page!==1 ? (state.page-1)*20+1 : 0;

      if(val[0].id !== state.likeList[0].id){
        state.likeList = [...state.likeList,...val];
      }
    }else{
      // 否则直接赋值就好了
      [state.likeList] = [val];
    }

  },

  // 猜您喜欢列表page
  [ADD_PAGE](state){
    state.page++;
    state.likePrevent = false;
  },

  // 登录弹框显示
  [LOGIN_SHOW](state){
    state.loginShow = !state.loginShow;
    state.windowHeight = getHeight(state.loginShow)
  },
}
let getHeight = (b)=>{
  return b ? `${document.documentElement.clientHeight || document.body.clientHeight}px` : `auto`
};
