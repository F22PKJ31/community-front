<template>
	<el-container>
		<el-aside style="width: 200px;margin-top: 50px">
			<el-menu :router="true"
			         @close="handleClose"
			         @open="handleOpen"
			         active-text-color="#ffd04b"
			         background-color="#545c64"
			         class="el-menu-vertical"
			         default-active="/minePage/myPost"
			         text-color="#fff">
				<el-menu-item index="/minePage/myPost">
					<i class="el-icon-menu"></i>
					<span slot="title">我的帖子</span>
				</el-menu-item>
				<el-menu-item index="/minePage/myCollection">
					<i class="el-icon-menu"></i>
					<span slot="title">我的收藏</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-main class="main">
			<router-view></router-view>
		</el-main>
	</el-container>
</template>

<script>
    import vCategory from '../common/Category.vue'
    import vNews from '../common/News.vue'

    export default {

        components: {
            vCategory, vNews
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
            })
        },
        data() {
            return {
                msg: '主页',
                news: {
                    title: '',
                    content: '',
                    userId: '',
                    userName: ''
                },
                loading: true
            }
        },
        created: function () {
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    };
</script>

<style>
	h1, h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: inherit;
		text-decoration: none;
	}
	
	.el-menu-vertical {
		width: 200px;
	}
	
	.el-aside {
		width: 200px;
	}

</style>

