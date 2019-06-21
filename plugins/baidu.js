/*
** 只在生产模式的客户端中使用
*/
if (process.client && process.env.NODE_ENV === 'production') {
  /*
  ** baidu 统计分析脚本
  */
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5b941f460f2ec63730c9f325ba44961m";
    hm.id = "baidu_tj";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

export default ({ app: { router }, store }) => {
  /*
  ** 每次路由变更时进行pv统计
  */
  if (process.client && process.env.NODE_ENV === 'production') {
    router.afterEach((to, from) => {
      var _hmt = _hmt || [];
      (function() {
        document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?5b941f460f2ec63730c9f325ba44961m";
        hm.id = "baidu_tj";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    })
  }
}
