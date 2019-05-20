<template>
	<el-container style="margin: 30px 60px">
		<el-header>
			<el-button @click="editPost()" style="margin: 10px 0;float: right" type="primary"
			           v-if="post.userId==this.userId">编辑
			</el-button>
			<el-button @click="saveCollection()" style="margin: 10px 0;float: right" type="primary"
			           v-if="this.userId&&post.userId!=this.userId&&!isCollection">收藏
			</el-button>
			<el-button @click="deleteCollection()" style="margin: 10px 0;float: right" type="warning"
			           v-if="this.userId&&post.userId!=this.userId&&isCollection">取消收藏
			</el-button>
			<el-button style="margin: 10px 0;float: right" type="danger" v-if="!this.userId">登陆后收藏</el-button>
			
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
				<el-input maxlength="100" placeholder="请输入回复内容，限制100字" type="textarea" v-model="newComment"></el-input>
				<el-button @click="sendPostComment" style="margin: 10px 0" type="primary">回复</el-button>
			</div>
			<div style="margin: 10px 0;text-align: right" v-show="userId==null">
				<el-input disabled maxlength="100" type="textarea" v-model="newComment"></el-input>
				<el-button style="margin: 10px 0" type="danger">请登录后回复</el-button>
			</div>
			<div style="width: 100%;height: 200px;text-align: center;background-color: #FFFFFF"
			     v-if="commentList==null||commentList.length === 0">
				<h4 style="line-height: 200px">暂无回复</h4>
			</div>
			<v-comment :comment="comment" v-for="comment in commentList"></v-comment>
			<el-pagination :current-page="current" :page-size="size" :total="total"
			               @current-change="handleCurrentChange"
			               background layout="prev, pager, next"
			               style="float: right">
			</el-pagination>
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
                isCollection: false,
                newComment: '',
                post: '',
                userId: sessionStorage.getItem('userId'),
                loading: true
            }
        },
        created() {
            this.axiosProxy.getPostById({'id': this.$route.query.postId}).then(response => {
                this.post = response.data;
                this.getPostCommentList();
                this.getCollectionByUserId();
            });
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getPostCommentList();
            },
            getPostCommentList() {
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
                    userId: sessionStorage.getItem("userId"),
                    userName: sessionStorage.getItem("userName"),
                    postId: this.post.postId,
                    postTitle: this.post.title
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
            },
            saveCollection() {

                let params = {
                    userId: sessionStorage.getItem("userId"),
                    userName: sessionStorage.getItem("userName"),
                    postId: this.post.postId,
                    postTitle: this.post.title
                }
                this.axiosProxy.savePostCollection(params).then(response => {
                    if (response.data) {
                        this.$message('收藏成功');
                        this.isCollection = true;
                        this.getCollectionByUserId();
                    } else {
                        this.$message('收藏失败');
                    }
                })
            }, getCollectionByUserId() {

                let params = {
                    t: {
                        userId: sessionStorage.getItem("userId"),
                        userName: sessionStorage.getItem("userName"),
                        postId: this.post.postId,
                        postTitle: this.post.title
                    }
                }
                this.axiosProxy.getPostCollectionList(params).then(response => {
                    if (response.data.records.length !== 0) {
                        this.isCollection = true;
                        this.collectionId = response.data.records[0].collectionId;
                    } else {
                        this.isCollection = false;
                    }
                })
            }, deleteCollection() {

                let params = {
                    id: this.collectionId
                }
                this.axiosProxy.deletePostCollection(params).then(response => {
                    console.log(this.collectionId)
                    if (response.data) {
                        this.$message('取消成功');
                        this.isCollection = false;
                    } else {
                        this.$message('取消失败');
                    }
                })
            }, editPost() {
                this.$router.push({name: 'editPostPage', query: {'postId': this.post.postId}})
            }
        },
        watch: {
            '$route'(to, from) {
                this.axiosProxy.getPostById({'id': this.$route.query.postId}).then(response => {
                    this.post = response.data;
                    this.getPostCommentList();
                    this.getCollectionByUserId();
                });
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
<style>
	frame {
		width: 800px;
		height: 600px;
		margin: 0 auto;
	}
	
	img {
		max-width: 100%;
	}
</style>
