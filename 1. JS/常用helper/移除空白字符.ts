/**
 * 法一：replace正则匹配：移除空白字符
 * @param text 被操作的字符串
 * @param type 移除类型：all-移除所有；head-移除字符串左侧；tail-移除右侧；headAndTail-移除左右两侧
 * @returns 去除空白后的字符串
 */
export const removeWhiteSpaces = (text: undefined | string, type: 'all' | 'head' | 'tail' | 'headAndTail'): string => {
  let reg = /^\s*|\s*$/g;
  switch(type) {
    case 'all':
      reg = /\s*/g;
      break;
    case 'head':
      reg = /^\s*/;
      break;
    case 'tail':
      reg = /\s*$/g;
      break;
    case 'headAndTail':
      reg = /^\s*|\s*$/g;
      break;
    default:
      break;
  }
  return text ? text.replace(reg, '') : '';
};

/**
 * 法二：str.trim()方法
 * 作用：删除字符串两端的空白字符并返回，trim方法并不影响原来的字符串本身，它返回的是一个新的字符串。
 * 缺陷：只能去除字符串两端的空格，不能去除中间的空格
 */
const str = '           he  llo  ';
console.log(str.trim());//去除字符串开头和结尾的所有空格
console.log(str.trimLeft());//去除左边(开头)所有空格
console.log(str.trimRight());//去除右边(结尾)所有空格
