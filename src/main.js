import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from './http/config'
import formatImgSrc from './plugin/formatImgSrc'
import vFixed from './plugin/fixedDirective'

/* vue2.0 挂载到实例上 */
// Vue.prototype.$axios=axios


const app = createApp(App)
    /* vue3.0通过globalProperties 进行全局挂载 axios*/
app.config.globalProperties.$axios = axios

app.config.globalProperties.$formatImgSrc = formatImgSrc
app.use(router)

//注册全局自定义指令
app.directive('fixed', vFixed) //传入vFixed对象

app.mount('#app')