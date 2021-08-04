import {
    getCurrentInstance,
    toRefs,
    reactive,
    onMounted,
    computed,
    watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

function carModel(props) {
    const $route = useRoute(); //赋值注意括号不能少
    const $router = useRouter();
    const $store = useStore();
    const data = reactive({
        show: false,
        carClassname: "",
        //加购的状态
        foodState: computed(() => {
            //通过计算属性获取foodState对象的值，并return
            return $store.state.foodState;
        }),
        state: computed(() => {
            //根据商家id查询商品信息
            return data.foodState[props.resID];
        }),
        //总数量
        count_all: computed(() => {
            if (data.state) {
                return data.state.count_all
            }
        }),
        rst: computed(() => {
            //vuex头部信息
            return $store.getters.rst
        }),
        //商品信息
        foods: computed(() => {
            if (data.state) {
                return data.state.foods;
            }
        })
    });



    //起送价
    const base_price = computed(() => {
            return data.rst.piecewise_agent_fee.rules[0].price

        })
        //计算商品现价的总价
    const allPrice = computed(() => {
        //当前商家加购的商品信息
        var state = data.state;
        var price = 0,
            oprice = 0;
        var food; //存放商品信息
        var priceArr = []; //存放specfoods信息
        var price_; //现价
        var oprice_;
        if (state) {
            var foods = state.foods; //拿到商品信息
            for (var k in foods) {
                food = foods[k];
                priceArr = food.item.specfoods[0];
                //商品的现价
                price_ = priceArr.price;
                //现价的总价
                price += price_ * food.count;
                //商品的原价
                oprice_ = priceArr.original_price;

                //商品有原价用原价计算，没有则用现价计算
                //计算原价的总价
                oprice += oprice_ ? oprice_ * food.count : price * food.count;
            }
            // console.log(food);
            price = price.toFixed(1);
            oprice = oprice.toFixed(1);

        }
        // return { price: 0, oprice: 0 }; //没有原价和现价默认返回0
        return {
            price: price,
            oprice: oprice
        };
    });

    onMounted(() => {
        // 购物车动画
        watch(() => data.count_all, (v, ov) => {
                data.carClassname = ""
                    // console.log(v, (ov || 0))
                if (v > (ov || 0)) {

                    setInterval(() => {
                        data.carClassname = "car 0.3s"
                    }, 500);
                }
            }, {
                deep: true
            })
            // console.log(props.resID)
            //侦听foodState的变化
        watch(
            [data.foodState, () => data.state],
            ([fval, sval], [ofval, osval]) => {
                // console.log(sval);
            }, {
                deep: true,
            }
        );


    });

    return {
        ...toRefs(data),
        allPrice,
        base_price,
    };
}

export default carModel;