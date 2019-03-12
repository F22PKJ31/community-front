<template>
	<el-card class="news" shadow="hover">
		<div class="clearfix" slot="header">
			<div class="container">
				<div class="news-prview">
					<a @click="handlePostDetail" class="news-title">{{ newsData.title }}</a>
					<el-badge :max="999" :value="newsData.readCount" class="replies-num">
						<el-button>回帖</el-button>
					</el-badge>
					<a class="author" v-bind:href="newsData.userId">{{ newsData.userName }}</a>
				</div>
			</div>
		</div>
		<div class="content clearfix">
			<el-button class="news-detail" style="float: right;" type="text" v-bind:href="newsData.newsId">查看原帖</el-button>
		</div>
	</el-card>
</template>

<script>
    export default {
        name: 'news',
        props: ['newsData'],
        data() {
            return {}
        },
        mounted() {

        },
		created(){

		},
        methods: {
            handlePostDetail() {
                this.$router.push({path: '/newsDetail/' + this.newsData.id})
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
	
	.avatar {
		width: 48px;
		height: 48px;
		float: left;
	}
	
	.news-title {
		width: 90%;
		padding-left: 10px;
		color: #1a1a1a;
		text-align: left;
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
		color: gray;
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
	
	.node-name {
		margin-top: 4px;
		margin-left: 10px;
	}
</style>

<style>
	.news .el-card__body {
		padding: 0;
	}
</style>
