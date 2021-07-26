// 城市模块从side中抽离出来
import { getCurrentInstance, toRefs, reactive, onMounted, computed } from "vue";

function cityModel() {
    /* 
			    vue2.0 原先通过在vue原型挂载axios，可以在组件实例通过this.$axios进行访问
				vue3.0 中没有this了,可以通过getCurrentInstance获取当前组件实例
			 */

    // 注意：
    // 		getCurrentInstance方法，是用来获取当前实例的，通过上下文ctx,获取当前
    // 		的方法。在打包之后无法获取全局挂载的方法。ctx只适合开发环境。
    const { ctx, proxy } = getCurrentInstance(); //解构这两个方法
    const data = reactive({
        cityList: null,
        searchStr: '',
        currentCity: '',
        show: { city: false },
        selectCity(val) {
            data.show.city = false; //选择完城市后，关闭城市选择列表
            data.currentCity = val.name;
            data.searchStr = '';
            data.show.city = false;

            //选择完城市，把选择的数据传递出去给home组件
            proxy.$emit('changeSide', val.name)
        }
    });

    //对城市名进行处理
    const cityName = computed(() => {
            const citys = data.cityList //获取数据
            var cityList = {} //初始化一个容器对象
            var initial;
            if (citys) { //有数据才继续
                //遍历数组
                for (var item of citys) {
                    //拿到每项拼音的首字母
                    // console.log(item.pinyin[0].toUpperCase())
                    initial = item.pinyin[0].toUpperCase()
                    if (initial in cityList) {
                        cityList[initial].push(item)
                    } else {
                        //初始化首字母为一个数组
                        //{}['A']=[{name}]
                        cityList[initial] = [item]
                    }
                }
            }
            // console.log(cityList)
            return cityList
        })
        /* 城市的模糊查询*/
    const citySearch = computed(() => {
        var arr = [] //声明一个空的数据

        /* 获取城市列表数据,城市查询的字符串 */
        var citys = data.cityList;
        var searchStr = data.searchStr;

        var reg;
        if (!citys || !searchStr) return [];
        /* 
            阿拉善盟 ---》阿善
         */
        //  /.*阿.*善. */
        searchStr = searchStr.replace(/.{0}/g, '.*');
        // console.log(searchStr)
        // console.log(reg)
        for (var city of citys) {
            // 声明一个全局匹配,忽略大小写
            reg = new RegExp(searchStr, 'gi');
            // 判断输入框中的值是否可以匹配到数据，如果匹配成功
            if (reg.test(city.label)) {
                // ，向arr数组中添加数据
                arr.push(city)
            }
        }
        // console.log(arr)
        return arr;
    })


    onMounted(() => {
        proxy.$axios("/citylist").then((res) => {
            // console.log(res);
            data.cityList = res.data;
        });
    })

    return {
        ...toRefs(data),
        citySearch,
        cityName
    };
}
export default cityModel;