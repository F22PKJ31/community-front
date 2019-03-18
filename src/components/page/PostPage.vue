<template>
	<el-container>
		<el-main class="main" v-loading="loading">
			<div style="width: 90%;margin: 0 auto">
				<img alt="140x140" class="img-responsive" src="http://47.95.14.18:9080/mvn/img/xuewen.png"
				     style="width: 100%;"/>
			</div>
			<div style="text-align: right;margin:20px 120px">
				<router-link to="/editPostPage">
					<el-button type="primary">发帖</el-button>
				</router-link>
			</div>
			<el-table
					:data="post"
					:default-sort="{prop: 'createTime', order: 'descending'}"
					@row-click="handlePostDetail"
					style="width: 90%;margin: 0 auto">
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
                post: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
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
                console.log(this.post)
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

