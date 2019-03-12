<template>
        <el-container>
            <el-main class="main" v-loading="loading">
                <ul>
                    <v-news :key="newsData.id" :newsData="newsData" v-for=" newsData in news"></v-news>
                </ul>
            </el-main>
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
                this.getHotList();
            })
        },
        data() {
            return {
                msg: '主页',
                news: [],
                loading: true
            }
        },
        created: function () {
            this.getHotList()
        },
        methods: {
            getHotList() {
                // 获取热门主题下的信息
                this.loading = true;
                let params = {
                    t: {
                        categoryId: this.categoryId
                    }
                }
                this.axiosProxy.getNewsList(params).then(response =>{
                    this.news = response.data.records;
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

    .category {
        width: 1000px;
        margin: 20px auto;
    }


</style>

