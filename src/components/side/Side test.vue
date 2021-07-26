<template>
  <div class="side">
    <Header title="选择收货地址">
      <div class="side_main">
        <div class="add">新增地址</div>
      </div>
    </Header>

    <div class="city_main">
      <Header title="城市选择" class="city_header">
        <div class="city_search">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" placeholder="请输入城市名或拼音" />
        </div>
      </Header>

      <div class="city_data">
        <van-index-bar>
          <ul v-for="(items,k,index) in citys" :key="index">
            <van-index-anchor :index="k" />
            <li class="add_list" v-for="(item,index) in items" :key="index">
              {{item.name}}</li>
          </ul>
          


          <van-index-anchor index="B" />

          ...
        </van-index-bar>
      </div>

      <!-- <li v-for="item in cityList" :key="item">
        {{item.name}}
      </li> -->
    </div>
  </div>
</template>

<script>
import Header from "@comps/header/Header.vue";
import { IndexBar, IndexAnchor } from "vant";
import { getCurrentInstance, toRefs, reactive } from "vue";
export default {
  components: {
    Header,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
  },
  setup() {
    /* 
			    vue2.0 原先通过在vue原型挂载axios，可以在组件实例通过this.$axios进行访问
				vue3.0 中没有this了,可以通过getCurrentInstance获取当前组件实例
			 */

    // 注意：
    // 		getCurrentInstance方法，是用来获取当前实例的，通过上下文ctx,获取当前
    // 		的方法。在打包之后无法获取全局挂载的方法。ctx只适合开发环境。
    const { ctx, proxy } = getCurrentInstance(); //解构这两个方法
    const data = reactive({
      cityList: null,
      citys: {
        A: [
          {
            label: "阿坝Aba0837",
            name: "阿坝",
            pinyin: "Aba",
            zip: "0837",
          },
          {
            label: "阿城Acheng0451",
            name: "阿城",
            pinyin: "Acheng",
            zip: "0451",
          },
        ],
      },
    });

    proxy.$axios("/citylist").then((res) => {
      console.log(res);
      data.cityList = res.data;
    });
    return {
      ...toRefs(data),
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
  }
}
</style>
