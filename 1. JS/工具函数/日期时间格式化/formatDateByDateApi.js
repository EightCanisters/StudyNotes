import Vue from 'vue';

/* filter 参数
 formatTimeValue | formatTime(type,splitStr);
 formatTimeValue | formatTime  // yy-mm-dd;
 formatTimeValue | formatTime(2,'-')  // yy-mm-dd hh:mm:ss;
 formatTimeValue | formatTime(1,'-')  // yy-mm-dd;
 */
Vue.filter('formatTime', (time, type, splitStr) => {
  if (/^\d*$/.test(time)) {
    time -= 0;
  }
  const date = new Date(time);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
  const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  const ms = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const ss = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`;
  const formatType = type || 1;
  const formatSplitStr = splitStr || '-';
  let returnStr = '';
  if (formatType === 1) {
    returnStr = year + formatSplitStr + month + formatSplitStr + day;
  } else if (formatType === 2) {
    returnStr = `${year + formatSplitStr + month + formatSplitStr + day} ${hour}:${ms}:${ss}`;
  }
  return returnStr;
});

/**
 * @Author    李鹏
 * @email     542416615@qq.com
 * @DateTime  2018-08-11
 * @copyright [换算人民币]
 * @param     {[Number]}         number      [要转换的数字]
 * @param     {[Boolean]}        minus       [要转换的数字]
 * @return    {[String]}                     [转换后的字符串]
 */
Vue.filter('rmb', (number, minus) => {
  const numberToString = `${number}`;


  let result = ''; // 第一位否有是减号

  if (minus) { // 负数
    result = `${'-' + '' + '￥'}${numberToString}`;
  } else { // 正数
    result = `￥${numberToString}`;
  }

  return result;
});

/**
 * @Author    李鹏
 * @email     542416615@qq.com
 * @DateTime  2018-08-11
 * @copyright [除法]
 * @param     {[number]}         number [数字]
 * @param     {[number]}         ratio  [比例]
 * @return    {[number]}                [结果]
 */
Vue.filter('div', (number, ratio) => {
  const max = 10000000;

  return number * max / ratio / max;
});

/**
 * @DateTime  2018-08-11
 * @copyright [除法]
 * @param     {[number]}
 */
Vue.filter('toFixed', (str, num) => (str - 0).toFixed(num));

Vue.filter('balance', (balance) => {
  if (!balance && balance !== 0) {
    return '--';
  }
  return (balance / 100);
});
