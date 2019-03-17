<template>
	<el-container>
		<el-header>
			<el-tabs @tab-click="handleClick" v-model="activeName">
				<el-tab-pane label="新闻收藏" name="first"></el-tab-pane>
				<el-tab-pane label="帖子收藏" name="second"></el-tab-pane>
				<el-tab-pane label="博客收藏" name="third"></el-tab-pane>
			</el-tabs>
		</el-header>
		<el-main>
			<div v-if="activeName==='first'">
				<v-collection :collectionData="collection" collectionType="1"
				              v-for="collection in newsCollection"></v-collection>
			</div>
			<div v-else-if="activeName==='second'">
				<v-collection :collectionData="collection" collectionType="2"
				              v-for="collection in postCollection"></v-collection>
			</div>
			<div v-else>
				<v-collection :collectionData="collection" collectionType="3"
				              v-for="collection in blogCollection"></v-collection>
			</div>
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
    import vCollection from '../common/Collection.vue'

    export default {
        components: {
            vCollection
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getNewsCollectionList();
            })
        },
        data() {
            return {
                newsCollection: [],
                postCollection: [],
                blogCollection: [],
                collectionType: 1,
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true,
                activeName: 'second'
            }
        },
        created() {
            this.getNewsCollectionList();
            this.getBlogCollectionList();
            this.getPostCollectionList();
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
                this.getNewsCollectionList();
                this.getBlogCollectionList();
                this.getPostCollectionList();
            },
            getNewsCollectionList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: localStorage.getItem('userId')
                    }
                }
                this.axiosProxy.getNewsCollectionList(params).then(response => {
                    this.newsCollection = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            getPostCollectionList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: localStorage.getItem('userId')
                    }
                }
                this.axiosProxy.getPostCollectionList(params).then(response => {
                    this.postCollection = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            getBlogCollectionList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: localStorage.getItem('userId')
                    }
                }
                this.axiosProxy.getBlogCollectionList(params).then(response => {
                    this.blogCollection = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            handleClick(tab, event) {
                this.current = 0;
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

