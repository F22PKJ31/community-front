<template>
	<el-col :span="6">
		<el-card class="user" shadow="hover" style="text-align: center">
			<div class="container">
				<a href="javascript:void(0)" v-bind:href="'/#/minePage?userId='+userData.userId">
					<div class="user-prview">
						<h3>{{ userData.userName }}</h3>
					</div>
					<img :src="userData.imgUrl" class="head-img"/>
					<el-badge :value="blogList.length" class="item" style="margin-right: 50px" type="primary">
						<el-button size="small">博文</el-button>
					</el-badge>
					<el-badge :value="postList.length" class="item" type="primary">
						<el-button size="small">帖子</el-button>
					</el-badge>
				</a>
			</div>
		</el-card>
	</el-col>
</template>

<script>
    export default {
        name: 'user',
        props: ['userData', 'flag'],
        data() {
            return {
                dialogVisible: false,
                isOwner: false,
                blogList: [],
                postList: []
            }
        },
        created() {
            this.isOwner = sessionStorage.getItem('userId') == this.userData.userId;
            this.getPostByUserId();
            this.getBlogByUserId();
        },
        updated: function () {
            this.isOwner = sessionStorage.getItem('userId') == this.userData.userId;
        },
        methods: {
            handleUserDetail() {
                this.$router.push({name: 'userDetail', query: {'userId': this.userData.userId}})
            },
            getBlogByUserId() {
                let param = {
                    t: {
                        userId: this.userData.userId
                    }
                }
                this.axiosProxy.getBlogList(param).then(response => {
                    this.blogList = response.data.records;
                })
            },
            getPostByUserId() {
                let param = {
                    t: {
                        userId: this.userData.userId
                    }
                }
                this.axiosProxy.getPostList(param).then(response => {
                    this.postList = response.data.records;
                })
            }
        },
        watch: {
            'userData'(to, from) {
                this.isOwner = sessionStorage.getItem('userId') == this.userData.userId;
                this.getPostByUserId();
                this.getBlogByUserId();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	a {
		text-decoration: none;
	}
	
	.user {
		width: 100%;
		height: auto;
		margin: 0 auto 8px;
	}
	
	.user-prview {
		height: 50px;
		position: relative;
	}
	
	.user-title {
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
	
	.user-detail {
		padding-right: 20px;
		float: right;
	}
	
	
	.user .el-card__body {
		padding: 0;
	}
</style>
