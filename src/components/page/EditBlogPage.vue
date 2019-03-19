<template>
	<div>
		<div class="container">
			<div class="plugins-tips">
				内容编辑
			</div>
			<el-form>
				<el-form-item label="标题">
					<el-input v-model="params.title"></el-input>
				</el-form-item>
			</el-form>
			<quill-editor :options="editorOption" ref="myTextEditor" style="width: 100%;"
			              v-model="params.content"></quill-editor>
			
			<el-button @click="submit" class="editor-btn" type="primary">提交</el-button>
		</div>
		
		<!-- 视频上传 -->
		<div class="floatBox" v-show='upvideoShow'>
			<div class="floatsmBox">
				<b-form-file accept="video/*" placeholder="选择视频文件" ref="videofilereset"
				             v-model="videofile"></b-form-file>
				<span @click='upVideo' class="btn btn-outline-success" style="margin-top: 10px;">确认</span>
				<span @click='cancelupVideo' class="btn btn-outline-success" style="margin-top: 10px;">取消</span>
			</div>
		</div>
		<!-- 图片上传 -->
		<div class="floatBox" v-show='upimgShow'>
			<div class="floatsmBox">
				<b-form-file accept="image/*" placeholder="选择图片文件" ref="imgfilereset" v-model="imgfile"></b-form-file>
				<span @click='upImg' class="btn btn-outline-success" style="margin-top: 10px;">确认</span>
				<span @click='cancelupImg' class="btn btn-outline-success" style="margin-top: 10px;">取消</span>
			</div>
		</div>
		<div @click='upvideoShow=true' id="upvideoshow" style="display: none;"></div>
		<div @click='upimgShow=true' id="upimgshow" style="display: none;"></div>
		<div class='floatBox ub ub_ac ub_pc' v-if='showFloat'>
			<b-progress :max="100" :value="jindu" animated class='ub_f1 proessBox' show-progress></b-progress>
		</div>
	</div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import {Quill, quillEditor} from 'vue-quill-editor'

    export default {
        name: 'editor',
        data() {
            return {
                showFloat: false,//控制上传进度展示浮层
                jindu: 0,//上传进度
                upvideoShow: false,//控制上传视频展示
                upimgShow: false,//控制上传图片展示
                videofile: '',
                imgfile: '',
                params: {
                    title: '',
                    content: ''
                },
                editorVal: '',
                editorOption: {
                    modules: {
                        toolbar: {
                            container: [
                                ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                                ["blockquote", "code-block"], // 引用  代码块
                                [{header: 1}, {header: 2}], // 1、2 级标题
                                [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
                                [{indent: "-1"}, {indent: "+1"}], // 缩进
                                [{size: ["small", false, "large", "huge"]}], // 字体大小
                                [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
                                ["clean"], // 清除文本格式
                                ["link", "image", "video"] // 链接、图片、视频
                            ],
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    document.querySelector('#upimgshow').click()
                                },
                                'video': function (val) {
                                    document.querySelector('#upvideoshow').click()
                                }
                            }
                        }, //工具菜单栏配置

                    },
                    placeholder: '请在这里添加产品描述', //提示
                    readyOnly: false, //是否只读
                    theme: 'snow', //主题 snow/bubble
                    syntax: true, //语法检测
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            submit() {
                console.log(this.content);
                this.axiosProxy.updateBlog(this.params).then(response => {
                    if (response.data) {
                        this.$message('成功')
                    } else {
                        this.$message('失败')
                    }
                })
            },
            cancelupImg() {
                this.$refs.imgfilereset.reset();
                this.upimgShow = false
            },
            cancelupVideo() {
                this.$refs.videofilereset.reset();
                this.upvideoShow = false
            },
            upImg() {//上传图片
                var that = this
                if (that.imgfile === undefined || that.imgfile == null) {
                    this.$message('请选择图片')
                }
                that.jindu = 0
                that.showFloat = true
                var a = that.imgfile.name
                let param = new FormData(); //创建form对象
                param.append('file', that.imgfile, that.imgfile.name);//视频
                let config = {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        // console.log('进度值',complete)
                        that.jindu = complete
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$axios.post('http://127.0.0.1:8010/file/uploadFile', param, config)//url为上传地址
                    .then(response => {
                        that.$refs.imgfilereset.reset();//清除文件
                        console.log(response.data);
                        if (response.data.error === '0') {
                            // 获取光标所在位置
                            let quill = that.$refs.myTextEditor.quill;
                            let length = quill.getSelection().index;
                            // 插入图片  response.data.url为服务器返回的图片地址
                            var a = quill.insertEmbed(length, 'image', response.data.url)
                            console.log(a);
                            // 调整光标到最后
                            quill.setSelection(length + 1)
                            that.showFloat = false
                            that.upimgShow = false
                        } else {
                            that.showFloat = false
                            that.upimgShow = false
                            this.$message('插入失败,请重试')
                        }
                    }).catch(function (error) {
                    this.$message(error)
                    that.showFloat = false
                    that.upimgShow = false
                })
            },
            upVideo() {//上传视频
                var that = this
                if (that.imgfile === undefined || that.videofile == null) {
                    this.$message('请选择视频')
                }
                that.jindu = 0
                that.showFloat = true
                let param = new FormData(); //创建form对象
                param.append('file', that.videofile, that.videofile.name);//视频
                let config = {
                    onUploadProgress: progressEvent => {
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        that.jindu = complete
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$axios.post('http://127.0.0.1:8010/file/uploadFile', param, config)//url为上传地址
                    .then(response => {
                        that.$refs.videofilereset.reset();//清除文件
                        if (response.data.error === '0') {
                            // 获取光标所在位置
                            let quill = that.$refs.myTextEditor.quill
                            let length = quill.getSelection().index;
                            // 插入视频  response.data.url为服务器返回的图片地址
                            quill.insertEmbed(length, 'video', response.data.url)
                            // 调整光标到最后
                            quill.setSelection(length + 1)
                            that.showFloat = false
                            that.upvideoShow = false
                        } else {
                            that.showFloat = false
                            that.upvideoShow = false
                            this.$message('插入失败,请重试')
                        }
                    }).catch(function (error) {
                    this.$message('插入失败,请重试')
                    that.showFloat = false
                    that.upvideoShow = false
                })
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        },
        mounted() {
            // console.log('this is my editor',this.editor);
        }
    }
</script>


<style>
	.editor-btn {
		margin-top: 20px;
	}
	
	iframe {
		height: 600px;
		width: 800px;
		display: block;
		margin: 0 auto;
	}
	
	img {
		width: 600px;
	}
	
	.plugins-tips {
		padding: 20px 10px;
		margin-bottom: 20px;
		background: #eef1f6;
	}
	
	.proessBox {
		max-width: 400px;
	}
	
	.testFweb_box .custom-file-label::after {
		content: "选择视频文件";
		display: none;
	}
	
	.floatsmBox {
		padding: 20px;
		background-color: #fff;
		margin-top: 5%;
	}
	
	.floatBox {
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.2);
		width: 100%;
		height: 100%;
		padding: 0 10%;
		z-index: 10;
	}
	
	
	.ql-snow .ql-tooltip[data-mode=link]::before {
		content: "请输入链接地址:";
	}
	
	.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
		border-right: 0px;
		content: '保存';
		padding-right: 0px;
	}
	
	.ql-snow .ql-tooltip[data-mode=video]::before {
		content: "请输入视频地址:";
	}
	
	.ql-snow .ql-picker.ql-size .ql-picker-label::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item::before {
		content: '14px';
	}
	
	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
		content: '10px';
	}
	
	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
		content: '18px';
	}
	
	.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
	.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
		content: '32px';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item::before {
		content: '文本';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
		content: '标题1';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
		content: '标题2';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
		content: '标题3';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
		content: '标题4';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
		content: '标题5';
	}
	
	.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
	.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
		content: '标题6';
	}
	
	.ql-snow .ql-picker.ql-font .ql-picker-label::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item::before {
		content: '标准字体';
	}
	
	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
		content: '衬线字体';
	}
	
	.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
	.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
		content: '等宽字体';
	}
</style>
