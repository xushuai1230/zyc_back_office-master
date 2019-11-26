// 金额格式化过滤器
var formatMoney = (value, type) => {
  var moneyStr = '';
  if (value) {
    value = parseFloat(value).toFixed(2).split(".");
  } else {
    value = ['0', '00']
  }
  if (type === "integer") {
    moneyStr = "¥ " + value[0];
  } else if (type === "float") {
    moneyStr = value[1];
  } else if (type === "noIcon") {
    moneyStr = value[0] + "." + value[1];
  } else {
    moneyStr = "¥ " + value[0] + "." + value[1];
  }
  return moneyStr;
}

// 展示日期过滤器 (用于日期插件)
var transformData = value => {
  var dateStr = '';
  if (value === '请选择') {
    dateStr = '请选择';
  } else {
    const data = new Date(value);
    dateStr = data.toLocaleDateString();
  }
  return dateStr;
}

// 日期补零函数
var supplement = value => {
  return value < 10 ? '0' + value : value;
};

// 后台接受日期过滤器 (20170101)
var getDate = value => {
  var str = "";
  var date = new Date(value);
  str += supplement(date.getFullYear());//年
  str += supplement(date.getMonth() + 1);//月 月比实际月份要少1
  str += supplement(date.getDate());//日
  return str
};

// 后台接受日期过滤器 (2017-01-01)
var translatePolicyDate = (value, endDateFlag) => {
  var year = "";
  var month = "";
  var day = "";
  var str = "";
  var date = null;
  if (value.length === 19) {
    if (/ipad|iphone/i.test(navigator.userAgent)) {
      year = value.substring(0, 4);
      month = value.substring(5, 7) - 1;
      day = value.substring(8, 10);
      date = new Date(year, month, day);
    } else {
      date = new Date(value);
    }
  } else {
    date = new Date(value);
  }
  str += supplement(date.getFullYear()) + "-";// 年
  str += supplement(date.getMonth() + 1) + "-";// 月 月比实际月份要少1
  if (endDateFlag) {
    str += supplement(date.getDate() - 1);// 日
  } else {
    str += supplement(date.getDate());// 日
  }
  return str
};

// 业绩展示日期  (2017)
var sliceDate = value => {
  return value.slice(0, 4);
};

// 根据身份证号返回出生日期
var getBirthdatByIdNo = value => {
  var tmpStr = "";
  var strReturn = "";
  if ((value.length !== 15) && (value.length !== 18)) {
    strReturn = "输入的身份证号位数错误";
    return strReturn;
  }
  if (value.length === 15) {
    tmpStr = value.substring(6, 12);
    tmpStr = "19" + tmpStr;
    tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
    return tmpStr;
  }
  else {
    tmpStr = value.substring(6, 14);
    tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6);
    return tmpStr;
  }
};

// 根据身份证号返回性别
var getSexByIdNo = value => {
  var tmpStr = "";
  if (parseInt(value.substr(16, 1)) % 2 === 1) {
    tmpStr = "男";
  } else {
    tmpStr = "女";
  }
  return tmpStr;
};

// 将时间戳转换为标准时间格式
var stampDate = (value, endDateFlag) => {
  var str = "";
  var date = new Date(value);
  str += supplement(date.getFullYear()) + '-';//年
  str += supplement(date.getMonth() + 1) + '-';//月 月比实际月份要少1
  if (endDateFlag) {
    str += supplement(date.getDate() - 1);//日
  } else {
    str += supplement(date.getDate());//日
  }
  return str
};

// 把类似 20171001010101 转换成 2017-10-01 01:01:01 格式
var changeDateInfo = value => {
  if (value) {
    value = value.toString()
    return [value.slice(0, 4), value.slice(4, 6), value.slice(6, 8)].join('-')
    // ' ' + [value.slice(8,10),value.slice(10,12),value.slice(12,14)].join(':')
  } else return value
};

var numberToChinese = (number) => {
  var units = '个十百千万@#%亿^&~';
  var chars = '零一二三四五六七八九';
  var a = (number + '').split(''), s = [], t = this;
  if (a.length > 12) {
    throw new Error('too big');
  } else {
    for (var i = 0, j = a.length - 1; i <= j; i++) {
      if (j == 1 || j == 5 || j == 9) {//两位数 处理特殊的 1*
        if (i == 0) {
          if (a[i] != '1') s.push(chars.charAt(a[i]));
        } else {
          s.push(chars.charAt(a[i]));
        }
      } else {
        s.push(chars.charAt(a[i]));
      }
      if (i != j) {
        s.push(units.charAt(j - i));
      }
    }
  }
  //return s;
  return s.join('').replace(/零([十百千万亿@#%^&~])/g, function (m, d, b) {//优先处理 零百 零千 等
    b = units.indexOf(d);
    if (b != -1) {
      if (d == '亿') return d;
      if (d == '万') return d;
      if (a[j - b] == '0') return '零'
    }
    return '';
  }).replace(/零+/g, '零').replace(/零([万亿])/g, function (m, b) {// 零百 零千处理后 可能出现 零零相连的 再处理结尾为零的
    return b;
  }).replace(/亿[万千百]/g, '亿').replace(/[零]$/, '').replace(/[@#%^&~]/g, function (m) {
    return {'@': '十', '#': '百', '%': '千', '^': '十', '&': '百', '~': '千'}[m];
  }).replace(/([亿万])([一-九])/g, function (m, d, b, c) {
    c = units.indexOf(d);
    if (c != -1) {
      if (a[j - c] == '0') return d + '零' + b
    }
    return m;
  });
};
export {
  formatMoney,
  transformData,
  getDate,
  stampDate,
  sliceDate,
  getBirthdatByIdNo,
  getSexByIdNo,
  changeDateInfo,
  translatePolicyDate,
  numberToChinese,
}

