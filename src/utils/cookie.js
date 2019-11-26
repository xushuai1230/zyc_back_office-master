export default {
  setCookie (name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  // 获取 Cookie
  getCookie:(key) => {
    const _key = encodeURIComponent(key);
    const cookies = document.cookie.split(';');
    for (var i = 0, len = cookies.length; i < len; i++) {
      const parts = cookies[i].split('=');
      const name = decodeURIComponent(parts.shift());
      var cookie = parts.join('=');
      const _tmp = name.replace(" ", "");
      if (_key == _tmp) {
        try {
          return decodeURIComponent(cookie);
        } catch (e) {
          //兼容历史base库中用escape编码的cookie
          cookie = unescape(cookie);
          Cookie.setCookie(_tmp, cookie);
          return cookie;
        }
      }
    }
    return '';
  },
  // 删除 Cookie
  delCookie:(name, domain, path) => {
    const expire = '; expires=Mon, 26 Jul 1997 05:00:00 GMT';
    if (typeof domain == 'undefined') {
      domain = '';
    } else {
      domain = '; domain=' + domain;
    }
    if (typeof path == 'undefined') {
      path = '';
    } else {
      path = '; path=' + path;
    }
    document.cookie = name + '=' + expire + domain + path;
  }
}

