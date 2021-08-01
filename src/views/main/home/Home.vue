<template>
  <div class="home">
    <Header>
      <template #header-main>
        <div class="home_header">
          <!--点击这里就显示 选择收货地址板块-->
          <div @click="show.side = true">
            <i class="iconfont icon-dingwei"></i>
            <span>{{ currentSide ? currentSide : "请选择城市/地址" }}</span>
            <i class="iconfont icon-xiala"></i>
          </div>
          <div class="header_search" v-fixed>
            <p class="search_main">
              <i class="iconfont icon-sousuo"></i>
              <span>搜索商家</span>
            </p>
          </div>
        </div>
      </template>
    </Header>

   

    <!-- <h2>首页</h2> -->
    <!-- 轮播图开始 -->
    <div class="foodType">
      <van-swipe class="my-swipe" :autoplay="0" :loop="false">
        <van-swipe-item  v-for="items in splicefood" :key="items.id">
          <div class="foodType">
            <!-- 分类入口 -->
            <ul class="flex foodType_main">
              <li class="foodType_item" v-for="item in items" :key="item.id">
                <img :src="$formatImgSrc(item.image_hash)" alt="" />
                <span class="f_title"> {{item.name}} </span>
              </li>
            </ul>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图结束 -->


    <!-- 筛选器 -->
     <Vfilter  v-fixed:60></Vfilter> 


    <!-- 首页列表 -->
    <Elist></Elist>

    <!-- 是否显示 收货地址板块 
    @sback="show.side=false 隐藏收货地址绑定sback事件-->
    <!-- proxy.$emit('changeSide', val.name)   此处的@changeSide是接收值的-->
    <Side
      v-show="show.side"
      @sback="show.side = false"
      @changeSide="saveSide"
    ></Side>
  </div>
</template>

<script>
import Header from "@comps/header/Header.vue";
import Side from "@comps/side/Side.vue";
import Vfilter from "@comps/filter/Filter.vue";
import Elist from "@comps/elist/Elist.vue";
import homeModel from "./js/homeModel.js";
import { Swipe, SwipeItem } from "vant"; //按需引入
export default {
  components: {
    Header,
    Side,
    Elist,
    Vfilter,
    [Swipe.name]: Swipe, //按需引入
    [SwipeItem.name]: SwipeItem,
  },
  setup() {
    const { show, saveSide, currentSide, foodtype ,splicefood,} = homeModel(); //解构拿到

    return {
      saveSide,
      currentSide,
      show, //返回出去
      foodtype,
      splicefood,
      Vfilter
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  // height:53.333333rem;//2000px
  .home_header {
    padding: 0.533333rem 0.533333rem 0.266667rem 0.533333rem;
    font-size: 0.48rem; //18px
    color: #fff;
    .icon-dingwei {
      font-size: 100%;
    }
    span {
      margin: 0rem 0.133333rem;
      font-weight: 500;
    }
    //搜索部分
    .header_search {
      z-index: 10;
      // margin: 0.266667rem 0.8rem 0.266667rem 0.266667rem;
      padding: 0.266666rem .133333rem; //10px
      background-image: linear-gradient(90deg, #50abfc, #226dfe);
      color: #ccc;
      .search_main {
        padding: 0.266667rem 0.533333rem 0.266667rem 0.266667rem;
        // background-image: linear-gradient(90deg, #50abfc, #226dfe);
        background-color: #fff;
        font-size: 0.373333rem;
        width: 89%;
        text-align: center;
        .icon-sousuo {
          margin-right: 0.266667rem;
        }
      }
    }
  }
  .foodType {
    /* 轮播开始*/
    height: 5.866666rem; //220
    .foodType_main {
      flex-wrap: wrap;
      margin-right: .266667rem;
    }
    .foodType_item {
      width: 20%;
      margin-top: 0.533333rem; //20
      color: #666;
      text-align: center;
      span {
        color: #666;
      }
      img {
        display: block;
        width: 1.333333rem; //50
        height: 1.333333rem;
        margin: 0.053333rem auto; //2
      }
    }
    // .mint-swipe-indicators{
    // .is-active{
    // background-color:red;
    // }
    // }
  } /* 轮播结束*/
}
</style>



