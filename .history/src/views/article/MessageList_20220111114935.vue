<template>
  <div class="link-message-container">
    <Navbar class="navbar" id="nav"></Navbar>
    <div class="container">
      <div class="space-right">
        <div class="space-right-top">
          <div class="title">
            <span>消息通知</span>
          </div>
        </div>
        <div class="reply-content">
          <div class="reply">
            <div class="reply-item">
              <div
                class="basic-list-item"
                v-for="message of messageList"
                :key="message.id"
              >
                <div class="left-box">
                  <a class="avatar"> </a>
                </div>
                <div class="center-box">
                  <div class="line-1">
                    <span class="name-filed">
                      <!-- <a>赵浩杰</a> -->
                      <a>{{ message.fromUserName }}</a>
                      <span
                        class="desc-filed"
                        v-if="message.type !== 'MESSAGE_COMMENT'"
                        >回复了我的评论</span
                      >
                      <span
                        class="desc-filed"
                        v-if="message.type === 'MESSAGE_COMMENT'"
                        >评论了我</span
                      >
                    </span>
                  </div>
                  <div class="line-2">
                    <div class="real-reply">
                      <div class="content-list">
                        <span class="text"> 回复 </span>
                        <!-- <a>@啥也不会的学生</a> -->
                        <a>@{{ message.toUserName }}</a>
                        <span class="text"> :{{ message.content }}</span>
                      </div>
                    </div>
                    <div
                      class="orginal-reply"
                      v-if="message.type !== 'MESSAGE_COMMENT'"
                    >
                      <!-- 啥也不会的学生：回复@赵浩男：你真版 -->
                      {{ message.parentFromUserName }}：回复@{{
                        message.parentToUserName
                      }}：{{ message.parentContent }}
                    </div>
                  </div>
                  <div class="line-3">
                    <span class="time-filed">
                      <!-- <span class="time-span">2021年10月22日 15:32</span> -->
                      <span class="time-span">{{ message.gmtCreate }}</span>
                    </span>
                    <div class="action-field">
                      <button class="action-button">
                        <svg viewBox="0 0 40 40" class="action-icon">
                          <path
                            d="M14.46,3.33H25.58c7.64,0,13.9,6,13.9,13.33S33.22,30,25.58,30h-.76l-7.28,6.67-2-6.67H14.46C6.81,30,.56,24,.56,16.67S6.81,3.33,14.46,3.33ZM36.7,16.67A10.91,10.91,0,0,0,25.58,6H14.46A10.91,10.91,0,0,0,3.34,16.67,10.91,10.91,0,0,0,14.46,27.33h3.19l.58,1.93.72,2.42,4-3.62.81-.74h1.88A10.91,10.91,0,0,0,36.7,16.67Z"
                          ></path>
                        </svg>
                        回复
                      </button>
                      <button
                        class="action-button del-button"
                        @click="delMessage(message.id)"
                      >
                        <svg
                          data-v-33b3ab9a=""
                          viewBox="0 0 16 16"
                          class="action-icon css-x5loxn"
                          data-v-657577a0=""
                        >
                          <g fill-rule="nonzero">
                            <rect
                              id="Rectangle"
                              opacity="0"
                              x="0"
                              y="0"
                              width="16"
                              height="16"
                            ></rect>
                            <path
                              d="M12.5146059,5.54590692 L12.5146059,12.5459069 C12.5146059,13.6504764 11.6191754,14.5459069 10.5146059,14.5459069 L5.51460589,14.5459069 C4.41003639,14.5459069 3.51460589,13.6504764 3.51460589,12.5459069 L3.51460589,5.54590692 L3.51460589,5.54590692"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <line
                              x1="6"
                              y1="1.85714286"
                              x2="9.5"
                              y2="1.85714286"
                              id="Line"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></line>
                            <line
                              x1="1.88309006"
                              y1="3.6900534"
                              x2="14.0338156"
                              y2="3.6900534"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></line>
                            <line
                              x1="5.71428571"
                              y1="7.63739248"
                              x2="5.71428571"
                              y2="11.230495"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></line>
                            <line
                              x1="8.01783774"
                              y1="7.62825381"
                              x2="8.01783774"
                              y2="11.2213564"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></line>
                            <line
                              x1="10.3396003"
                              y1="7.63344062"
                              x2="10.3396003"
                              y2="11.2265432"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></line>
                          </g>
                        </svg>
                        删除该通知
                      </button>
                    </div>
                  </div>
                  <div class="divider"></div>
                </div>
              </div>
              <!--分页-->
              <div class="home-page">
                <!--分页-->
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="query.currentPage"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="query.pageSize"
                  :total="total"
                  layout="total, sizes, prev, pager, next, jumper"
                  background
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form } from "element-ui";
import Navbar from "../../components/Navbar";
import { queryMessagePage, delMessagePage } from "../../api/article/message";
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      query: {
        isAdmin: 0,
        currentPage: 1,
        pageSize: 10,
      },
      messageList: [],
      total: 0,
    };
  },
  methods: {
    //分页查询
    getData() {
      queryMessagePage(this.query).then((response) => {
        // console.log("message: ", response.data);
        this.messageList = response.data.data;
        this.total = response.data.total;
      });
    },
    //删除通知
    delMessage(id) {
      let data = { id: id };

      this.$confirm("确认删除当前消息?", "Warning", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((response) => {
          delMessagePage(data).then((response) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.query.currentPage = 1;
            this.getData();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSizeChange(newPageSize) {
      this.query.pageSize = newPageSize;
      this.getData();
    },
    handleCurrentChange(newPage) {
      this.query.currentPage = newPage;
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style scoped>
.link-message-container {
  width: 100%;
}
.container {
  /* height: 1200px; */
  /* height: calc(100vh - 56px); */
  margin: 0 auto;
  max-width: 1143px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
}
.space-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
}
.space-right-top {
  padding: 10px 10px 0;
  z-index: 11;
}
.title {
  height: 42px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  -ms-flex-negative: 0;
  flex-shrink: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0 16px;
  font-size: 15px;
  color: #666;
  border-radius: 4px;
}
.reply-content {
  padding: 10px;
  position: relative;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  height: calc(100% - 66px);
  overflow: hidden;
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
}
.reply {
  padding: 24px 16px;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  margin-bottom: 10px;
  border-radius: 4px;
  /* height: 600px; */
  /* height: 1200px; */
}
.reply-item {
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
  cursor: pointer;
  /* background-color: #222; */
  background-color: #fff;
}
.basic-list-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}
.left-box {
  width: 60px;
  height: 46px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.avatar {
  display: block;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(//static.hdslb.com/images/member/noface.gif);
}
.center-box {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.line-1 {
  color: #505050;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 15px;
  max-height: 4.285714285714286em;
}
.name-filed {
  color: #222;
  margin-right: 8px;
  font-weight: bold;
}
a {
  -webkit-touch-callout: none;
  color: inherit;
  border: 0;
  outline: 0;
  text-decoration: none;
}
.desc-filed {
  color: #505050;
  margin-left: 8px;
  /* display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 15px; */

  /* max-height: 4.285714285714286em; */
}
.line-2 {
  margin-bottom: 10px;
  margin-right: 14px;
  font-size: 14px;
  color: #222;
}
.real-reply {
  margin-bottom: 10px;
  margin-right: 14px;
  font-size: 14px;
  color: #222;
}
.content-list {
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 18px;
  max-height: 2.571428571428572em;
}
.text {
  word-break: break-word;
  line-height: 19px;
}
.orginal-reply {
  /* background-color: aqua; */
  color: #999;
  border-left: 2px solid #e7e7e7;
  margin: 8px 0 10px;
  padding-left: 4px;
  /* font-size: 12px;
  line-height: 16px; */
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  line-height: 16px;
  max-height: 2.666666666666667em;
}
.line-3 {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #999;
  font-size: 12px;
  line-height: 22px;
}
.time-span {
  /* margin: 0 15px 0 0; */
  color: #999;
  font-size: 12px;
  line-height: 22px;
  margin: 0 15px 0 0;
}
.action-button {
  cursor: pointer;
  margin-right: 14px;
  color: inherit;
}
.del-button {
  /* display: none; */
}
.action-icon {
  width: 16px;
  height: 15px;
  vertical-align: text-top;
  fill: currentcolor;
  width: 1em;
  height: 1em;
}
.del-button > .action-icon {
  height: 16px;
}
.action-button .action-icon {
  width: 16px;
  height: 15px;
  vertical-align: text-top;
}
.css-x5loxn {
  width: 1em;
  height: 1em;
  stroke: currentcolor;
  fill: none;
}
.divider {
  display: block;
  width: 100%;
  /* width: calc(100% - 44px); */
  height: 1px;
  border-bottom: 1px solid #e5e9ef;
  position: relative;
  /* left: 40px; */
  margin-top: 20px;
}
</style>
