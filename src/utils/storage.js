export default {
  /**
   * 存储localStorage
   */
  setLocalStore:(name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  /**
   * 获取localStorage
   */
  getLocalStore: name => {
    if (!name) return;
    // return JSON.parse(window.localStorage.getItem(name));
    if(window.localStorage.getItem(name) != "undefined"){
      return JSON.parse(window.localStorage.getItem(name));
    }
  },
  /**
   * 删除localStorage
   */
  removeLocalStore: name => {
    if (!name) return;
    window.localStorage.removeItem(name);
  },
  /**
   * 清空localStorage
   */
  emptyLocalStorage:function (){
    window.localStorage.clear();
  },
  /**
   * 存储sessionStorage
   */
  setSessionStore:(name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
  },
  /**
   * 获取sessionStorage
   */
  getSessionStore: name => {
    if (!name) return;
    return JSON.parse(window.sessionStorage.getItem(name));
  },
  /**
   * 删除sessionStorage
   */
  removeSessionStore:name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
  },
  /**
   * 清空sessionStorage
   */
  emptySessionStorage:function (){
    window.sessionStorage.clear();
  },
};
