<template>
<!--分析 购物车需要的数据；
加购 自动计算（现价和原价）以及商品数量，购物车列表可以显示数据
    商品信息(现价、原价、数量)，才能知道某件商品的数量，以及店铺购买总数量

    店铺是独立的、商品信息也不一样
 -->
 <!-- 记录所需的数据 (vuex)
    加购状态
    foodsState:{
        店铺
        id:{//加购商品的总数量
            count_all:10,
            //商品分类
            class_count:5,
            商品信息
            foods:{
                商品id 
                f01:{//单个商品的数量
                    count:1,
                    商品信息
                    item:{
                        name:,
                        price:,
                    }
                },
                商品id
                f02:{
                    //单个商品的数量
                    count:2,
                    商品信息
                    item:{
                        name:,
                        price:,
                    }
                }    
            }
        }
    }
 -->
    <div class="shoppingCarWrapper">
        <div class="shoppingCar flex">
            <div class="car_main flex">
                <div class="car_icon">
                    <b class="icon_count">0</b>
                    <i class="iconfont icon-gouwuchekong"></i>
                </div>
                <div class="car_price">
                    <div class="price_top">
                        <p>
                            <!-- count_all.price -->
                            <span class="price symbol">11</span>
                            <!-- count_all.price_origin -->
                            <span class="origin_price symbol">22</span>
                        </p>
                        <p class="price_bottom">还不够吃~</p>
                    </div>
                    <!-- <p>{{rst.piecewise_agent_fee.description}}</p> -->
                </div>
            </div>
            <div class="car_submit">
                <div class="submit_base">还差20元起送</div>
                <!-- <div class="submit_ok" >去结算</div> -->
            </div>
        </div>
    </div>
</template>
<script>
import carModel from './js/carModel.js'
 export default{
     setup(){
         const {foodState} = carModel()

         return{
            foodState
         }
     }
 }
</script>

<style lang="scss">
.shoppingCarWrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #fff;
    .symbol::before {
        content: "￥";
    }
}
.shoppingCar {
    position: relative;
    z-index: 10;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.9);
    color: #fff;
    .car_main {
        .car_icon {
            position: relative;
            width: 1.493333rem;
            height: 1.493333rem; //56
            margin: -0.266666rem 0 0 0.533333rem; //10 20
            background-color: #363636;
            border: 0.16rem solid #444; //6
            line-height: 1.333333rem; //50
            color: #5f5f63;
            text-align: center;
            border-radius: 50%;
            animation: paused 0.5s;
            .iconfont{
                font-size: .933333rem;//35
            }
            .icon_count {
                position: absolute;
                right: -0.133333rem;
                top: -0.133333rem; //5
                background-color: #f62571;
                color: #fff;
                padding: 0 0.186666rem; //7
                line-height: 0.586666rem; //22
                border-radius: 50px; //50
            }
            .icon-gouwuche1 {
                font-size: 0.933333rem; //35
            }
        }
        .car_icon_ok {
            color: #fff;
            background-color: #1fb3f0;
        }
        .car_price {
            margin-left: 0.266666rem; //10
            color: #999;
            font-family: PingFang SC, Helvetica Neue, Arial, sans-serif;
            .price_top {
                height: 0.586666rem; //22
                margin-top: 0.426666rem; //16
            }
            .price_bottom {
                font-size: 0.373333rem; //16
            }
            .price {
                font-size: 0.48rem; //18 color: #fff;
            }
            .origin_price {
                margin-left: 0.16rem; //6
                text-decoration: line-through;
            }
        }
    }
    .car_submit {
        width: 4.32rem; //162
        font-weight: 600;
        font-size: 0.48rem; //18
        line-height: 1.76rem; //66
        text-align: center;
        .submit_base {
            background-color: #777;
        }
        .submit_ok {
            background-color: #69f398;
        }
    }
}
</style>
