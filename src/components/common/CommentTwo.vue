<template>
    <div>
        <el-card :body-style="{ padding: '0px'}">
            <div style="padding: 14px;">
                <span>{{commentData.content}}</span>
    
                <div class="bottom clearfix" style="">
                    <el-button class="button" size="small" style="float: right" type="danger" v-if="isOwner"
                               @click="dialogVisible=true">删除评论
                    </el-button>
                    <el-button @click="toOriginal" size="small" style="float:right; margin: 0 5px" type="primary">查看
                    </el-button>
                    <time class="time">发表于{{commentData.createTime}}</time>
                </div>
            </div>
        </el-card>
        <el-dialog :visible.sync="dialogVisible" title="确认删除"
                   width="30%">
            <span>是否确认删除该评论</span>
            <span class="dialog-footer" slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="deleteComment" type="primary">确 定</el-button>
  </span>
        </el-dialog>
    </div>

</template>

<script>
    export default {
        name: 'news',
        props: ['commentData', 'commentType'],
        data() {
            return {
                dialogVisible: false,
                title: '',
                isOwner: false
            }
        },
        created() {
            this.isOwner = sessionStorage.getItem('userId') == this.commentData.userId;
            switch (this.commentType) {
                case "1":
                    this.title = this.commentData.newsTitle;
                    break;
                case "2":
                    this.title = this.commentData.postTitle;
                    break;
                case "3":
                    this.title = this.commentData.blogTitle;
                    break;
            }
        },
        methods: {
            handleDetail() {
                switch (this.commentType) {
                    case "1":
                        this.$router.push({name: 'newsDetail', query: {'newsId': this.commentData.newsId}})
                        break;
                    case "2":
                        this.$router.push({name: 'postDetail', query: {'postId': this.commentData.postId}})
                        break;
                    case "3":
                        this.$router.push({name: 'blogDetail', query: {'blogId': this.commentData.blogId}})
                        break;
                }
            }, deleteComment() {
                let params = {
                    id: this.commentData.commentId
                };
                console.log(params);
                switch (this.commentType) {
                    case "1":
                        this.axiosProxy.deleteNewsComment(params).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                                this.$bus.emit('deleteComment', this.commentType);
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    case "2":
                        this.axiosProxy.deletePostComment(params).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                                this.$bus.emit('deleteComment', this.commentType);
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    case "3":
                        this.axiosProxy.deleteBlogComment(params).then(response => {
                            if (response.data) {
                                this.$message('删除成功');
                                this.$bus.emit('deleteComment', this.commentType);
                            } else {
                                this.$message('删除失败');
                            }
                        });
                        break;
                    default:
                        this.$message('删除失败');
                        break;
                }
                this.dialogVisible = false;
            }, toOriginal() {
                switch (this.commentType) {
                    case "1":
                        this.$router.push({name: 'newsDetail', query: {'newsId': this.commentData.newsId}})
                        break;
                    case "2":
                        this.$router.push({name: 'postDetail', query: {'postId': this.commentData.postId}})
                        break;
                    case "3":
                        this.$router.push({name: 'blogDetail', query: {'blogId': this.commentData.blogId}})
                        break;
                    default:
                        this.$message('跳转失败');
                        break;
                }
                this.dialogVisible = false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        text-decoration: none;
    }

    p {
        margin: 0;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }


</style>
