<template>
    <div class="upload-box">  
        <div :id="'filePicker'+uploadType" class="filePicker-btn fl mr10">选择文件</div>
        <ul class="ss-upload-ul fl">
            <li v-for='(item,index) in previewImgList' :key="index" :id='item.id' class="file-item" :class="{'upload-success': item.isUploadSuccess}">
                <div id="" class="file-item thumbnail">
                    <img :src='item.url'>
                    <div class="info">{{item.name}}</div>
                </div>
                <div class="error" v-show="item.isError">上传失败</div>
                <p class="progress" v-show="item.isProgress"><span :style="{width: item.progressWidth + '%'}"></span></p>
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
            uploadType: {
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
                    auto: true, // 选完文件后，是否自动上传 
                    server: this.url,  // 文件接收服务端
                    pick: {
                        id: '#filePicker'+this.uploadType,     // 选择文件的按钮
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
                this.uploader.on('fileQueued', (file) => {// 当有文件被添加进队列的时候，添加到页面预览  
                    // 创建缩略图 100 x 100 
                    this.uploader.makeThumb( file, ( error, src )=>{
                        if ( error ) {
                           //$img.replaceWith('<span>不能预览</span>');
                            return;
                        }   
                        this.previewImgList.push({url:src,name:file.name, id:file.id,isUploadSuccess:'',isError:'',progressWidth:'', isProgress:''}) 
                    }, 100, 100 ); 
                });
                // this.uploader.on('uploadStart', (file) => {
                //     // 在这里可以准备好formData的数据
                //     //this.uploader.options.formData.key = this.keyGenerator(file);
                // });

                this.uploader.on('uploadProgress', (file, percentage) => { // 文件上传过程中创建进度条实时显示。
                    this.previewImgList.map((item,index)=>{
                        if(item.id==file.id){
                            item.progressWidth=percentage*100;
                        } 
                        return item
                    }) 
                });
                this.uploader.on('uploadSuccess', (file, response) => { // 上传成功时候执行
                    this.previewImgList.map((item,index)=>{
                        if(item.id==file.id){
                            item.isUploadSuccess=true;
                        } 
                        return item
                    }) 
                    this.$emit('success', file, response); //图片上传成功后返回的数据
                });

                this.uploader.on('uploadError', (file, reason) => {//上传失败
                    this.previewImgList.map((item,index)=>{
                        if(item.id==file.id){
                            item.isError=true;
                        } 
                        return item
                    }) 
                });

                //错误提示
                this.uploader.on('error', (type) => {
                    let errorMessage = '';
                    if (type === 'F_EXCEED_SIZE') {
                        errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`;
                    } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                        errorMessage = '文件上传已达到最大上限数';
                    } else if(type==='F_DUPLICATE') {
                        errorMessage = '不能上传同一张';
                    }  else {
                        errorMessage = `上传出错！请检查后重新上传！错误代码${type}`;
                    } 
                    this.$emit('error', errorMessage);
                });

                this.uploader.on('uploadComplete', (file, response) => { // 上传完成
                    this.previewImgList.map((item,index)=>{
                        if(item.id==file.id){
                            item.isProgress=false;
                        } 
                        return item
                    })
                });
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

<style>
    /* 上传图片 */

.upload-box{overflow: hidden;}
.file-item{position: relative;}
.filePicker-btn{position: relative; width: 100px; height: 100px; background: rgba(0, 0, 0, .5); z-index: 100}
.file-item .error{position: absolute;top: 4px;left: 4px;right: 4px;background: red;color: white;text-align: center;height: 20px;font-size: 14px;line-height: 23px;}
.file-item .info{position: absolute;left: 4px;bottom: 4px;padding-right: 20px;right: 4px;height: 20px;line-height: 20px;text-indent: 5px;background: rgba(0, 0, 0, 0.6);color: white;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;font-size: 12px;z-index: 10;}
.upload-success:after{content: '';position: absolute;width: 20px;height: 20px;background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowMjVGNjM3RDQyMDYxMUU4OTgxMDhFQzY0RTNEOEI0MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowMjVGNjM3RTQyMDYxMUU4OTgxMDhFQzY0RTNEOEI0MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAyNUY2MzdCNDIwNjExRTg5ODEwOEVDNjRFM0Q4QjQwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAyNUY2MzdDNDIwNjExRTg5ODEwOEVDNjRFM0Q4QjQwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+exfjbQAAAMVJREFUeNrs2EEKwjAQBdDGQ3iX7mKpkHojT+DancfotXoAwU1JZzCLIEgzSQYD/oG/TOYtmkyJ8d53Ldeha7wABBBAAAEEEMD/ATrKQrEtAhk3U46UXrSS/weV4ygv/647xUjWN43TBhbjJEDefBA0qYKTAK+h2SOh2VQLJwFayjMBWRUn/QbHHWR1XM4h+YZUweWe4vMH8qKFK7lmYuSqhSu9B2OkCo5jCp8+TmG23nhqagxxg7cZAAEEEEAAAfxpbQIMAMv1X5C1MX1aAAAAAElFTkSuQmCC') no-repeat center center;background-size: 20px;right: 4px;bottom: 4px;z-index: 99;}

.file-item .progress{position: absolute;right: 4px;bottom: 4px;height: 3px;left: 4px;height: 4px;overflow: hidden;z-index: 15;margin: 0;padding: 0;border-radius: 0;background: transparent;}
.file-item .progress span{display: block;overflow: hidden;width: 0;height: 100%;background: rgba(255, 255, 255, .5) url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDowMjgwMTE3NDA3MjA2ODExODA4M0E4MzgzMTAzRTZGOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MzFGMDI3MDU0RjgxMUU4OTY4MEE5OTNCOTMxQjU1NyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MzFGMDI2RjU0RjgxMUU4OTY4MEE5OTNCOTMxQjU1NyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkYxRjAyMUMxRDBCMTFFM0FBMUZFOTY3MTBDMThDN0MiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkYxRjAyMUQxRDBCMTFFM0FBMUZFOTY3MTBDMThDN0MiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz604qPtAAAAvElEQVR42pTTsQ2CQBTG8UdMrKwobe0ZQBdwAh3BFdyAFRhBJ3ABHYCe1pKKisRwfC95lfku+e4lfyryg4M7Syk9E58LMiW/1OhLkBHtVcQ7o4VAL1SpiNdllnUrQXZoIMiEDirindCPQG+0URGvzSzrXoJsUU+QGTUqYnHzTKA+HiIhFq/Ppi1B/EN+COIf/qgiFr92ItAQW0JCLDYbm64EqWL7/88Sx0VCLA7iSCA/uLWKeNfMsh6rAAMAT9CMnr4Tb7YAAAAASUVORK5CYII=') repeat-x;-webit-transition: width 200ms linear;-moz-transition: width 200ms linear;-o-transition: width 200ms linear;-ms-transition: width 200ms linear;transition: width 200ms linear;-webkit-animation: progressmove 1s linear infinite;-moz-animation: progressmove 1s linear infinite;-o-animation: progressmove 1s linear infinite;-ms-animation: progressmove 1s linear infinite;animation: progressmove 1s linear infinite;-webkit-transform: translateZ(0);}

@-webkit-keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}
@-moz-keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}
@keyframes progressmove{0%{background-position: 0 0;}100%{background-position: 17px 0;}}

.webuploader-element-invisible{position: absolute !important;clip: rect(1px 1px 1px 1px);clip: rect(1px,1px,1px,1px);}
.webuploader-container label{position: absolute;left: 0;right: 0;top: 0;bottom: 0;width: 100px!important; height: 100px!important;}
.webuploader-container div{height: 100px;}
/*.file-item-delet{position: absolute; cursor: pointer; width: 20px;height: 20px; right: -5px; top: -5px;z-index: 20; background: #ff1e1e url('../images/deleticon.png') no-repeat center center; background-size: 20px; border-radius: 100px; }*/
.ss-upload-ul {position: relative;  z-index: 10}
.ss-upload-ul li{float: left; position: relative; margin:0 5px;}
.ss-upload-ul li:first-child{margin-left: 0;}

</style>
