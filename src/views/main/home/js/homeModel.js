import { getCurrentInstance, toRefs, reactive, onMounted, computed, proxyRefs } from "vue";

function homeModel() {
    const { proxy } = getCurrentInstance();
    const data = reactive({
            show: { side: false },
            currentSide: '',
            foodtype: '',
            saveSide(val) {
                // 处理接收到的值
                data.currentSide = val;
                console.log(data.currentSide)
            }
        })
        //拆分 分类的数据，10条数据为一组
    const splicefood = computed(() => {
        //获取到分类的数据
        var fooddatas = data.foodtype;
        if (fooddatas) { //判断数据是否存在
            fooddatas = data.foodtype.entries;
            var arr = []; //存放分类出的数据
            do {
                arr.push(fooddatas.splice(0, 10))
            } while (fooddatas.length) //数组有元素就一直循环
            // console.log(arr)
            return arr;
        }
    })
    onMounted(() => {
        //获取分类数据（首页轮播）
        proxy.$axios('/foodtype').then(res => {
            data.foodtype = res.data //赋值给响应式属性foodtype
                // console.log(res.data)
        })
    })

    return {
        splicefood,
        ...toRefs(data)
    }
}

export default homeModel;