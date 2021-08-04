import { getCurrentInstance, toRefs, reactive, onMounted, computed } from "vue";
//Vue3的新方式useRouter,useRoute
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

function elistModel() {
    const { proxy } = getCurrentInstance();
    const $Router = useRouter(); //赋值注意括号不能少
    const $Route = useRoute();
    const $store = useStore()
    const data = reactive({
        shoplist: null, //请求到的数据是对象，定义接收该数据，类型必须为null
        // 当前用户所在的地理位置
        gps: {
            latitude: 28.2151876841468,
            longitude: 112.932757076051,
        },
        show_Activity_state: {}
    });

    function toDetail(item) {
        $Router.push({
            path: 'detail/menu',
            query: { //查询
                id: item.restaurant.id
            }
        })
    }


    function showActivityFn(i) {
        // 点击 true 在次点击false
        data.show_Activity_state[i] = !data.show_Activity_state[i]
            // console.log(data.show_Activity_state);
    }

    function showActivity(i) {
        var val = data.show_Activity_state[i]
        if (val) {
            val = 'auto'
        } else {
            val = ""
        }
        return { height: val }

    }

    // 计算用户(x,y)和商家(x,y)的距离，勾股定理：两点计算
    //求两点之间的一个距离
    //x*x+y*y
    function distanceCalc(latitude, longitude) {
        //获取商家的经纬度
        // console.log(latitude,longitude)
        // 获取用户的经纬度
        var latitude_ = data.gps.latitude;
        var longitude_ = data.gps.longitude;

        var x, y, z;
        x = latitude_ - latitude;
        y = longitude_ - longitude;
        // 计算两点之间的距离 sqrt平方根
        z = (Math.sqrt(x * x + y * y) * 100).toFixed(2) + "km"; //转换为公里
        return z;
    }
    //列表数据
    let boll_elistData = computed(() => {
        var elistData = data.shoplist;
        // 判断数据是否获取到
        return elistData ? elistData : null;
    });

    //请求列表数据
    //参数一[从第几条开始请求]参数二[请求结束的位置]参数三[回调函数]
    function getData(s, len, cb) {
        //首页商家信息
        // list?offset=0&len=8
        proxy
            .$axios("/shoplist", {
                //懒加载，每次只请求8条数据
                params: {
                    //请求时，给params对象传两个参数
                    offset: s, //在本地服务器里配置进去params
                    len: len,
                },
            }).then(cb)
            // .then((res) => {
            //     data.shoplist = res.data.items; //赋值给响应式属性shoplist
            //     console.log(res.data);
            // });
    }
    onMounted(() => {
        //滚动函数判断到底就请求数据
        var wH; //窗口的高度
        var dH; //文档的高度
        var sT; //滚动条距离顶部的高度
        var dHtml = document.documentElement; //多个浏览器兼容
        var dBody = document.body;
        var offset = 0,
            len = 8,
            items;

        function scrollFN() {
            wH = window.outerHeight;
            dH = dHtml.offsetHeight || dBody.offsetHeight;
            sT = dHtml.scrollTop || dBody.scrollTop;


            // console.log(wH, dH, sT)
            if (dH - wH <= sT) { //文档的高度-窗口的高度<=滚动条的底部到顶部的距离
                offset = offset + len;
                getData(offset, len, res => { //滑动到底就调用getData() 
                    // console.log(res.data.items)
                    items.push.apply(items, res.data.items)
                })
            }

        }

        addEventListener('scroll', scrollFN, false)

        //请求店铺列表
        getData(offset, len, res => {
            data.shoplist = res.data.items; //赋值给响应式属性shoplist
            items = data.shoplist; //把懒加载push进去的最新数据赋值给
            // console.log(data.shoplist);
        })
    });
    return {
        boll_elistData,
        distanceCalc,
        showActivityFn,
        showActivity,
        toDetail
    };
}

export default elistModel;