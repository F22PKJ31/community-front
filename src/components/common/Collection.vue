<template>
	<el-container>
		<el-card class="news" shadow="hover">
			<div class="clearfix" slot="header">
				<div class="container">
					<div class="news-prview">
						<a @click="handlePostDetail" class="news-title">{{ title }}</a>
						<el-button @click="dialogVisible = true" style="float: right" type="error">删除</el-button>
						<a class="author" v-bind:href="collectionData.userId">{{ collectionData.userName }}</a>
					</div>
				</div>
			</div>
			<div class="content clearfix">
				<el-tag style="float: left;">{{collectionData.createTime}}</el-tag>
				<el-button @click="handlePostDetail" class="news-detail" style="float: right;" type="text">查看原帖
				</el-button>
			</div>
		</el-card>
		<el-dialog :visible.sync="dialogVisible" title="确认删除"
		           width="30%">
			<span>是否确认删除该收藏</span>
			<span class="dialog-footer" slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="" type="primary">确 定</el-button>
  </span>
		</el-dialog>
	
	
	</el-container>
</template>

<script>
    export default {
        name: 'news',
        props: ['collectionData', 'collectionType'],
        data() {
            return {
                dialogVisible: false,
                title: ''
            }
        },
        created() {
            console.log(this.collectionData)
            switch (collectionType) {
                case 1:
                    this.title = this.collectionData.newsTitle;
                    break;
                case 2:
                    this.title = this.collectionData.postTitle;
                    break;
                case 3:
                    this.title = this.collectionData.blogTitle;
                    break;
            }
        },
        methods: {
            handlePostDetail() {
                this.$router.push({name: 'postDetail', query: {'newsId': this.collectionData.newsId}})
            },
            deleteCollection() {
                let param = {
                    id: this.collectionData.collectionId
                }
                switch (collectionType) {
                    case 1:
                        this.axiosProxy.deleteNewsCollection(param).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    case 2:
                        this.axiosProxy.deletePostCollection(param).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    case 3:
                        this.axiosProxy.deleteBlogCollection(param).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    default: {
                        this.$message('删除失败');
                    }
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		text-decoration: none;
	}
	
	.news {
		width: 1000px;
		height: auto;
		margin: 0 auto 8px;
	}
	
	.news-prview {
		height: 50px;
		position: relative;
	}
	
	.news-title {
		width: 90%;
		padding-left: 10px;
		color: #1a1a1a;
		font-size: 16px;
		line-height: 1.6;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		cursor: pointer;
		float: left;
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
	
	.news-detail {
		padding-right: 20px;
		float: right;
	}
	
	
	.news .el-card__body {
		padding: 0;
	}
</style>
