<template>
  <div>

      <router-view></router-view>
            <!-- <h2>主体</h2> -->
      <Toolbar></Toolbar>
  </div>
</template>

<script>
import Toolbar from '../../components/toolbar/Toolbar.vue'
export default {
    components:{
        Toolbar
    }
}
</script>

<style>

</style>