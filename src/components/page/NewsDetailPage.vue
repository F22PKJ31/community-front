<template>
    <el-container>
        <el-header>
            <h3>{{news.title}}</h3>
        </el-header>
        <a class="author" v-bind:href="news.userId">{{ news.userName }}</a>
        <el-main class="main" v-loading="loading">
            {{news.content}}
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
                news: {
                    title: '',
                    content: '',
                    userId: '',
                    userName: ''
                },
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
                this.axiosProxy.getNewsList(params).then(response => {
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

    .author {
        padding-right: 20px;
        color: gray;
        float: right;
    }


</style>

