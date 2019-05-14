import Vue from 'vue'
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  return window.localStorage.getItem(name)
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
};

/**
 *登录框
 */
let wapLogin = function(obj){
  debugger
  let defaults = {
    msg:'', //标题文案
    beforeCallback:null, ////登陆前的回调,如果有,需要返回值true:继续登陆;false:停止后续登陆操作
    checkedCallbac:null, //手机登陆回调
    successCallback:null, //成功回调
  };
  let opt = Object.assign(defaults,obj);
  if(typeof obj.beforeCallback === 'function'){
    obj.beforeCallback();
  }
  setTimeout(()=>{
    if(typeof obj.successCallback === 'function'){
      obj.successCallback();
    }
  },10000)
};
Vue.prototype.$login = wapLogin;

/**
 * APP下载
 */
let hxWaptoapp = (options) =>{
  let defaults = {
      appLink: 'myapp://www.hx2car.com',
//              itunesLink: 'https://itunes.apple.com/cn/app/hua-xia-er-shou-che/id629583556',
//              androidLink: 'http://static.hx2cars.com/resource/android/hx2car.apk'
      itunesLink: 'http://www.hx2car.com/help/appdown.htm',
      androidLink: 'http://www.hx2car.com/help/appdown.htm'
    },
    index = -1,
    str = '',
    downloadUrl;
  let opt = Object.assign({}, defaults, options);

  let t = new Date();
  if (hxBrowercheck('iphone os') || hxBrowercheck('ipad')) {
    location.href = opt.appLink;
    downloadUrl = opt.itunesLink;
  } else {
    // if($.hxBrowercheck('micromessenger') || $.hxBrowercheck('QQ')){
    //     downloadUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hx.ui'
    // } else {
    let n = document.createElement("iframe");
    n.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;";
    n.src = opt.appLink;
    downloadUrl = opt.androidLink;
    $('body').append(n);
    // t = new Date();
    // }
  }

  setTimeout(function () {
    let e = new Date();
    if (1535 > e - t) {
      location.href = downloadUrl;
    }
  }, 1500);
};
Vue.prototype.$hxWaptoapp = hxWaptoapp;

/**
 * 浏览器检测
 */
let hxBrowercheck = (keyword)=> {
  debugger
  let ua = navigator.userAgent.toLowerCase();
  let testreg = new RegExp(eval('/' + keyword + '/i'));
  if (ua.match(testreg) == keyword) {
    return true;
  } else {
    return false;
  }
};
Vue.prototype.$hxBrowercheck = hxBrowercheck;

/**
 * 手机号码11位验证
 */
let phoneReg = (phone) =>{
  let reg =  /^1\d{10}$/;
  if(reg.test(phone)){
    return false;
  }else{
    return true;
  }
};
Vue.prototype.$phoneReg =phoneReg;

/*
*返回到指定一步
*/
let history = (val) =>{
  window.history.go(val);
};
Vue.prototype.$history = history;

/*
*获取URL参数
*/
let getQueryString = (name) =>{
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};
Vue.prototype.$getQueryString = getQueryString;

