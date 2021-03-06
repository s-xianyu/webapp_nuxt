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
 * 删除数组中当前对象
 */
let removeArrSame = (arr,val) =>{
  arr.map( (key,index) =>{
    if(key === val){
      return arr.splice(index, 1);
    }
  })
};
Vue.prototype.$removeArrSame = removeArrSame;
/**
 * 字符窜转时间
 * 传值方式： YYYY-MM-DD HH:mm -->2019-07-03 15:00
 * 传值方式： YYYY-MM-DD -->2019-07-03
 */
let forTime = (formater,t) =>{
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g,Y)
    .replace(/YY|yy/g,Y.substr(2,2))
    .replace(/MM/g,(M<10?'0':'') + M)
    .replace(/DD/g,(D<10?'0':'') + D)
    .replace(/HH|hh/g,(H<10?'0':'') + H)
    .replace(/mm/g,(m<10?'0':'') + m)
    .replace(/ss/g,(s<10?'0':'') + s)
};
Vue.prototype.$forTime = forTime;


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

/*
* 当前年份获取
*/
let getYear = (year) =>{
  return (new Date().getFullYear()-year);
};
Vue.prototype.$getYear = getYear;

/*
 *置顶
 */
let scrollTop = (currentY, targetY) => {
  // 获取当前位置方法
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop

  // 计算需要移动的距离
  let needScrollTop = targetY - currentY
  let _currentY = currentY
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollTop(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
};
Vue.prototype.$scrollTop = scrollTop;


