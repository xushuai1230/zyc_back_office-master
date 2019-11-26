<template>
  <div class="header-box">
    <div class="header">
      <img src="./img/logo.png" alt class="logo" />
      <span class="header-title">
        <i>|</i>
        自助理赔审核管理系统
      </span>
    </div>
    <div class="nav">
      <a
        href="javascript:;"
        class="nav-box"
        :class="{'active': activeIdx == 0 }"
        @click="toggle(0)"
      >
        <i></i>
        人员管理
      </a>
      <a
        href="javascript:;"
        class="nav-box"
        :class="{'active': activeIdx == 1 }"
        @click="toggle(1)"
      >
        <i class="isnone"></i>
        待审核
      </a>
      <a
        href="javascript:;"
        class="nav-box"
        :class="{'active': activeIdx == 2 }"
        @click="toggle(2)"
      >
        <i class="sure"></i>
        已审核
      </a>
    </div>
    <div class="until">
      <span>{{userName}}</span>
      <span class="modifypwd">
        <i></i>
        <a href="javascript:;" @click="modifyPwd">修改密码</a>
      </span>
      <span class="close">
        <i></i>
        <a href="#" @click="exit">退出系统</a>
      </span>
    </div>
  </div>
</template>

<script>
import { loginOut } from "@/api";
export default {
  data() {
    return {
      activeIdx: 0,
      userName: "",
      loginInfo: {
        //登录信息
        username: "",
        password: "",
        verificationCode: ""
      },
      userLogin: {
        userCode: "",
        userName: "",
        comCode: "",
        roles: null,
        type: null
      },
      entryParm: {
        orderBy: "",
        pageNo: 1,
        pageSize: 4,
        query: {
          inputdate: "",
          no: "",
          notifycontent: "",
          status: "",
          type: ""
        }
      },
      noticeList: [],
      text: "", // 内容
      textWidth: 0, // 字符长度
      isScroll: false, // 是否滚动
      isSystem: true, //是否显示
      clearTime: "", //清除定时器
      run: true //取消函数执行
    };
  },
  components: {},
  mounted() {
    this.userName = window.localStorage.getItem("userName");
    let queryRouter = this.$route.path;
    if (queryRouter == "/unAuditList" || queryRouter == "/unAuditDetail") {
      this.activeIdx = 1;
    } else if (queryRouter == "/AuditList") {
      this.activeIdx = 2;
    } else {
      this.activeIdx = 0;
    }
  },
  watch: {
    $route(to, from) {
      if (to.path == "/unAuditList" || to.path == "/unAuditDetail") {
        this.activeIdx = 1;
      } else if (to.path == "/AuditList") {
        this.activeIdx = 2;
      } else {
        this.activeIdx = 0;
      }

      if (to.path == "/index") {
        const loginStatus = window.localStorage.getItem("type");
        if (loginStatus == "ROLE_NORMAL") {
          this.$message({
            type:'warning',
            message:"暂无权限"
          })
          this.$router.push({
            path: from.path
          });
        }
      }
    }
  },
  methods: {
    modifyPwd() {
      this.$emit("modify");
    },
    exit() {
      loginOut().then(res => {
        console.log(res);
        if (res.code == "0") {
          localStorage.removeItem("isNeedModify");
          localStorage.removeItem("username");
          this.$router.push({ path: "/login" });
        }
      });
    },
    toggle(index) {
      this.activeIdx = index;
      if (index == 1) {
        this.$router.push({ path: "/unAuditList" });
      } else if (index == 2) {
        this.$router.push({ path: "/AuditList" });
      } else {
        this.$router.push({ path: "/index" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "header";
</style>
