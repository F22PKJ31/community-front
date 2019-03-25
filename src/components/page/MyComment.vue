<template>
    <el-container>
        <el-header>
            <el-tabs @tab-click="handleClick" v-model="activeName">
                <el-tab-pane label="新闻评论" name="first"></el-tab-pane>
                <el-tab-pane label="帖子评论" name="second"></el-tab-pane>
                <el-tab-pane label="博客评论" name="third"></el-tab-pane>
            </el-tabs>
        </el-header>
        <el-main>
            <div v-if="activeName==='first'">
                <v-comment :commentData="comment" commentType="1"
                              v-for="comment in newsComment"></v-comment>
            </div>
            <div v-else-if="activeName==='second'">
                <v-comment :commentData="comment" commentType="2"
                              v-for="comment in postComment"></v-comment>
            </div>
            <div v-else>
                <v-comment :commentData="comment" commentType="3"
                              v-for="comment in blogComment"></v-comment>
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
    import vComment from '../common/Comment.vue'

    export default {
        components: {
            vComment
        },
        props:['user'],
        data() {
            return {
                newsComment: [],
                postComment: [],
                blogComment: [],
                commentType: 1,
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true,
                activeName: 'first'
            }
        },
        created() {
            this.getNewsCommentList();
            this.getBlogCommentList();
            this.getPostCommentList();
            this.$bus.on('deleteComment', (e) => {
                switch (e) {
                    case "1":
                        this.getNewsCommentList();
                        break;
                    case "2":
                        this.getPostCommentList();
                        break;
                    case "3":
                        this.getBlogCommentList();
                        break;
                }
            })
        },
        methods: {
            handleCurrentChange(val) {
                this.current = val;
            },
            getNewsCommentList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                };
                this.axiosProxy.getNewsCommentList(params).then(response => {
                    this.newsComment = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            getPostCommentList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                }
                this.axiosProxy.getPostCommentList(params).then(response => {
                    this.postComment = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            getBlogCommentList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {
                        userId: this.user.userId
                    }
                }
                this.axiosProxy.getBlogCommentList(params).then(response => {
                    this.blogComment = response.data.records;
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            handleClick(tab, event) {
                this.current = 0;
                if (tab.name == 'first') {
                    this.getNewsCommentList();
                } else if (tab.name == 'second') {
                    this.getPostCommentList();
                } else {
                    this.getBlogCommentList();
                }
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

