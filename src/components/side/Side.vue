<template>
  <div class="side">
    <Header title="选择收货地址" @back="$emit('sback')">
      <div class="side_main">
        <div class="add">新增地址</div>
        <!-- 地址选择 -->
        <div class="main_search flex" @click="show.city=true"> <!--当点击这个里的时候显示城市选择-->
          <span class="search_name"> {{currentCity?currentCity:'请选择城市'}} </span>
          <i class="iconfont icon-xiala"></i>
          <!-- 搜索框 -->
          <p class="search_input">
            <i class="iconfont icon-icon_sousuo"></i>
            <input type="text" class="input" placeholder="请输入地址" />
          </p>
        </div>
        <!--当前地址 -->
        <!-- <div class="current_box">
          <span>当前地址</span>
          <li class="add_list">无</li>
        </div> -->
      </div>
    </Header>

    <!-- 城市选择 -->
    <div class="city_main" v-show="show.city">  <!--默认不显示 城市现在这个模块-->
      <Header title="城市选择" class="city_header"   @back="show.city=false"><!--返回 选择收货地址板块-->
        <div class="city_search">
          <i class="iconfont icon-sousuo"></i>
          <input
            type="text"
            placeholder="请输入城市名或拼音"
            v-model="searchStr"
          />
        </div>
      </Header>

      <!-- 搜索时显示的列表 -->
      <div class="search_box" v-show="searchStr">
        <ul>
          <li
            class="add_list"
            v-for="item in citySearch"
            :key="item.id"
            @click="selectCity(item)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <!--当前地址 -->
      <div class="current_box">
        <span>当前地址</span>
        <li class="add_list">{{ currentCity?currentCity:'无' }}</li>
      </div>

        <!-- 城市列表数据 -->
      <div class="city_data" v-show="!searchStr">
        <van-index-bar>
          <ul v-for="(items, k) in cityName" :key="items.id">
            <van-index-anchor :index="k" />
            <li
              class="add_list"
              v-for="item in items"
              :key="item.id"
              @click="selectCity(item)"
            >
              {{ item.name }}
            </li>
          </ul>
          ...
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@comps/header/Header.vue";
import cityModel from "./js/cityModel.js";
import { IndexBar, IndexAnchor } from "vant";
import { getCurrentInstance, toRefs, reactive } from "vue";
export default {
  components: {
    Header,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
  },
  setup() {
    const {
      cityList,
      cityName,
      searchStr,
      citySearch,
      selectCity,
      currentCity,
      show,
    } = cityModel();

    return {
      cityList,
      citySearch,
      searchStr,
      cityName,
      selectCity,
      currentCity,
      show,
    };
  },
};
</script>

<style lang="scss">
.side {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .side_main {
    .add {
      position: absolute;
      right: 0.266667rem;
      top: 0;
      line-height: 1.466667rem;
      color: #fff;
      font-size: 0.4rem;
      height: 100%;
    }
    // 搜索模块开始
    .main_search {
      align-items: center;
      background-color: #fff;
      padding: 0.32rem; //12
      .search_name {
        width: 1.066666rem; //40px
        text-align: center;
        font-size: 0.32rem; //12
        // 字体超出隐藏
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .search_input {
        padding: 0.16rem; //6
        margin-left: 0.266666rem; //10
        background-color: #f4f4f4;
        .iconfont {
          font-size: 0.32rem; //12
          font-weight: 600;
          color: #999;
        }
        .input {
          padding: 0.133333rem; //5
          width: 6.666666rem; //250
          color: #999;
        }
      }
      // 搜索框结束
      // 当前地址
      .new_add {
        margin: 0.266666rem; //10
        font-size: 0.373333rem; //14
      }
    }
    .current_box {
      background-color: #F4F4F4;
    span {
      line-height: 35px;
      padding: 15px;
      font-size: 14px;
      color: #999;
    }
    .add_list {
    height: 0.4rem; //15
    background-color: #fff;
    padding: 0.4rem; //15
    font-size: 0.373333rem; //14
    border-bottom: 1px solid rgba(166, 166, 166, 0.1);
  }
  }
  }
}
.city_main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  .city_header {
    padding-bottom: 0.002667rem;
  }
  .city_search {
    margin: 0.266667rem 1.066667rem;
    padding: 0.213333rem 0.266667rem 0.213333rem 0.266667rem;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 2.6666rem;
    line-height: 0.4rem;
    input {
      // background: #000;
      width: 90%;
    }
    .icon-sousuo {
      margin-right: 0.266667rem;
    }
  }
  /**列表模块**/
  .add_list {
    height: 0.4rem; //15
    background-color: #fff;
    padding: 0.4rem; //15
    font-size: 0.373333rem; //14
    border-bottom: 1px solid rgba(166, 166, 166, 0.1);
  }
  .search_box {
    /* 自适应填满剩余空间 */
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
  }
  .current_box {
    span {
      line-height: 35px;
      padding: 15px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
