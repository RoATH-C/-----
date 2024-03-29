<template>
  <div style="text-align: center">
    <!-- ref绑定在要被拖拽元素的父亲上，因为我们需要获取父亲对象 -->
    <div ref="sortList">
      <div
        v-for="(item, index) in state.students"
        :key="index"
        :data-id="index"
        class="div1 sort-div"
      >
        <table style="display: flex; justify-content: space-between">
          <tbody>
            <tr>
              <td>序号{{ index + 1 }}:</td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.college }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div style="margin-left: 50%; margin-top: 20px">
    <el-popconfirm width="150px" @confirm="submit" title="完成排序了么">
      <template #reference>
        <el-button @click="onclick">提交</el-button>
      </template>
    </el-popconfirm>
    <button style="margin-left: 40px" @click="zancun">暂存</button>
  </div>
  <el-button style="margin-top: 20px" @click="back">返回首页 </el-button>
</template>
<script setup>
import { ref, onMounted, reactive } from "vue";
import sortable from "sortablejs";
import $ from "jquery";
import { ElMessage } from "element-plus";
import router from "@/router";
const state = reactive({
  students: [],
  scoreform: {
    userId: null,
    score: 0,
    judge: null,
  },
  selectedStudent: null,
  showDialog: false,
  pddf: [],
  count: 0,
  idwai: [],
  pd: false,
  judgerid: 0,
  pdone: false,
  //判断localstorage有没有
  pdzancun1: false,
});
//数组
const list = ref([{}]);
let sortList = ref(null);
let sortArr = new Array(0);
let sortObj;
let ops = {
  draggable: ".sort-div", //被拖拽的元素的class,要拖拽的目标
  group: {
    name: "templateList",
    pull: false,
    put: false,
  },
  handle: ".sort-div", //被拖拽的元素的class
  onEnd() {
    //拖拽后执行的函数
    sortArr = sortObj.toArray();
    console.log("onEnd()函数的");
    console.log(sortObj);
    //每次拖拽后进行赋值，改变ord的内容
    sortArr.forEach((item, index) => {
      // list.value[item].ord = index;
      //把index给了rank
      list.value.rank = index;
      state.students[item].rank = index + 1;
    });
    console.log(state.students);
  },
};
onMounted(() => {
  sortObj = sortable.create(sortList.value, ops);
  window.localStorage.setItem("pdone", false);
  // getData();
  if (window.localStorage.getItem("pdzancun1") == "false") {
    console.log("获取到了后端的数据");
    $.ajax({
      url: "http://39.98.114.107:3000/listContestant1",
      type: "GET",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      success: function (response) {
        //页面挂载的时候 把数据传到state里面 然后设置Rank属性 更好分辨选手的排序
        state.students = response.data;
        for (let i = 0; i < state.students.length; i++) {
          state.students[i].rank = i + 1;
        }
        //挂载的时候获取students的值
        this.list = state.students;
        // console.log(this.list);
      },
      error: function (error) {
        console.log(error);
        ElMessage({
          message: "获取数据失败",
          type: "error",
        });
      },
    });
  } else {
    $.ajax({
      url: "http://39.98.114.107:3000/listContestant1",
      type: "GET",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      success: function (response) {
        //页面挂载的时候 把数据传到state里面 然后设置Rank属性 更好分辨选手的排序
        state.students = response.data;
        console.log("localstorge的");
        for (let i = 0; i < state.students.length; i++) {
          state.students[i].rank = parseInt(
            window.localStorage.getItem(state.students[i].userId)
          );
        }
        for (let i = 0; i < state.students.length; i++) {
          for (let j = i + 1; j < state.students.length; j++) {
            if (state.students[i].rank > state.students[j].rank) {
              let obj = state.students[i];
              state.students[i] = state.students[j];
              state.students[j] = obj;
            }
          }
        }
        console.log(state.students);
        //挂载的时候获取students的值
        this.list = state.students;
        // console.log(this.list);
      },
      error: function (error) {
        console.log(error);
        ElMessage({
          message: "获取数据失败",
          type: "error",
        });
      },
    });

    console.log("暂存后的");
    console.log(state.students);
  }

  //在sort界面获取评委的id 用state存储起来
  state.judgerid = window.localStorage.getItem("judgerid");
  console.log(state.judgerid);
});
const onclick = () => {
  //获取选手的rank
  //这是原来的选手的序号 sortArr
  console.log(state.students);
  //最后的排序结果
  // console.log(state.students);
  //询问排序结束
};
const back = () => {
  router.push("/star");
};
const submit = () => {
  if (window.localStorage.getItem("pdone") == "false") {
    for (let i = 0; i < state.students.length; i++) {
      var params = {};
      //确认选手名次
      params.judgerID = parseInt(window.localStorage.getItem("judgerid"));

      params.contestantID = state.students[i].userId;
      params.rank = parseInt(state.students[i].rank);
      params.star = 1;
      console.log("嘤嘤嘤" + params.judgerid);
      console.log("嘤嘤嘤" + params.userId);
      $.ajax({
        url: "http://39.98.114.107:3000/updateSort",
        type: "POST",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (response) {
          console.log(response);
          ElMessage({
            message: "上传成功",
            type: "success",
          });
        },
        error: function (error) {
          console.log(error);
          console.log("失败");
          ElMessage({
            message: "更新失败",
            type: "error",
          });
        },
      });
    }
    window.localStorage.setItem("pdone", true);
  } else {
    ElMessage({
      message: "请勿重复打分",
      type: "error",
    });
  }
};
const zancun = () => {
  console.log(state.students);
  for (let i = 0; i < state.students.length; i++) {
    localStorage.setItem(state.students[i].userId, state.students[i].rank);
  }
  localStorage.setItem("pdzancun1", true);
  ElMessage({
    message: "暂存成功",
    type: "success",
  });
};
</script>
<style scoped>
.div1 {
  height: 35px;
  width: 100%;
  background: cadetblue;
  margin-top: 10px;
}
</style>
