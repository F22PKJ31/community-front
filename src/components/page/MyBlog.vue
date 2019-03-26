<template>
    <el-container>
        <el-header>
            <div style="text-align: right;margin:0px 120px" v-if="isOwner">
                <router-link to="/editBlogPage">
                    <el-button type="primary">撰写博客</el-button>
                </router-link>
            </div>
        </el-header>
        <el-main class="main" v-loading="loading">
            <ul>
                <v-blog :blogData="blogData" :commentNum="commentNum" :key="blogData.id" :flag="flag"
                        v-for=" blogData in blog"></v-blog>
            </ul>
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
    import vBlog from '../common/Blog.vue'

    export default {
        components: {
            vBlog
        },
        props:['user'],
        data() {
            return {
                flag: true,
                commentNum: 0,
                categoryId: '',
                blog: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true,
                isOwner: false
            }
        },
        created() {
            this.create()
        },
        methods: {
            create(){
                this.isOwner = localStorage.getItem('userId') == this.user.userId;
                console.log(this.isOwner)
                this.getBlogList();
                this.$bus.on('deleteBlog', (e) => {
                        this.getBlogList();
                    }
                )
            },
            handleCurrentChange(val) {
                this.current = val;
                this.getBlogList();
            },
            getBlogList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                }
                this.axiosProxy.getBlogList(params).then(response => {
                    this.blog = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            }
        }
    }
    ;
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

