<template>
	<el-container>
		<el-main class="main" v-loading="loading">
			<el-container>
				<el-main>
					<el-input placeholder="搜索帖子" size="medium" style="width: 30%" v-model="selectPost"></el-input>
					<el-button @click="search" icon="search" style="margin-left: 50px" type="primary">搜索</el-button>
				</el-main>
			</el-container>
			<div style="margin: 0 auto">
				<img alt="140x140" class="img-responsive" src="http://localhost:8010/xuewen.png"
				     style="width: 100%;"/>
			</div>
			<div style="text-align: right;margin:20px 120px">
				<router-link to="/editPostPage" v-if="userId">
					<el-button type="primary">发帖</el-button>
				</router-link>
			</div>
			<el-table empty-text="什么也没找到"
			          :data="post"
			          :default-sort="{prop: 'createTime', order: 'descending'}"
			          @row-click="handlePostDetail"
			          style="margin: 0 auto">
				<el-table-column
						label="标题"
						prop="title">
				</el-table-column>
				<el-table-column
						label="提问人"
						prop="userName"
						width="180">
				</el-table-column>
				<el-table-column
						label="回复数"
						prop="readCount"
						sortable
						width="100">
				</el-table-column>
				<el-table-column
						label="创建时间"
						prop="createTime"
						sortable
						width="180">
				</el-table-column>
			</el-table>
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
                selectPost: '',
                post: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                userId: sessionStorage.getItem("userId"),
                loading: true
            }
        },
        created() {
            this.getPostList();
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getPostList();
            },
            getPostList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {}
                };
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
                    this.getCommentNum();
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            handlePostDetail(row, column, event) {
                console.log(row);
                this.$router.push({name: 'postDetail', query: {'postId': row.postId}})
            },
            getCommentNum() {
                for (let i = 0; i < this.post.length; i++) {
                    let params = {
                        id: this.post[i].postId
                    };
                    this.axiosProxy.countPostComment(params).then(response => {
                        this.post[i].readCount = response.data;
                    })
                }
            },
            search() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        title: this.selectPost,
                    }
                }
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
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
	
	.pagination {
		margin: 20px 0;
		text-align: right;
	}

</style>

