(function (e, t) {
  let r = e.documentElement
  let o = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let i = function () {
    var e = r.clientWidth
    if (!e) { return }
    if (e >= 1240) {
      r.style.fontSize = '100px'
    } else {
      r.style.fontSize = 100 * (e / 1240) + 'px'
    }
  }
  if (!e.addEventListener) return
  t.addEventListener(o, i, false)
  e.addEventListener('DOMContentLoaded', i, false)
})(document, window)
