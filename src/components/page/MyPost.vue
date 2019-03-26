<template>
    <el-container>
        <el-main class="main" v-loading="loading">
            <div style="text-align: right;margin:20px 120px">
                <router-link to="/editPostPage">
                    <el-button type="primary">发帖</el-button>
                </router-link>
            </div>
            <el-table
                    :data="post"
                    style="margin: 0 auto">
                <el-table-column
                        label="标题"
                        prop="title"
                        style="width: 25%">
                </el-table-column>
                <el-table-column
                        label="回复数"
                        prop="readCount"
                        style="width: 10%">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="createTime"
                        style="width: 25%">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        style="width: 40%">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="showRow(scope.$index, post)"
                                type="primary"
                                size="small">
                            查看
                        </el-button>
                        <el-button v-if="isOwner"
                                @click.native.prevent="handleDelete(scope.$index, post)"
                                type="danger"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination :current-page="current" :page-size="size" :total="total"
                           @current-change="handleCurrentChange"
                           background layout="prev, pager, next"
                           style="float: right">
            </el-pagination>
        </el-footer>
        <el-dialog :visible.sync="dialogVisible" title="确认删除"
                   width="30%">
            <span>是否确认删除</span>
            <span class="dialog-footer" slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="deletePost" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script>
    import vPost from '../common/Post.vue'

    export default {
        components: {
            vPost
        },
        props:['user'],
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
                this.current = 0;
                this.getPostList();
            })
        },
        data() {
            return {
                dialogVisible: false,
                commentNum: 0,
                categoryId: '',
                post: [],
                size: 8,
                current: 0,
                total: 0,
                pages: 0,
                loading: true,
                deleteId: '',
                isOwner: false
            }
        },
        created() {
            this.create()
        },
        methods: {
            create(){
                this.isOwner = localStorage.getItem('userId') == this.user.userId;
                this.getPostList();
            },
            deletePost() {
                let param = {
                    id: this.deleteId
                };
                this.axiosProxy.deletePost(param).then(response => {
                    if (response.data) {
                        this.$message('删除成功');
                        this.getPostList();
                    } else {
                        this.$message('删除失败');
                    }
                    this.deleteId = '';
                    this.dialogVisible = false;
                })
            },
            showRow(index, rows) {
                this.$router.push({name: 'postDetail', query: {'postId': rows[index].postId}})
            },
            handleDelete(index, rows) {
                this.deleteId = rows[index].postId;
                this.dialogVisible = true;
            },
            handleCurrentChange(val) {
                this.current = val;
                this.getPostList();
            },
            getPostList() {
                this.loading = true;
                let params = {
                    current: this.current,
                    size: this.size,
                    t: {}
                };
                this.axiosProxy.getPostList(params).then(response => {
                    this.post = response.data.records;
                    this.getCommentNum();
                    this.total = response.data.total;
                    this.pages = response.data.pages;
                    this.loading = false;
                })
            },
            handlePostDetail(row, column, event) {
                console.log(row);
                this.$router.push({name: 'postDetail', query: {'postId': row.postId}})
            },
            getCommentNum() {
                for (let i = 0; i < this.post.length; i++) {
                    let params = {
                        id: this.post[i].postId
                    };
                    this.axiosProxy.countPostComment(params).then(response => {
                        this.post[i].readCount = response.data;
                    })
                }
                console.log(this.post)
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

