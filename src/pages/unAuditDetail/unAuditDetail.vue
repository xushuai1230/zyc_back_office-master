<template>
  <div class="main">
    <div class="slider">
      <el-menu
        unique-opened
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        @open="openSider"
      >
        <el-submenu :index="index+''" v-for="(item,index) in slderArr" :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              class="subText"
              @click="subTypeImg(item.type,subItem.type)"
              :index="k+''"
              v-for="(subItem,k) in item.data"
              :key="k"
            >{{subItem.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="contnet">
      <div class="carBox">
        <div class="swiperBox">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide
              v-for="(item,index) in carArr"
              :key="index"
              class="swiperListBox stop-swiping"
              v-if="carArr.length>0"
            >
              <img :src="item" :alt="item" class="img" />
            </swiper-slide>
            <swiper-slide
              v-if="carArr.length<=0"
              style="line-height:300px;text-align:center"
              class="swiperListBox stop-swiping"
            >
              <p>用户未上传图片</p>
            </swiper-slide>
            <div
              v-if="carArr.length>1"
              class="swiper-button-prev"
              @click="transtion(imgIndex,'jian')"
              slot="button-prev"
            >
              <i class="el-icon-arrow-left"></i>
            </div>
            <div
              v-if="carArr.length>1"
              class="swiper-button-next"
              slot="button-next"
              @click="transtion(imgIndex,true)"
            >
              <i class="el-icon-arrow-right"></i>
            </div>
          </swiper>
          <div v-if="carArr.length>0" class="footerBar">
            <span>{{imgTitle}}</span>
            <span class="page">{{imgIndex + 1}}/{{carArr.length}}</span>
            <div class="footerBarBtns">
              <i class="el-icon-zoom-in" @click="enlarge"></i>
              <i class="el-icon-zoom-out" @click="narrow"></i>
              <i class="el-icon-delete" @click="delCurrent"></i>
            </div>
          </div>
        </div>
        <div class="smallSwiper">
          <swiper :options="swiperOptionSmall" ref="mySwiper2">
            <!-- slides -->
            <swiper-slide
              v-if="carArr.length>0"
              v-for="(item,index) in carArr"
              :key="index"
              class="swiperSmallListBox"
            >
              <img :src="item" :alt="item" class="img" @click="transtion(index,false)" />
            </swiper-slide>
            <div
              v-if="carArr.length>1"
              class="swiper-button-prev"
              @click="transtion(imgIndex,'jian')"
              slot="button-prev"
            >
              <i class="el-icon-arrow-up"></i>
            </div>
            <div
              v-if="carArr.length>1"
              class="swiper-button-next"
              @click="transtion(imgIndex,true)"
              slot="button-next"
            >
              <i class="el-icon-arrow-down"></i>
            </div>
          </swiper>
        </div>
        <div class="examine" v-if="carArr.length>0">
          <div v-if="shenheBtn">
            <span>审核结果:</span>
            <el-radio v-model="examineForm.status" label="1">通过</el-radio>
            <el-radio v-model="examineForm.status" label="2">不通过</el-radio>
          </div>
          <div v-if="shenheBtn">
            <span>审核意见:</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="examineForm.descMessage"
            ></el-input>
          </div>
          <el-button type="primary" @click="subBtn" v-if="shenheBtn">确 定</el-button>
        </div>
      </div>

      <div class="carMessage">
        <div class="tableTitle">
          <h2>案件信息</h2>
        </div>
        <el-form ref="caseInfo" :model="caseInfoForm" class="caseInfoForm">
          <el-form-item label="商业险报案号：">
            <el-input v-model="caseInfoForm.registNoBi" readonly></el-input>
          </el-form-item>
          <el-form-item label="商业险保单号：">
            <el-input v-model="caseInfoForm.policyNoBI" readonly></el-input>
          </el-form-item>
          <el-form-item label="交强险报案号：">
            <span>{{caseInfoForm.registNoCi?caseInfoForm.registNoCi:'----'}}</span>
          </el-form-item>
          <el-form-item label="交强险保单号：" class="wid200">
            <span>{{caseInfoForm.policyNoCI?caseInfoForm.policyNoCI:'----'}}</span>
          </el-form-item>
          <el-form-item label="被保险人：">
            <el-input v-model="caseInfoForm.insuredName" readonly></el-input>
          </el-form-item>
          <el-form-item label="被保险人电话：">
            <el-input v-model="caseInfoForm.insuredPhone" readonly></el-input>
          </el-form-item>
          <el-form-item label="车牌号：">
            <el-input v-model="caseInfoForm.licenseNo" readonly></el-input>
          </el-form-item>
          <el-form-item label="出险时间：">
            <span>{{caseInfoForm.accTime | formatDate1}}</span>
          </el-form-item>
          <el-form-item label="事故原因：">
            <el-input  type="textarea"  v-model="caseInfoForm.accReason" readonly></el-input>
          </el-form-item>
          <el-form-item v-if="shenheBtn" label="整体审核结果：">
            <el-radio v-model="allStatus" label="1">通过</el-radio>
            <el-radio v-model="allStatus" label="2">不通过</el-radio>
          </el-form-item>
          <el-form-item label="整体审核意见：" v-if="shenheBtn">
            <el-input
              class="allTextarea"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 2}"
              placeholder="请输入内容"
              v-model="allDescMessage"
            ></el-input>
          </el-form-item>
          <el-form-item label=" ">
            <el-button type="primary" v-if="shenheBtn" @click="allSubmit">确定</el-button>
          </el-form-item>
        </el-form>
        <div class="carMessageFooter" v-if="shenheBtn">
          <span @click="upOn">审核上一个赔案</span>
          <span @click="preNext">审核下一个赔案</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormDialog from "../../components/FormDialog/FormDialog.vue";
import Gender from "../../components/Gender/Gender.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { orderDetail, getImgList, getAudit, undwrtList } from "@/api";
import axios from "axios";
export default {
  components: {
    FormDialog,
    swiper,
    swiperSlide,
    Gender
  },
  data() {
    const vm = this;
    return {
      title: "添加人员",
      swiperOptionSmall: {
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: 5,
        watchSlidesVisibility: true, //防止不可点击
        observer: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {}
      },
      swiperOption: {
        initialSlide: 0,
        // effect: 'coverflow',
        // centeredSlides: true,
        observer: true,
        noSwiping: true,
        noSwipingClass: "stop-swiping",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 2,
          slideShadows: false
        },
        // autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },

        on: {
          transitionEnd(event) {
            let activIdx = this.activeIndex;
            vm.$refs.mySwiper2.swiper.slideTo(activIdx, 300, false);
          }
        }
      },
      slderArr: [],
      carArr: [],
      examineForm: {
        status: "",
        descMessage: ""
      },
      activeIndex: "0",
      caseInfoForm: {},
      detailsArr: [],
      detailsObj: {},
      allDescMessage: "",
      allStatus: "",
      imgIndex: 0,
      pageSize: 0,
      shenheBtn: false,
      imgTitle: ""
    };
  },
  mounted() {
    this.get0rderDetail();
    this.getImgList();
    if (this.$route.query.pageSize) {
      this.pageSize = Number(this.$route.query.pageSize);
      this.shenheBtn = true;
    } else {
      this.shenheBtn = false;
    }
    console.log(this.pageSize);
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    swiper2() {
      return this.$refs.mySwiper2.swiper;
    }
  },
  methods: {
    get0rderDetail() {
      let traceId = JSON.parse(localStorage.getItem("reportDetail")).traceId;
      orderDetail({
        traceId: traceId
      }).then(res => {
        console.log(res);
        this.caseInfoForm = res.data;
      });
    },
    getImgList() {
      let traceId = JSON.parse(localStorage.getItem("reportDetail")).traceId;
      let BASE_PATH = "";
      if (process.env.NODE_ENV === "production") {
        BASE_PATH ='http://10.100.101.66:8883';
      } else {
        BASE_PATH = 'http://10.100.101.66:8883';
      }

      let imgurl = BASE_PATH + "/imgs/" + traceId;
      console.log(traceId, imgurl, process.env.NODE_ENV, "88888");
      let vm = this;
      axios({
        method: "get",
        url: imgurl,
        data: {}
      }).then(res => {
        console.log(res);
        if (res.data.code == "0") {
          vm.slderArr = res.data.data;
          if (vm.slderArr[0].data.length > 0) {
            this.carArr = vm.slderArr[0].data[0].urls;
            this.imgTitle = vm.slderArr[0].data[0].name;
            this.detailsObj = {
              status: "",
              type: vm.slderArr[0].data[0].type,
              message: ""
            };
          } else {
            (this.carArr = ""),
              (this.imgTitle = ""),
              (this.detailsObj = {
                status: "",
                type: "",
                message: ""
              });
          }
        }
      });
    },
    subTypeImg(type, subType, index, k) {
      for (let i = 0; i < this.slderArr.length; i++) {
        if (this.slderArr[i].type == type) {
          for (let k = 0; k < this.slderArr[i].data.length; k++) {
            if (this.slderArr[i].data[k].type == subType) {
              this.detailsObj = {
                status: "",
                type: this.slderArr[i].data[k].type,
                message: ""
              };
              if (this.slderArr[i].data[k].urls) {
                this.carArr = this.slderArr[i].data[k].urls;
                this.carArr = Object.assign([], this.carArr);
              }
            }
          }
        }
      }
    },
    subBtn() {
      if (!this.examineForm.status) {
        this.$message({
          type: "warning",
          message: "请选择审核状态"
        });
      } else {
        if (!this.examineForm.descMessage.trim()) {
          this.$message({
            type: "warning",
            message: "请填写审核意见"
          });
          return false;
        }
        if (this.examineForm.status == "2") {
          this.detailsObj["status"] = this.examineForm.status;
          this.detailsObj["message"] = this.examineForm.descMessage;
          this.detailsObj["id"] = this.imgIndex;
          this.detailsArr.push(JSON.parse(JSON.stringify(this.detailsObj)));
          let hash = {};
          const newArr = this.detailsArr.reduceRight((item, next) => {
            hash[next.type] ? "" : (hash[next.type] = true && item.push(next));
            return item;
          }, []);
          this.detailsArr = newArr;
          console.log(this.detailsArr);
          this.$message({
            type: "success",
            message: "审核成功"
          });
          this.transtion(this.imgIndex, true);
          this.examineForm.status = "";
          this.examineForm.descMessage = "";
        } else if (this.examineForm.status == "1") {
          this.$message({
            type: "success",
            message: "审核成功"
          });
          this.transtion(this.imgIndex, true);
        }
      }
    },
    allSubmit() {
      let traceId = JSON.parse(localStorage.getItem("reportDetail")).traceId;
      if (!this.allStatus) {
        this.$message({
          type: "warning",
          message: "请选择整体审核状态"
        });
        return false;
      }
      if (!this.allDescMessage.trim()) {
        this.$message({
          type: "warning",
          message: "请填写整体审核意见"
        });
        return false;
      }
      getAudit({
        details: this.detailsArr,
        message: this.allDescMessage,
        status: this.allStatus,
        traceId: traceId
      }).then(res => {
        console.log(res);
        if (res.code == "0") {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.$router.push("/AuditList")
        }
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.imgTitle = this.slderArr[keyPath[0]].data[keyPath[1]].name;
      this.examineForm.status = "";
      this.examineForm.descMessage = "";
    },
    upOn() {
      if (this.pageSize - 1 <= 1) {
        this.pageSize = 1;
      } else {
        this.pageSize = this.pageSize - 1;
      }
      this.$router.push({
        path: "/unAuditDetail",
        query: { pageSize: this.pageSize }
      });
      undwrtList({
        pageSize: 1,
        pageNo: this.pageSize,
        status: 0
      })
        .then(response => {
          console.log(response);
          if (response.data.data.length > 0) {
            this.$router.push({
              path: "/unAuditDetail",
              query: { pageSize: this.pageSize }
            });
            localStorage.setItem(
              "reportDetail",
              JSON.stringify(response.data.data[0])
            );
            this.get0rderDetail();
            this.getImgList();
          } else {
            this.$message({
              type: "warning",
              message: "没有更多赔案"
            });
            this.pageSize = this.pageSize + 1;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    preNext() {
      console.log(this.pageSize + 1);
      this.pageSize = this.pageSize + 1;
      undwrtList({
        pageSize: 1,
        pageNo: this.pageSize,
        status: 0
      })
        .then(response => {
          console.log(response);
          if (response.code == "0") {
            this.tableData = [];
            if (response.data.data.length > 0) {
              this.$router.push({
                path: "/unAuditDetail",
                query: { pageSize: this.pageSize }
              });
              localStorage.setItem(
                "reportDetail",
                JSON.stringify(response.data.data[0])
              );
              this.get0rderDetail();
              this.getImgList();
            } else {
              this.$message({
                type: "warning",
                message: "没有更多赔案"
              });
              this.pageSize = this.pageSize - 1;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    transtion(index, val) {
      console.log(index, val, this.carArr.length);
      if (val == true) {
        this.imgIndex = index + 1;
      } else if (val == false) {
        this.imgIndex = index;
      } else if (val == "jian") {
        this.imgIndex = index - 1;
      }

      let swiper = this.$refs.mySwiper;
      swiper.swiper.slideTo(this.imgIndex, 300, false);
      if (this.imgIndex <= 0) {
        this.imgIndex = 0;
      } else if (this.imgIndex >= this.carArr.length) {
        this.imgIndex = this.carArr.length - 1;
      }
      this.$forceUpdate();
    },
    openSider(key, keyPath) {
      console.log(key, keyPath, this.slderArr);
      if (this.slderArr[key].data.length <= 0) {
        this.carArr = [];
      } else {
        this.carArr = this.slderArr[key].data[0].urls;
      }
    },
    // 放大效果
    enlarge() {
      let imgCurrent = document.querySelector(
        ".swiperListBox.swiper-slide-active > .img"
      );
      let width = imgCurrent.width;
      let height = imgCurrent.height;
      imgCurrent.style.width = width + 20 + "px";
    },
    narrow() {
      let imgCurrent = document.querySelector(
        ".swiperListBox.swiper-slide-active > .img"
      );
      let width = imgCurrent.width;
      let height = imgCurrent.height;
      imgCurrent.style.width = width - 20 + "px";
    },
    delCurrent() {
      let activeIdx = this.$refs.mySwiper.swiper.activeIndex;
      // let smallImgCurrent = document.querySelector(".swiperSmallListBox.swiper-slide-active > .img");
      // let imgCurrent = document.querySelector(".swiperListBox.swiper-slide-active > .img");
      // imgCurrent.remove();
      // smallImgCurrent.remove();
      // this.$forceUpdate();
      this.carArr.splice(activeIdx, 1);
    }
  }
};
</script>

<style lang="less" scoped>
@import "unAuditDetail";
</style>
