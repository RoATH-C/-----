<template>
  <div style="width: auto">
    <el-table :data="state.students" border style="width: auto">
      <el-table-column
        prop="userId"
        label="序号"
        min-width="15%"
      ></el-table-column>
      <el-table-column class="name" prop="name" label="姓名" min-width="17%" />
      <el-table-column prop="college" label="学院" min-width="38%" />
      <!-- <el-table-column prop="score" label="分数" /> -->
      <el-table-column label="排序" min-width="30%">
        <input
          type="number"
          id="sort"
          v-model="input"
          style="width: 75%"
          oninput="this.value = this.value.replace(/[^0-9]/g, ''); "
        />
        <!-- <el-input id="sort"></el-input> -->
      </el-table-column>
    </el-table>
    <br />
    <div style="justify-content: space-between; text-align: center">
      <div style="display: flex; justify-content: center">
        <el-button @click="zancun" style="margin-right: 10px">保存</el-button>
        <el-button @click="huifu" style="margin-right: 10px">恢复</el-button>
        <el-button plain @click="dialogVisible = true"> 提交 </el-button>
      </div>
      <br />
      <el-button style="margin-top: 20px" @click="back">返回首页 </el-button>
      <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="70%"
        :before-close="handleClose"
      >
        <span>您是否确定提交</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="onsubmit(), (dialogVisible = false)"
            >
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import $ from "jquery";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import router from "@/router";
// import { fa } from "element-plus/es/locale";
// import { tr } from "element-plus/es/locale";
const dialogVisible = ref(false);
onMounted(async () => {
  //判断是否重复打分 发送一个请求
  // window.localStorage.setItem("pdone", false);
  $.ajax({
    url:
      "http://39.98.114.107:3000/pdjudge?judgerID=" +
      window.localStorage.getItem("judgerid") +
      "&star=1",
    type: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (response) {
      //页面挂载的时候 把数据传到state里面 然后设置Rank属性 更好分辨选手的排序
      //挂载的时候获取students的值
      console.log("判断是否打分");
      window.localStorage.setItem("pdone", response.data);
      console.log(state.pdone);
    },
    error: function (error) {
      console.log(error);
    },
  });
  let inputs = document.getElementById("sort");
  console.log(inputs);
  //先获取各个选手的名字学院
  if (window.localStorage.getItem("pdzancun1") == "false") {
    $.ajax({
      url: "http://39.98.114.107:3000/listContestant1",
      type: "GET",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      success: function (response) {
        //页面挂载的时候 把数据传到state里面 然后设置Rank属性 更好分辨选手的排序
        state.students = response.data;
        //挂载的时候获取students的值
        console.log(state.students);
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
        console.log(state.students);
      },
      error: function (error) {
        console.log(error);
        ElMessage({
          message: "获取数据失败",
          type: "error",
        });
      },
    });
  }
  state.judgerid = window.localStorage.getItem("judgerid");
});
const back = () => {
  router.push("/star");
};
const huifu = () => {
  var n = 0;
  var inputs = document.getElementsByTagName("input");
  while (n < state.students.length) {
    console.log("恢复");
    inputs[n].value = window.localStorage.getItem(state.students[n].userId);
    n++;
  }
};
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
  //判断重复打分
  pdone: 0,
  //判断localstorage有没有
  pdzancun1: false,
});

const zancun = () => {
  var input = document.getElementsByTagName("input");
  var n = 0;
  console.log("暂存");
  while (n < input.length) {
    window.localStorage.setItem(state.students[n].userId, input[n].value);
    console.log(input[n].value);
    n++;
  }
  ElMessage({
    message: "暂存成功",
    type: "success",
  });
  window.localStorage.setItem("pdzancun1", true);
};

const onsubmit = () => {
  //判断是否重复打分

  var input = document.getElementsByTagName("input");
  for (let i = 0; i < state.students.length; i++) {
    for (let j = i + 1; j < state.students.length; j++) {
      if (parseInt(input[i].value) == parseInt(input[j].value)) {
        ElMessage({
          message: "请勿重复或未填写",
          type: "error",
        });
        return;
      }
    }
  }
  for (let i = 0; i < state.students.length; i++) {
    if (
      input[i].value > 8 ||
      input[i].value < 1 ||
      input[i].value == "" ||
      Number(input[i].value) !== Math.round(input[i].value)
    ) {
      ElMessage({
        message: "请输入正确的数字",
        type: "error",
      });
      return;
    }
  }
  //判断是否重复打分
  // zancun
  if (window.localStorage.getItem("pdone") == "0") {
    var flag = 0;
    console.log("提交前修改");
    console.log(state.students);
    for (let i = 0; i < state.students.length; i++) {
      var params = {};
      //确认选手名次
      params.judgerID = parseInt(window.localStorage.getItem("judgerid"));

      params.contestantID = state.students[i].userId;
      params.rank = input[i].value;
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
          flag = 1;
        },
        error: function (error) {
          console.log(error);
          console.log("失败");
        },
      });
    }
    window.localStorage.setItem("pdone", 1);
    if (flag == 0) {
      ElMessage({
        message: "上传成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: "更新失败",
        type: "error",
      });
    }
    //update打分情况
    $.ajax({
      url:
        "http://39.98.114.107:3000/updatepd?judgerID=" +
        window.localStorage.getItem("judgerid") +
        "&star=1",
      type: "POST",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      success: function (response) {
        //页面挂载的时候 把数据传到state里面 然后设置Rank属性 更好分辨选手的排序
        //挂载的时候获取students的值
        state.pdone = response.data;
        console.log("判断的变成1");
      },
      error: function (error) {
        console.log(error);
      },
    });
  } else {
    ElMessage({
      message: "请勿重复打分",
      type: "error",
    });
  }
};
</script>
