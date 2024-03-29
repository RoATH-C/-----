import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import Vue from "vue"; //引入vue
// import axios from "axios"; //引入axios
// Vue.prototype.$axios = axios; //把axios挂载到vue上

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import draggable from "vuedraggable";

// import VueDND from "awe-dnd";

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(draggable)
  .mount("#app");
