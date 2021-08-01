import {
    getCurrentInstance,
    toRefs,
    reactive,
    onMounted,
    computed,
    toRef,
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
            console.log("菜单推荐", $store.getters.menu);
            return $store.getters.menu;
        }),
        con_height: 0, //当前菜单内容的高度
        menu_tops: [],
        menu_index: 0
    });

    //设置菜单内容区域的高度
    const setMenuHeight = () => {
        var wH = window.outerHeight; //窗体高度

        //获取父组件的高度（详情页的nav）detail_nav
        //它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。
        var navH = proxy.$parent.$parent.$refs.detail_nav.offsetHeight;
        //wH-navH=菜单区域的高度
        var arg = wH - navH;
        data.con_height = arg / 37.5 + "rem";
        console.log(wH, navH, arg);
    };
    //选中左侧菜单
    const menuSelect = (i) => {
        data.menu_index = i; //获取到左侧菜单的下标
        // console.log(i)

        //通过下面的方式获取到的是HTMLCollection对象，它需要遍历才能操作DOM对象
        // var main_con = proxy.$refs.menu_main.getElementsByClassName('main_con');

        var main_con = proxy.$refs.main_con;
        //把获取到的高度赋值给main_con
        main_con.scrollTop = data.menu_tops[i];

        // $(main_con).animate({
        //         scrollTop: data.menu_tops[i]
        //     }, 300)
        // console.log(main_con)
    };

    const getTops = () => {
        //通过ref获取到父级容器，在通过类名拿到子元素con_item
        var items = proxy.$refs.menu_main.getElementsByClassName("con_item");
        var arr = data.menu_tops; //存储左侧菜单高度
        //con_item对于相对定位父级的高度
        for (var item of items) {
            arr.push(item.offsetTop);
        }
        // console.log(arr)
    };

    onMounted(() => {
        setMenuHeight();
        getTops();
        //滑动右侧容器滚动条，左侧的菜单也对应发生变化
        var main_con = proxy.$refs.main_con;
        var t = 0; //默认高度
        var index, i_;
        var arr = data.menu_tops;
        //监听右侧容器滚动条的高度
        main_con.addEventListener("scroll", () => {
            // console.log(main_con.scrollTop)
            t = main_con.scrollTop;
            index = data.menu_index; //获取对应下标
            for (var i = 0, len = arr.length; i < len; i++) {
                if (t <= arr[i]) {
                    i_ = i;
                    //当下标发生改变时修改
                    if (index !== i_) {
                        data.menu_index = i_ - 1;
                    }
                    break;
                }
            }
            console.log(i_, index);
        });
    });

    return {
        menuSelect,
        ...toRefs(data),
    };
}

export default menuModel;