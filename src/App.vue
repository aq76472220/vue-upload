<template>
  <div id="app">
     
    <router-view/>
  </div>
</template>

<script>
import vueUpload from './pages/components/upload/upload'

export default {
  name: 'App',
  data () {
    return {
      msg: ''
    }
  },
  // components: {vueUpload}
}
</script>

<style>
 
</style>
