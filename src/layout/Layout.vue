<template>
  <div class="app-container">
    <Header @modify="modify"></Header>
    <div class="main" :class="{'opened':!isCollapse}">
      <div class="main-container">
        <app-main></app-main>
      </div>
    </div>
    <div :class="{'mask':ismask}" v-if="ismask">
      <span class="modifypwd">
        <i></i>
      </span>
      <div class="font">
        <p>请点击“修改密码”功能及时修改初始密码！</p>
        <a href="javascript:;" @click="modify">去修改</a>
        <a href="javascript:;" class="none" @click="closeMask">下次再说</a>
      </div>
    </div>
    <form-dialog
      :title="title"
      :visible="delDialogVisible"
      v-if="delDialogVisible"
      class="small"
      @close="close"
      :modal="modal"
      :showClose="modal"
    >
      <div slot="contnet">
        <el-form ref="addDialog" :model="dialogForm" class="addDialogForm" :rules="dialogFormRules">
          <el-form-item label="原始密码：" prop="password">
            <el-input v-model="dialogForm.password" placeholder="请输入原始密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="passwordNew" class="tooltipBox">
            <el-input v-model="dialogForm.passwordNew" placeholder="请输入新密码"></el-input>
            <span class="tooltip">6~18个字符，可使用字母、数字、下划线，需以字母开头。</span>
          </el-form-item>
          <el-form-item label="新密码：" prop="DoublepasswordNew">
            <el-input v-model="dialogForm.DoublepasswordNew" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns" slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="modifypwd">确 定</el-button>
      </div>
    </form-dialog>
  </div>
</template>
<script>
import { Header, Menu, AppMain } from "./components/index";
import FormDialog from "../components/FormDialog/FormDialog";
import { userUpdPwd } from "@/api";

export default {
  name: "Main",
  components: {
    Header,
    Menu,
    AppMain,
    FormDialog
  },
  //    mixins: [ResizeMixin],
  data() {
    return {
      isCollapse: false,
      ismask: true,
      title: "修改密码",
      delDialogVisible: false,
      modal: false,
      dialogForm: {
        password: "",
        passwordNew: "",
        username: "",
        DoublepasswordNew: ""
      },
      dialogFormRules: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        passwordNew: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: this.validator.passWordeNum, trigger: "blur" }
        ],
        DoublepasswordNew: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: this.validator.passWordeNum, trigger: "blur" },
          { validator: this.DoublepasswordNew, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.dialogForm.username = window.localStorage.getItem("username");
    if (window.localStorage.getItem("isNeedModify") == "0") {
      this.ismask = true;
    } else {
      this.ismask = false;
    }
  },
  methods: {
    modify() {
      this.ismask = false;
      this.delDialogVisible = true;
      (this.dialogForm.password = ""),
        (this.dialogForm.passwordNew = ""),
        (this.dialogForm.DoublepasswordNew = "");
    },
    closeMask() {
      this.ismask = false;
    },
    close() {
      this.delDialogVisible = false;
    },
    modifypwd() {
      this.$refs.addDialog.validate(valid => {
        if (this.dialogForm.passwordNew != this.dialogForm.DoublepasswordNew) {
          this.$message({
            type: "warning",
            message: "两次密码不同"
          });
        } else {
          if (valid) {
            userUpdPwd({
              newPassword: this.dialogForm.passwordNew,
              oldPassword: this.dialogForm.password,
              username: this.dialogForm.username
            })
              .then(res => {
                console.log(res);
                if (res.code == "0") {
                  this.delDialogVisible = false;
                  this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.msg,
                    type: "warning"
                  });
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      });
    },
    DoublepasswordNew(rule, value, callback) {
      if (!value && value !== 0) {
        callback();
        return;
      }
      if (value !== this.dialogForm.passwordNew) {
        callback(new Error("输入新密码有误！"));
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="less">
@import "Layout";
/*@import "components/TagsView/TagsView";*/
</style>
