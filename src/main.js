import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import url from './components/common/apiUrl'
import api from './components/common/apiUtil'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/common/directives';
import "babel-polyfill";
import bus from 'vue-bus'
import BootstrapVue from 'bootstrap-vue'
import './assets/base.css'

Vue.use(BootstrapVue)
Vue.use(bus);
Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.axiosProxy = api.generateApiMap(url);
Vue.prototype.$axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

