<template>
	<el-container>
		<el-header>
			<template>
				<el-carousel :interval="4000" height="250px" type="card">
					<el-carousel-item>
						<img src="../../assets/tupian1.jpg" style="width: 100%"/>
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/tupian2.jpg" style="width: 100%"/>
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/tupian3.jpg" style="width: 100%"/>
					</el-carousel-item>
				</el-carousel>
			</template>
		</el-header>
		<el-main style="margin-top: 200px">
			<el-row :gutter="20">
				<el-col :span="8">
					<h5>最新要闻</h5>
					<div class="thumbnail" v-for="n in news">
						<div class="caption">
							<h3>{{n.title}}
							</h3>
							{{n.content.length>30?n.content.substring(0,30)+'...':n.content}}
							<p>
								<a class="btn btn-primary" href="#">Action</a> <a class="btn" href="#">查看详情</a>
							</p>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<h5>优质博客</h5>
					<div class="thumbnail" v-for="n in blog">
						<div class="caption">
							<h3>{{n.title}}
							</h3>
							{{n.content.length>30?n.content.substring(0,30)+'...':n.content}}
							<p>
								<a class="btn btn-primary" href="#">Action</a> <a class="btn" href="#">查看详情</a>
							</p>
						</div>
					</div>
				</el-col>
				<el-col :span="8">
					<h5>最热帖子</h5>
					<div class="thumbnail" v-for="n in posts">
						<div class="caption">
							<h3>{{n.title}}
							</h3>
							{{n.content.length>30?n.content.substring(0,30)+'...':n.content}}
							<p>
								<a class="btn btn-primary" href="#">Action</a> <a class="btn" href="#">查看详情</a>
							</p>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
    export default {
        name: 'homePage',
        data() {
            return {
                news: '',
                posts: '',
                blog: '',
            }
        },
        created() {
            this.getBlogList();
            this.getPostList();
            this.getNewsList();
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
            },
            getPostList() {
                this.loading = true;
                let params = {
                    current: 1,
                    size: 3,
                    t: {}
                }
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
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
                this.axiosProxy.getBlogList(params).then(response => {
                    this.blog = response.data.records;
                    this.loading = false;
                })
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
</style>
