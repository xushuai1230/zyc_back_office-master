<template>
  <div class="main">
    <div class="personAdmin">
      <div class="searchBox">
        <el-form ref="form" :model="personForm" label-width="80px" class="searchForm">
          <el-form-item label="姓名：">
            <el-input v-model="personForm.userName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="工号：">
            <el-input v-model="personForm.userCode" placeholder="请输入工号"></el-input>
          </el-form-item>
          <el-form-item label="部门：">
            <el-input v-model="personForm.comCode" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item class="serchBtn">
            <el-button type="primary" @click="serchTable()">查 询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--表格-->
      <div class="tableTitle">
        <h2>人员列表</h2>
        <i class="dashedBorder"></i>
        <span @click="addFn">
          <i></i>
          添加
        </span>
      </div>
      <div class="tableTotal">
        <el-table :data="tableData" style="width: 100%" stripe border>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
            <template slot-scope="scope">
              <!--              <i class="el-icon-time"></i>-->
              <span style="margin-left: 10px" @click="seeFn(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="workNumber" label="工号" align="center"></el-table-column>
          <el-table-column prop="gender" label="性别" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.gender=='1'?'男':'女'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>

          <el-table-column prop="areaName" label="区域" align="center"></el-table-column>
          <el-table-column prop="department" label="机构" align="center"></el-table-column>
          <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <span class="point" @click="modify(scope.row)">编辑</span>
              <span class="point" @click="deleteUser(scope.row.workNumber)">删除</span>
              <span class="point" @click="modifyPwd(scope.row.workNumber)">重置密码</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationClass">
          <el-pagination
            class="text-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!--add-->
    <form-dialog
      :title="title"
      :visible="addDialogVisible"
      v-if="addDialogVisible"
      @close="close"
      :modal="modal"
    >
      <div slot="contnet">
        <el-form
          ref="addDialog1"
          :model="addDialogForm"
          class="addDialogForm"
          :rules="addDialogRules"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item :span="6" label="姓名：" prop="userName">
                <el-input v-model="addDialogForm.userName" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :span="6" label="工号：" prop="userCode">
                <el-input v-model="addDialogForm.userCode" placeholder="请输入工号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="区域：" prop="areaCode">
                <el-select v-model="addDialogForm.areaCode" placeholder="请选择业务员所在区域" class="jigouS">
                  <el-option
                    v-for="(item,index) in comCodeOption"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号：" prop="mobile">
                <el-input v-model="addDialogForm.mobile" placeholder="请输入业务员11位手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex" class="wid200">
                <!--            <el-radio v-model="addDialogForm.sex" label="1">男</el-radio>-->
                <!--            <el-radio v-model="addDialogForm.sex" label="2">女</el-radio>-->
                <Gender @changSex="activeIdx"></Gender>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构：" prop="makeComName">
                <el-select
                  v-model="addDialogForm.makeComName"
                  placeholder="请输入业务员所在部门"
                  class="jigouS"
                >
                  <el-option
                    v-for="(item,index) in componentArr"
                    :key="index"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="addDialogForm.email" placeholder="请输入业务员邮箱"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!-- <el-form-item label="部门：" prop="makeComName">
                <el-input v-model="addDialogForm.makeComName" placeholder="请输入业务员所在部门"></el-input>
              </el-form-item>-->
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="btns" slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </form-dialog>
    <!--see-->
    <form-dialog :title="seetitle" :visible="seeDialogVisible" @close="close" :modal="modal">
      <div slot="contnet">
        <el-form ref="addDialog" :model="seeDialogForm" class="addDialogForm">
          <el-form-item label="姓名：" prop="userName">
            <el-input v-model="seeDialogForm.userName" readonly></el-input>
          </el-form-item>
          <el-form-item label="工号：" prop="userCode">
            <el-input v-model="seeDialogForm.userCode" readonly></el-input>
          </el-form-item>
          <el-form-item label="区域：" prop="areaCode">
            <el-input v-model="seeDialogForm.areaCode" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sexName" class="wid200">
            <el-input v-model="seeDialogForm.sexName" readonly></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="seeDialogForm.mobile" readonly></el-input>
          </el-form-item>
          <el-form-item label="部门：" prop="makeComName">
            <el-input v-model="seeDialogForm.makeComName" readonly></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="seeDialogForm.email" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="btns" slot="footer">
        <el-button type="primary" @click="close">关 闭</el-button>
      </div>
    </form-dialog>

    <!--del-->
    <form-dialog
      :title="deltitle"
      :visible="delDialogVisible"
      class="small"
      @close="close"
      :modal="modal"
    >
      <div slot="contnet">
        <p class="fontStyle">{{message}}</p>
      </div>
      <div class="btns" slot="footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="sureDelClose">确 定</el-button>
      </div>
    </form-dialog>

    <!--delSuccess-->
    <form-dialog
      :title="delSuccesstitle"
      :modal="modal"
      :visible="delSuccessDialogVisible"
      class="small"
      @close="close"
    >
      <div slot="contnet">
        <i class="el-icon-check iconSuccess"></i>
        <p class="fontStyle iconSuc">{{messageSuccess}}</p>
      </div>
      <div class="btns" slot="footer">
        <el-button type="primary" @click="close">确 定</el-button>
      </div>
    </form-dialog>
  </div>
