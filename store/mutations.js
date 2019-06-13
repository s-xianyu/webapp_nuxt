import {
  USER_SAVE,
  OUT_USER,
  ADD_LIKE,
  ADD_PAGE,
  LOGIN_STATUS,
  WIN_HEIGHT,
  CITY_SAVE,
  GET_CITY,
  GET_HISTORYCITY,
  ALL_CITY,
  HISTORYSEARCH_SAVE,
  FINDCARVAL_NAV,
  FINDCARVAL_MENU,
  FINDCARVAL_SAVE,
  FINDCARVAL_REMOVE,
  ADD_LIST
} from './mutations-type';
import {setStore,getStore,removeStore} from '../config/util/util';
export default {

  //城市信息获取
  [GET_CITY](state,val){
   if(val){
     state.cityInfo = val;
     state.thisCity = cityInfo(val)[0];
     state.lastCity = cityInfo(val)[1];
     // 设置为第一页
     state.findCarVal.currPage = 0;

     let code = val.map(i=>{
       return i.area_code || i.areaCode
     });
     state.findCarVal.areaCode = code+'';
     console.log( state.findCarVal.areaCode)
   }
  },

  //选取地区详细信息保存
  [CITY_SAVE](state,val){
    if(val){
      state.cityInfo = val;
      state.thisCity = cityInfo(val)[0];
      state.lastCity = cityInfo(val)[1];

      // 保存code到筛选数据
      state.findCarList = [];
      // 设置为第一页
      state.findCarVal.currPage = 0;

      let code = val.map(i=>{ return i.area_code });
      state.findCarVal.areaCode = code+'';
      console.log( state.findCarVal.areaCode)
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
    // 存储筛选数据
    setStore('findCar',state.findCarVal);
    window.history.go(-1);
  },

  //获取历史记录信息
  [GET_HISTORYCITY](state,val){
    if(val){
      state.historyCity = val;
    }
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
        state.loginStatus
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
    // if(state.loginStatus === true){
    //   state.windowHeight = `${document.documentElement.clientHeight || document.body.clientHeight}px`
    // }else{
    //   state.windowHeight = 'auto';
    // }
  },

  // 退出登录清除登录信息
  [OUT_USER](state) {
    state.isLogin = false;
    state.userInfo = null;
    removeStore('userInfo');
    window.history.go(-1);
  },

  // 列表数据保存
  [ADD_LIST](state,val){
    //点击改变数据，直接赋值
    if (parseInt(state.findCarList.length) !== 0) {
      state.findCarList = [...state.findCarList,...val];
    }else{
      // 否则直接赋值就好了
      [state.findCarList] = [val];
    }
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

  // 列表page
  [ADD_PAGE](state,val){
    switch (val){
      case 'like' :  state.likePage++;
      case 'findCar' :  state.findCarVal.currPage+=1;
    }
    state.likePrevent = false;
  },
  // 登录框显示状态
  [LOGIN_STATUS](state){
    state.loginStatus = !state.loginStatus;
    preventDefault(state.loginStatus);
  },
  // 全局浏览器高度设置、显示
  [WIN_HEIGHT](state,isTrue){
    preventDefault(isTrue);
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

  //找车页传值--nav
  //  order ----排序
  //  priceInterval ----价格
  //  year ----车龄
  //  serial ----品牌
  //  keyword ----keyword筛选
  //  removeSerial ----删除品牌

  //key --值
  [FINDCARVAL_NAV](state,val){
    switch (val.type){
      case 'order' : state.findCarVal.order = val.key;
      break;
      case 'priceInterval' : state.findCarVal.priceInterval = val.key;
      break;
      case 'year' : state.findCarVal.year = val.key;
      break;
      case 'serial' : state.findCarVal.serial = val.key;
      break;
      case 'keyword' : state.findCarVal.serial = '';state.findCarVal.keyword = val.key;
      break;
      case 'removeSerial' : state.findCarVal.serial = val.key;
      break;
    }
    // 如果是品牌、筛选、搜索，赋值后回退上一步
    let navArr = ['serial','filtrate','keyword'];
    if(navArr.includes(val.type)){
      history.go(-1);
    }
    // 清空列表
    state.findCarList = [];
    // 设置为第一页
    state.findCarVal.currPage = 0;
    // 存储筛选数据
    setStore('findCar',state.findCarVal);
  },
  //找车页传值--menu
  //  newCar ----新车
  //  is4s ----4s维保
  //  pifa ----批发
  [FINDCARVAL_MENU](state,val){
    [
      state.is4s,
      state.newCar,
      state.pifa,
    ] = [];
    switch (val.type){
      case 'newCar' :
        state.findCarVal.is4s = '';
        state.findCarVal.pifa = '';
        state.findCarVal.newCar = val.key;
      break;
      case 'is4s' :
        state.findCarVal.newCar = '';
        state.findCarVal.pifa = '';
        state.findCarVal.is4s = val.key;
      break;
      case 'pifa' :
        state.findCarVal.newCar = '';
        state.findCarVal.is4s = '';
        state.findCarVal.pifa = val.key;
      break;
    }
    // 清空列表
    state.findCarList = [];
    // 设置为第一页
    state.findCarVal.currPage = 0;
    // 存储筛选数据
    setStore('findCar',state.findCarVal);
  },

  [FINDCARVAL_SAVE](state,val){
    if(val){
      state.findCarVal = val;
    }
  },
  [FINDCARVAL_REMOVE](state){
      state.findCarVal.pageSize = 10;
      state.findCarVal.currPage = 0;
      state.findCarVal.order = '';
      state.findCarVal.priceInterval = '';
      state.findCarVal.year = '';
      state.findCarVal.serial = '';
      state.findCarVal.carType = '';
      state.findCarVal.standards = '';
      state.findCarVal.dayInterval = '';
      state.findCarVal.colors = '';
      state.findCarVal.gears = '';
      state.findCarVal.is4s = '';
      state.findCarVal.pifa = '';
      state.findCarVal.mileage = '';
      state.findCarVal.carKinds = '';
      state.findCarVal.bodType = '';
      state.findCarVal.factory = '';
      state.findCarVal.country = '';
      state.findCarVal.motor = '';
      state.findCarVal.devicetoken = '';
      state.findCarVal.newCar = '';
      state.findCarVal.appmobile = '';
      state.findCarVal.apptoken = '';
      state.findCarVal.keyword = '';
      state.findCarList = [];
    removeStore('findCar');
  },
}
let preventDefault = isP =>{
  let opts=null;
  let supportsPassive = false;
  let prevent=function(e){e.preventDefault();};
  try{
    opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
  }catch (e) {
    console.log(e)
  }
  if(isP){
    document.body.style.overflow = 'hidden';
    // document.addEventListener("touchstart",prevent,opts);
  }else{
    document.body.style.overflow = '';
    document.removeEventListener("touchstart",prevent,opts);
  }
};
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
