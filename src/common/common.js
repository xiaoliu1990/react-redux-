/* eslint-disable eqeqeq */
let common = {
  screenHeight: () => {
    return document.documentElement.clientHeight;
  },
  intoView: () => {
    //微信内置浏览器浏览H5页面弹出的键盘遮盖文本框的解决办法
    if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
      window.setTimeout(function () {
        document.activeElement.scrollIntoViewIfNeeded();
      }, 1);
    };
    window.addEventListener('resize', function () {
      if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
        window.setTimeout(function () {
          document.activeElement.scrollIntoViewIfNeeded();
        }, 1);
      }
    });
  },
  isNull: (str) => {
    if (str === undefined || str === null || str === '' || str.length === 0) {
      return false;
    } else {
      return true;
    }
  },
  setTitle: (title) => {
    document.title = title;
    if (common.isIos()) {
      let i = document.createElement('iframe');
      i.style.display = 'none';
      let iCallback = function () {
        setTimeout(function () {
          i.removeEventListener('load', iCallback);
          document.body.removeChild(i);
        }, 1000);
      }
      i.addEventListener('load', iCallback);
      document.body.appendChild(i);
    }
  },
  hexToRGB: (hex) => {
    hex = hex[0] === '#' ? hex.slice(1) : hex
    hex = hex.length === 3 ? hex.repeat(2) : hex
    if ((hex.length !== 6) || !(/^[0-9a-fA-F]{3,6}$/i.test(hex))) return 'Invalid data'
    return `rgba(${[parseInt(hex[0] + hex[1], 16), parseInt(hex[2] + hex[3], 16), parseInt(hex[4] + hex[5], 16), 0.1]})`;
  },
  toChinesNum: (num) => {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; //changeNum[0] = '零'
    let unit = ['', '十', '百', '千', '万'];
    num = parseInt(num);
    let getWan = (temp) => {
      let strArr = temp.toString().split('').reverse();
      let newNum = '';
      for (let i = 0; i < strArr.length; i++) {
        newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum;
      }
      return newNum;
    }
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) noWan = '0' + noWan;
    return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
  },
  isIos: () => {
    let isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {
      return true;
    } else {
      return false;
    }
  },
  isAndroid: () => {
    let isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1; //android终端或者uc浏览器
    if (isAndroid) {
      return true;
    } else {
      return false;
    }
  },
  isWeixin: () => {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    let ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    // eslint-disable-next-line eqeqeq
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  },
  format: (time) => {
    let weekArray = ['日', '一', '二', '三', '四', '五', '六'];
    let year = '', mouth = '', mouthDate = '', week = '', date = '', day = '';
    year = time.getFullYear();// 获取年份
    mouth = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : ('0' + (time.getMonth() + 1));// 获取月份
    day = time.getDate() >= 10 ? time.getDate() : ('0' + time.getDate());// 获取日
    date = `${year}-${mouth}-${day}`// 获取日期
    mouthDate = `${year}-${mouth}` //获取日期月份
    week = weekArray[time.getDay()];//获取周
    return { date: date, mouth: mouthDate, week: week, day: day }
  },
  getDayAll: (start, end) => {
    let dateArr = [];
    let startArr = start.split('-'), endArr = end.split('-');
    let db = new Date(), de = new Date();
    db.setUTCFullYear(startArr[0], startArr[1] - 1, startArr[2]);
    de.setUTCFullYear(endArr[0], endArr[1] - 1, endArr[2]);
    let unixDb = db.getTime(), unixDe = de.getTime();
    for (let k = unixDb; k <= unixDe;) {
      dateArr.push(common.format(new Date(parseInt(k))));
      k = k + 24 * 60 * 60 * 1000;
    }
    return dateArr;
  }
}
export default common;