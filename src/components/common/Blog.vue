<template>
	<el-card class="blog" shadow="hover">
		<div class="clearfix" slot="header">
			<div class="container">
				<div class="blog-prview">
					<a @click="handleBlogDetail" class="blog-title">{{ blogData.title }}</a><br>
					<a class="author" v-bind:href="'/#/minePage?userId='+blogData.userId" v-if="!flag">{{
						blogData.userName }}</a>
					<el-badge :max="999" :value="blogData.readCount" class="replies-num" v-if="!flag">
						<el-button>评论</el-button>
					</el-badge>
				</div>
				<div v-if="flag&&isOwner">
					<el-tag type="info" v-if="blogData.state === 0">未审核</el-tag>
					<el-tag type="success" v-else-if="blogData.state === 1">已通过</el-tag>
					<el-tag type="danger" v-else>不通过</el-tag>
					<el-tag style="margin-left: 20px" type="danger" v-if="blogData.state === -1">
						原因：{{blogData.reason}}
					</el-tag>
				</div>
				<el-button @click="dialogVisible = true" class="delete-button" type="danger"
				           v-if="flag&&isOwner">删除
				</el-button>
			</div>
		</div>
		<div class="content clearfix">
			<el-tag style="float: left;">{{blogData.createTime}}</el-tag>
			<el-button @click="handleBlogDetail" class="blog-detail" style="float: right;" type="text">查看博客</el-button>
		</div>
		<el-dialog :visible.sync="dialogVisible" title="确认删除"
		           width="30%">
			<span>是否确认删除</span>
			<span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="deleteBlog" type="primary">确 定</el-button>
            </span>
		</el-dialog>
	</el-card>

</template>

<script>
    export default {
        name: 'blog',
        props: ['blogData', 'flag'],
        data() {
            return {
                dialogVisible: false,
                isOwner: false
            }
        },
        created() {
            this.isOwner = sessionStorage.getItem('userId') == this.blogData.userId;
        },
        updated: function () {
            this.isOwner = sessionStorage.getItem('userId') == this.blogData.userId;
        },
        methods: {
            handleBlogDetail() {
                this.$router.push({name: 'blogDetail', query: {'blogId': this.blogData.blogId}})
            },
            deleteBlog() {
                let param = {
                    id: this.blogData.blogId
                }
                this.axiosProxy.deleteBlog(param).then(response => {
                    if (response.data) {
                        this.$message('删除成功');
                    } else {
                        this.$message('删除时报');
                    }
                    this.dialogVisible = false;
                    this.$bus.emit('deleteBlog', null);
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
		width: 100%;
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
	
	.delete-button {
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
