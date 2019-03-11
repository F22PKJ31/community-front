import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import url from './components/common/apiUrl'
import api from './components/common/apiUtil'
import utils from './components/common/utils'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/common/directives';
import "babel-polyfill";

Vue.config.productionTip = false
Vue.use(ElementUI, {
    size: 'small'
});
Vue.prototype.axiosProxy = api.generateApiMap(url);
Vue.prototype.$axios = axios;
Vue.use(utils);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

