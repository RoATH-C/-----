<template>
  <div class="home">
    <div class="container">
      <div class="card">
        <div style="margin-top: 10%; text-align: center">
          <h1 style="font-family: '楷体'">第七届</h1>
          <strong><h1>"青春榜样·济大繁星"</h1></strong>
          <h1>推选展示活动决赛</h1>
        </div>
        <router-link
          :class="'pk_button'"
          :to="{ name: 'star' }"
          style="text-decoration: none"
        >
          <button id="myButton" @click="playSound">开始评选</button>
          <audio id="myAudio">
            <source src="../../assets/musics/UI按钮点击.mp3" type="audio/mp3" />
          </audio>
        </router-link>
        <div class="card-body"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
// import $ from "jquery";
const playSound = () => {
  var audio = document.getElementById("myAudio");
  console.log("1");
  audio.play();
  let addr = new URL(location);
  window.localStorage.setItem("judgerid", addr.searchParams.get("juid"));
  console.log(window.localStorage.getItem("judgerid"));
};
// const getUrl = () => {

// };
onMounted(() => {
  let addr = new URL(location);
  window.localStorage.setItem("judgerid", addr.searchParams.get("juid"));
  console.log(window.localStorage.getItem("judgerid"));
});
</script>

<style>
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh; /* 或者你想要的高度 */

  background-image: url("../../assets/images/home.png");
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  /* background-attachment: fixed; */
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  /* 设置背景颜色，背景图加载过程中会显示背景色 */
  background-color: #464646;
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

#myButton {
  width: 200px;
  height: 75px;
  border: solid white;
  background-color: rgb(0, 122, 255);
  color: white;
  font-size: 28px;
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 50%;
}

#myButton:active {
  transform: translateY(4px);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
}

.button {
  background: radial-gradient(red, orange);
}
</style>
