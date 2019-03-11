<template>
	<el-container>
		<el-aside style="width: 225px;">
			<v-category class="category"></v-category>
		</el-aside>
		<el-container class="wrap">
			<el-main class="main" v-loading="loading">
				<ul>
					<v-news :key="newsData.id" :newsData="newsData" v-for=" newsData in news"></v-news>
				</ul>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
    import vCategory from '../common/Category.vue'
    import vNews from '../common/News.vue'

    export default {
        components: {
            vCategory, vNews
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        data() {
            return {
                msg: '主页',
                news: [],
                loading: true
            }
        },
        created: function () {
            this.getHotList()
        },
        methods: {
            getHotList() {
                // 获取热门主题下的信息
                this.news = require('./latest.json')
                console.log(this.posts);
                this.loading = false
            },
            getLatestList() {
                // 获取最新主题下的信息
                this.news = require('./latest.json')
                this.loading = false
            }
        }
    };
</script>

<style scoped>
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


</style>

