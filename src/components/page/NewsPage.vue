<template>
	<el-container>
		<el-header>
			<v-category></v-category>
		</el-header>
		<el-container>
			<el-main>
				<el-input placeholder="搜索新闻" size="medium" style="width: 30%" v-model="selectNews"></el-input>
				<el-button @click="search" icon="search" style="margin-left: 50px" type="primary">搜索</el-button>
			</el-main>
		</el-container>
		<el-main class="main" v-loading="loading">
			<div style="width: 100%;height: 300px;text-align: center" v-if="news.length === 0">
				<h3 style="line-height: 300px;color: red">什么也没找到</h3>
			</div>
			<v-news :newsData="newsData" v-for=" newsData in news"></v-news>
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
    import vCategory from '../common/Category.vue'
    import vNews from '../common/News.vue'

    export default {
        components: {
            vCategory, vNews
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getNewsList();
            })
        },
        data() {
            return {
                categoryId: '',
                news: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                selectNews: '',
                loading: true
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getNewsList();
            },
            getNewsList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        categoryId: this.categoryId
                    }
                }
                this.axiosProxy.getNewsList(params).then(response => {
                    this.news = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            search() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        title: this.selectNews,
                        categoryId: this.categoryId
                    }
                }
                this.axiosProxy.getNewsList(params).then(response => {
                    this.news = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages
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
	
	.pagination {
		margin: 20px 0;
		text-align: right;
	}

</style>

