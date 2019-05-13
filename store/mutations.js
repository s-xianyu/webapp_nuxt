import {
  GET_USER,
  OUT_USER,
  ADD_LIKE,
  ADD_PAGE,
  LOGIN_SHOW
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
        !state.loginShow
      ];
      setStore('userInfo', val);
    } else {
      state.isLogin = false;
      state.userInfo = '';
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
    if(state.loginShow === true){
      state.windowHeight = `${document.documentElement.clientHeight || document.body.clientHeight}px`
    }else{
      state.windowHeight = 'auto';
    }
  }

}
