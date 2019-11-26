<template>
  <div class="main">
    <div class="personAdmin">
      <!--表格-->
      <div class="tableTitle">
        <h2>已审核列表</h2>
        <i class="dashedBorder"></i>
      </div>
      <div class="tableTotal">
        <el-table :data="tableData" show-overflow-tooltip style="width: 100%" stripe border>
          <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
          <el-table-column prop="provinceName" label="区域" align="center"></el-table-column>
          <el-table-column prop="registNoCi" label="交强险报案号" align="center">
             <template slot-scope="scope">
              <p>{{scope.row.registNoCi?scope.row.registNoCi:'----'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="registNoBi" label="商业险报案号" align="center">
             <template slot-scope="scope">
              <p>{{scope.row.registNoBi?scope.row.registNoBi:'----'}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="reportName" label="报案人" align="center"></el-table-column>
          <el-table-column prop="reportMobile" label="报案人电话" align="center"></el-table-column>
          <el-table-column prop="reportTime" label="报案时间" align="center">
             <template slot-scope="scope">
               <p>{{scope.row.reportTime | formatDate1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="operationName" label="审核人" align="center"></el-table-column>
          <el-table-column prop="operationTime" label="审核时间" align="center">
            <template slot-scope="scope">
               <p>{{scope.row.operationTime | formatDate1}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="审核结果" align="center">
            <template slot-scope="scope">
               <p>{{scope.row.status | operation(scope.row.status)}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope" class="elseFont">
              <span class="point" @click="isPass(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="paginationClass">
          <el-pagination
            class="text-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageArray"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormDialog from "../../components/FormDialog/FormDialog.vue";
import Gender from "../../components/Gender/Gender.vue";
import { undwrtList } from "@/api";

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
      deltitle: "",
      personForm: {
        name: "",
        code: "",
        groud: ""
      },
      tableData: [],
      addDialogVisible: false,
      seeDialogVisible: false,
      delDialogVisible: false,
      message: "",
      total: 0,
      currentPage: 1,
      pageArray: [10, 30, 40, 50, 100],
      pageSize: 10,
      delSuccessDialogVisible: false,
      comCodeOption: [
        {
          comcode: 1,
          comcname: "第一个"
        },
        {
          comcode: 2,
          comcname: "第二个"
        }
      ],
      addDialogForm: {
        name: "",
        code: "",
        groud: "",
        are: "",
        phone: "",
        sex: "",
        ground: "",
        email: ""
      },
      addDialogRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        code: [{ required: true, message: "请输入工号", trigger: "blur" }],
        are: [
          { required: true, message: "请选择业务员所在区域", trigger: "change" }
        ],
        phone: [
          {
            type: "number",
            required: true,
            message: "请输入业务员11位手机号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    const vm = this;
    this.getUndwrtList();
  },
  methods: {
    isPass(item) {
      this.$router.push({ path: "/unAuditDetail" });
    },
    getUndwrtList() {
      undwrtList({
        pageSize: this.pageSize,
        pageNo: this.currentPage,
        status: 1
      })
        .then(response => {
          console.log(response);
          if (response.code == "0") {
            this.tableData = []
            this.tableData = response.data.data;
            this.total = response.data.total;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分页 每页条数
    handleSizeChange(val) {
      console.log("每页条数", val);
      this.pageSize = val;
      this.getUndwrtList();
    },
    //当前页
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getUndwrtList();
    }
  }
};
</script>

<style lang="less" scoped>
@import "AuditList";
</style>
