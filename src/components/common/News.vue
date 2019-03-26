<template>
    <el-card class="news" shadow="hover">
        <div class="clearfix" slot="header">
            <div class="container">
                <div class="news-prview">
                    <a @click="handlePostDetail" class="news-title">{{ newsData.title }}</a><br>
                    <a class="author" v-bind:href="'#/minePage?userId='+newsData.userId">{{ newsData.userName }}</a>
                    <el-badge :max="999" :value="newsData.readCount" class="replies-num">
                        <el-button type="info">评论数</el-button>
                    </el-badge>
                </div>
            </div>
        </div>
        <div class="content clearfix">
            <el-tag style="float: left;">{{newsData.createTime}}</el-tag>
            <el-button @click="handlePostDetail" class="news-detail" style="float: right;" type="text">查看详情</el-button>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'news',
        props: ['newsData'],
        data() {
            return {}
        },
        created() {
            console.log(this.newsData.newsId)
        },
        methods: {
            handlePostDetail() {
                this.$router.push({name: 'newsDetail', query: {'newsId': this.newsData.newsId}})
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
        width: 100%;
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
        font-size: 20px;
        line-height: 1.6;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
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
