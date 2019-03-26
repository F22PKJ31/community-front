<template>
    <el-card :body-style="{ padding: '0px'}">
        <div style="padding: 14px;">
            <p>{{comment.content}}</p>
            <div class="bottom clearfix">
                <router-link :to="{path: '#/minePage?userId='+ comment.userId}">
                    <span style="font-size: 14px">{{comment.userName}}</span>
                </router-link>
                <time class="time">发表于{{comment.createTime}}</time>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "comment",
        props: ['comment'],
    };
</script>

<style>
    p {
        margin: 0;
        width: 100%;
        word-wrap: break-word;
        word-break: break-all;
        overflow: hidden;
    }

    .itemWrap a {
        text-decoration: none;
        color: #000000;
    }


    .time {
        float: right;
    }

</style>

