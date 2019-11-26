/**
 * 解决类名的兼容函数
 * classname: 所要找的类名
 * father: 通过父元素来找这个类名
 */
export const getClass = (classname, father) => {
  father = father || document;
  if (father.getElementsByClassName) {		//检测浏览器类型
    return father.getElementsByClassName(classname)		//火狐,谷歌
  } else {	//IE浏览器
    const bq = father.getElementsByTagName("*");		//获得所有标签
    const arr = [];
    for (var i = 0; i < bq.length; i++) {	//遍历所有标签
      if (check(bq[i].className, classname)) {	//if语句引入判断类名函数
        arr.push(bq[i])		//将标签赋值给数组
      }
    }
    return arr	//返回数组内标签
  }
};

function check(bq, classname) {
  const newarr = bq.split(" ");   //将标签多类名拆分成数组
  for (var i = 0; i < newarr.length; i++) {
    if (newarr[i] == classname) {	//遍历数组元素与类名比较
      return true
    }
  }
  return false
}

Number.prototype.toFixed = function (d) {
  var s = this + "";
  if (!d) d = 0;
  if (s.indexOf(".") == -1) s += ".";
  s += new Array(d + 1).join("0");
  if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
    var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
    if (a == d + 2) {
      a = s.match(/\d/g);
      if (parseInt(a[a.length - 1]) > 4) {
        for (var i = a.length - 2; i >= 0; i--) {
          a[i] = parseInt(a[i]) + 1;
          if (a[i] == 10) {
            a[i] = 0;
            b = i != 1;
          } else break;
        }
      }
      s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");
    }
    if (b) s = s.substr(1);
    return (pm + s).replace(/\.$/, "");
  }
  return this + "";
};
/**
 * 纯文本的兼容函数(获取与设置)
 * obj:对象
 * val: 要设置的内容(纯文字)
 */
export const getText = (obj, val) => {
  if (val != undefined) {
    if (obj.textContent) {	//FF,chrome
      obj.textContent = val;
    } else {	  //IE
      obj.innerText = val;
    }
  } else {	//val是空值,获取obj的内容
    if (obj.textContent) {	//FF,chrome
      return obj.textContent;
    } else {	  //IE
      return obj.innerText;
    }
  }
};


/**
 * 获取元素的兼容函数
 * selector:表示选择器，与css的选择器一样
 * father: 父容器
 */
export const $ = (selector, father) => {
  father = father || document
  if (typeof selector == "string") {
    selector = selector.replace(/^\s*|\s*$/g, "");
    //去除字符串左右的空格
    if (selector.charAt(0) == ".") {   //类名
      return getClass(selector.slice(1), father);   //截取
    }
    else if (selector.charAt(0) == "#") {   //id名
      return document.getElementById(selector.slice(1))
      //个人觉得id父级只能是document
    }
    else if (/^[a-zA-Z1-6]{1,6}$/.test(selector)) {   //标签
      //^$表示从开头到结尾匹配,[]表示或,{}表示长度,text表示检测方法
      return father.getElementsByTagName(selector)
    }
  } else if (typeof selector == "function") {
    window.onload = function () {
      selector();
    }
  }
};


/**
 * 获取子节点的兼容函数
 * father:表示选择器，与css的选择器一样
 * type:a类型,获取子元素集合,b类型,获取子元素和子文本集合
 */
export const getChild = (father, type) => {
  type = type || "b";  //默认是元素节点+文本节点
  const all = father.childNodes;
  const arr = [];
  for (var i = 0; i < all.length; i++) {
    if (type == "a") {  //元素节点
      if (all[i].nodeType == 1) {
        arr.push(all[i])
      }
    } else if (type == "b") {  //元素节点和文本节点
      if (all[i].nodeType == 1 || all[i].nodeType == 3
        && all[i].nodeValue.replace(/^\s*|\s*$/g, "") != '') {
        //当子节点的值清除左右空格后不是空文本
        arr.push(all[i])
      }
    }
  }
  return arr
};


/**
 * 获取子节点的第一个
 */
export const getFirstChild = (father, type) => {
  return getChild(father, type)[0];
};


/**
 * 获取子节点的最后一个
 */
export const getLastChild = (father, type) => {
  return getChild(father, type)[getChild(father, type).length - 1];
};


/**
 * 通过指定下标来获取子节点中的一个
 */
export const getTeChild = (father, type, num) => {
  return getChild(father, type)[num];
};


/**
 * 获取上一个兄弟节点的兼容函数
 * obj:一个元素节点
 */
