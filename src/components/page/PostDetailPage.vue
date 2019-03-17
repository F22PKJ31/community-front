<template>
	<el-container style="margin: 30px 60px">
		<el-header>
			<h2>{{post.title}}</h2>
			<div style="text-align: right">
				<a class="author" v-bind:href="post.userId">{{ post.userName }}</a>
				发表于
				{{post.createTime}}
			</div>
		</el-header>
		<el-main>
			<div class="content" v-html="post.content"></div>
			<div style="margin: 10px 0;text-align: right" v-show="userId!=null">
				<el-input type="textarea" v-model="newComment"></el-input>
				<el-button @click="sendPostComment" style="margin: 10px 0" type="primary">评论</el-button>
			</div>
			<div style="text-align: right" v-show="userId==null">
				<el-button style="margin: 10px 0" type="danger ">请登录</el-button>
			</div>
			<div loading v-loading="loading">
				<v-comment :comment="comment" v-for="comment in commentList"></v-comment>
				<el-pagination :current-page="current" :page-size="size" :total="total"
				               @current-change="handleCurrentChange"
				               background layout="prev, pager, next"
				               style="float: right">
				</el-pagination>
			</div>
		</el-main>
	</el-container>
</template>

<script>
    import vComment from '../common/Comment.vue'

    export default {
        components: {
            vComment
        },
        data() {
            return {
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                commentList: '',
                newComment: '',
                post: '',
                userId: localStorage.getItem('userId'),
                loading: true
            }
        },
        created() {
            this.axiosProxy.getPostById({'id': this.$route.query.postId}).then(response => {
                this.post = response.data;
                this.getPostCommentList();
            });
        },
        computed() {
            userId = localStorage.getItem('userId')
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getPostCommentList();
            },
            getPostCommentList() {
                console.log(this.post.postId)
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        postId: this.post.postId
                    }
                };
                this.axiosProxy.getPostCommentList(params).then(response => {
                    console.log(response.data.records)
                    this.commentList = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            sendPostComment() {
                if (this.newComment.length <= 0) {
                    this.$message("评论不能为空")
                    return;
                }
                let params = {
                    content: this.newComment,
                    userId: localStorage.getItem("userId"),
                    userName: localStorage.getItem("userName"),
                    postId: this.post.postId,
                    postName: this.post.postName
                }
                this.axiosProxy.sendPostComment(params).then(response => {
                    if (response.data) {
                        this.$message('评论成功');
                        this.getPostCommentList();
                        this.newComment = '';
                    } else {
                        this.$message('评论失败');
                    }
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
	
	.author {
		color: gray;
	}
	
	.content {
		white-space: pre-wrap;
		background-color: #ffffff;
		border: 1px;
		line-height: 25px;
		font-size: 14px;
		padding: 30px;
	}


</style>

