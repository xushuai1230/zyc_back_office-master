<template>
  <div class="Box">
    <div class="contentBox">
      <div class="formBox">
        <h2 class="title">自助理赔审核管理系统</h2>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="loginForm">
          <el-form-item prop="username" class="user">
            <el-input type="text" placeholder="请输入工号" v-model.trim="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" class="password">
            <el-input @keyup.enter.native="loginFn" type="password" placeholder="请输入密码" v-model.trim="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login" @click="loginFn" :loading="loginLoading">
              登 录
              <!--              <i v-show="!isMaskShow"></i><i v-show="isMaskShow">正在登录...</i>-->
            </el-button>
            <p class="tool">如忘记密码，请联系管理员。</p>
          </el-form-item>
        </el-form>
        <!--        <div class="login">登&nbsp;&nbsp;录</div>-->
        <!--        <p></p>-->
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "@/api";

export default {
  name: "login",
  data() {
    return {
      user_isPass: false,
      pwd_isPass: false,
      loginLoading: false,
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginFn() {
      let obj = {
        username: "06000068",
        password: "987654321"
      };
      let vm = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginLoading = true;

          login(this.loginForm)
            .then(res => {
              console.log(res);
              if (res.code == "0") {
                window.localStorage.setItem("username", res.data.username);
                window.localStorage.setItem(
                  "isNeedModify",
                  res.data.isNeedModify
                );

                this.loginLoading = false;
                let adminShow = false;
                for (let i = 0; i < res.data.authorities.length; i++) {
                  if (res.data.authorities[i].authority == "ROLE_ADMIN") {
                    adminShow = true;
                  }
                }
                if (adminShow) {
                  /*管理员*/
                  window.localStorage.setItem("type", "ROLE_ADMIN");
                  this.$router.push({
                    path: "/index"
                  });
                } else {
                  window.localStorage.setItem("type", "ROLE_NORMAL");
                  this.$router.push({
                    path: "/unAuditList"
                  });
                }
              } else {
                this.loginLoading = false;
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
            })
            .catch(err => {
              console.log(err);

              this.loginLoading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "login";
</style>
