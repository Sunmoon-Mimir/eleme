import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js"
import axios from "./http/config";
import formatImgSrc from "./plugin/formatImgSrc";
import vFixed from "./plugin/fixedDirective";
import autoTop from "./plugin/autoTop.js"

/* vue2.0 挂载到实例上 */
// Vue.prototype.$axios=axios

const app = createApp(App);
/* vue3.0通过globalProperties 进行全局挂载 axios*/
app.config.globalProperties.$axios = axios;
//全局挂载后通过:scr="$formatImgSrc()"就可以直接使用
app.config.globalProperties.$formatImgSrc = formatImgSrc;
app.config.globalProperties.$autoTop = autoTop;
app.use(router);
app.use(store);
//注册全局自定义指令
app.directive("fixed", vFixed); //传入vFixed对象

app.mount("#app");