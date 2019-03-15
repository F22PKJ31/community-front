<template>
    <div>
        <el-menu :default-active="activeIndex" :router="true" @select="handleSelect"
                 active-text-color="#ffd04b" background-color="#545c64" class="el-menu-demo" mode="horizontal"
                 text-color="#fff">
            <el-menu-item disabled>IT技术视频分享交流社区</el-menu-item>
            <el-menu-item index="newsPage">新闻推荐</el-menu-item>
            <el-menu-item index="blogPage">博客中心</el-menu-item>
            <el-menu-item index="communityPage">社区中心</el-menu-item>
            <el-menu-item index="editPostPage">编辑器</el-menu-item>
            <el-menu-item index="demo">编辑器</el-menu-item>
            <el-submenu v-if="isLogin" style="float: right;">
                <template slot="title">{{userName}}</template>
                <el-menu-item index="minePage">个人中心</el-menu-item>
                <el-menu-item index="collectionsPage">我的收藏</el-menu-item>
                <el-menu-item index="commentsPage">我的评论</el-menu-item>
                <el-menu-item @click="exit">退出</el-menu-item>
            </el-submenu>
            <el-menu-item style="float: right;" v-if="!isLogin" @click="registerVisible = true;errorVisible2=false;">
                注册
            </el-menu-item>
            <el-menu-item style="float: right;" v-if="!isLogin" @click="loginVisible = true;errorVisible = false">登录
            </el-menu-item>
        </el-menu>

        <!-- 登录 -->
        <el-dialog :visible.sync="loginVisible" title="登录" width="30%">
            <el-alert v-if="errorVisible" title="用户名密码错误" type="error">
            </el-alert>
            <el-form :model="form" label-width="60px" ref="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.passwd" show-password></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="loginVisible = false;errorVisible = false;">取 消</el-button>
                <el-button @click="login" type="primary">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 注册 -->
        <el-dialog :visible.sync="registerVisible" title="注册" width="30%">
            <el-alert v-if="errorVisible2" :title="title" type="error">
            </el-alert>
            <el-form :model="form" label-width="90px" ref="form" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="form.userName" required></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model="form.passwd" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwd2">
                    <el-input type="password" v-model="form.passwd2" show-password></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input max="100" min="0" type="number" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="form.sex" label="男">男</el-radio>
                    <el-radio v-model="form.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input maxlength="11" minlength="11" v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="email" v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="registerVisible = false;errorVisible2 = false;">取 消</el-button>
                <el-button @click="register" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                userName: '',
                userId: '',
                activeIndex: 'newsPage',
                isLogin: false,
                loginVisible: false,
                registerVisible: false,
                errorVisible: false,
                errorVisible2: false,
                title: '',
                form: {
                    userName: '',
                    passwd: '',
                    passwd2: '',
                    sex: '',
                    age: null,
                    email: '',
                    mobile: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 4, max: 15, message: '长度在 15 个字以内', trigger: 'blur'}
                    ],
                    passwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 8, max: 16, message: '长度在 8到16 个字之间', trigger: 'blur'}
                    ],
                    passwd2: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 8, max: 16, message: '长度在 8到16 个字之间', trigger: 'blur'}
                    ]
                },
            };
        },
        created: function () {
            this.userId = localStorage.getItem("userId");
            this.userName = localStorage.getItem("userName");
            if (this.userId) {
                this.isLogin = true;
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            login() {
                let queryParams = {
                    userName: this.form.userName,
                    passwd: this.form.passwd
                };
                console.log(queryParams);
                this.errorVisible = false;
                this.axiosProxy.getUserByName(queryParams).then(response => {
                    console.log(response);
                    if (response.data.length !== 0) {
                        localStorage.setItem("userName", response.data.userName);
                        localStorage.setItem("userId", response.data.userId);
                        this.isLogin = true;
                        this.loginVisible = false;
                        this.userId = response.data.userId;
                        this.userName = response.data.userName;
                    } else {
                        this.errorVisible = true;
                    }
                })
            },
            exit() {
                localStorage.removeItem("userId");
                localStorage.removeItem("userName");
                this.isLogin = false;
                this.userId = '';
                this.userName = '';
            },
            register() {
                if (this.form.userName.length === 0) {
                    this.errorVisible = true;
                    this.title = '请输入用户名'
                    return;
                }
                if (this.form.passwd.length === 0) {
                    this.errorVisible = true;
                    this.title = '请输入密码'
                    return
                }
                if (this.form.passwd2.length === 0) {
                    this.errorVisible = true;
                    this.title = '请输入确认密码'
                    return
                }
                if (this.form.passwd !== this.form.passwd2) {
                    this.errorVisible = true;
                    this.title = '两次密码不同'
                    return
                }
                let queryParams = {
                    userName: this.form.userName,
                    passwd: this.form.passwd,
                    sex: this.sex,
                    age: this.age,

                };
                console.log(queryParams);
                this.errorVisible2 = false;
                this.axiosProxy.addUser(queryParams).then(response => {
                    console.log(response);
                    if (response.data.length !== 0) {
                        localStorage.setItem("userName", response.data.userName);
                        localStorage.setItem("userId", response.data.userId);
                        this.isLogin = true;
                        this.registerVisible = false;
                        this.userId = response.data.userId;
                        this.userName = response.data.userName;
                    } else {
                        this.errorVisible2 = true;
                        this.title = '服务器异常';
                    }
                })
            }
        }
    }
</script>
