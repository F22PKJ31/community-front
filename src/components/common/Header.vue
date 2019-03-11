<template>
	<el-menu :default-active="activeIndex2" :router="true" @select="handleSelect"
	         active-text-color="#ffd04b" background-color="#545c64" class="el-menu-demo" mode="horizontal"
	         text-color="#fff">
		<el-menu-item disabled>IT技术视频分享交流社区</el-menu-item>
		<el-menu-item index="newsPage">新闻推荐</el-menu-item>
		<el-menu-item index="blogPage">博客中心</el-menu-item>
		<el-menu-item index="communityPage">社区中心</el-menu-item>
		<el-submenu v-if="isLogin">
			<template slot="title">我的</template>
			<el-menu-item index="minePage">个人中心</el-menu-item>
			<el-menu-item index="collectionsPage">我的收藏</el-menu-item>
			<el-menu-item index="commentsPage">我的评论</el-menu-item>
			<el-menu-item>退出</el-menu-item>
		</el-submenu>
		<el-menu-item style="float: right;" v-if="!isLogin">注册</el-menu-item>
		<el-menu-item style="float: right;" v-if="!isLogin">登录</el-menu-item>
	</el-menu>

</template>


<script>
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                isLogin: false
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>
