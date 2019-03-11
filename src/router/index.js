import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/newsPage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                path: '/newsPage',
                component: resolve => require(['../components/page/NewsPage.vue'], resolve),
                meta: {title: '新闻推荐'}
            }
            ]
        }

        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld
        // }
    ]
})