</template>

<script>
import FormDialog from "../../components/FormDialog/FormDialog.vue";
import Gender from "../../components/Gender/Gender.vue";
import {
  userList,
  resetPass,
  userDel,
  userAdd,
  userEdit,
  getLcationAll
} from "@/api";
export default {
  components: {
    FormDialog,
    Gender
  },
  data() {
    return {
      title: "添加人员",
      seetitle: "人员信息详情",
      delSuccesstitle: "删除成功",
      messageSuccess: "",
      modal: true,
      deltitle: "",
      personForm: {
        userName: "",
        userCode: "",
        comCode: ""
      },
      total: 0,
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 30, 40, 50, 100],
      tableData: [],
      addDialogVisible: false,
      seeDialogVisible: false,
      delDialogVisible: false,
      message: "",
      delSuccessDialogVisible: false,
      comCodeOption: [],
      addDialogForm: {
        userName: "",
        userCode: "",
        areaCode: "",
        mobile: "",
        sex: 1,
        sexName: "",
        makeComName: "",
        email: ""
      },
      seeDialogForm: {
        userName: "",
        userCode: "",
        areaCode: "",
        mobile: "",
        sex: 1,
        sexName: "",
        makeComName: "",
        email: ""
      },
      addDialogRules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: ["blur", "change"] }
        ],
        userCode: [
          { required: true, message: "请输入工号", trigger: ["blur", "change"] }
        ],
        areaCode: [
          { required: true, message: "请选择业务员所在区域", trigger: "change" }
        ],
        mobile: [
          {
            required: true,
            message: "请输入业务员11位手机号",
            trigger: ["blur", "change"]
          }
        ],
        makeComName: [
          {
            required: true,
            message: "请输入部门",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          }
        ]
      },
      componentArr: [
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        },
        {
          name: "",
          code: ""
        }
      ]
    };
  },
  mounted() {
    this.validator.addEnterEvent(this.serchTable);
    this.getUserList();
    this.getLocaltionAll();
  },
  methods: {
    close(item) {
      this.addDialogVisible = false;
      this.seeDialogVisible = false;
      this.delDialogVisible = false;
      this.delSuccessDialogVisible = false;
    },
    getUserList() {
      userList({
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        name: this.personForm.userName,
        workNumber: this.personForm.userCode,
        department: this.personForm.comCode
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.tableData = [];
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    getLocaltionAll() {
      getLcationAll({}).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.comCodeOption = res.data;
        }
      });
    },
    seeFn(item) {
      const vm = this;
      vm.serch({ userCode: item.userCode })
        .then(val => {
          if (val) {
            vm.seeDialogVisible = true;
            vm.seeDialogForm = val[0];
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    modify(item) {
      const vm = this;
      console.log(item);
      vm.addDialogVisible = true;
      this.title = "修改人员";
      this.addDialogForm.userName = item.name;
      this.addDialogForm.userCode = item.workNumber;
      this.addDialogForm.areaCode = item.areaCode;
      this.addDialogForm.mobile = item.mobile;
      this.addDialogForm.sex = item.gender;
      this.addDialogForm.makeComName = item.department;
      this.addDialogForm.email = item.email;
      this.addDialogForm.id = item.workNumber;
    },
    addFn() {
      this.addDialogVisible = true;
      this.title = "添加人员";
      this.addDialogForm.userName = "";
      this.addDialogForm.userCode = "";
      this.addDialogForm.areaCode = "";
      this.addDialogForm.mobile = "";
      this.addDialogForm.sex = 1;
      this.addDialogForm.makeComName = "";
      this.addDialogForm.email = "";
    },
    deleteUser(val) {
      console.log(val);
      this.$confirm("您确定要删除所选人员吗?", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userDel({
            id: val
          })
            .then(res => {
              if (res.code == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.getUserList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    sureDelClose() {
      this.delSuccessDialogVisible = true;
      if (this.deltitle === "重置密码提示") {
        // this.delSuccesstitle = '重置成功';
        // this.messageSuccess = '密码已成功重置为：111111'
        userUpdPwd({
          psaaword: "",
          passwordNew: "111111"
        })
          .then(res => {
            if (res.data.resultCode == "0000") {
              this.$message({
                showClose: true,
                message: res.data.resultMsg,
                type: "success"
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.delSuccesstitle = "删除成功";
        this.messageSuccess = "删除成功 !";
      }
    },
    modifyPwd(val) {
      // this.deltitle = '重置密码';
      // this.delDialogVisible = true;
      // this.message= "您确定要重置该人员密码吗？"
      this.$confirm("是否确认重置密码", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resetPass({
            id: val
          }).then(res => {
            console.log(res);
            if (res.code == "0") {
              this.$message({
                type: "success",
                message: "重置成功"
              });
            }
          });
        })
        .catch(_ => {});
    },
    serch(data) {
      return new Promise((resolve, reject) => {
        userQuery({
          ...data
        })
          .then(response => {
            const resultCode = response.data.resultCode;
            const body = response.data.content;
            if (resultCode === "0000") {
              body.forEach(item => {
                item.sex == 1
                  ? this.$set(item, "sexName", "男")
                  : this.$set(item, "sexName", "女");
              });
              resolve(body);
            } else {
              /*初始化*/
              const message = response.data.resultMsg;
              vm.$message(message);
            }
          })
          .catch(errow => {
            console.log(errow.message);
          });
      });
    },
    serchTable() {
      const vm = this;
      this.getUserList();
    },
    addUser() {
      if (this.title == "添加人员") {
        /*添加*/
        // this.addDialogForm
        this.$refs.addDialog1.validate(valid => {
          console.log(valid);
          if (valid) {
            userAdd({
              id: "",
              name: this.addDialogForm.userName,
              workNumber: this.addDialogForm.userCode,
              gender: this.addDialogForm.sex,
              mobile: this.addDialogForm.mobile,
              department: this.addDialogForm.makeComName,
              email: this.addDialogForm.email,
              provinceCode: this.addDialogForm.areaCode
            })
              .then(res => {
                console.log(res);
                if (res.code == "0") {
                  this.addDialogVisible = false;
                  this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                  this.getUserList();
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      } else {
        /*修改*/
        userEdit({
          id: this.addDialogForm.id,
          name: this.addDialogForm.userName,
          workNumber: this.addDialogForm.userCode,
          gender: this.addDialogForm.sex,
          mobile: this.addDialogForm.mobile,
          department: this.addDialogForm.makeComName,
          email: this.addDialogForm.email,
          provinceCode: this.addDialogForm.areaCode
        })
          .then(res => {
            if (res.code == "0") {
              this.addDialogVisible = false;
              this.$message({
                type: "success",
                message: "编辑成功"
              });
              this.getUserList();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    activeIdx(sex) {
      sex ? (this.addDialogForm.sex = 2) : (this.addDialogForm.sex = 1);
    },
    //分页 每页条数
    handleSizeChange(val) {
      console.log("每页条数", val);
      this.pageSize = val;
      this.getUserList();
    },
    //当前页
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getUserList();
    }
  }
};
</script>

<style lang="less" scoped>
@import "index";
</style>
