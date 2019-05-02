<template>
	<el-container>
		<el-header>
			<div style="text-align: right;margin:20px 120px">
				<router-link to="/editBlogPage" v-if="userId">
					<el-button type="primary">撰写博客</el-button>
				</router-link>
			</div>
		</el-header>
		<el-container>
			<el-main>
				<el-input placeholder="搜索博客" size="medium" style="width: 30%" v-model="selectBlog"></el-input>
				<el-button @click="search" icon="search" style="margin-left: 50px" type="primary">搜索</el-button>
			</el-main>
		</el-container>
		<el-main class="main" v-loading="loading">
			<div style="width: 100%;height: 300px;text-align: center" v-if="blog.length === 0">
				<h3 style="line-height: 300px;color: red">什么也没找到</h3>
			</div>
			<ul>
				<v-blog :blogData="blogData" :commentNum="commentNum" :key="blogData.id"
				        v-for=" blogData in blog"></v-blog>
			</ul>
		</el-main>
		<el-footer>
			<el-pagination :current-page="current" :page-size="size" :total="total"
			               @current-change="handleCurrentChange"
			               background layout="prev, pager, next"
			               style="float: right">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
    import vBlog from '../common/Blog.vue'

    export default {
        components: {
            vBlog
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getBlogList();
            })
        },
        data() {
            return {
                commentNum: 0,
                categoryId: '',
                selectBlog: '',
                blog: [],
                userId: localStorage.getItem('userId'),
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true
            }
        },
        created() {
            this.getBlogList()
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getBlogList();
            },
            getBlogList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {}
                }
                this.axiosProxy.getBlogList(params).then(response => {
                    this.blog = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            search() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        title: this.selectBlog,
                        categoryId: this.categoryId
                    }
                }
                this.axiosProxy.getBlogList(params).then(response => {
                    this.blog = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages
                    this.loading = false;
                })
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

