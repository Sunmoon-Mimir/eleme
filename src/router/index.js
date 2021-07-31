// 引用两个函数，一个是创建路由createRouter、createWebHistory路由模式
import { createRouter, createWebHistory } from "vue-router";

const Body = () =>
    import ("../views/body/Body.vue");
// 分页组件
const Home = () =>
    import ("../views/main/home/Home.vue");
const Mine = () =>
    import ("../views/main/mine/Mine.vue");
const Discover = () =>
    import ("../views/main/discover/Discover.vue");
const Order = () =>
    import ("../views/main/order/Order.vue");
const Detail = () =>
    import ("@comps/detail/Detail.vue");
const Menu = () =>
    import ("@comps/detail/menu/Menu.vue");
const Merchant = () =>
    import ("@comps/detail/merchant/Merchant.vue");
const Evaluate = () =>
    import ("@comps/detail/evaluate/Evaluate.vue");

const routes = [{
        path: "/",
        redirect: "/home",
    },
    {
        path: "/",
        name: "Body",
        component: Body,
        children: [{
                path: "home",
                name: "Home",
                component: Home,
            },
            {
                path: "mine",
                name: "Mine",
                component: Mine,
            },
            {
                path: "discover",
                name: "Discover",
                component: Discover,
            },
            {
                path: "order",
                name: "Order",
                component: Order,
            },

        ],
    },
    {
        //与Home同级的详情页
        path: "/detail",
        name: "Detail",
        component: Detail,
        children: [{
                path: "/menu",
                name: "Menu",
                component: Menu,
            },
            {
                path: "/merchant",
                name: "Merchant",
                component: Merchant,
            },
            {
                path: "/evaluate",
                name: "Evaluate",
                component: Evaluate,
            },
        ]

    },
];

const router = createRouter({
    history: createWebHistory(), //mode:'history'
    routes,
});

export default router;