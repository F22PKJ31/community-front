<template>
	<el-card :body-style="{ padding: '0px'}">
		<el-container style="padding: 14px;">
			<el-aside class="small-img" style="height:80px;" width="80px">
				<img alt="avatar" class="avatar fl" style="height: 100%;width: 100%" v-bind:src="user.imgUrl"/>
			</el-aside>
			<el-container>
				<el-main style="padding: 5px 20px">
					<p>{{comment.content}}</p>
				</el-main>
				<el-footer class="clearfix" style="height: 15px">
					<a v-bind:href="'/#/minePage?userId='+ comment.userId">
						<span style="font-size: 14px">{{comment.userName}}</span>
					</a>
					<time class="time">发表于{{comment.createTime}}</time>
				</el-footer>
			</el-container>
		</el-container>
	</el-card>
</template>

<script>
    export default {
        name: "comment",
        props: ['comment'],
        data() {
            return {
                user: ''
            }
        },
        created() {
            this.getUserById();
        },
        methods: {
            getUserById() {
                const param = {
                    id: this.comment.userId
                };
                this.axiosProxy.getUser(param).then(response => {
                    this.user = response.data;
                })
            }
        },
        watch: {
            user() {
                this.getUserById()
            }
        }
    };
</script>

<style>
	p {
		margin: 0;
		width: 100%;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
	}
	
	.itemWrap a {
		text-decoration: none;
		color: #000000;
	}
	
	
	.time {
		float: right;
	}

</style>

