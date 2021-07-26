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

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/',
        name: 'Body',
        component: Body,
        children: [{
                path: 'home',
                name: 'Home',
                component: Home
            },
            {
                path: 'mine',
                name: 'Mine',
                component: Mine
            },
            {
                path: 'discover',
                name: 'Discover',
                component: Discover
            },
            {
                path: 'order',
                name: 'Order',
                component: Order
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(), //mode:'history'
    routes,
});

export default router;