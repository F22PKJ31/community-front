<template>
    <!-- bidirectional data binding（双向数据绑定） -->
    <div class="testFweb_box">
        <div class="testFweb">
            <quill-editor v-model="content"
                          value="editorVal"
                          ref="myQuillEditor"
                          :options="editorOption">
            </quill-editor>
        </div>
        <!-- 视频上传 -->
        <div class="floatBox" v-show='upvideoShow'>
            <div class="floatsmBox">
                <b-form-file accept="video/*" v-model="videofile" ref="videofilereset" placeholder="选择视频文件"></b-form-file>
                <span style="margin-top: 10px;" class="btn btn-outline-success" @click='upVideo'>确认</span>
                <span style="margin-top: 10px;" class="btn btn-outline-success" @click='cancelupVideo'>取消</span>
            </div>
        </div>
        <!-- 图片上传 -->
        <div class="floatBox" v-show='upimgShow'>
            <div class="floatsmBox">
                <b-form-file accept="image/*" v-model="imgfile" ref="imgfilereset" placeholder="选择图片文件"></b-form-file>
                <span style="margin-top: 10px;" class="btn btn-outline-success" @click='upImg'>确认</span>
                <span style="margin-top: 10px;" class="btn btn-outline-success" @click='cancelupImg'>取消</span>
            </div>
        </div>
        <div style="display: none;" id="upvideoshow" @click='upvideoShow=true'></div>
        <div style="display: none;" id="upimgshow" @click='upimgShow=true'></div>
        <div v-if='showFloat' class='floatBox ub ub_ac ub_pc'>
            <b-progress class='ub_f1 proessBox' :value="jindu" :max="100" show-progress animated></b-progress>
        </div>
    </div>
</template>
<style>
    .proessBox{
        max-width: 400px;
    }
    .testFweb{
        width: 800px;
        margin: 50px auto;
    }
    .testFweb_box .custom-file-label::after{
        content: "选择视频文件";
        display: none;
    }
    .floatsmBox{
        padding: 20px;
        background-color: #fff;
        margin-top: 5%;
    }
    .floatBox{
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.2);
        width: 100%;
        height: 100%;
        padding: 0 10%;
        z-index: 10;
    }
</style>
<script>
    import {quillEditor, Quill} from 'vue-quill-editor'

    export default {
        components: {quillEditor,},
        data () {
            return {
                showFloat:false,//控制上传进度展示浮层
                jindu:0,//上传进度
                upvideoShow:false,//控制上传视频展示
                upimgShow:false,//控制上传图片展示
                videofile:'',
                imgfile:'',
                content: '',//编辑器内容
                editorVal:'',
                editorOption: {
                    modules: {
                        toolbar: {  // 如果不上传图片到服务器，此处不必配置
                            container: [
                                [{'size': ['small', false, 'large', 'huge']}],
                                [{'align': []}],
                                ['link', 'image', 'video']
                            ],  // container为工具栏，可自行配置
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    document.querySelector('#upimgshow').click()
                                },
                                'video':function(val){
                                    document.querySelector('#upvideoshow').click()
                                }
                            }
                        }
                    },
                    theme: 'snow',
                    placeholder: '填写内容',
                }  // 必须初始化为对象 init  to Object
            }
        },
        methods:{
            cancelupImg(){//取消上传图片 关闭浮层并清除文件
                this.$refs.imgfilereset.reset();
                this.upimgShow = false
            },
            cancelupVideo(){//取消上传视频 关闭浮层并清除文件
                this.$refs.videofilereset.reset();
                this.upvideoShow = false
            },
            upImg(){//上传图片
                var that = this
                if(!that.$isDefine(that.imgfile)){
                    that.$alert('请选择图片')
                }
                that.jindu = 0
                that.showFloat = true
                //随机9位数名称(由于此项目文件是上传到阿里云的oss上面的，所以同一天的同名文件会覆盖，按需添加)
                var a = that.imgfile.name
                var eame = a.split('.')
                var rnd="";
                for(var i=0;i<9;i++){rnd+=Math.floor(Math.random()*10);}
                let param = new FormData(); //创建form对象
                param.append('img',that.imgfile,rnd+'.'+eame[eame.length-1]);//视频
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
                that.axios.post('url',param,config)//url为上传地址
                    .then(response=>{
                        that.$refs.imgfilereset.reset();//清除文件
                        if (response.data.error == '0') {
                            // 获取光标所在位置
                            let quill = that.$refs.myQuillEditor.quill
                            let length = quill.getSelection().index;
                            // 插入图片  response.data.url为服务器返回的图片地址
                            quill.insertEmbed(length, 'image', response.data.url)
                            // 调整光标到最后
                            quill.setSelection(length + 1)
                            that.showFloat = false
                            that.upimgShow = false
                        } else {
                            that.showFloat = false
                            that.upimgShow = false
                            this.$alert('插入失败,请重试')
                        }
                    }).
                catch(function(error){
                    that.$alert('插入失败,请重试')
                    that.showFloat = false
                    that.upimgShow = false
                })
            },
            upVideo(){//上传视频
                var that = this
                if(!that.$isDefine(that.videofile)){
                    that.$alert('请选择视频')
                }
                that.jindu = 0
                that.showFloat = true
                //随机9位数名称(由于此项目的视频是上传到阿里云的oss上面的，所以同一天的同名文件会覆盖)
                var a = that.videofile.name
                var eame = a.split('.')
                var rnd="";
                for(var i=0;i<9;i++){rnd+=Math.floor(Math.random()*10);}
                let param = new FormData(); //创建form对象
                param.append('video',that.videofile,rnd+'.'+eame[eame.length-1]);//视频
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
                that.axios.post('url',param,config)//url为上传地址
                    .then(response=>{
                        that.$refs.videofilereset.reset();//清除文件
                        if (response.data.error == '0') {
                            // 获取光标所在位置
                            let quill = that.$refs.myQuillEditor.quill
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
                            this.$alert('插入失败,请重试')
                        }
                    }).
                catch(function(error){
                    that.$alert('插入失败,请重试')
                    that.showFloat = false
                    that.upvideoShow = false
                })
            }
        },
    }
</script>