import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/'
import axios from 'axios';
import vueEventCalendar from 'src/components/event-calendar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'    // 默认主题

// import '../static/css/theme-green/index.css'       // 浅绿色主题
import "babel-polyfill"
import './mock/index.js'
import $ from 'jquery'
Vue.use(ElementUI)
Vue.use(vueEventCalendar, {locale: 'zh', color: '#f47c7c'})
Vue.prototype.$axios = axios
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
