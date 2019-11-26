/**
 * Created by yanhaijiang on 2017/10/23.
 */
/* eslint-disable */
/**
 * 加减乘除
 */
class BaseUtil {
  constructor() {

  }
  /**加法*/
  accAdd(arg1, arg2) {
    var r1;
    var r2;
    var m;
    var c;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace('.', ''));
        arg2 = Number(arg2.toString().replace('.', '')) * cm;
      } else {
        arg1 = Number(arg1.toString().replace('.', '')) * cm;
        arg2 = Number(arg2.toString().replace('.', ''));
      }
    } else {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', ''));
    }
    return (arg1 + arg2) / m;
  }

  /**减法*/
  accSub(arg1, arg2) {
    var r1;
    var r2;
    var m;
    var n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }

    // last modify by deeka //动态控制精度长度
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  };

  accDiv(arg1, arg2) { // 浮点数除法
    var t1 = 0;
    var t2 = 0;
    var r1;
    var r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) { }
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) { }
    // with (Math) {
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
    // }
  };

  accMul = function (arg1, arg2) { // 浮点数乘法
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) { }
    try {
      m += s2.split('.')[1].length;
    } catch (e) { }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
  };
}

export default BaseUtil;
