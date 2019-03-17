<template>
	<el-card class="blog" shadow="hover">
		<div class="clearfix" slot="header">
			<div class="container">
				<div class="blog-prview">
					<a @click="handlePostDetail" class="blog-title">{{ blogData.title }}</a><br>
					<a class="author" v-bind:href="blogData.userId">{{ blogData.userName }}</a>
					<el-badge :max="999" :value="commentNum" class="replies-num">
						<el-button>评论</el-button>
					</el-badge>
				</div>
			</div>
		</div>
		<div class="content clearfix">
			<el-tag style="float: left;">{{blogData.createTime}}</el-tag>
			<el-button @click="handlePostDetail" class="blog-detail" style="float: right;" type="text">查看博客</el-button>
		</div>
	</el-card>
</template>

<script>
    export default {
        name: 'blog',
        props: ['blogData'],
        data() {
            return {
                commentNum: 0
            }
        },
        created() {
            this.getCommentNum();
        },
        methods: {
            handlePostDetail() {
                this.$router.push({name: 'blogDetail', query: {'blogId': this.blogData.blogId}})
            },
            getCommentNum() {
                let params = {
                    id: this.blogData.blogId
                }
                this.axiosProxy.countBlogComment(params).then(response => {
                    this.commentNum = response.data;
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		text-decoration: none;
	}
	
	.blog {
		width: 1000px;
		height: auto;
		margin: 0 auto 8px;
	}
	
	.blog-prview {
		height: 50px;
		position: relative;
	}
	
	.blog-title {
		width: 90%;
		padding-left: 10px;
		color: #1a1a1a;
		font-size: 20px;
		line-height: 1.6;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
	}
	
	.author {
		padding-left: 10px;
		color: red;
		float: left;
	}
	
	.replies-num {
		width: 50px;
		height: 30px;
		margin-right: 18px;
		float: right;
	}
	
	.blog-detail {
		padding-right: 20px;
		float: right;
	}
	
	
	.blog .el-card__body {
		padding: 0;
	}
</style>
