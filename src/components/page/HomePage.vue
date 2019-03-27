<template>
	<el-container>
		<el-header>
			<template>
				<el-carousel :interval="4000" height="250px" type="card">
					<el-carousel-item v-for="img in headImg">
						<img :src="img.imgUrl" @click="handleNewsDetail(img)" style="width: 100%"/>
					</el-carousel-item>
				</el-carousel>
			</template>
		</el-header>
		<el-main style="margin-top: 200px">
			<el-row :gutter="20">
				<h3>最新要闻</h3>
				<el-col :span="8" v-for="n in news">
					<div class="thumbnail">
						<div class="caption">
							<div @click="handleNewsDetail(n)">
								<div style="height: 60px;text-align: center">
									<h5>{{n.title}}</h5>
								</div>
								<img :src="n.imgUrl" width="100%">
								<el-badge :max="999" :value="n.readCount" class="replies-num"
								          style="float: left;margin-top: 20px">
									<el-button>评论</el-button>
								</el-badge>
							</div>
							<div style="width: 100%;text-align: right;margin-top: 20px">
								<el-button @click="handleNewsDetail(n)" type="primary">查看详情</el-button>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="12">
					<h3>优质博客</h3>
					<v-blog :blogData="blogData" style="width: 100%" v-for="blogData in blog"></v-blog>
				</el-col>
				<el-col :span="12">
					<h3>最热帖子</h3>
					<el-table
							:data="posts"
							@row-click="handlePostDetail"
							style="width: 100%;margin: 0 auto">
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
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
    import vBlog from '../common/Blog.vue'
    import vPost from '../common/Post.vue'

    export default {
        name: 'homePage',
        components: {vBlog, vPost},
        data() {
            return {
                news: '',
                posts: '',
                blog: '',
                headImg: ''
            }
        },
        created() {
            this.getBlogList();
            this.getPostList();
            this.getNewsList();
            this.getHeadImgList();
        },
        computed: {},
        methods: {
            getNewsList() {
                this.loading = true;
                let params = {
                    current: 1,
                    size: 3,
                    t: {}
                }
                this.axiosProxy.getNewsList(params).then(response => {
                    this.news = response.data.records;
                    this.loading = false;
                })
            }, getHeadImgList() {
                this.loading = true;
                this.axiosProxy.headImgList().then(response => {
                    this.headImg = response.data;
                    this.loading = false;
                })
            },
            getPostList() {
                this.loading = true;
                let params = {
                    current: 1,
                    size: 10,
                    t: {}
                }
                this.axiosProxy.getPostListOrderByRead(params).then(response => {
                    this.posts = response.data.records;
                    this.loading = false;
                })
            },
            getBlogList() {
                this.loading = true;
                let params = {
                    current: 1,
                    size: 3,
                    t: {}
                }
                this.axiosProxy.getBlogListOrderByRead(params).then(response => {
                    this.blog = response.data.records;
                    this.loading = false;
                })
            }, handlePostDetail(row, column, event) {
                console.log(row);
                this.$router.push({name: 'postDetail', query: {'postId': row.postId}})
            }, handleNewsDetail(news) {
                this.$router.push({name: 'newsDetail', query: {'newsId': news.newsId}})
            }
        }
    }

</script>

<style scoped>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}
	
	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
	
	.thumbnail {
		border: 1px solid #ccc;
		background-color: #fff;
		padding: 10px;
	}
	
	h3 {
		padding: 20px;
	}
	
	a {
		text-decoration: none;
	}
</style>
