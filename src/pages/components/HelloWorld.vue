<template>
    <div class="page"> 
        <!-- <div class="file-panel">
            <h2>文件列表</h2>
            <div class="file-list">
                <ul class="file-item" :class="`file-${file.id}`" v-for="file in fileList">
                    <li class="file-type" :icon="fileCategory(file.ext)"></li>
                    <li class="file-name">{{file.name}}</li>
                    <li class="file-size">{{fileSize(file.size)}}</li>
                    <li class="file-status">上传中...</li>
                    <li class="file-operate">
                        <a title="开始" @click="resume(file)"><i class="iconfont icon-control-play"></i></a>
                        <a title="暂停" @click="stop(file)"><i class="iconfont icon-video-pause"></i></a>
                        <a title="移除" @click="remove(file)"><i class="iconfont icon-close-big"></i></a>
                    </li>
                    <li class="progress"></li>
                </ul>
                <div class="no-file" v-if="!fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
            </div>
        </div> -->

        <p>111</p>

        <vue-upload
                ref="uploader"
                url="https://www.easy-mock.com/mock/5a36926874f427476ce83afd/example/upload"
                uploadType="01"
                @error="onError"
                @success="onSuccess"
        ></vue-upload>
    </div>
</template>

<script>
 import vueUpload from './upload/upload'

export default {
        data() {
            return {
                fileList: [],
            }
        },
        mounted() {
        },
        computed: {
            // uploader() {
            //     return this.$refs.uploader;
            // }
        },
        methods: {
            // fileChange(file) {
            //     if (!file.size) return;
            //     this.fileList.push(file);
            //     console.log(file);
            // },
            // onProgress(file, percent) {
            //     $(`.file-${file.id} .progress`).css('width', percent * 100 + '%');
            //     $(`.file-${file.id} .file-status`).html((percent * 100).toFixed(2) + '%');
            // },
            // onSuccess (file, response) {
            //     console.log('上传成功', response);
            //     if (response.needMerge) {
            //         api.mergeUpload({
            //             tempName: response.tempName,
            //             fileName: file.name
            //         }).then(res => {
            //             let $fileStatus = $(`.file-${file.id} .file-status`);
            //             console.log(res);
            //             if (res.status === 0) {
            //                 $fileStatus.html('上传成功，转码中');
            //             } else if (res.status === 1) {
            //                 $fileStatus.html('上传失败');
            //             } else if (res.status === 2) {
            //                 $fileStatus.html('上传成功');
            //             }
            //         });
            //     }
            // },
            // resume(file) {
            //     this.uploader.upload(file);
            // },
            // stop(file) {
            //     this.uploader.stop(file);
            // },
            // remove(file) {
            //     // 取消并中断文件上传
            //     this.uploader.cancelFile(file);
            //     // 在队列中移除文件
            //     this.uploader.removeFile(file, true);
            //     // 在ui上移除
            //     let index = this.fileList.findIndex(ele => ele.id === file.id);
            //     this.fileList.splice(index, 1);
            // },
            // fileSize(size) {
            //     return WebUploader.Base.formatSize(size);
            // },
            // fileCategory(ext) {
            //     let type = '';
            //     const typeMap = {
            //         image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
            //         video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
            //         text: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
            //     };
            //     Object.keys(typeMap).forEach((_type) => {
            //         const extensions = typeMap[_type];
            //         if (extensions.indexOf(ext) > -1) {
            //             type = _type
            //         }
            //     });
            //     return type
            // },
            onSuccess(mes){// 成功的接口
                //console.log(111)
            },
            onError(mes){// 失败的接口
                alert(mes)
                console.log(mes)
            }
        },
        watch: {},
        components: {
            vueUpload
        }
}
</script> 
<style lang = 'scss' scoped>

   $primary-color: red; 
    p {
        color: $primary-color;  //编译后就成了 color:#333;类似于js的变量！
    }
    
</style>
