<template>
	<el-container>
		<el-main class="main" v-loading="loading">
			<div style="text-align: right;margin:20px 120px">
				<router-link to="/editPostPage">
					<el-button type="primary" v-if="isOwner">发帖</el-button>
				</router-link>
			</div>
			<el-table :data="post"
			          empty-text="什么也没找到"
			          style="margin: 0 auto">
				<el-table-column
						label="标题"
						prop="title"
						width="300px">
				</el-table-column>
				<el-table-column
						label="回复数"
						prop="readCount"
						width="50px">
				</el-table-column>
				<el-table-column
						label="创建时间"
						prop="createTime"
						width="180px">
				</el-table-column>
				<el-table-column
						label="审核状态" v-if="isOwner"
						width="100px">
					<template slot-scope="scope">
						<el-tag type="info" v-if="scope.row.state === 0">未审核</el-tag>
						<el-tag type="success" v-else-if="scope.row.state === 1">已通过</el-tag>
						<el-tag type="danger" v-else>不通过</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="审核原因"
				                 prop="reason"
				                 v-if="isOwner"
				                 width="150px">
				</el-table-column>
				<el-table-column
						fixed="right"
						label="操作"
						width="200px">
					<template slot-scope="scope">
						<el-button
								@click.native.prevent="showRow(scope.$index, post)"
								size="small"
								type="primary">
							查看
						</el-button>
						<el-button @click.native.prevent="handleDelete(scope.$index, post)"
						           size="small"
						           type="danger"
						           v-if="isOwner">
							移除
						</el-button>
					</template>
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
		<el-dialog :visible.sync="dialogVisible" title="确认删除"
		           width="30%">
			<span>是否确认删除</span>
			<span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="deletePost" type="primary">确 定</el-button>
            </span>
		</el-dialog>
	</el-container>
</template>

<script>
    import vPost from '../common/Post.vue'

    export default {
        components: {
            vPost
        },
        props: ['user'],
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getPostList();
            })
        },
        data() {
            return {
                dialogVisible: false,
                commentNum: 0,
                categoryId: '',
                post: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true,
                deleteId: '',
                isOwner: false
            }
        },
        created() {
            this.create()
        },
        methods: {
            create() {
                this.isOwner = sessionStorage.getItem('userId') == this.user.userId;
                if (this.isOwner) {
                    this.getAllPostList();
                } else {
                    this.getPostList();
                }
            },
            deletePost() {
                let param = {
                    id: this.deleteId
                };
                this.axiosProxy.deletePost(param).then(response => {
                    if (response.data) {
                        this.$message('删除成功');
                        this.getAllPostList();
                    } else {
                        this.$message('删除失败');
                    }
                    this.deleteId = '';
                    this.dialogVisible = false;
                })
            },
            showRow(index, rows) {
                this.$router.push({name: 'postDetail', query: {'postId': rows[index].postId}})
            },
            handleDelete(index, rows) {
                this.deleteId = rows[index].postId;
                this.dialogVisible = true;
            },
            handleCurrentChange(val) {
                this.current = val;
                if (this.isOwner) {
                    this.getAllPostList();
                } else {
                    this.getPostList();
                }
            },
            getAllPostList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                };
                this.axiosProxy.getAllPostList(params).then(response => {
                    this.post = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            getPostList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                };
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            handlePostDetail(row, column, event) {
                console.log(row);
                this.$router.push({name: 'postDetail', query: {'postId': row.postId}})
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

