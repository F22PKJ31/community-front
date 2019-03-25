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
            redirect: '/homePage',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [{
                path: '/homePage',
                component: resolve => require(['../components/page/HomePage.vue'], resolve),
                meta: {title: '首页'},
            }, {
                path: '/newsPage',
                component: resolve => require(['../components/page/NewsPage.vue'], resolve),
                meta: {title: '新闻推荐'},
            }, {
                name: 'newsDetail',
                path: '/newsDetail',
                component: resolve => require(['../components/page/NewsDetailPage.vue'], resolve),
                meta: {title: '新闻详情'}
            }, {

                path: '/postPage',
                component: resolve => require(['../components/page/PostPage.vue'], resolve),
                meta: {title: '问答论坛'},
            }, {
                name: 'postDetail',
                path: '/postDetail',
                component: resolve => require(['../components/page/PostDetailPage.vue'], resolve),
                meta: {title: '问答详情'}
            }, {

                path: '/blogPage',
                component: resolve => require(['../components/page/BlogPage.vue'], resolve),
                meta: {title: '优质博客'},
            }, {
                name: 'blogDetail',
                path: '/blogDetail',
                component: resolve => require(['../components/page/BlogDetailPage.vue'], resolve),
                meta: {title: '博文详情'}
            }, {
                path: '/editPostPage',
                name: 'editPostPage',
                component: resolve => require(['../components/page/EditPostPage.vue'], resolve),
                meta: {title: '帖子编辑'}
            }, {
                path: '/editBlogPage',
                name: 'editBlogPage',
                component: resolve => require(['../components/page/EditBlogPage.vue'], resolve),
                meta: {title: '博客编辑'}
            }, {
                path: '/minePage',
                name: 'minePage',
                component: resolve => require(['../components/page/MinePage.vue'], resolve),
                meta: {title: '个人中心'},
                children: [{
                    path: '/minePage/myPost',
                    component: resolve => require(['../components/page/MyPost.vue'], resolve),
                    meta: {title: '我的帖子'}
                }, {
                    path: '/minePage/myCollection',
                    name: 'myCollection',
                    component: resolve => require(['../components/page/MyCollection.vue'], resolve),
                    meta: {title: '我的收藏'}
                }]
            }]
        }

        // {
        //   path: '/',
        //   name: 'HelloWorld',
        //   component: HelloWorld
        // }
    ]
})
