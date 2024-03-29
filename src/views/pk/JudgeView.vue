<template>
  <div style="text-align: center; margin-top: 50px">
    <el-button size="large" style="margin-top: 50px" :disabled="pd1"
      >求真之星</el-button
    >
    <br />
    <el-button size="large" style="margin-top: 50px">博学之星</el-button>
    <br />
    <el-button size="large" style="margin-top: 50px">弘毅之星</el-button>
    <br />
    <el-button size="large" style="margin-top: 50px">翘楚之星</el-button>
  </div>
</template>
<style></style>
<script setup>
// import $ from "jquery";
import { onMounted } from "vue";
const pd1 = false;
onMounted(() => {
  if (window.localStorage.getItem("pdone") == "false") {
    this.pd1 = true;
  }
});
</script>
<!-- <template>
  <div class="title-list">
    <div
      v-dragging="{ item: item, list: list }"
      v-for="item in list"
      :key="item.id"
      class="title-item"
    >
      <div class="title-child">
        <span>{{ item.id + "－－" + item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "titleList",
  data() {
    return {
      list: [
        { id: 1, name: "这是第一个标题名称" },
        { id: 2, name: "这是第二个标题名称" },
        { id: 3, name: "这是第三个标题名称" },
        { id: 4, name: "这是第四个标题名称" },
        { id: 5, name: "这是第五个标题名称" },
      ],
    };
  },
  mounted() {
    // 拖拽事件
    this.$dragging.$on("dragged", (result) => {
      // 将排序后的结果重新赋值
      this.list = result.value.list;
    });
  },
};
</script>

<style scoped>
.title-list {
  width: 350px;
  background: #fff;
  margin: 100px auto 0;
  border: 1px solid red;
}
.title-item {
  width: 350px;
  cursor: pointer;
  border: 1px solid #ededed;
}
.title-child {
  width: 330px;
  height: 60px;
  margin: 0 auto;
  position: relative;
}
span {
  width: 100%;
  font-size: 14px;
  color: red;
  line-height: 30px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
}
</style> -->
