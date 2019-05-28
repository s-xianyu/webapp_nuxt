import {
  USER_SAVE,
  OUT_USER,
  ADD_LIKE,
  ADD_PAGE,
  WINHEIGHT,
  CITY_SAVE,
  GET_CITY,
  GET_HISTORYCITY,
  ALL_CITY,
  HISTORYSEARCH_SAVE,
  FINDCARVAL
} from './mutations-type';
import {setStore,getStore,removeStore} from '../config/util/util';
export default {

  //城市信息获取
  [GET_CITY](state,val){
   if(val){
     state.cityInfo = val;
     state.thisCity = cityInfo(val)[0];
     state.lastCity = cityInfo(val)[1];
   }
  },

  //获取历史科记录信息
  [GET_HISTORYCITY](state,val){
    if(val){
      state.historyCity = val;
    }
  },

  //选取地区详细信息保存
  [CITY_SAVE](state,val){
    if(val){
      state.cityInfo = val;
      state.thisCity = cityInfo(val)[0];
      state.lastCity = cityInfo(val)[1];
    }

    //保存选择城市到历史记录中
    let historyKey = val.length > 1 ? val[0] : val[val.length-1];
    state.historyCity.unshift(historyKey);
    //过滤重复
    state.historyCity = [...new Set(state.historyCity)];
    //切割前3条
    if(state.historyCity.length >= 3){
      state.historyCity=state.historyCity.splice(0,3);
    }

    // 保存地区到本地
    setStore('cityInfo',val);
    setStore('historyCity',state.historyCity);
    window.history.go(-1);
  },

  //多选地区保存
  [ALL_CITY](state,val){
    state.cityInfo = val;
    setStore('cityInfo',state.cityInfo);
    window.history.go(-1);
  },

  // 登录保存信息和登录状态
  [USER_SAVE](state, val) {
    if (val) {
      [
        state.userInfo,
        state.isLogin,
        state.windowStatus
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
    // if(state.windowStatus === true){
    //   state.windowHeight = `${document.documentElement.clientHeight || document.body.clientHeight}px`
    // }else{
    //   state.windowHeight = 'auto';
    // }
    state.windowHeight = getHeight(state.windowStatus)
  },

  // 退出登录清除登录信息
  [OUT_USER](state) {
    state.isLogin = false;
    state.userInfo = null;
    removeStore('userInfo');
    window.history.go(-1);
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

  // 全局浏览器高度设置、显示
  [WINHEIGHT](state){
    state.windowStatus = !state.windowStatus;
    state.windowHeight = getHeight(state.windowStatus)
  },

  //搜索历史记录
  [HISTORYSEARCH_SAVE](state,val){
    if(val){
      //合并，去重
      state.historySearch = [...new Set([...val,...state.historySearch])];
      //取8条数据
      state.historySearch = state.historySearch.splice(0,8);
      //存储
      setStore('historySearch',state.historySearch);
    }
  },

  //找车页传值

  //val里包含2个值:
  //nav --对应导航列表下标
  //  0 ----排序
  //  2 ----价格
  //  3 ----车龄
  //key --值
  [FINDCARVAL](state,val){
    switch (val.nav){
      case 0 : state.findCarVal.order = val.key;
      break;
      case 2 : state.findCarVal.priceInterval = val.key;
      break;
      case 3 : state.findCarVal.year = val.key;
      break;
    }
    setStore('findCarVal',state.findCarVal);
  }
}
let getHeight = b => {
  return b ? `${document.documentElement.clientHeight || document.body.clientHeight}px` : `auto`
};
let cityInfo = (val)=>{
  let content;
  // 保存选择城市信息
  let city = [], //当前城市选中
    position=[]; //最后一级名称保存

  //如果所获取城市数组大于1，取中间的地名，否则取最后一位；
  //0：省级，1：市级，2：县辖市
  if(val.length>1){
    city.push(val[0].area_name);
  }else{
    city.push(val[val.length-1].area_name);
  }

  if(val[val.length-1].area_name){
    position.push(val[val.length-1].area_name)
  }else{
    position.push(val[val.length-1].cityName)
  }
  content = [...city,...position];
  return content;
};
