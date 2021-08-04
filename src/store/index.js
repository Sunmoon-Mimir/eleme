import { createStore } from 'vuex';
import { getTransitionRawChildren } from '_vue@3.1.5@vue';

//创建一个新的store实例

//state存放属性
const state = () => {
    return {
        test: '测试vuex',
        //定义对象 存储详情页的数据
        detailDate: null,
        // 加购状态
        foodState: {},
        //分类的状态
        cateGory: {}
    }
}

const mutations = {
    setDetailDate(state, data) {
        state.detailDate = data
    },
    //加购商品
    addFoods(state, item) {
        var { item, cid } = item
        //商家
        var foodState = state.foodState, //购物车状态
            resID = item.restaurant_id, //商家ID
            foodID = item.specfoods[0].food_id; //商品ID
        var foods; //商品
        if (resID in foodState) { //判断当前商家或商品是否存在
            foods = foodState[resID].foods;
            foodState[resID].count_all++
                //商品是否存在
                if (foodID in foods) {

                    foods[foodID].count++;
                    //商品数量+1

                } else {
                    //添加商品
                    foods[foodID] = {
                        count: 1,
                        item
                    }
                    console.log(foodState)
                }
        } else {
            //第一次点击没有商家没有商品添加进来
            //添加新的商家
            foodState[resID] = {
                count_all: 1, //商品加购总数量
                foods: {
                    [foodID]: { //foodID是数值不是变量，所以用[]书写
                        count: 1,
                        cid,
                        item
                    }
                }
            }
        }
        // console.log('购物车', item)
        // console.log(foodState)
        //加入购物车时提交添加分类
        this.commit('addCateGory', { resID, cid })
    },
    reduceFoods(state, item) {
        var { item, cid } = item

        var foodState = state.foodState, //购物车状态
            resID = item.restaurant_id, //商家ID
            foodID = item.specfoods[0].food_id; //商品ID

        var res = foodState[resID], //商家数据
            food = res.foods[foodID]; //商品数据
        if (res) {
            if (food) {
                food.count--; //商品数量
                res.count_all--; //商品总数
                if (res.count_all <= 0) {
                    delete foodState[resID]
                }
                if (food.count <= 0) {
                    delete res.foods[foodID]
                }
            }
        }
        this.commit('subCateGory', { resID, cid })
    },
    clearCar(state, resID) {
        //清空购物车数据
        delete state.foodState[resID];
        //清空分类的数据
        delete state.cateGory[resID];
    },
    //增加分类数量
    addCateGory(state, item) {
        // console.log(item)
        var cState = state.cateGory; //分类状态
        var { resID, cid } = item //商家id 分类id
        var res = cState[resID] //分类的信息

        if (!cid) return;

        //判断当前商家或者分类是否存在
        if (resID in cState) {
            // 判断类别是否存在
            if (cid in res) {
                res[cid]++; //分类数量
            } else {
                res[cid] = 1
            }
        } else {
            //添加新的分类
            cState[resID] = {
                [cid]: 1
            }
        }
        // console.log(cState)
    },
    //减少分类数量
    subCateGory(state, item) {
        var cState = state.cateGory; //分类状态
        var { resID, cid } = item //商家id 分类id
        var res = cState[resID] //分类的信息

        if (!cid) return;
        res[cid]--;
        //删除类别
        if (res[cid] <= 0) {
            delete res[cid];
        }
        //删除商家
        if (!state.foodState[resID] || state.foodState[resID].count_all <= 0) {
            delete cState[resID];
        }
        console.log(cState)
    }
}
const getters = {
    //把rst数据转换为对象
    rst(state) { //头部的数据:logo、背景图、店名、评分、月销、配送时间
        return formatDate(state, "rst")
    },
    bought_list(state) {
        return formatDate(state, "bought_list")
    },
    menu(state) { //菜单数据
        return formatDate(state, "menu")
    },
    recommend(state) { //商家推荐
        return formatDate(state, "recommend")
    },
    redpack(state) { //优惠券
        return formatDate(state, "redpack")
    },
    user(state) {
        return formatDate(state, "user")
    },
}

//将字符串转换成对象
function formatDate(state, key) {
    var detailDate = state.detailDate
    if (state.detailDate) {
        return JSON.parse(state.detailDate[key].body)
    }
}

//创建一个新的store实例
const store = createStore({
    state,
    mutations,
    getters
})

export default store