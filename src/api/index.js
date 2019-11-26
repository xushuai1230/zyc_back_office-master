

import fetch from './config/fetch'
// 接口统一管理
let BASE_PATH = '';

if (process.env.NODE_ENV === 'production') {
  BASE_PATH = 'http://10.100.101.66:8883'
} else {
  BASE_PATH = 'http://10.100.101.66:8883'
};

export const login = fetch({
  url: `${BASE_PATH}/auth/login`,
  method: 'post',
});
export const userUpdPwd = fetch({
  url: `${BASE_PATH}/api/user/pwd/modify`,
  method: 'post'
});


export const loginOut = fetch({
  url:`${BASE_PATH}/auth/logout`,
  method:'get'
})
export const userList = fetch({
  url: `${BASE_PATH}/api/user/list`,
  method: 'get'
});



export const userAdd = fetch({
  url: `${BASE_PATH}/api/user/register`,
  method: 'post'
});
export const userEdit = fetch({
  url: `${BASE_PATH}/api/user/modify`,
  method: 'post'
});

export const userDel = fetch({
  url: `${BASE_PATH}/api/user/delete`,
  method: 'post'
});
export const resetPass = fetch({
  url: `${BASE_PATH}/api/user/pwd/reset`,
  method: 'post'
});


export const undwrtList = fetch({
  url: `${BASE_PATH}/order/list`,
  method: 'get'
});



export const orderDetail = fetch({
  url: `${BASE_PATH}/order/detail`,
  method: 'get'
});
export const getImgList = fetch({
  url: `${BASE_PATH}/imgs`,
  method: 'get'
});

export const getLcationAll = fetch({
  url: `${BASE_PATH}/api/user/location/all`,
  method: 'get'
});


export const getAudit = fetch({
  url: `${BASE_PATH}/order/audit`,
  method: 'post'
});