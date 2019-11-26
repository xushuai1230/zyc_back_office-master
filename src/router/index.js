/**
 * Created by wangqi on 2019/5/13 15:26
 */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { Message } from 'element-ui';

Vue.use(Router);

let base = '';
if (process.env.NODE_ENV === 'development') {
  base = '';
} else {
  base = '/membercenter';
}
// 生成路由实例
const router = new Router({
  // mode: 'history',
  base,
  routes
});
// 路由拦截权限
let indexScrollTop = 0;
// 浏览器后退标识
router.beforeEach((to, from, next) => {
  // 每次路由跳转都获取登录权限
  // if (to.path == '/index' && to.path != '/login') {
  //   const loginStatus = window.localStorage.getItem('type');
  //   if (loginStatus == "ROLE_ADMIN") {
  //     router.push({
  //       path: "/index"
  //     });
  //   } else if (loginStatus == "ROLE_NORMAL") {
  //     router.push({
  //       path: "/unAuditList"
  //     });
  //   }
  // }
  next();
  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  //   if (loginStatus === '1') { // 也可以通过vuex state获取当前的token是否存在
  //     if (to.path !== '/') {
  //       indexScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //     }
  //     next();
  //   } else {
  //     Message({
  //       message: '请先登录',
  //       duration: 2000
  //     });
  //     // 将跳转的路由path作为参数，登录成功后跳转到该路由
  //     next({
  //       path: '/login',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     });
  //   }
  // } else {
  //   next();
  // }
});

router.afterEach((to) => {
  // 路由跳转定位
  if (to.path !== '/') {
    window.scrollTo(0, 0);
  } else {
    Vue.nextTick(() => {
      window.scrollTo(0, indexScrollTop);
    });
  }
});
export default router;
