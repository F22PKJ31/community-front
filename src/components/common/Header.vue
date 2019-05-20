<template>
    <div>
        <el-menu :default-active="activeIndex"
                 active-text-color="#ffd04b" background-color="#545c64" class="el-menu-demo" mode="horizontal"
                 text-color="#fff">
            <el-menu-item disabled>IT技术视频分享交流社区</el-menu-item>
            <el-menu-item index="1" @click="$router.push({path: '/homePage'})">首页</el-menu-item>
            <el-menu-item index="2" @click="$router.push({path: '/newsPage'})">新闻推荐</el-menu-item>
            <el-menu-item index="3" @click="$router.push({path: '/blogPage'})">博客中心</el-menu-item>
            <el-menu-item index="4" @click="$router.push({path: '/postPage'})">社区中心</el-menu-item>
            <el-menu-item @click="$router.push({path: '/userPage'})" index="5">博主园</el-menu-item>
            <el-submenu index="5" style="float: right;" v-if="isLogin">
                <template slot="title">{{userName}}</template>
                <el-menu-item index="5-1" @click="handleMinePage">个人中心</el-menu-item><br>
                <el-menu-item index="5-3" @click="exit">退出</el-menu-item>
            </el-submenu>
            <el-menu-item @click="registerVisible = true;errorVisible2=false;" style="float: right;" v-if="!isLogin">
                注册
            </el-menu-item>
            <el-menu-item @click="loginVisible = true;errorVisible = false" style="float: right;" v-if="!isLogin">登录
            </el-menu-item>
        </el-menu>

        <!-- 登录 -->
        <el-dialog :visible.sync="loginVisible" title="登录" width="30%">
            <el-alert title="用户名密码错误" type="error" v-if="errorVisible">
            </el-alert>
            <el-form :model="form" label-width="60px" ref="form">
                <el-form-item label="用户名">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password type="password" v-model="form.passwd"></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="loginVisible = false;errorVisible = false;">取 消</el-button>
                <el-button @click="login" type="primary">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 注册 -->
        <el-dialog :visible.sync="registerVisible" title="注册" width="30%">
            <el-alert :title="title" type="error" v-if="errorVisible2">
            </el-alert>
            <el-form :model="form" :rules="rules" label-width="90px" ref="form">
                <el-form-item label="用户名" prop="userName">
                    <el-input required v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input show-password type="password" v-model="form.passwd"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwd2">
                    <el-input show-password type="password" v-model="form.passwd2"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input max="100" min="0" type="number" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio label="男" v-model="form.sex">男</el-radio>
                    <el-radio label="女" v-model="form.sex">女</el-radio>
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
                activeIndex: '1',
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
                        {min: 1, max: 15, message: '长度在 15 个字以内', trigger: 'blur'}
                    ],
                    passwd: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2到16 个字之间', trigger: 'blur'}
                    ],
                    passwd2: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 2, max: 16, message: '长度在 2到16 个字之间', trigger: 'blur'}
                    ]
                },
            };
        },
        created: function () {
            this.userId = sessionStorage.getItem("userId");
            this.userName = sessionStorage.getItem("userName");
            if (this.userId) {
                this.isLogin = true;
            }
            this.$bus.on('updateUser', (e) => {
                this.userId = sessionStorage.getItem("userId");
                this.userName = sessionStorage.getItem("userName");
            })
        },
        methods: {
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
                        sessionStorage.setItem("userName", response.data.userName);
                        sessionStorage.setItem("userId", response.data.userId);
                        this.isLogin = true;
                        this.loginVisible = false;
                        this.userId = response.data.userId;
                        this.userName = response.data.userName;
                        location.reload()
                    } else {
                        this.errorVisible = true;
                    }
                })
            },
            exit() {
                sessionStorage.removeItem("userId");
                sessionStorage.removeItem("userName");
                this.isLogin = false;
                this.userId = '';
                this.userName = '';
                location.reload();
            },
            register() {
                if (this.form.userName.length == 0) {
                    this.errorVisible2 = true;
                    this.title = '请输入用户名'
                    return;
                }
                if (this.form.passwd.length == 0) {
                    this.errorVisible2 = true;
                    this.title = '请输入密码'
                    return
                }
                if (this.form.passwd2.length == 0) {
                    this.errorVisible2 = true;
                    this.title = '请输入确认密码'
                    return
                }
                if (this.form.passwd != this.form.passwd2) {
                    this.errorVisible2 = true;
                    this.title = '两次密码不同'
                    return
                }
                this.errorVisible2 = false;
                this.axiosProxy.addUser(this.form).then(response => {
                    console.log(response);
                    if (response.data.length !== 0) {
                        sessionStorage.setItem("userName", response.data.userName);
                        sessionStorage.setItem("userId", response.data.userId);
                        this.isLogin = true;
                        this.registerVisible = false;
                        this.userId = response.data.userId;
                        this.userName = response.data.userName;
                    } else {
                        this.errorVisible2 = true;
                        this.title = '服务器异常';
                    }
                })
            },
            handleMinePage() {
                this.$router.push({name: 'minePage', query: {'userId': this.userId}})
            },
            handleMyBlogPage() {
                this.$router.push({name: 'myBlogPage', query: {'userId': this.userId}})
            }
        }
    }
</script>

