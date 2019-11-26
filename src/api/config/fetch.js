
import axios from 'axios'
import Qs from 'qs'
import { Loading, Message } from 'element-ui'
import router from '../../router'
let options = {
  lock: true,
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.5)'
}

// loading框设置局部刷新，且所有请求完成后关闭loading框
let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading() {
  loading = Loading.service(options)
}

function endLoading() {
  loading.close()
}

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

function hideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// 请求头
const headers = {
  'form': 'application/x-www-form-urlencoded',
  'json': 'application/json'
};

// 请求的拦截器 定义传参形式
axios.interceptors.request.use((config) => {
  showFullScreenLoading();
  // 判断请求的类型
  // 如果是 post 请求就把默认参数拼到 data 里面
  // 如果是 get 请求就拼到 params 里面
  config.withCredentials = true
  if (config.method === 'post') {
    const data = config.data;
    console.log(config)
    if (!config.responseType) {
      config.headers = {
        'Content-Type': headers.json,

      }
    } else {
      config.headers = {
        'Content-Type': headers.form
      }
    }
    config.data = {
      ...data
    }
  } else if (config.method === 'get') {
    config.params = {
      ...config.data
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// http response 服务器响应拦截器
axios.interceptors.response.use((response,Cookie) => {
  hideFullScreenLoading()
  console.log(Cookie)
  return response
}, (error) => {
  hideFullScreenLoading()
  if (error && error.response) {
    console.log(error.response.status)
    switch (error.response.status) {
      case 404:
        error.message = '抱歉，页面无法访问...'
        break
      case 500:
        error.message = '服务器开小差了，请稍后重试'
        break
      case 502:
        error.message = '抱歉，暂时服务不可用，请稍后重试'
        break
      case 503:
        error.message = '抱歉，暂时服务不可用，请稍后重试'
        break
      case 401:
        error.message = '请重新登录！'
        router.push('/login')
        break
      default:
        error.message = '系统繁忙，请稍后重试'
    }
    Message({
      message: error.message,
      duration: 2000
    })
  }
  return Promise.reject(error)
})

// 去除不存在值的属性
const dealElement = obj => {
  const param = {}
  if (obj === null || obj === undefined || obj === '') {
    return param
  }
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      param[key] = obj[key]
    }
  }
  return param
}
// 去除空格
const raplaceStrBody = str => {
  let strBody = String(str)
  if (strBody.indexOf(' ') > -1 || /\r\n/g.test(strBody)) {
    strBody = strBody.replace(' ', '')
    strBody = strBody.replace(/\r\n/g, '')
    strBody = raplaceStrBody(strBody)
  }
  return strBody
}
const afterHandle = (body, header, requestType, raplaceFlag) => {
  let bodyStr = JSON.stringify(dealElement(body))
  if (!raplaceFlag) {
    bodyStr = raplaceStrBody(bodyStr)
  }

  const jsonData = {
    ...JSON.parse(bodyStr)
  }
  return jsonData
}

async function axoisHttp(body, head, config) {
  const { url, method, responseType } = config
  const promise = await axios({
    url,
    method,
    responseType,
    data: afterHandle(body, head, config)
  })
  console.log(promise)
  return promise.data
}

export default function fetch(config) {
  return (body, head = { config }) => {
    let result = axoisHttp(body, head, config)
    return result
  }
}
