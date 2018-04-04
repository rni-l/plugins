window.onload = function() {
  var btn = document.querySelector('.btn')
  function hideBtn() {
    document.querySelector('input').value = '1'
    btn.style.display = 'none'
  }
  function showBtn() {
    document.querySelector('input').value = '2'
    btn.style.display = 'block'
  }
  Array.prototype.slice.call(document.querySelectorAll('input')).forEach(function(v) {
    v.addEventListener('focus', hideBtn, false)
    v.addEventListener('blur', showBtn, false)
  })
  var windheight = document.documentElement.clientHeight || document.body.clientHeight
  window.addEventListener('resize', function() {
    var docheight = document.documentElement.clientHeight || document.body.clientHeight
    if (docheight < windheight) {
      hideBtn()
    } else {
      showBtn()
    }
  }, false)
}