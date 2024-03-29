<template>
  <!-- <el-table :data="state.students">
        <el-table-column
          label="学院"
          prop="college"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="分数"
          width="120"
          prop="submitted"
          align="center"
        ></el-table-column>
      </el-table> -->
  <!-- <span v-for="(item, index) in state.name" :key="index">{{ item }}</span> -->
  <!-- <ContentField> -->
  <!-- <div style="width: 100%; text-align: center"> -->
  <!-- <el-table :data="state.Rank">
          <el-table-column label="评委" type="index"></el-table-column>
          <el-table-column
            v-for="(item, index) in state.name"
            :key="index"
            prop="rank"
            :label="item"
            width="100"
          ></el-table-column>
        </el-table> -->
  <table border="1" style="width: 500px">
    <tr>
      <td style="background-color: aqua; width: 1px">评委</td>
      <td
        style="background-color: aqua; width: 10px"
        v-for="(item, index) in state.name"
        :key="index"
      >
        <h4 style="display: inline">{{ item }}</h4>
      </td>
    </tr>
    <tr v-for="(item1, index2) in 30" :key="index2">
      <td>{{ index2 + 1 }}</td>
      <td
        style="width: 10px"
        v-for="item2 in state.map.get(item1)"
        :key="item2"
      >
        <h4>{{ item2 }}</h4>
      </td>
    </tr>
  </table>
  <!-- </ContentField> -->
</template>

<script setup>
import { onMounted, reactive } from "vue";
// import ContentField from "../../components/ContentField.vue";
import $ from "jquery";
import { ElMessage } from "element-plus";
// import { it } from "element-plus/es/locale";

onMounted(() => {
  getData();
  // getRank();
  changeRank();
  console.log("map的size" + state.map.size);
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
  name: [],
  judger: [],
  Rank: [],
  map: new Map(),
});
// const map = new Map();
// const myMap = new Map([
//   ["apple", "red"],
//   ["banana", "yellow"],
//   ["grape", "purple"],
// ]);
// const tableData = [
//   {
//     date: "2016-05-03",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-02",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-04",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-01",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
// ];
const getData = () => {
  $.ajax({
    url: "http://39.98.114.107:3000/listContestName2",
    type: "GET",
    contentType: "application/json;charset=UTF-8",
    dataType: "json",
    success: function (response) {
      state.name = response.data;
      console.log(state.name);
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

const changeRank = () => {
  for (let i = 1; i <= 30; i++) {
    $.ajax({
      url: "http://39.98.114.107:3000/listJudgerRank2?judgerID=" + i,
      type: "GET",
      contentType: "application/json;charset=UTF-8",
      dataType: "json",
      success: function (response) {
        let array = response.data;

        console.log("judgerID的data" + array);
        state.map.set(i, array);
        console.log("mapget出来的" + state.map.get(i));
      },
      error: function (error) {
        console.log(error);
        ElMessage({
          message: "获取数据失败的",
          type: "error",
        });
      },
    });
  }
};
// const getRank = () => {
//   $.ajax({
//     url: "http://39.98.114.107:3000/listContestantRank1?star=1",
//     type: "GET",
//     contentType: "application/json;charset=UTF-8",
//     dataType: "json",
//     success: function (response) {
//       state.Rank = response.data;
//       console.log("rank"+state.Rank);
//     },
//     error: function (error) {
//       console.log(error);
//       ElMessage({
//         message: "获取数据失败的",
//         type: "error",
//       });
//     },
//   });
// };
</script>

<style scoped>
* {
  text-align: center;
}
</style>
