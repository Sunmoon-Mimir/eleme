import {
    getCurrentInstance,
    toRefs,
    reactive,
    onMounted,
    computed,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

function menuModel() {
    const { proxy } = getCurrentInstance();
    const $route = useRoute(); //赋值注意括号不能少
    const $router = useRouter();
    const $store = useStore();
    const data = reactive({
        recommend: computed(() => {
            // console.log('商家推荐', $store.getters.recommend)
            return $store.getters.recommend;
        }),
        menu: computed(() => {
            // console.log("菜单推荐", $store.getters.menu);
            return $store.getters.menu;
        }),
        foodState: computed(() => { //商品加购的信息
            return $store.state.foodState;
        }),
        rst: computed(() => {
            return $store.getters.rst;
        }),
        cateCount(resID, cid) {
            // console.log(resID, cid)
            var cate = $store.state.cateGory;
            if (cate[resID]) {
                return cate ? cate[resID][cid] : 0;
            }
        }
    });

    onMounted(() => {


    });
    //商品计数
    const count = (item) => {
        // console.log(item)
        var
            resID = item.restaurant_id, //商家ID
            foodID = item.specfoods[0].food_id, //商品ID
            res = data.foodState[resID], //当前商品对应商家的id
            food; //商品
        if (res) {
            //通过商品ID从商家去拿取 商品信息
            food = res.foods[foodID]
            if (food) {
                return food.count;
            }
        }

        return 0;
    }

    //加/减购物车
    const changeCount = (item, boll) => {
        // console.log(boll ? '加' : '减')
        // data.count += boll ? 1 : -1;
        if (boll) {
            //提交addFoods
            $store.commit('addFoods', item)
        } else {
            $store.commit('reduceFoods', item)
        }


    }
    return {
        ...toRefs(data),
        changeCount,
        count
    };
}

export default menuModel;