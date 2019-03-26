<template>
    <el-card class="post" shadow="hover">
        <div class="clearfix" slot="header">
            <div class="container">
                <div class="post-prview">
                    <a @click="handlePostDetail" class="post-title">{{ postData.title }}</a><br>
                    <a class="author" v-bind:href="'/#/minePage?userId='+postData.userId">{{ postData.userName }}</a>
                    <el-badge :max="999" :value="commentNum" class="replies-num">
                        <el-button>评论</el-button>
                    </el-badge>
                </div>
            </div>
        </div>
        <div class="content clearfix">
            <el-tag style="float: left;">{{postData.createTime}}</el-tag>
            <el-button @click="handlePostDetail" class="post-detail" style="float: right;" type="text">查看原帖</el-button>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'post',
        props: ['postData'],
        data() {
            return {
                commentNum: 0
            }
        },
        created() {

        },
        methods: {
            handlePostDetail() {
                this.$router.push({name: 'postDetail', query: {'postId': this.postData.postId}})
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        text-decoration: none;
    }

    .post {
        width: 100%;
        height: auto;
        margin: 0 auto 8px;
    }

    .post-prview {
        height: 50px;
        position: relative;
    }

    .post-title {
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

    .post-detail {
        padding-right: 20px;
        float: right;
    }


    .post .el-card__body {
        padding: 0;
    }
</style>
