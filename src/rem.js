// 设置 rem 函数
function setRem() {
  //根据iphone 6的大小计算
  // 375 默认大小50px; 375px = 7.5rem ;每个元素px基础上/50
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  // eslint-disable-next-line no-unused-expressions
  htmlWidth > 750 ? htmlWidth=750 : null;
  //得到html的Dom元素
  let htmlDom = document.getElementsByTagName('html')[0];
  //设置根元素字体大小
  let l=100 * Math.min(window.document.documentElement.getBoundingClientRect().width, 750)/750;
  htmlDom.style.fontSize = l + 'px';
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}