export const getUp = (obj) => {
  var up = obj.previousSibling;
  if (up == null) {
    return false
  }
  while (up.nodeType == 8 || (up.nodeType == 3
    && up.nodeValue.replace(/^\s*|\s*$/g, '') == "")) {
    //当上一个节点是注释,或者是节点的值去除左右空格后是空文本
    up = up.previousSibling;
    if (up = null) {
      return false
    }
  }
  return up;
};


/**
 * 获取下一个兄弟节点的兼容函数
 * obj:一个元素节点
 */
export const getDown = (obj) => {
  var down = obj.nextSibling;
  if (down == null) {
    return false
  }
  while (down.nodeType == 8 || (down.nodeType == 3 && down.nodeValue.replace(/^\s*|\s*$/g, '') == "")) {
    //当下一个节点是注释,或者是节点的值去除左右空格后是空文本
    down = down.nextSibling;
    if (down == null) {
      return false
    }
  }
  return down;
};


/**
 * 在某个对象之后追加节点
 * newobj:需要追加的节点
 * beiobj:在这个节点后追加
 * father:父节点
 */
export const insertAfter = (newobj, beiobj, father) => {
  var nextobj = getDown(beiobj);
  if (nextobj) {   //如果某节点的下一个节点不是空值
    var nextobj = getDown(beiobj);
    return father.insertBefore(newobj, nextobj); //在nextobj之前追加节点
  } else {
    return father.appendChild(newobj); //在father中添加节点
  }
};


/**
 * 存储localStorage
 */
export const setLocalStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getLocalStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeLocalStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};


/**
 * 存储sessionStorage
 */
export const setSessionStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getSessionStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeSessionStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
};

/**
 * 获取style样式
 */
export const getStyle = (element, attr, NumberMode = 'int') => {
  var target;
  // scrollTop 获取方式不同，没有它不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop;
  } else if (element.currentStyle) {
    target = element.currentStyle[attr];
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr];
  }
  //在获取 opactiy 时需要获取小数 parseFloat
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target);
};

/**
 * 运动效果
 * @param {HTMLElement} element   运动对象，必选
 * @param {JSON}        target    属性：目标值，必选
 * @param {number}      duration  运动时间，可选
 * @param {string}      mode      运动模式，可选
 * @param {function}    callback  可选，回调函数，链式动画
 */
export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {
  clearInterval(element.timer);

  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration;
    duration = 400;
  } else if (duration instanceof String) {
    mode = duration;
    duration = 400;
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode;
    mode = 'ease-out';
  }

  //获取dom样式
  const attrStyle = attr => {
    if (attr === "opacity") {
      return Math.round(getStyle(element, attr, 'float') * 100);
    } else {
      return getStyle(element, attr);
    }
  };

  //根字体大小，需要从此将 rem 改成 px 进行运算
  const rootSize = parseFloat(document.documentElement.style.fontSize);

  const unit = {};
  const initState = {};

  //获取目标属性单位和初始样式值
  Object.keys(target).forEach(attr => {
    if (/[^\d^\.]+/gi.test(target[attr])) {
      unit[attr] = target[attr].match(/[^\d^\.]+/gi)[0] || 'px';
    } else {
      unit[attr] = 'px';
    }
    initState[attr] = attrStyle(attr);
  });

  //去掉传入的后缀单位
  Object.keys(target).forEach(attr => {
    if (unit[attr] == 'rem') {
      target[attr] = Math.ceil(parseInt(target[attr]) * rootSize);
    } else {
      target[attr] = parseInt(target[attr]);
    }
  });


  var flag = true; //假设所有运动到达终点
  const remberSpeed = {};//记录上一个速度值,在ease-in模式下需要用到
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      var iSpeed = 0;  //步长
      var status = false; //是否仍需运动
      var iCurrent = attrStyle(attr) || 0; //当前元素属性址
      var speedBase = 0; //目标点需要减去的基础值，三种运动状态的值都不同
      var intervalTime; //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
          break;
        case 'linear':
          speedBase = initState[attr];
          intervalTime = duration * 20 / 400;
          break;
        case 'ease-in':
          var oldspeed = remberSpeed[attr] || 0;
          iSpeed = oldspeed + (target[attr] - initState[attr]) / duration;
          remberSpeed[attr] = iSpeed
          break;
        default:
          speedBase = iCurrent;
          intervalTime = duration * 5 / 400;
      }
      if (mode !== 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      }
      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = iCurrent != target[attr];
          break;
        case 'linear':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        case 'ease-in':
          status = Math.abs(Math.abs(iCurrent) - Math.abs(target[attr])) > Math.abs(iSpeed);
          break;
        default:
          status = iCurrent != target[attr];
      }

      if (status) {
        flag = false;
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        } else {
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true;
      }

      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20);
};


