<template>
  <!-- <ContentField style="width: 100%"> -->
  <div style="width: auto">
    <el-table :data="state.students" border style="width: auto">
      <el-table-column class="name" prop="name" label="姓名" />
      <el-table-column prop="college" label="学院" width="100" />
      <!-- <el-table-column prop="score" label="分数" /> -->
      <el-table-column label="打分" width="120">
        <!-- <template #default="scop">
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              title="确认打分?"
              @confirm="toEditScore(scop.row)"
            >
              <template #reference>
                <el-button type="primary" size="small">打分</el-button>
              </template>
            </el-popconfirm>
          </template> -->
        <input style="width: 75%" />
      </el-table-column>
    </el-table>
    <br />
    <div style="justify-content: space-between; text-align: center">
      <div style="display: flex; justify-content: center">
        <button @click="zancun" style="margin-right: 10px">暂存</button
        ><button @click="huifu">恢复暂存内容</button>
      </div>
      <br />
      <div style="font-family: '楷体'">评分人:<input class="pingwei" /></div>
      <button @click="onsubmit" style="margin-top: 10px">提交</button>
    </div>
  </div>
  <!-- </ContentField> -->

  <!-- <el-dialog
    v-model="state.showDialog"
    title="打分"
    destroy-on-close
    @close="closeDialog"
    center
    style="width: 80%"
  >
    <el-form :model="state.scoreform" label-width="50px">
      <el-form-item label="分数">
        <el-input-number v-model="state.scoreform.score" :min="0" :max="100" />
        <div style="display: flex">
          <div class="pingwei" style="float: left">
            评分人
            <input id="pingwei" width="50px" />
          </div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit()"> 确定 </el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script setup>
// import ContentField from "../../components/ContentField.vue";
import $ from "jquery";
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
// import { fa } from "element-plus/es/locale";
// import { tr } from "element-plus/es/locale";

onMounted(() => {
  $.ajax({
    url: "http://39.98.114.107:3000/countContestant",
    type: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (response) {
      window.localStorage.setItem("count", response.data);
      console.log(response.data);
      state.count = response.data;
    },
  });
  getData();
  console.log("你好");
  toZancun();
  console.log("你好");
  $.ajax({
    url: "http://39.98.114.107:3000/listContestant",
    type: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (response) {
      state.students = response.data;
      console.log("hello");
      for (var i = 0; i < window.localStorage.getItem("count"); i++) {
        state.idwai[i] = response.data[i].userId;
      }
      // getData();
    },
    error: function (error) {
      console.log(error);
      ElMessage({
        message: "获取数据失败",
        type: "error",
      });
    },
  });
});

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
});
const toZancun = () => {
  console.log("to暂存");
  // var names = document.getElementsByClassName("name");
  console.log("to暂存");
};
const huifu = () => {
  var n = 0;
  var inputs = document.getElementsByTagName("input");
  while (n < state.count) {
    console.log("恢复");
    inputs[n].value = window.localStorage.getItem(state.students[n].name);
    n++;
  }
};
const getData = () => {
  console.log("getdata");
  console.log(window.localStorage.getItem("count"));
  $.ajax({
    url: "http://39.98.114.107:3000/listContestant",
    type: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (response) {
      state.students = response.data;

      for (var i = 0; i < window.localStorage.getItem("count"); i++) {
        state.userId = response.data[i].userId;
        console.log(state.userId);
      }
      console.log("id" + response.data[0].userId);

      console.log(response.data);
      // getData();
    },
    error: function (error) {
      console.log(error);
      ElMessage({
        message: "获取数据失败",
        type: "error",
      });
    },
  });
};

const zancun = () => {
  var input = document.getElementsByTagName("input");
  var n = 0;
  console.log("暂存");
  while (n < input.length - 1) {
    window.localStorage.setItem(state.students[n].name, input[n].value);
    console.log(input[n].value);
    n++;
  }
  ElMessage({
    message: "暂存成功",
    type: "success",
  });
};

// const initScoreForm = () => {
//   state.scoreform.userId = null;
//   state.scoreform.score = 0;
//   state.scoreform.judge = null;
// };

// const toEditScore = (student) => {
//   state.selectedStudent = student;
//   state.scoreform.userId = student.userId;
//   state.showDialog = true;
// };

// const submit = () => {
//   var pingwei = document.getElementById("pingwei").value;
//   console.log(pingwei);
//   state.scoreform.judge = pingwei;
//   document.getElementById("anniu").disabled = true;
// };

const onsubmit = () => {
  if (state.pd == true) {
    ElMessage({
      message: "请勿重复打分",
      type: "error",
    });
  } else {
    var inputs = document.getElementsByTagName("input");
    var id = [];
    console.log("最终" + id);
    var n = 0;
    while (n < inputs.length - 1) {
      if (inputs[n].value === "") {
        ElMessage({
          message: "请填写分数或评分人",
          type: "error",
        });
        return;
      }
      if (inputs[n].value > 100 || inputs[n].value < 0) {
        ElMessage({
          message: "请填写正确的分数",
          type: "error",
        });
        return;
      }
      var pingwei = inputs[inputs.length - 1].value;
      state.scoreform.judge = pingwei;

      for (var i = 0; i < window.localStorage.getItem("count"); i++) {
        console.log("请求外" + state.idwai);
      }
      var params = {
        userId: state.idwai[n],
        score: inputs[n].value,
        judge: pingwei,
      };
      $.ajax({
        url: "http://39.98.114.107:3000/updateScore",
        type: "POST",
        data: JSON.stringify(params),
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (response) {
          console.log(response);
          ElMessage({
            message: "更新成功",
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
      n++;
    }
    state.pd = true;
    // console.log(pingwei.value + "暂存");
  }
};

// const handleSubmit = () => {
//   if (state.scoreform.score === "") {
//     ElMessage({
//       message: "请填写分数",
//       type: "error",
//     });
//     return;
//   }
//   if (state.scoreform.score > 100 || state.scoreform.score < 0) {
//     ElMessage({
//       message: "分数不正确",
//       type: "error",
//     });
//   }
//   var pingwei = document.getElementById("pingwei").value;
//   if (pingwei === "") {
//     ElMessage({
//       message: "请填写评分人",
//       type: "error",
//     });
//     return;
//   }
//   console.log(pingwei);
//   state.scoreform.judge = pingwei;
//   const params = {
//     ...state.scoreform,
//   };
//   if (state.pddf.pd === true) {
//     ElMessage({
//       message: "请勿重复打分",
//       type: "error",
//     });
//   } else {
//     $.ajax({
//       url: "http://127.0.0.1:3000/updateScore",
//       type: "POST",
//       data: JSON.stringify(params),
//       contentType: "application/json;charset=UTF-8",
//       dataType: "json",
//       success: function (response) {
//         console.log(response);
//         ElMessage({
//           message: "更新成功",
//           type: "success",
//         });
//         closeDialog();
//       },
//       error: function (error) {
//         console.log(error);
//         ElMessage({
//           message: "更新失败",
//           type: "error",
//         });
//       },
//     });
//     state.pddf.pd = true;
//   }
// };

// const closeDialog = () => {
//   state.showDialog = false;
//   state.selectedStudent = null;
//   initScoreForm();
// };
</script>
