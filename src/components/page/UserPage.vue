<template>
	<el-container>
		<el-main class="main" v-loading="loading">
			<el-row :gutter="10">
				<v-user :commentNum="commentNum" :key="userData.id" :userData="userData"
				        v-for="userData in user"></v-user>
			</el-row>
		</el-main>
		<el-footer>
			<el-pagination :current-page="current" :page-size="size" :total="total"
			               @current-change="handleCurrentChange"
			               background layout="prev, pager, next"
			               style="float: right">
			</el-pagination>
		</el-footer>
	</el-container>
</template>

<script>
    import vUser from '../common/User.vue'

    export default {
        components: {
            vUser
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getUserList();
            })
        },
        data() {
            return {
                commentNum: 0,
                categoryId: '',
                user: [],
                size: 12,
                current: 0,
                total: 0,
                pages: 0,
                loading: true
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getUserList();
            },
            getUserList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {}
                }
                this.axiosProxy.getUserList(params).then(response => {
                    this.user = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
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

</style>

