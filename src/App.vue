<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


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
 *{margin: 0; padding: 0}
ul li{list-style: none;}
.fl{float: left;}
</style>
