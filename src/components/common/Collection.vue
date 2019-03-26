<template>
    <el-container>
        <el-card class="news" shadow="hover">
            <div class="clearfix" slot="header">
                <div class="container">
                    <div class="news-prview">
                        <a @click="handleDetail" class="news-title">{{ title }}</a>
                        <el-button v-if="isOwner" @click="dialogVisible = true" style="float: right" type="warning">
                            取消收藏
                        </el-button>
                        <a class="author" v-bind:href="'#/minePage?userId='+collectionData.userId">{{ collectionData.userName }}</a>
                    </div>
                </div>
            </div>
            <div class="content clearfix">
                <el-tag style="float: left;">{{collectionData.createTime}}</el-tag>
                <el-button @click="handlePostDetail" class="news-detail" style="float: right;" type="text">查看来源
                </el-button>
            </div>
        </el-card>
        <el-dialog :visible.sync="dialogVisible" title="确认取消"
                   width="30%">
            <span>是否确认取消该收藏</span>
            <span class="dialog-footer" slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="deleteCollection" type="primary">确 定</el-button>
  </span>
        </el-dialog>


    </el-container>
</template>

<script>
    export default {
        name: 'news',
        props: ['collectionData', 'collectionType'],
        data() {
            return {
                dialogVisible: false,
                title: '',
                isOwner: false
            }
        },
        created() {
            this.isOwner = localStorage.getItem('userId') == this.collectionData.userId;
            switch (this.collectionType) {
                case "1":
                    this.title = this.collectionData.newsTitle;
                    break;
                case "2":
                    this.title = this.collectionData.postTitle;
                    break;
                case "3":
                    this.title = this.collectionData.blogTitle;
                    break;
            }
        },
        methods: {
            handleDetail() {
                switch (this.collectionType) {
                    case "1":
                        this.$router.push({name: 'newsDetail', query: {'newsId': this.collectionData.newsId}})
                        break;
                    case "2":
                        this.$router.push({name: 'postDetail', query: {'postId': this.collectionData.postId}})
                        break;
                    case "3":
                        this.$router.push({name: 'blogDetail', query: {'blogId': this.collectionData.blogId}})
                        break;
                }
            }, deleteCollection() {
                let params = {
                    id: this.collectionData.collectionId
                };
                switch (this.collectionType) {
                    case "1":
                        this.axiosProxy.deleteNewsCollection(params).then(response => {
                            if (response.data) {
                                this.$message('取消成功');
                                this.isCollection = false;
                                this.$bus.emit('deleteCollection', this.collectionType);
                            } else {
                                this.$message('取消失败');
                            }
                        });
                        break;
                    case "2":
                        this.axiosProxy.deletePostCollection(params).then(response => {
                            if (response.data) {
                                this.$message('取消成功');
                                this.isCollection = false;
                                this.$bus.emit('deleteCollection', this.collectionType);
                            } else {
                                this.$message('取消失败');
                            }
                        });
                        break;
                    case "3":
                        this.axiosProxy.deleteBlogCollection(params).then(response => {
                            if (response.data) {
                                this.$message('取消成功');
                                this.isCollection = false;
                                this.$bus.emit('deleteCollection', this.collectionType);
                            } else {
                                this.$message('取消失败');
                            }
                        });
                        break;
                    default:
                        this.$message('取消失败');
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

    .news {
        width: 1000px;
        height: auto;
        margin: 0 auto 8px;
    }

    .news-prview {
        height: 50px;
        position: relative;
    }

    .news-title {
        width: 90%;
        padding-left: 10px;
        color: #1a1a1a;
        font-size: 16px;
        line-height: 1.6;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        float: left;
    }

    .author {
        padding-left: 10px;
        color: red;
        float: left;
    }

    .replies-num {
        width: 50px;
        height: 30px;
        margin-right: 18px;
        float: right;
    }

    .news-detail {
        padding-right: 20px;
        float: right;
    }


    .news .el-card__body {
        padding: 0;
    }
</style>
