<template>        <!-- 购物车布局 -->
    <div class="baseBtn flex">
        <transition name="reduce">
            <button class="iconfont icon-Rectangle" 
            @click="$emit('changenum',false)" :style="{visibility:count>0?'visible':'hidden'}">
            </button>
        </transition>              
        <!-- 当count大于0时样式visibility才显示 -->
        <span class="num" :style="{visibility:count>0?'visible':'hidden'}">{{count}}</span>
        <button class="iconfont icon-RectangleCopy" @click="$emit('changenum',true)"></button>
    </div>
</template>
<script>
    export default{
        props:{
            count:{
                type:Number,
                default:0
            }
        }
    }
</script>
<style lang="scss">
.baseBtn {
    justify-content: flex-end;
    align-items: center;
    .iconfont {
        font-size: 0.586666rem; //22
        color: #28bfbd;
    }
    .num {
        margin: 0 0.106666rem; //4
        font-size: 0.426666rem; //16
    }
    .reduce-enter-active,.reduce-leave-active {
        transition: 0.5s;
    }
    .reduce-enter,.reduce-leave-to {
        opacity: 0;
    }
    .icon-iconless {
        transition: 0.2s;
        opacity: 0;
        visibility: hidden;
        transform: translate(-30px) rotate(-160deg);
    }
    .rotate_transition {
        opacity: 1;
        visibility: visible;
        transform: translate(0px) rotate(0deg);
    }
}
</style>
