<template>
  <div class="page-tab-box" v-show="$route.path != '/main/index'">
    <div class="page-tab">
      <div class="page-tab-list">
        <router-link
                class="page-tab-item" tag="a"
                v-for="(pageTab,index) in pageTabList"
                :class="{active:currentPage.target == pageTab.target }"
                :title="pageTab.pageName"
                :to="pageTab.path"
                :key="pageTab.path"
                @contextmenu.prevent.native="openMenu(pageTab,index,$event)">
          <span class="pagename" v-text="pageTab.pageName"></span>
          <i v-show="pageTab.name != 'index'" title="关闭" class="close-page el-icon-close"
             @click.prevent.stop="closePage(pageTab,index)"></i>
        </router-link>
      </div>
    </div>
    <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag,selectedIndex)">{{$t('tagsView.close')}}</li>
      <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
      <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'TagsView',
    data() {
      return {
        currentPage: {},
        pageTabList: [],
        visible: false,
        top: 0,
        left: 0,
        selectedTag: {},
        selectedIndex: "",
        menuList: [
          {
            "children": [
              {
                "title": this.$t('menu.insuranceApplication.children.bookingAgreement.title'),
                "name": this.$t('menu.insuranceApplication.children.bookingAgreement.name'),
                "path": this.$t('menu.insuranceApplication.children.bookingAgreement.path'),
                "target": "Booking"
              },
              {
                "title": this.$t('menu.insuranceApplication.children.noBookingAgreement.title'),
                "name": this.$t('menu.insuranceApplication.children.noBookingAgreement.name'),
                "path": this.$t('menu.insuranceApplication.children.noBookingAgreement.path'),
                "target": "NoBooking"
              },
              {
                "title": this.$t('menu.insuranceApplication.children.batchImportIssue.title'),
                "name": this.$t('menu.insuranceApplication.children.batchImportIssue.name'),
                "path": this.$t('menu.insuranceApplication.children.batchImportIssue.path'),
                "target": "BatchImport"
              },
              {
                "title": this.$t('menu.insuranceApplication.children.queryInsurancePolicy.title'),
                "name": this.$t('menu.insuranceApplication.children.queryInsurancePolicy.name'),
                "path": this.$t('menu.insuranceApplication.children.queryInsurancePolicy.path'),
                "target": "InsurancePolicy"
              }
            ],
            "name": this.$t('menu.insuranceApplication.name'),
            "title": this.$t('menu.insuranceApplication.title'),
          },
          {
            "children": [
              {
                "title": this.$t('menu.policyManagement.children.policyQueryPrinting.title'),
                "name": this.$t('menu.policyManagement.children.policyQueryPrinting.name'),
                "path": this.$t('menu.policyManagement.children.policyQueryPrinting.path'),
                "target": "Query"
              },
              {
                "title": this.$t('menu.policyManagement.children.policyCorrection.title'),
                "name": this.$t('menu.policyManagement.children.policyCorrection.name'),
                "path": this.$t('menu.policyManagement.children.policyCorrection.path'),
                "target": "Issue"
              }
            ],
            "name": this.$t('menu.policyManagement.name'),
            "title": this.$t('menu.policyManagement.title')
          },
          {
            "title": this.$t('menu.clausesWording.title'),
            "name": this.$t('menu.clausesWording.name'),
            "path": this.$t('menu.clausesWording.path'),
            "target": "clause"
          },
          {
            "title": this.$t('menu.notice.title'),
            "name": this.$t('menu.notice.name'),
            "path": this.$t('menu.notice.path'),
            "target": "Notice"
          }
        ],
        ignorePage: ["/login", "/404", "/main/index", "/main/fail", "/main/success", "/main/modifyPassword"],
        isOpened: false,
      }
    },
    created() {
      let vm = this;
      vm.currentPage = {
        pageName: vm.$route.meta.title,
        name: vm.$route.name,
        path: vm.$route.path,
        target: vm.$route.meta.target
      };
      vm.initPageTabList();
    },
    mounted() {
      let vm = this;
//      vm.setHtmlClass();
    },
    methods: {
      getPageName(target) {
        let vm = this;
        let pagename;
        if (!target) return;
        for (let i = 0, l = vm.menuList.length; i < l; i++) {
          let item = vm.menuList[i];
          if (item.children && item.children.length > 0) {
            for (let j = 0, l2 = item.children.length; j < l2; j++) {
              let subitem = item.children[j];
              if (target == subitem.target) {
                pagename = subitem.title;
                break;
              }
            }
          } else {
            if (target == item.target) {
              pagename = item.title;
              break;
            }
          }
          if (pagename != undefined) {
            break;
          }
        }
        return pagename;
      },
      initPageTabList() {
        let vm = this;
        let pageTabList = vm.$_storage.getLocalStore("pageTabList");
//        console.log(pageTabList);
        if (pageTabList) {
          vm.pageTabList = pageTabList;
        }
      },
      //跳转页面
      goPage(item) {
        let vm = this;
        vm.$router.push({
          path: item.path,
          name: item.name
        });
      },
      //删除页面
      closePage(item, index) {
        let vm = this;
        let len = vm.pageTabList.length;
        let targetPage = null;
        vm.pageTabList.splice(index, 1);
        if (len <= 1) {
          vm.$router.push({
            path: "/main/index",
            name: "index"
          });
        } else {
          if (vm.$route.path === item.path) {
            if (index == len - 1) {
              targetPage = vm.pageTabList[len - 2];
            } else {
              targetPage = vm.pageTabList[index];
            }
          }
          if (targetPage) {
            vm.$router.push({
              path: targetPage.path,
              name: targetPage.name
            });
          }
        }
        vm.$_storage.setLocalStore("pageTabList", vm.pageTabList);
      },
      isContained(obj, arr) {

        let flag = false;
        for (let i = 0; i < arr.length; i++) {
          if (obj.target == arr[i].target) {
            flag = true;
          }
        }
        return flag;
      },
      moveToCurrentTag() {

      },
      closeSelectedTag(item, index) {
        let vm = this;
        let len = vm.pageTabList.length;
        let targetPage = null;
        vm.pageTabList.splice(index, 1);
        if (len <= 1) {
          vm.$router.push({
            path: "/main/index",
            name: "index"
          });
        } else {
          if (vm.$route.path === item.path) {
            if (index == len - 1) {
              targetPage = vm.pageTabList[len - 2];
            } else {
              targetPage = vm.pageTabList[index];
            }
          }
          if (targetPage) {
            vm.$router.push({
              path: targetPage.path,
              name: targetPage.name
            });
          }
        }
        vm.$_storage.setLocalStore("pageTabList", vm.pageTabList);
      },
      closeOthersTags() {
        let vm = this;
        let currTag = this.selectedTag;
        vm.pageTabList = [];
        vm.pageTabList.push(currTag);
        this.$router.push(currTag.path);
        vm.$_storage.setLocalStore("pageTabList", vm.pageTabList);
      },
      closeAllTags() {
        let vm = this;
        vm.pageTabList = [];
        vm.$router.push({
          path: "/main/index",
          name: "index"
        });
        vm.$_storage.setLocalStore("pageTabList", vm.pageTabList);
      },
      openMenu(tag, index, e) {
        this.visible = true;
        this.selectedTag = tag;
        this.selectedIndex = index;
        this.left = e.clientX;
        this.top = e.clientY;
      },
      closeMenu() {
        this.visible = false
      },
      filterLayer(path) {
        let vm = this;
        let count = path.split('/').length;
        if (count > 3) {
          const last_index = path.lastIndexOf('/');
          path = path.substring(0, last_index)
        }
        return path;
      },
    },
    watch: {
      $route: {
        handler(to, from) {
          //监听路由变化
          let vm = this;

          /* let userLogin = vm.$_storage.getSessionStore("userLogin");
           if(userLogin.state == 0 && to.path != "/main/index"){

             vm.$router.push({
               path: "/main/modifyPassword"
             });
             return false;
           }*/

          vm.pageTabList = vm.$_storage.getLocalStore("pageTabList");
          let loginStatus = vm.$_storage.getSessionStore("loginStatus");

          vm.currentPage = {
            pageName: vm.getPageName(to.meta.target),
            // pageName: to.meta.title,
            name: to.name,
            path: vm.filterLayer(to.path),
            target: to.meta.target
          };

          if (vm.pageTabList == null) {
            vm.pageTabList = [];
            vm.pageTabList.push(vm.currentPage);
          }

          if (vm.ignorePage.indexOf(to.path) !== -1) {
            if (to.path === "/main/index" || (to.path === "/login" && !loginStatus)) {
              vm.pageTabList = [];
            }
            return false;
          }

          if (!vm.isContained(vm.currentPage, vm.pageTabList)) {

            vm.pageTabList.push(vm.currentPage);
          }

          vm.$_storage.setLocalStore("pageTabList", vm.pageTabList);

        },
        immediate: true,
        deep: true
      },
      visible(value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./TagsView";
</style>
