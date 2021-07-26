<template>
  <div class="tool-bar-warp">
    <ul class="tool-bar flex">
      <!-- .grow_shrink排成一行并设置了间距 -->
      <li
        class="tool-bar-item grow_shrink"
        v-for="(item, index) in bar_item"
        :key="index"
      >
        <router-link :to="item.link">
        <i class="iconfont" :class="item.icon"></i>
        <span class="text">{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const data = reactive({
      bar_item: [
        {
          name: "首页",
          icon: "icon-icon4",
          link: "home",
        },
        {
          name: "发现",
          icon: "icon-faxian",
          link: "discover",
        },
        {
          name: "订单",
          icon: "icon-dingdan",
          link: "order",
        },
        {
          name: "我的",
          icon: "icon-wode",
          link: "mine",
        },
      ],
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss">
.tool-bar-warp {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(72,169,254);
  box-shadow: 0 0 0.106666rem #000; //4px
  .tool-bar {
    .tool-bar-item {
        text-align:center;
        font-size:.373333rem;
        color: #ccc;
        .iconfont{
            display:block;
            padding-top:.133333rem;
            font-size: 24px;
            padding: .133333rem;
        }
        .text{
            display: block;
            padding-bottom: .133333rem;
        }
    }   a{
        text-decoration: none;
    }
    .router-link-active{
				color: #fff;
				font-size: 500;
			}
  }
}
</style>
