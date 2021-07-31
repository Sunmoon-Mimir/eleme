import { getCurrentInstance, toRefs, reactive, onMounted, computed, toRef } from "vue";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

function detailModel() {
    const { proxy } = getCurrentInstance();
    const $route = useRoute(); //赋值注意括号不能少
    const $router = useRouter();
    const $store = useStore();
    const data = reactive({
        show: {
            desc: false,
            active: false,
            coupon: false
        },
        //路由地址
        path: { //给子路由拼接上id，避免刷新后数据丢失
            menu: 'menu',
            evaluate: 'evaluate',
            merchant: 'merchant'
        },
        paths_: computed(() => {
            var path = data.path;
            var paths_ = {};
            for (var k in path) {
                //给每个路由拼接id
                paths_[k] = path[k] + '?id=' + $route.query.id
            }
            return paths_
        })
    })


    //调用vuex里getters的 rst
    const rst = computed(() => {
        // console.log($store.getters.rst)
        return $store.getters.rst
    })
    const redpack = computed(() => {
        // console.log($store.getters.redpack)
        return $store.getters.redpack
    })

    const toHome = () => {
        $router.replace('/home')
    }

    onMounted(() => {
        {
            //获取详情页id
            proxy.$axios('/detail', {
                params: {
                    id: $route.query.id
                }
            }).then(res => {
                // console.log(res.data)
                // setDetailDate
                //提交setDetailDate
                $store.commit('setDetailDate', res.data)
            })
        }
    })
    return {
        rst,
        redpack,
        ...toRefs(data),
        toHome
    }
}


export default detailModel