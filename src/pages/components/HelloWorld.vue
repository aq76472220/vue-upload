<template>
    <div class="page">

        <vue-upload
            ref="uploader1"
            url="https://rrxc.weihubao.com/broker/backend/photo"
            uploadType="01"
            @error="onError"
            @success="onSuccess"
            :width="180"
            :height="180"
            :fileNumLimit="10"
        ></vue-upload>

        <div class="ss-hammer"></div>
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

    },
    methods: {
        onSuccess(file,response){// 成功的接口
            console.log(response)
        },
        onError(mes){// 失败的接口
            console.log(mes)
        }
    },
    watch: {},
    components: { vueUpload }
}
</script> 
<style  scoped>
  .ss-hammer{width: 100px; height: 100px; background: #eee;}
</style>
