<template>
	<el-container>
		<el-main class="main" v-loading="loading">
			<ul>
				<v-post :commentNum="commentNum" :key="postData.id" :postData="postData"
				        v-for=" postData in post"></v-post>
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
    import vPost from '../common/Post.vue'

    export default {
        components: {
            vPost
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getPostList();
            })
        },
        data() {
            return {
                commentNum: 0,
                categoryId: '',
                post: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true
            }
        },
        created() {
            this.getPostList()
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getPostList();
            },
            getPostList() {
                this.loading = true;
                var userId = localStorage.getItem('userId')
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: userId
                    }
                }
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            }
        }
    };
</script>

<style scoped>
	.main {
		margin: 20px 0;
	}
	
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

