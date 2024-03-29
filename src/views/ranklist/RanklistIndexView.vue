<template>
  <div>
    <div>
      <input
        style="height: 10%; width: 35%; font-size: 30px; margin-top: 10%"
        type="button"
        @click="toOne"
        value="弘毅之星"
      />
    </div>
    <div>
      <input
        style="height: 10%; width: 35%; font-size: 30px; margin-top: 10%"
        type="button"
        @click="toTwo"
        value="博学之星"
      />
    </div>
    <div>
      <input
        style="height: 10%; width: 35%; font-size: 30px; margin-top: 10%"
        type="button"
        @click="toThree"
        value="求真之星"
      />
    </div>
    <div>
      <input
        style="height: 10%; width: 35%; font-size: 30px; margin-top: 10%"
        type="button"
        @click="toFour"
        value="翘楚之星"
      />
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
const toOne = () => {
  router.push("/ranklist1");
};
const toTwo = () => {
  router.push("/ranklist2");
};
const toThree = () => {
  router.push("/ranklist3");
};
const toFour = () => {
  router.push("/ranklist4");
};
</script>
<style scoped>
* {
  text-align: center;
}
</style>
