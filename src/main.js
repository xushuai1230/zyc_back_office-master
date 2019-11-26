// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

import fetch from './api/config/fetch';

import * as filter from './filters/index'
import '@/filters/filter'
import storage from './utils/storage'

// 引入 ElementUI 组件
import ElementUI from './plugins/ElementUI';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
import 'normalize.css'
import './styles/common/reset.less'
import './styles/common/common.less'
// 自定义校验器
import validator from './validator';
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.prototype.$_storage = storage;
Vue.prototype.validator = validator;
Vue.config.productionTip = false;
// axios({
//   method:"get",
//   url:"http://arrow.natappvip.cc/auth/current",
//   data:{}
// }).then((res)=>{
//   console.log(res)
//   if(res.code == 0) {

//   } else {
//     router.push('/login')
//   }
// })
// 全局过滤器引入
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
});
// 自定义拖动
// Vue.directive('drag',
//   function (el, binding) {
//     // 当前元素
//     let oDiv = el;
//     oDiv.onmousedown = function (e) {
//       e.preventDefault();
//       let bw = document.body.clientWidth;
//       let bh = document.body.clientHeight;
//       // 鼠标按下，计算当前元素距离可视区的距离
//       let disX = e.clientX - oDiv.offsetLeft;
//       let disY = e.clientY - oDiv.offsetTop;
//
//       // 计算两边坐标
//       document.onmousemove = function (e) {
//         let l = 0;
//         let t = 0;
//         // 拖动边界
//         if (e.clientX >= bw) {
//           l = bw - disX;
//         } else if (e.clientX <= 0) {
//           l = 0 - disX;
//         } else {
//           l = e.clientX - disX;
//         }
//         if (e.clientY >= bh) {
//           t = bh - disY;
//         } else if (e.clientY <= 0) {
//           t = 0 - disY;
//         } else {
//           t = e.clientY - disY;
//         }
//         // 移动当前元素
//         oDiv.style.left = l + 'px';
//         oDiv.style.top = t + 'px';
//       };
//       // 鼠标停止移动时，事件移除
//       document.onmouseup = function (e) {
//         document.onmousemove = null;
//         document.onmouseup = null;
//       };
//     };
//   }
// );

/* eslint-disable no-new */
new Vue({
  router,
  fetch,
  render: h => h(App)
}).$mount('#app');
