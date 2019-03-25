<template>
    <el-container>
        <el-header style="height: auto; margin:20px 0; padding: 20px; background-color: white">
            <h2 style="float: left">个人信息</h2><a href="#" style="float: right;" @click="updateInfo">修改信息</a>
            <table style="border: none;margin: 20px;width: 100%">
                <tr>
                    <td width="15%">用户名：</td>
                    <td width="40%">{{this.user.userName}}</td>
                </tr>
                <tr>
                    <td>密码：</td>
                    <td>****************</td>
                    <td><a href="#" @click="updatePassword">修改密码</a></td>
                </tr>
                <tr>
                    <td>性别：</td>
                    <td>{{this.user.sex}}</td>
                </tr>
                <tr>
                    <td>手机：</td>
                    <td>{{this.user.mobile}}</td>
                </tr>
                <tr>
                    <td>邮箱：</td>
                    <td>{{this.user.email}}</td>
                </tr>

            </table>
        </el-header>
        <el-container>
            <el-aside style="width: 200px;">
                <el-menu
                         @close="handleClose"
                         @open="handleOpen"
                         active-text-color="#ffd04b"
                         background-color="#545c64"
                         class="el-menu-vertical"
                         :default-active="activeItem"
                         text-color="#fff">
                    <el-menu-item index="1" @click="handleMyBlog">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的博客</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="handleMyPost">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的帖子</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="handleMyCollection">
                        <i class="el-icon-menu"></i>
                        <span slot="title">我的收藏</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <v-my-collection v-if="showCollection" :user="user"></v-my-collection>
                <v-my-post v-if="showPost" :user="user"></v-my-post>
                <v-my-blog v-if="showBlog" :user="user"></v-my-blog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import vCategory from '../common/Category.vue'
    import vMyCollection from './MyCollection.vue'
    import vMyPost from './MyPost.vue'
    import vMyBlog from './MyBlog.vue'

    export default {

        components: {
            vCategory, vMyCollection, vMyPost, vMyBlog
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
            })
        },
        data() {
            return {
                msg: '主页',
                showCollection: false,
                showBlog: true,
                showPost: false,
                activeItem: "1",
                news: {
                    title: '',
                    content: '',
                },
                user: {
                    userId: '',
                    userName: ''
                },
                loading: true
            }
        },
        created() {
            this.user.userId = this.$route.query.userId;
            this.getUserDetail();
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            getUserDetail() {
                let param = {
                    id: this.user.userId
                }
                this.axiosProxy.getUser(param).then(response => {
                    this.user = response.data;
                    console.log(this.user)
                })
            },
            updateInfo() {

            },
            updatePassword() {

            },
            handleMyCollection() {
                this.showCollection = true;
                this.showPost = false;
                this.showBlog = false;
                this.activeItem = "3"
            },

            handleMyPost() {
                this.showCollection = false;
                this.showBlog = false;
                this.showPost = true;
                this.activeItem = "2"
            },

            handleMyBlog() {
                this.showPost = false;
                this.showCollection = false;
                this.showBlog = true;
                this.activeItem = "1"
            }
        }
    };
</script>

<style>
    h1, h2 {
        font-weight: normal;
    }

    td {
        padding: 10px 0 10px 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    .el-menu-vertical {
        width: 200px;
    }

    .el-aside {
        width: 200px;
    }

</style>

