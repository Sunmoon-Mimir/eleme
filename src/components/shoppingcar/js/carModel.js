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


function carModel() {
    const $route = useRoute(); //赋值注意括号不能少
    const $router = useRouter();
    const $store = useStore();
    const data = reactive({
        foodState: computed(() => { //通过计算属性获取foodState对象的值，并return
            return $store.state.foodState;
        })
    })
    onMounted(() => {
        //侦听foodState的变化
        watch(data.foodState, (val) => {
            console.log(val)
        }, {
            deep: true
        })
    })

    return {
        ...toRefs(data)
    }
}

export default carModel;