// 获取距离y坐标
export const getOffsetTop = (dom) => {
  var top = dom.offsetTop;
  if (dom.offsetParent !== null) {
    top += getOffsetTop(dom.offsetParent);
  }
  return top;
};

// 获取距离x坐标
export const getOffsetLeft = (dom) => {
  var left = dom.offsetLeft;
  if (dom.offsetParent !== null) {
    left += getOffsetLeft(dom.offsetParent);
  }
  return left;
};


export const transDate = msec => {
  var date;
  if (msec) {
    var now = new Date(msec);
    var year = now.getFullYear(); //获取年份
    var month = now.getMonth() + 1; //获取月份
    var day = now.getDate(); //获取日期
    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }
    date = year + "-" + month + "-" + day;
  }
  return date;
}

export const judgeInputType = value => {
  var zhReg = /[\u0391-\uFFE5]+/;
  var enReg = /[A-Za-z]+/;
  // var zhEnReg = /[\u0391-\uFFE5_a-zA-Z]/;
  var isZh, isEn, isZhEn, lang = "zh";
  isZh = zhReg.test(value);
  isEn = enReg.test(value);
  // isZhEn = zhEnReg.test(value);
  if (isEn && !isZh) {
    lang = "en";
  } else if (isZh && !isEn) {
    lang = "zh";
  } else if (isZh && isEn) {
    lang = "zhen";
  }
  return lang
};

//判断是否是数字
/*
* obj必须是
* */
export const isNumber = obj => {
  return obj === +obj
};

//+
function add(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}

//减法
function sub(a, b) {
  var c, d, e;
  try {
    c = a.toString().split(".")[1].length;
  } catch (f) {
    c = 0;
  }
  try {
    d = b.toString().split(".")[1].length;
  } catch (f) {
    d = 0;
  }
  return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}

//*
function mul(a, b) {
  var c = 0,
    d = a.toString(),
    e = b.toString();
  try {
    c += d.split(".")[1].length;
  } catch (f) {
  }
  try {
    c += e.split(".")[1].length;
  } catch (f) {
  }
  return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}

//除
function div(a, b) {
  var c, d, e = 0,
    f = 0;
  try {
    e = a.toString().split(".")[1].length;
  } catch (g) {
  }
  try {
    f = b.toString().split(".")[1].length;
  } catch (g) {
  }
  return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

//
export const changeTable = (id) => {
  var tTD;
  var table = document.getElementById(id);
  let j;
  for (j = 0; j < table.rows[0].cells.length; j++) {
    table.rows[0].cells[j].onmousedown = function () {
      tTD = this;
      if (event.offsetX > tTD.offsetWidth - 10) {
        tTD.mouseDown = true;
        tTD.oldX = event.x;
        tTD.oldWidth = tTD.offsetWidth;
      }
    };
    table.rows[0].cells[j].onmouseup = function () {
      if (tTD == undefined) tTD = this;
      tTD.mouseDown = false;
      tTD.style.cursor = 'default';
    };
    table.rows[0].cells[j].onmousemove = function () {
      if (event.offsetX > this.offsetWidth - 10)
        this.style.cursor = 'col-resize';
      else
        this.style.cursor = 'default';
      if (tTD == undefined) tTD = this;
      if (tTD.mouseDown != null && tTD.mouseDown == true) {
        tTD.style.cursor = 'default';
        if (tTD.oldWidth + (event.x - tTD.oldX) > 0)
          tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
        tTD.style.width = tTD.width;
        tTD.style.cursor = 'col-resize';
        table = tTD;
        while (table.tagName != 'TABLE') table = table.parentElement;
        for (j = 0; j < table.rows.length; j++) {
          table.rows[j].cells[tTD.cellIndex].width = tTD.width;
        }
      }
    }
  }
}


export function dateOperate(interval, number, date) {
  switch (interval) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number)
      break
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3)
      break
    }
    case 'M': {
      date.setMonth(date.getMonth() + number)
      break
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7)
      break
    }
    case 'd': {
      date.setDate(date.getDate() + number)
      break
    }
    case 'h': {
      date.setHours(date.getHours() + number)
      break
    }
    case 'm': {
      date.setMinutes(date.getMinutes() + number)
      break
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number)
      break
    }
    default: {
      break
    }
  }
  return date
}
