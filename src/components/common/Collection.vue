<template>
    <el-container>
        <el-card class="news" shadow="hover">
            <div class="clearfix" slot="header">
                <div class="container">
                    <div class="news-prview">
                        <a @click="handlePostDetail" class="news-title">{{ title }}</a>
                        <el-button @click="dialogVisible = true" style="float: right" type="warning">取消收藏</el-button>
                        <a class="author" v-bind:href="collectionData.userId">{{ collectionData.userName }}</a>
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
                title: ''
            }
        },
        created() {
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
            handlePostDetail() {
                this.$router.push({name: 'postDetail', query: {'newsId': this.collectionData.newsId}})
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
                this.$bus.emit('deleteCollection', this.collectionType);
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
