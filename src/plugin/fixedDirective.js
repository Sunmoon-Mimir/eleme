//自定义吸附指令
const vFixed = {
    mounted(el, binding) {
        //el拿到的是绑定的元素
        // console.log(el, binding);
        //1.获取元素距离顶部的高度
        var el_ = el;
        var dt = 0;
        var st = 0; //滚动条的值
        var arg = binding.arg || 0; //不传参的情况下就是0
        var tVal = arg / 37.5 + "rem";
        var boll;
        var boll_;

        var dHtml = document.documentElement; //多个浏览器兼容
        var dBody = document.body;

        var css = {
            position: "fixed",
            left: "0",
            top: tVal, //是个动态的值
            width: "100%",
            zIndex: 100
        };

        //给个占位元素P，保持头部的高度不变
        var dp = document.createElement("p");
        dp.style.height = el.offsetHeight / 37.5 + "rem"; //换算
        dp.style.display = "none";
        el.after(dp);

        do {
            //元素相对定位于父级的距离
            dt += el_.offsetTop;
            el_ = el_.offsetParent;
        } while (el_);
        // console.log(dt)

        const scrollFn = () => {
            // console.log("滚动了")
            //2.获取滚动条的高度
            st = dHtml.scrollTop || dBody.scrollTop;
            boll = st >= dt - arg;
            if (boll_ !== boll) {
                //滚动条状态，值不一样才会触发
                boll_ = boll; //重新赋值
                // console.log(boll);
                //设置样式
                for (var k in css) {
                    if (boll) {
                        //当top达到一定的值就设置样式
                        el.style[k] = css[k];
                        dp.style.display = "block";
                    } else {
                        //清除原本的样式
                        el.style[k] = "";
                        dp.style.display = "none";
                    }
                }
            }
        };

        //给window body HTML 添加scroll事件
        //addEventListener(参数一【事件类型】，参数二【事件触发执行的方法】)
        //参数三【决定事件是以「捕获」还是「冒泡」机制执行，默认冒泡】
        //捕获（true）：从启动事件的元素节点开始，逐层往下传递（类似向下捕获东西）
        //冒泡（false）：逐层向上依序被触发（类似浮起来的气泡）
        window.addEventListener("scroll", scrollFn, false);
        dHtml.addEventListener("scroll", scrollFn, false);
        dBody.addEventListener("scroll", scrollFn, false);
    },
};
export default vFixed;