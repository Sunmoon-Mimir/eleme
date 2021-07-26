<template>
  <div class="header">
    <slot name="header-main">
      <div class="header-main">
                                                      <!-- 传递一个back事件 -->
        <button class="iconfont icon-fanhui main-btn" @click="$emit('back')"></button>
        <span>{{title}}</span>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
    props:{
        title:{
            type:String,
        }
    }

};
</script>

<style lang="scss" scoped="scoped">
.header {
  background-image: linear-gradient(90deg, #50abfc, #226dfe);
  .header-main {
      position: relative;
      height: 1.466667rem;
      text-align: center;
      font-size: .48rem;
      color: #FFF;
      line-height: 1.466667rem;
      .main-btn{
          position: absolute;
          left: 0;
          top: 0;
          color: #FFF;
          font-size: .64rem;
          width: 1.066666rem;
		  height: 1.466666rem;
      }
  }
}
</style>
