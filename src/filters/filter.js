import Vue from 'vue';
Vue.filter('formatDate', function (value, type) {
  let now = new Date(value)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  month = supplement(month)
  var date = now.getDate();
  date = supplement(date)
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();

  let date1 = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  type = year + "-" + month + "-" + date
  return type
});
Vue.filter('formatDate1', function (value, type) {
  let now = new Date(value)
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  month = supplement(month)
  var date = now.getDate();
  date = supplement(date)
  var hour = now.getHours();
  hour = supplement(hour)
  var minute = now.getMinutes();
  minute = supplement(minute)
  var second = now.getSeconds();
  second = supplement(second)

  let date1 = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  type = year + "-" + month + "-" + date
  return date1
});
var supplement = value => {
  return value < 10 ? '0' + value : value;
};
Vue.filter('operation', function (value, type) {
  if (value == 0) {
    type = '待审核'
    return type
  } else if (value == 1) {
    type = '审核通过'
    return type
  } else if (value == 2) {
    type = '审核不通过'
    return type
  }

})