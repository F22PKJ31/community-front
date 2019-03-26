<template>
    <el-container>
        <el-header style="height: auto; margin:20px 0; padding: 20px; background-color: white">
            <h2 style="float: left">个人信息</h2><a href="javascript:void(0)" v-if="isOwner"
                                                style="float: right;" @click="editInfo = true;userForm = JSON.parse(JSON.stringify(user))">修改信息</a>
            <table style="border: none;margin: 20px;width: 100%">
                <tr>
                    <td width="15%">用户名：</td>
                    <td width="40%">{{user.userName}}</td>
                </tr>
                <tr v-if="isOwner">
                    <td>密码：</td>
                    <td>****************</td>
                    <td><a href="javascript:void(0)"
                           @click="editPassword = true">修改密码</a></td>
                </tr>
                <tr>
                    <td>年龄：</td>
                    <td>{{user.age}}</td>
                </tr>
                <tr>
                    <td>性别：</td>
                    <td>{{user.sex}}</td>
                </tr>
                <tr>
                    <td>手机：</td>
                    <td>{{user.mobile}}</td>
                </tr>
                <tr>
                    <td>邮箱：</td>
                    <td>{{user.email}}</td>
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
                        <span slot="title">{{owner}}的博客</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="handleMyPost">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{owner}}的帖子</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="handleMyCollection">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{owner}}的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="handleMyComment">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{owner}}的评论</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <v-my-collection ref="myCollection" v-if="showCollection" :user="user"></v-my-collection>
                <v-my-post ref="myPost" v-if="showPost" :user="user"></v-my-post>
                <v-my-blog ref="myBlog" v-if="showBlog" :user="user"></v-my-blog>
                <v-my-comment ref="myComment" v-if="showComment" :user="user"></v-my-comment>
            </el-main>
        </el-container>
        <!-- 编辑弹出框 -->
        <el-dialog :visible.sync="editInfo" title="编辑" width="30%">
            <el-form :model="userForm" :rules="rules" label-width="100px" ref="form">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio v-model="userForm.sex" label="男">男</el-radio>
                    <el-radio v-model="userForm.sex" label="女">女</el-radio>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="userForm.mobile"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="userForm.age"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email" type="email"></el-input>
                </el-form-item>
            </el-form>
            <span class="dialog-footer" slot="footer">
                <el-button @click="editInfo = false">取 消</el-button>
                <el-button @click="saveEdit" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="editPassword" title="编辑" width="30%">
            <el-form :model="passForm" status-icon :rules="rules2" ref="passForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="旧密码" prop="pass">
                    <el-input type="password" v-model="passForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="passForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="passForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePassword('passForm')">提交</el-button>
                    <el-button @click="resetForm('passForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script>
    import vCategory from '../common/Category.vue'
    import vMyCollection from './MyCollection.vue'
    import vMyPost from './MyPost.vue'
    import vMyBlog from './MyBlog.vue'
    import vMyComment from './MyComment.vue'

    export default {

        components: {
            vCategory, vMyCollection, vMyPost, vMyBlog, vMyComment
        },
        mounted() {
            this.$bus.on('handleCate', (e) => {
                this.categoryId = e;
            })
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.passForm.checkPass !== '') {
                        this.$refs.passForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 12) {
                            callback(new Error('必须年满12岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            return {
                msg: '主页',
                editPassword: false,
                editInfo: false,
                owner: 'TA',
                showComment: false,
                showCollection: false,
                showBlog: true,
                showPost: false,
                activeItem: "1",
                userForm:{

                },
                user: {
                    userId: '',
                    userName: ''
                },
                isOwner: false,
                loading: true,
                passForm: {
                    pass: '',
                    checkPass: '',
                    oldPass: ''
                },
                rules: {
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    oldPass: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.create();
        },
        watch: {
            "$route"() {
                this.create();
                if (this.showComment) {
                    this.$refs.myComment.create();
                } else if (this.showCollection) {
                    this.$refs.myCollection.create();
                } else if (this.showBlog) {
                    this.$refs.myBlog.create();
                } else if (this.showPost) {
                    this.$refs.myPost.create();
                }
            }
        },
        methods: {
            create() {
                this.user.userId = this.$route.query.userId;
                this.isOwner = localStorage.getItem('userId') == this.user.userId;
                if (this.isOwner) {
                    this.owner = '我';
                } else {
                    this.owner = 'TA';
                }
                this.getUserDetail();
            },
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
            saveEdit() {
                this.axiosProxy.updateUser(this.userForm).then(response => {
                    if (response.data){
                        this.$message.success(`修改成功`);
                        this.editInfo = false;
                        localStorage.setItem('userName',this.userForm.userName)
                        this.$bus.emit('updateUser', null);
                        this.getUserDetail();
                    } else {
                        this.$message.error(`修改失败`);
                        this.editInfo = false;
                    }
                })
            },
            handleMyCollection() {
                this.showCollection = true;
                this.showPost = false;
                this.showBlog = false;
                this.showComment = false;
                this.activeItem = "3"
            },
            handleMyComment() {
                this.showCollection = false;
                this.showPost = false;
                this.showBlog = false;
                this.showComment = true;
                this.activeItem = "4"
            },

            handleMyPost() {
                this.showCollection = false;
                this.showBlog = false;
                this.showPost = true;
                this.showComment = false;
                this.activeItem = "2"
            },

            handleMyBlog() {
                this.showPost = false;
                this.showCollection = false;
                this.showBlog = true;
                this.showComment = false;
                this.activeItem = "1"
            },
            updatePassword(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {
                            userId: this.user.userId,
                            passwd: this.passForm.pass
                        }
                        this.axiosProxy.updateUser(param).then(response => {
                            if (response.data) {
                                this.$message.success('修改成功')
                            } else {
                                this.$message.error('修改失败')
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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

