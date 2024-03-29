<template>
  <div class="form">
    <table class="table">
      <thead>
        <tr>
          <td :key="index" v-for="(item, index) in items"></td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td scope="col"><input type="text" maxlength="4" /></td>
          <td>Mark</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td scope="col"><input type="text" maxlength="4" /></td>
          <td>Jacob</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td scope="col"><input type="text" maxlength="4" /></td>
          <td>Jacob</td>
        </tr>
      </tbody>
    </table>

    <button class="submit">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{ first: "#" }, { first: "Score" }, { first: "Name" }],
    };
  },
};
</script>

<style>
* {
  margin: 0 auto;
}
.form {
  width: fit-content;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
input {
  size: 10;
}
</style>
