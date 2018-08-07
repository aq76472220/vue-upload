<template>
    <div class="upload"> 
        <ul class="ss-album-con-upimg">
            <li v-for='(item,index) in previewImgList' :key="index">
                <div id="" class="file-item thumbnail">
                    <img :src='item.url'>
                    <div class="info">{{item.name}}</div>
                </div>
            </li>
        </ul>  
    </div>
</template>

<script>  
    export default {
        name: 'vue-upload',
        props: {
            accept: {
                type: String,
                default: 'image',
            },
            // 上传地址
            url: {
                type: String,
                default: '',
            },
            // 上传最大数量 默认为100
            fileNumLimit: {
                type: Number,
                default: 100,
            },
            // 大小限制 默认2M
            fileSingleSizeLimit: {
                type: Number,
                default: 2048000,
            },
            // 上传时传给后端的参数，一般为token，key等
            formData: {
                type: Object,
                default: null
            },
            // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
            // keyGenerator: {
            //     type: Function,
            //     default(file) {
            //         const currentTime = new Date().getTime();
            //         const key = `${currentTime}.${file.name}`;
            //         return key;
            //     },
            // },
            multiple: {
                type: Boolean,
                default: false,
            },
            // 上传按钮ID
            uploadButton: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                uploader: null,
                previewImgList:[]
            };
        },
        mounted() {  
            this.initWebUpload(); 
        },
        methods: {
            initWebUpload() { 
                this.uploader = WebUploader.create({
                    auto: false, // 选完文件后，是否自动上传 
                    server: 'https://xxdyj.fengqianglife.com/pm/attachment/uploadFile.mvc',  // 文件接收服务端
                    pick: {
                        id: this.uploadButton,     // 选择文件的按钮
                        multiple: this.multiple,   // 是否多文件上传 默认false
                        label: '',
                    },
                     
                    fileNumLimit: this.fileNumLimit, // 限制上传个数
                    fileSingleSizeLimit: this.fileSingleSizeLimit, // 限制单个上传图片的大小
                    // formData: this.formData,  // 上传所需参数 
                    // duplicate: true,  // 重复上传
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },  // 允许选择文件格式。
                    compress :{
                        width: 720,   
                        // 图片质量，只有type为`image/jpeg`的时候才有效。  
                        quality: 90,   
                        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.  
                        allowMagnify: false,  
                        // 是否允许裁剪。  
                        crop: false,   
                        // 是否保留头部meta信息。  
                        preserveHeaders: true,   
                        // 如果发现压缩后文件大小比原来还大，则使用原来图片  
                        // 此属性可能会影响图片自动纠正功能  
                        noCompressIfLarger: false,  
                        // 单位字节，如果图片大小小于此值，不会采用压缩。  
                        compressSize: 0   
                    },

                });


                // 当有文件被添加进队列的时候，添加到页面预览
                this.uploader.on('fileQueued', (file) => { 
                    console.log(file) 
                    // 创建缩略图 100 x 100 
                    this.uploader.makeThumb( file, ( error, src )=>{
                        if ( error ) {
                           //$img.replaceWith('<span>不能预览</span>');
                            return;
                        }   
                        this.previewImgList.push({url:src,name:file.name}) 
                    }, 100, 100 ); 
                });
                // this.uploader.on('uploadStart', (file) => {
                //     // 在这里可以准备好formData的数据
                //     //this.uploader.options.formData.key = this.keyGenerator(file);
                // });
                // // 文件上传过程中创建进度条实时显示。
                // this.uploader.on('uploadProgress', (file, percentage) => {
                //     this.$emit('progress', file, percentage);
                // });
                // this.uploader.on('uploadSuccess', (file, response) => {
                //     this.$emit('success', file, response);
                // });
                // this.uploader.on('uploadError', (file, reason) => {
                //     console.error(reason);
                //     this.$emit('uploadError', file, reason);
                // });
                // this.uploader.on('error', (type) => {
                //     let errorMessage = '';
                //     if (type === 'F_EXCEED_SIZE') {
                //         errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`;
                //     } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                //         errorMessage = '文件上传已达到最大上限数';
                //     } else {
                //         errorMessage = `上传出错！请检查后重新上传！错误代码${type}`;
                //     }
                //     console.error(errorMessage);
                //     this.$emit('error', errorMessage);
                // });
                // this.uploader.on('uploadComplete', (file, response) => {
                //     this.$emit('complete', file, response);
                // });
            },
            // upload(file) {
            //     this.uploader.upload(file);
            // },
            // stop(file) {
            //     this.uploader.stop(file);
            // },
            // // 取消并中断文件上传
            // cancelFile(file) {
            //     this.uploader.cancelFile(file);
            // },
            // // 在队列中移除文件
            // removeFile(file, bool) {
            //     this.uploader.removeFile(file, bool);
            // },
            
        },
    };
</script>

<style  >
    /* 上传图片 */
.file-item{position: relative;}
.file-item .error{position: absolute;top: 4px;left: 4px;right: 4px;background: red;color: white;text-align: center;height: 20px;font-size: 14px;line-height: 23px;}
.file-item .info{position: absolute;left: 4px;bottom: 4px;padding-right: 20px;right: 4px;height: 20px;line-height: 20px;text-indent: 5px;background: rgba(0, 0, 0, 0.6);color: white;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 12px;z-index: 10;}
/*.upload-state-done:after{content: '';position: absolute;width: 20px;height: 20px;background: url('../images/scusessicon.png') no-repeat center center;background-size: 20px;right: 4px;bottom: 4px;z-index: 99;}*/
/*.file-item .progress{position: absolute;right: 4px;bottom: 4px;height: 3px;left: 4px;height: 4px;overflow: hidden;z-index: 15;margin: 0;padding: 0;border-radius: 0;background: transparent;}*/
/*.file-item .progress span{display: block;overflow: hidden;width: 50px;height: 100%;background: rgba(255, 255, 255, .5) url(../images/progress.png) repeat-x;-webit-transition: width 200ms linear;-moz-transition: width 200ms linear;-o-transition: width 200ms linear;-ms-transition: width 200ms linear;transition: width 200ms linear;-webkit-animation: progressmove 2s linear infinite;-moz-animation: progressmove 2s linear infinite;-o-animation: progressmove 2s linear infinite;-ms-animation: progressmove 2s linear infinite;animation: progressmove 2s linear infinite;-webkit-transform: translateZ(0);}*/
@-webkit-keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}
@-moz-keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}
@keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}
.webuploader-element-invisible{position: absolute !important;clip: rect(1px 1px 1px 1px);clip: rect(1px,1px,1px,1px);}
.webuploader-container label{position: absolute;left: 0;right: 0;top: 0;bottom: 0;width: 100px!important; height: 100px!important;}
.webuploader-container div{height: 100px;}
/*.file-item-delet{position: absolute; cursor: pointer; width: 20px;height: 20px; right: -5px; top: -5px;z-index: 20; background: #ff1e1e url('../images/deleticon.png') no-repeat center center; background-size: 20px; border-radius: 100px; }*/
.ss-album-con-upimg {position: absolute; top: 0; left: 0; z-index: 10}
.ss-album-con-upimg li{float: left;}

</style>