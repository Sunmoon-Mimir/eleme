import { createStore } from 'vuex';

//创建一个新的store实例

//state存放属性
const state = () => {
    return {
        test: '测试vuex',
        //定义对象 存储详情页的数据
        detailDate: null
    }
}

const mutations = {
    setDetailDate(state, data) {
        state.detailDate = data
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