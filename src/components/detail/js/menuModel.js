import { getCurrentInstance, toRefs, reactive, onMounted, computed, toRef } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

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
            console.log('菜单推荐', $store.getters.menu)
            return $store.getters.menu;
        }),
        con_height: 0 //当前菜单内容的高度
    })

    //设置菜单内容区域的高度
    const setMenuHeight = () => {
        var wH = window.outerHeight; //窗体高度

        //获取父组件的高度（详情页的nav）detail_nav
        //它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。
        var navH = proxy.$parent.$parent.$refs.detail_nav.offsetHeight;
        //wH-navH=菜单区域的高度
        var arg = wH - navH
        data.con_height = arg / 37.5 + 'rem'
        console.log(wH, navH, arg);
    }

    onMounted(() => {
        setMenuHeight()
    })

    return {
        ...toRefs(data)
    }
}

export default menuModel