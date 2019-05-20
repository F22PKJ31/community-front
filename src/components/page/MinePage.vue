<template>
	<el-container>
		<el-header style="height: auto; margin:20px 0; padding: 20px; background-color: white">
			<h2>个人信息</h2>
			<a @click="editInfo = true;userForm = JSON.parse(JSON.stringify(user))" href="javascript:void(0)"
			   style="float: right;"
			   v-if="isOwner">修改信息</a>
			<div>
				<img :src="user.imgUrl" class="head-img" style="float: left;"/>
				<table style="border: none;margin: 20px;width: 100%;">
					<tr>
						<td width="15%">用户名：</td>
						<td width="25%">{{user.userName}}</td>
					</tr>
					<tr v-if="isOwner">
						<td>密码：</td>
						<td>****************</td>
						<td><a @click="editPassword = true;$refs[passForm].resetFields();"
						       href="javascript:void(0)">修改密码</a></td>
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
			</div>
		</el-header>
		<el-container>
			<el-aside style="width: 200px;">
				<el-menu
						:default-active="activeItem"
						@close="handleClose"
						@open="handleOpen"
						active-text-color="#ffd04b"
						background-color="#545c64"
						class="el-menu-vertical"
						text-color="#fff">
					<el-menu-item @click="handleMyBlog" index="1">
						<i class="el-icon-menu"></i>
						<span slot="title">{{owner}}的博客</span>
					</el-menu-item>
					<el-menu-item @click="handleMyPost" index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">{{owner}}的帖子</span>
					</el-menu-item>
					<el-menu-item @click="handleMyCollection" index="3">
						<i class="el-icon-menu"></i>
						<span slot="title">{{owner}}的收藏</span>
					</el-menu-item>
					<el-menu-item @click="handleMyComment" index="4">
						<i class="el-icon-menu"></i>
						<span slot="title">{{owner}}的评论</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<v-my-collection :user="user" ref="myCollection" v-if="showCollection"></v-my-collection>
				<v-my-post :user="user" ref="myPost" v-if="showPost"></v-my-post>
				<v-my-blog :user="user" ref="myBlog" v-if="showBlog"></v-my-blog>
				<v-my-comment :user="user" ref="myComment" v-if="showComment"></v-my-comment>
			</el-main>
		</el-container>
		<!-- 编辑弹出框 -->
		<el-dialog :visible.sync="editInfo" title="编辑" width="30%">
			<el-form :model="userForm" label-width="100px" ref="form">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="userForm.userName"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio label="男" v-model="userForm.sex">男</el-radio>
					<el-radio label="女" v-model="userForm.sex">女</el-radio>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="userForm.mobile"></el-input>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-input v-model.number="userForm.age"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input type="email" v-model="userForm.email"></el-input>
				</el-form-item>
				<el-form-item label="头像" prop="imgUrl">
					<el-upload
							:before-upload="beforeAvatarUpload"
							:on-success="handleAvatarSuccess"
							:show-file-list="false"
							action="http://localhost:8010/file/uploadFile">
						<img :src="userForm.imgUrl" class="head-img avatar" v-if="userForm.imgUrl">
						<i class="el-icon-plus avatar-uploader-icon" v-else></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<span class="dialog-footer" slot="footer">
                <el-button @click="editInfo = false">取 消</el-button>
                <el-button @click="saveEdit" type="primary">确 定</el-button>
            </span>
		</el-dialog>
		<el-dialog :visible.sync="editPassword" title="编辑" width="30%">
			<el-form :model="passForm" :rules="rules2" class="demo-ruleForm" label-width="100px" ref="passForm"
			         status-icon>
				<el-form-item label="旧密码" prop="oldPass">
					<el-input autocomplete="off" type="password" v-model="passForm.oldPass"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="pass">
					<el-input autocomplete="off" type="password" v-model="passForm.pass"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPass">
					<el-input autocomplete="off" type="password" v-model="passForm.checkPass"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button @click="updatePassword('passForm')" type="primary">提交</el-button>
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
                if (!value) {
                    callback(new Error('请输入密码'));
                } else if (this.passForm.oldPass != this.user.passwd) {
                    callback(new Error('密码错误'));
                } else {
                    if (this.passForm.checkPass !== '') {
                        this.$refs.passForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.passForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
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
                userForm: {},
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
                this.isOwner = sessionStorage.getItem('userId') == this.user.userId;
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
                    if (response.data) {
                        this.$message.success(`修改成功`);
                        sessionStorage.setItem('userName', this.userForm.userName)
                        this.$bus.emit('updateUser', null);
                        this.getUserDetail();
                    } else {
                        this.$message.error(`修改失败`);
                    }
                });
                this.editInfo = false;
                this.editPassword = false;
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
                            this.editInfo = false;
                            this.editPassword = false;
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.userForm.imgUrl = res.url;
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';

                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
                }
                return isJPG || isPNG;
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
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

</style>

